<?php

declare(strict_types=1);

/**
 * Minimal Symfony Console stubs for local PHPUnit runs.
 *
 * `symfony/console` arrives transitively with the real Magento framework via
 * `composer install` against repo.magento.com. Locally — and in environments
 * without those credentials — these just-enough shapes let the console-command
 * unit tests compile and execute against pure-PHP Trusteed sources.
 *
 * Each declaration is guarded by `*_exists()` so this file is a no-op when the
 * real Symfony component is autoloaded.
 *
 * @package Trusteed\AgenticCommerce\Test\Unit
 */

namespace Symfony\Component\Console\Input {
    if (!\interface_exists(InputInterface::class)) {
        interface InputInterface
        {
            public function getArgument(string $name);

            public function getOption(string $name);
        }
    }
}

namespace Symfony\Component\Console\Output {
    if (!\interface_exists(OutputInterface::class)) {
        interface OutputInterface
        {
            public function writeln($messages, int $options = 0): void;

            public function write($messages, bool $newline = false, int $options = 0): void;
        }
    }
}

namespace Symfony\Component\Console\Command {
    if (!\class_exists(Command::class)) {
        class Command
        {
            public const SUCCESS = 0;
            public const FAILURE = 1;
            public const INVALID = 2;

            private string $name = '';
            private string $description = '';

            public function __construct(string $name = null)
            {
                if ($name !== null) {
                    $this->name = $name;
                }
            }

            public function setName(string $name): static
            {
                $this->name = $name;
                return $this;
            }

            public function getName(): string
            {
                return $this->name;
            }

            public function setDescription(string $description): static
            {
                $this->description = $description;
                return $this;
            }

            public function getDescription(): string
            {
                return $this->description;
            }
        }
    }
}
