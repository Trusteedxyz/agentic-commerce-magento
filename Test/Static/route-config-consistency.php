<?php

declare(strict_types=1);

/**
 * Static wiring gate.
 *
 * The Magento integration tests under Test/Integration/ (PhaseBSeamTest,
 * WellKnownRouterTest, ...) require the full Magento\TestFramework kernel
 * (a complete Magento install + MySQL + OpenSearch + Marketplace composer
 * auth). That is too heavy / credential-gated to run on every push, so the
 * EQP "Run PHPUnit" step has historically run Test/Unit/ ONLY, leaving the
 * controller-namespace 404 routing bug and the enforcement-config
 * read/write path mismatch bug structurally invisible to CI.
 *
 * This script is a PRAGMATIC, zero-dependency static analyser that catches
 * the SAME two bug classes WITHOUT a Magento kernel:
 *
 *   GATE 1 (controller namespace and route resolution)
 *     For every admin/frontend route action referenced in adminhtml/menu.xml,
 *     adminhtml/system.xml, adminhtml/routes.xml and frontend/routes.xml,
 *     assert the corresponding controller class file exists at the exact path
 *     + namespace + class name that Magento's FrontController would resolve
 *     ("<frontName>/<area>/<action>" maps to Controller/[Adminhtml/]<Area>/<Action>.php).
 *     A namespace/path mismatch is the silent-404 defect.
 *
 *   GATE 2 (enforcement config read/write path consistency)
 *     Every config path that is READ via scopeConfig (getValue / isSetFlag)
 *     must either (a) be backed by a <field> declared in system.xml, or
 *     (b) be WRITTEN somewhere in the module via the config WriterInterface,
 *     or (c) be a core Magento path on an explicit allow-list. A read of a
 *     path that is never written and never declared is the silent
 *     "enforcement always reads the default / null" wiring defect.
 *
 * Exit 0 = both gates pass. Exit non-zero = a wiring defect a unit test
 * would never catch. Run from the module root:
 *
 *     php Test/Static/route-config-consistency.php
 */

$moduleRoot = dirname(__DIR__, 2);

$errors = [];
$checks = 0;

/* ------------------------------------------------------------------ *
 * Tiny helpers (no Magento, no Composer autoload required).
 * ------------------------------------------------------------------ */

/**
 * Read a file or fail the gate loudly (a missing wiring file IS a defect).
 */
function readOrFail(string $path, array &$errors): ?string
{
    if (!is_file($path)) {
        $errors[] = "MISSING FILE: {$path}";
        return null;
    }
    $contents = file_get_contents($path);
    return $contents === false ? null : $contents;
}

/**
 * Convert a Magento path segment ("setup", "dashboard", "well_known")
 * into the PascalCase directory/class Magento's router expects.
 * Magento uppercases the first letter of each underscore-delimited part.
 */
function pascal(string $segment): string
{
    $parts = explode('_', $segment);
    return implode('', array_map('ucfirst', $parts));
}

/* ================================================================== *
 * GATE 1: controller namespace and route resolution
 * ================================================================== */

/**
 * Build the frontName → area map from routes.xml so action strings
 * ("trusteed/dashboard/index") can be resolved to a controller path.
 *
 * @return array<string, string> frontName => 'Adminhtml' | '' (frontend)
 */
function loadFrontNames(string $moduleRoot, array &$errors): array
{
    $map = [];

    $adminRoutes = readOrFail($moduleRoot . '/etc/adminhtml/routes.xml', $errors);
    if ($adminRoutes !== null && preg_match_all('/frontName="([^"]+)"/', $adminRoutes, $m)) {
        foreach ($m[1] as $front) {
            $map[$front] = 'Adminhtml';
        }
    }

    $frontendRoutes = readOrFail($moduleRoot . '/etc/frontend/routes.xml', $errors);
    if ($frontendRoutes !== null && preg_match_all('/frontName="([^"]+)"/', $frontendRoutes, $m)) {
        foreach ($m[1] as $front) {
            $map[$front] = '';
        }
    }

    return $map;
}

/**
 * Resolve one action string to its expected controller file + class + namespace,
 * then assert the file declares exactly that namespace and class.
 */
function assertControllerResolves(
    string $action,
    array $frontNames,
    string $moduleRoot,
    array &$errors,
    int &$checks
): void {
    $segments = array_values(array_filter(explode('/', trim($action, '/'))));
    if (count($segments) < 3) {
        // Magento defaults missing segments to "index"; pad so a 2-seg
        // action like "trusteed/dashboard" still resolves to .../Index.
        while (count($segments) < 3) {
            $segments[] = 'index';
        }
    }

    // Standard Magento resolution: front / controller / action (3 segments).
    $front = $segments[0];
    $controllerSeg = $segments[1];
    $actionSeg = $segments[2];

    if (!isset($frontNames[$front])) {
        $errors[] = "ROUTE: action '{$action}' uses frontName '{$front}' not declared in any routes.xml";
        return;
    }

    $areaDir = $frontNames[$front]; // 'Adminhtml' or ''
    $controllerDir = pascal($controllerSeg);
    $actionClass = pascal($actionSeg);

    $relDir = 'Controller' . ($areaDir !== '' ? '/' . $areaDir : '') . '/' . $controllerDir;
    $expectedFile = $moduleRoot . '/' . $relDir . '/' . $actionClass . '.php';

    $checks++;

    $src = readOrFail($expectedFile, $errors);
    if ($src === null) {
        $errors[] = "404 risk: action '{$action}' expects controller {$relDir}/{$actionClass}.php NOT FOUND. "
            . 'Magento would resolve this URL to a 404.';
        return;
    }

    $expectedNs = 'Trusteed\\AgenticCommerce\\' . str_replace('/', '\\', $relDir);
    if (!preg_match('/^\s*namespace\s+' . preg_quote($expectedNs, '/') . '\s*;/m', $src)) {
        $errors[] = "NS-MISMATCH: {$expectedFile} must declare 'namespace {$expectedNs};' "
            . "for action '{$action}' to resolve (else silent 404).";
    }

    if (!preg_match('/^\s*(?:final\s+|abstract\s+)?class\s+' . preg_quote($actionClass, '/') . '\b/m', $src)) {
        $errors[] = "CLASS-MISMATCH: {$expectedFile} must declare 'class {$actionClass}' "
            . "for action '{$action}' to resolve (else silent 404).";
    }
}

/**
 * Collect every action="..." reference across menu.xml + system.xml.
 *
 * @return string[]
 */
function collectActionRefs(string $moduleRoot, array &$errors): array
{
    $actions = [];
    foreach (['etc/adminhtml/menu.xml', 'etc/adminhtml/system.xml'] as $rel) {
        $path = $moduleRoot . '/' . $rel;
        if (!is_file($path)) {
            continue;
        }
        $xml = (string)file_get_contents($path);
        if (preg_match_all('/action="([a-z0-9_]+\/[a-z0-9_]+(?:\/[a-z0-9_]+)?)"/i', $xml, $m)) {
            foreach ($m[1] as $a) {
                $actions[$a] = true;
            }
        }
    }
    return array_keys($actions);
}

$frontNames = loadFrontNames($moduleRoot, $errors);
$actions = collectActionRefs($moduleRoot, $errors);

if ($actions === []) {
    $errors[] = 'No action references found in menu.xml/system.xml, gate would be a no-op (regression in the gate itself?)';
}
foreach ($actions as $action) {
    assertControllerResolves($action, $frontNames, $moduleRoot, $errors, $checks);
}

/* ================================================================== *
 * GATE 2: enforcement config read/write path consistency
 * ================================================================== */

/**
 * Recursively gather *.php source files under the module, skipping
 * vendor/ and Test/ (tests legitimately reference arbitrary paths).
 *
 * @return string[]
 */
function phpSourceFiles(string $moduleRoot): array
{
    $out = [];
    $it = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($moduleRoot, FilesystemIterator::SKIP_DOTS)
    );
    foreach ($it as $file) {
        $path = $file->getPathname();
        if (substr($path, -4) !== '.php') {
            continue;
        }
        if (strpos($path, '/vendor/') !== false || strpos($path, '/Test/') !== false) {
            continue;
        }
        $out[] = $path;
    }
    return $out;
}

// Config paths whitelisted as read-only-by-design (NOT a wiring defect):
//   - core Magento / framework-owned paths we only read; and
//   - enforcement paths that are intentionally operator-set via the CLI
//     (`bin/magento config:set ...`) with a safe hardcoded fallback, so they
//     have no system.xml field and no in-module WriterInterface call.
//
// Anything NOT on this list that is read but never written/declared is a
// genuine orphan-read wiring defect and MUST fail the gate. Adding a path
// here is an explicit, reviewable decision, keep the justification next to it.
$coreConfigAllowList = [
    // --- core Magento, read-only ---
    'general/locale/timezone',
    'design/theme/theme_id',
    // --- enforcement: operator-set via CLI, documented default in source ---
    // CheckoutSubmitBefore::getFailureMode() defaults to 'enforce'
    // (see `bin/magento config:set trusteed/enforcement/failure_mode observe`).
    'trusteed/enforcement/failure_mode',
    // CheckoutSubmitBefore velocity heuristic defaults to 5000 cents.
    'trusteed/enforcement/merchant_avg_order_cents',
];

$readPaths = [];   // path => first file that reads it
$writtenPaths = []; // path => true (written via WriterInterface->save)
$constMap = [];     // ClassConst short name => resolved path literal

$sources = phpSourceFiles($moduleRoot);

// First pass: resolve "const NAME = '<a/b/c>';" so save(self::NAME, ...) works.
foreach ($sources as $file) {
    $src = (string)file_get_contents($file);
    if (preg_match_all(
        '/const\s+([A-Z0-9_]+)\s*=\s*[\'"]([a-z0-9_]+\/[a-z0-9_]+\/[a-z0-9_]+)[\'"]/i',
        $src,
        $m,
        PREG_SET_ORDER
    )) {
        foreach ($m as $set) {
            $constMap[$set[1]] = $set[2];
        }
    }
}

foreach ($sources as $file) {
    $src = (string)file_get_contents($file);

    // READS: getValue('a/b/c') / isSetFlag('a/b/c')
    if (preg_match_all(
        '/(?:getValue|isSetFlag)\(\s*[\'"]([a-z0-9_]+\/[a-z0-9_]+\/[a-z0-9_]+)[\'"]/i',
        $src,
        $m
    )) {
        foreach ($m[1] as $p) {
            $readPaths[$p] = $readPaths[$p] ?? $file;
        }
    }

    // WRITES (literal): ->save('a/b/c', ...) on a WriterInterface
    if (preg_match_all(
        '/->save\(\s*[\'"]([a-z0-9_]+\/[a-z0-9_]+\/[a-z0-9_]+)[\'"]/i',
        $src,
        $m
    )) {
        foreach ($m[1] as $p) {
            $writtenPaths[$p] = true;
        }
    }

    // WRITES (const): ->save(self::SOME_CONST, ...) or ClassName::SOME_CONST
    if (preg_match_all(
        '/->save\(\s*(?:self|static|[A-Za-z_\\\\]+)::([A-Z0-9_]+)/',
        $src,
        $m
    )) {
        foreach ($m[1] as $constName) {
            if (isset($constMap[$constName])) {
                $writtenPaths[$constMap[$constName]] = true;
            }
        }
    }
}

// Parse system.xml declared fields → full config paths.
$systemDeclared = [];
$systemXmlPath = $moduleRoot . '/etc/adminhtml/system.xml';
if (is_file($systemXmlPath)) {
    $sx = simplexml_load_file($systemXmlPath);
    if ($sx !== false) {
        foreach ($sx->section as $section) {
            $sid = (string)$section['id'];
            foreach ($section->group as $group) {
                $gid = (string)$group['id'];
                foreach ($group->field as $field) {
                    $fid = (string)$field['id'];
                    $systemDeclared["{$sid}/{$gid}/{$fid}"] = true;
                }
            }
        }
    }
} else {
    $errors[] = 'etc/adminhtml/system.xml not found, cannot validate config backing.';
}

foreach ($readPaths as $path => $firstFile) {
    $checks++;
    $backed = isset($systemDeclared[$path])
        || isset($writtenPaths[$path])
        || in_array($path, $coreConfigAllowList, true);

    if (!$backed) {
        $rel = str_replace($moduleRoot . '/', '', $firstFile);
        $errors[] = "ORPHAN-READ: config path '{$path}' is READ in {$rel} but is neither "
            . 'declared in system.xml, written via WriterInterface, nor on the core allow-list. '
            . 'It will silently resolve to null/default at runtime (enforcement wiring defect).';
    }
}

/* ================================================================== *
 * GATE 3: every admin controller is resolvable by URL, menu or no menu
 * ================================================================== *
 * GATE 1 only looks at actions the menu / system.xml REFERENCE. A controller
 * that is not in the menu (hidden pages kept reachable by URL) escaped it: an
 * `AgentReadiness/` directory sat next to a `trusteed/agentreadiness/index`
 * route and returned 404 on Linux (case-sensitive FS) while the gate was green.
 *
 * Magento resolves "<frontName>/<segment>/<action>" to a class under
 * `Controller\Adminhtml\<ucfirst(segment)>\<ucfirst(action)>`, and URL segments
 * are lowercase. So a directory with an inner capital can never be reached, and
 * a controller whose `namespace` disagrees with its path is not autoloadable.
 */
$adminControllerRoot = $moduleRoot . '/Controller/Adminhtml';
$adminDirs = is_dir($adminControllerRoot) ? (glob($adminControllerRoot . '/*', GLOB_ONLYDIR) ?: []) : [];

foreach ($adminDirs as $dirPath) {
    $dir = basename($dirPath);
    ++$checks;
    if ($dir !== pascal(strtolower($dir))) {
        $errors[] = "UNREACHABLE-DIR: Controller/Adminhtml/{$dir} has an inner capital. Magento maps the "
            . "lowercase URL segment to '" . ucfirst(strtolower($dir)) . "', so this controller 404s on a "
            . 'case-sensitive filesystem. Rename it to that exact casing (and its namespace).';
    }

    foreach (glob($dirPath . '/*.php') ?: [] as $file) {
        ++$checks;
        $src = file_get_contents($file);
        $expected = 'Trusteed\\AgenticCommerce\\Controller\\Adminhtml\\' . $dir;
        if ($src === false || !preg_match('/^namespace\s+([^;]+);/m', $src, $ns) || trim($ns[1]) !== $expected) {
            $found = ($src !== false && isset($ns[1])) ? trim($ns[1]) : '(none)';
            $rel = str_replace($moduleRoot . '/', '', $file);
            $errors[] = "NAMESPACE-PATH: {$rel} declares namespace '{$found}' but its path requires '{$expected}'.";
        }
    }
}

/* ================================================================== *
 * Report
 * ================================================================== */

if ($errors !== []) {
    fwrite(STDERR, "\n✗ Magento static wiring gate FAILED ({$checks} checks):\n\n");
    foreach ($errors as $e) {
        fwrite(STDERR, "  • {$e}\n");
    }
    fwrite(STDERR, "\nThese are exactly the route 404 and config wiring defects the\n");
    fwrite(STDERR, "integration tests catch but the unit-only suite cannot.\n");
    exit(1);
}

fwrite(STDOUT, "✓ Magento static wiring gate PASSED: {$checks} route/config consistency checks OK.\n");
fwrite(STDOUT, "  GATE 1: all menu/system actions resolve to a controller (no silent 404).\n");
fwrite(STDOUT, "  GATE 2: all config reads are system.xml-backed, written, or core-allow-listed.\n");
fwrite(STDOUT, "  GATE 3: every admin controller dir/namespace is reachable by URL (menu or not).\n");
exit(0);
