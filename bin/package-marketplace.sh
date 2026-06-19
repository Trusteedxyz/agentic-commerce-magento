#!/usr/bin/env bash
# Empaqueta el módulo para subir al Magento Marketplace.
# Excluye vendor/, packages/, archivos de desarrollo y tests.
# Uso: bash bin/package-marketplace.sh [version]

set -euo pipefail

VERSION="${1:-1.0.0}"
MODULE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="${MODULE_DIR}/dist"
PACKAGE_NAME="trusteed-agentic-commerce-magento-${VERSION}.zip"

echo "==> Empaquetando Trusteed_AgenticCommerce v${VERSION}"

# Verificar que composer.json tiene la versión correcta
COMPOSER_VERSION=$(grep '"version"' "${MODULE_DIR}/composer.json" | head -1 | sed 's/.*"\([0-9.]*\)".*/\1/')
if [ "${COMPOSER_VERSION}" != "${VERSION}" ]; then
  echo "ERROR: La versión en composer.json (${COMPOSER_VERSION}) no coincide con ${VERSION}"
  echo "       Actualiza el campo \"version\" en composer.json antes de empaquetar."
  exit 1
fi

mkdir -p "${OUTPUT_DIR}"
PACKAGE_PATH="${OUTPUT_DIR}/${PACKAGE_NAME}"

# Eliminar paquete previo si existe
rm -f "${PACKAGE_PATH}"

cd "${MODULE_DIR}"

zip -r "${PACKAGE_PATH}" . \
  --exclude "vendor/*" \
  --exclude "packages/*" \
  --exclude "dist/*" \
  --exclude "*.lock" \
  --exclude ".git/*" \
  --exclude ".gitignore" \
  --exclude "bin/package-marketplace.sh" \
  --exclude "composer-unit-test.json" \
  --exclude "composer-unit-test.lock" \
  --exclude "phpunit.xml" \
  --exclude "Test/*" \
  --exclude "node_modules/*" \
  --exclude "*.DS_Store" \
  --exclude "__MACOSX/*"

echo ""
echo "==> Paquete generado:"
echo "    ${PACKAGE_PATH}"
echo "    $(du -h "${PACKAGE_PATH}" | cut -f1)"
echo ""
echo "==> Checklist antes de subir al marketplace:"
echo "    [ ] composer.json version = ${VERSION}"
echo "    [ ] etc/module.xml no tiene setup_version"
echo "    [ ] db_schema_whitelist.json actualizado"
echo "    [ ] README.md con screenshots, configuración e instalación"
echo "    [ ] Mínimo 3 screenshots preparados para el portal"
echo "    [ ] Cuenta vendedor activa en marketplace.magento.com"
echo ""
echo "==> Subir en: https://developer.adobe.com/commerce/marketplace/guides/sellers/submit-for-review/"
