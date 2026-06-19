# Guía de Instalación — Trusteed Agentic Commerce para Magento 2

Versión 1.0.0 · Magento Open Source y Adobe Commerce 2.4.7 / 2.4.8 · PHP 8.2+

---

## Tabla de Contenidos

1. [Requisitos del Sistema](#1-requisitos-del-sistema)
2. [Lista de Verificación Previa](#2-lista-de-verificación-previa)
3. [Instalación vía Composer](#3-instalación-vía-composer)
4. [Instalación Manual](#4-instalación-manual)
5. [Configuración Inicial](#5-configuración-inicial)
6. [Conexión con Trusteed](#6-conexión-con-trusteed)
7. [Verificación de la Instalación](#7-verificación-de-la-instalación)
8. [Configuración de Cron](#8-configuración-de-cron)
9. [Actualización](#9-actualización)
10. [Desinstalación](#10-desinstalación)
11. [Resolución de Problemas](#11-resolución-de-problemas)

---

## 1. Requisitos del Sistema

| Componente | Mínimo | Recomendado |
|------------|--------|-------------|
| Magento Open Source | 2.4.7 | 2.4.8 |
| Adobe Commerce | 2.4.7 | 2.4.8 |
| PHP | 8.2 | 8.3 |
| Extensiones PHP | `curl`, `json`, `openssl` | + `ext-sodium` |
| MySQL / MariaDB | 8.0 / 10.6 | MySQL 8.0 |
| Composer | 2.x | 2.7+ |
| Cron | Requerido | — |

> **`ext-sodium` es muy recomendable.** El módulo incluye un fallback PHP puro
> (`paragonie/sodium_compat`) para la verificación de tokens de agente con Ed25519,
> pero `ext-sodium` nativo es ~40× más rápido y está disponible en todas las
> compilaciones de PHP 8.2+.

---

## 2. Lista de Verificación Previa

Antes de instalar, confirme que:

- [ ] Dispone de una cuenta Trusteed en [app.trusteed.xyz](https://app.trusteed.xyz)
- [ ] El cron de Magento está en funcionamiento (`bin/magento cron:run` finaliza sin errores)
- [ ] Tiene credenciales del Magento Marketplace (clave pública / clave privada) **o** realizará la instalación manual
- [ ] Ha activado el modo de mantenimiento en producción:
  ```bash
  bin/magento maintenance:enable
  ```
- [ ] Ha realizado una copia de seguridad completa de la base de datos

---

## 3. Instalación vía Composer

### 3.1 Configurar la autenticación del Magento Marketplace

Si aún no está configurada:

```bash
composer config http-basic.repo.magento.com <CLAVE_PUBLICA> <CLAVE_PRIVADA>
```

### 3.2 Requerir el paquete

```bash
composer require trusteed/agentic-commerce-magento
```

### 3.3 Activar el módulo

```bash
bin/magento module:enable Trusteed_AgenticCommerce
```

### 3.4 Ejecutar setup:upgrade

```bash
bin/magento setup:upgrade
```

Esto crea la tabla `trusteed_webhook_outbox` y añade las columnas
`trusteed_receipt_uri` / `trusteed_receipt_status` a `sales_order`.

### 3.5 Compilar la inyección de dependencias

```bash
bin/magento setup:di:compile
```

### 3.6 Desplegar contenido estático (solo producción)

```bash
bin/magento setup:static-content:deploy -f
```

### 3.7 Limpiar caché

```bash
bin/magento cache:flush
bin/magento cache:clean
```

### 3.8 Desactivar el modo de mantenimiento

```bash
bin/magento maintenance:disable
```

---

## 4. Instalación Manual

Use este método si no dispone de credenciales del Magento Marketplace o si obtuvo
el módulo como archivo `.zip` desde la página de descargas del Marketplace.

### 4.1 Extraer el archivo

```bash
unzip trusteed-agentic-commerce-magento-1.0.0.zip -d /tmp/trusteed-module
```

### 4.2 Copiar los archivos en Magento

```bash
mkdir -p <RAIZ_MAGENTO>/app/code/Trusteed/AgenticCommerce
cp -r /tmp/trusteed-module/* <RAIZ_MAGENTO>/app/code/Trusteed/AgenticCommerce/
```

### 4.3 Continuar desde el paso 3.3

Siga los pasos 3.3 a 3.8 descritos anteriormente.

---

## 5. Configuración Inicial

Tras la instalación, el menú **Trusteed** aparece en la barra lateral del administrador
de Magento (debajo de **Tiendas**).

### 5.1 Abrir el Asistente de Configuración

Navegue a **Trusteed → Configuración** (Setup Wizard).

El asistente presenta tres secciones:

| Sección | Propósito |
|---------|-----------|
| Internal HMAC Secret | Firma las llamadas internas de latido a la API de Trusteed |
| Checkout Enforcement (CEL) | Configura el modo de fallo y las reglas de cumplimiento |
| Conecta tu tienda con Trusteed | Entrada de clave API y conexión de la tienda |

### 5.2 Generar el Secreto HMAC Interno

El secreto HMAC firma las llamadas internas a la API (cabecera `X-Internal-Auth`).
Debe coincidir con el valor configurado en el backend de Trusteed para su cuenta.

Las Operaciones de Trusteed provisionan este valor — cópielo desde el panel de su
cuenta en [app.trusteed.xyz/settings/integration](https://app.trusteed.xyz/settings/integration).

Péguelo en **Internal HMAC Secret** y haga clic en **Guardar**.

### 5.3 Configurar Vistas de Tienda

En **¿Qué tiendas quieres activar?** seleccione las vistas de tienda que desea
exponer a los agentes IA. Los agentes solo pueden navegar y comprar en las vistas
de tienda habilitadas.

---

## 6. Conexión con Trusteed

### 6.1 Obtener sus credenciales de API

Inicie sesión en [app.trusteed.xyz](https://app.trusteed.xyz) y navegue a
**Configuración → Integraciones → Magento**:

| Credencial | Dónde encontrarla |
|------------|-------------------|
| Merchant ID | Configuración → Cuenta → Merchant ID |
| Integration Token | Configuración → Integraciones → Magento → Token |
| Webhook Secret | Configuración → Integraciones → Magento → Webhook Secret |
| Connection ID | Asignado automáticamente al conectar |

### 6.2 Introducir credenciales en Magento

Navegue a **Tiendas → Configuración → Trusteed → Agentic Commerce**:

1. **API Base URL** — `https://api.trusteed.xyz` (no cambie salvo indicación)
2. **Merchant ID** — pegue el valor de su cuenta Trusteed
3. **Integration Token** — pegue el token de integración (se guarda cifrado)
4. **Webhook Secret** — pegue el secreto de webhook (se guarda cifrado)

Haga clic en **Guardar Configuración**.

### 6.3 Hacer clic en "Conectar con Trusteed"

En el Asistente de Configuración (**Trusteed → Configuración**) haga clic en el
botón **Conectar con Trusteed →**. Esto:

1. Valida la conectividad con la API de Trusteed
2. Registra su instancia de Magento como tienda conectada
3. Devuelve un **Connection ID** — guardado automáticamente en la configuración

Aparecerá un banner verde **"Your store is connected"** en el Panel
(**Trusteed → Inicio**) una vez establecida la conexión.

---

## 7. Verificación de la Instalación

### 7.1 Comprobar el estado del módulo

```bash
bin/magento module:status Trusteed_AgenticCommerce
# Esperado: Module is enabled
```

### 7.2 Verificar tablas de la base de datos

```bash
mysql -u <usuario> -p <bbdd> -e "DESCRIBE trusteed_webhook_outbox;"
mysql -u <usuario> -p <bbdd> -e "SHOW COLUMNS FROM sales_order LIKE 'trusteed_%';"
```

### 7.3 Verificar el endpoint del manifiesto MCP

```bash
curl -sf https://<SU_TIENDA>/trusteed/wellknown/mcpmanifest
# Debe devolver un JSON con las capacidades de la tienda
```

### 7.4 Comprobar el panel de administración

Navegue a **Trusteed → Inicio**. El panel debe mostrar:
- Banner verde "Your store is connected"
- Store ID coincidente con su cuenta Trusteed
- Recuento de vistas de tienda activas

### 7.5 Verificar los trabajos cron

```bash
bin/magento cron:run --group=default
grep trusteed var/log/cron.log
```

---

## 8. Configuración de Cron

El módulo registra dos trabajos cron en el grupo `default`:

| Trabajo | Programación | Propósito |
|---------|-------------|-----------|
| `trusteed_webhook_drain` | Cada minuto | Entrega los webhooks pendientes desde la bandeja de salida a la API de Trusteed con reintento exponencial |
| `trusteed_lag_heartbeat` | Cada minuto | Emite una métrica de latencia para que el panel de Trusteed pueda alertar sobre retrasos |

**El cron es obligatorio.** Sin él, los eventos de pedido (creado, enviado,
reembolsado) se acumularán en la tabla `trusteed_webhook_outbox` y nunca se entregarán.

Verifique que el cron de Magento esté programado en el crontab del servidor:

```cron
* * * * * php /var/www/html/bin/magento cron:run 2>&1 | grep -v "^$" >> /var/www/html/var/log/magento.cron.log
```

---

## 9. Actualización

### Desde una versión 1.x anterior

```bash
composer update trusteed/agentic-commerce-magento
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento cache:flush
```

---

## 10. Desinstalación

### 10.1 Deshabilitar el módulo

```bash
bin/magento module:disable Trusteed_AgenticCommerce
bin/magento setup:upgrade
```

### 10.2 Eliminar el paquete

```bash
composer remove trusteed/agentic-commerce-magento
```

### 10.3 Eliminar objetos de base de datos (opcional)

Solo si desea eliminar permanentemente todos los datos:

```sql
DROP TABLE IF EXISTS trusteed_webhook_outbox;

ALTER TABLE sales_order
  DROP COLUMN IF EXISTS trusteed_receipt_uri,
  DROP COLUMN IF EXISTS trusteed_receipt_status;
```

### 10.4 Limpiar la configuración

```bash
bin/magento config:delete trusteed_general/general
bin/magento config:delete trusteed/enforcement
bin/magento cache:flush
```

---

## 11. Resolución de Problemas

### El módulo no aparece en el menú de administración

```bash
bin/magento module:status Trusteed_AgenticCommerce
bin/magento setup:upgrade
bin/magento cache:flush
```

### "Store is not connected" tras introducir las credenciales

1. Verifique que `API Base URL` sea `https://api.trusteed.xyz` (HTTPS obligatorio)
2. Compruebe que el servidor puede alcanzar la API de Trusteed:
   ```bash
   curl -sf https://api.trusteed.xyz/health
   ```
3. Verifique que el Integration Token sea correcto (sin espacios al final)
4. Revise `var/log/system.log` buscando entradas `[trusteed]`

### La bandeja de salida de webhooks acumula entradas

```bash
mysql -u <usuario> -p <bbdd> -e "SELECT status, COUNT(*) FROM trusteed_webhook_outbox GROUP BY status;"
bin/magento cron:run --group=default
grep trusteed_webhook var/log/cron.log
```

### `ext-sodium` no disponible

```bash
# Ubuntu / Debian
sudo apt-get install php8.2-sodium

# CentOS / RHEL
sudo dnf install php-sodium

sudo systemctl restart php8.2-fpm
```

El fallback PHP puro se activa automáticamente si `ext-sodium` no está presente.

### Los pedidos no aparecen en el panel de Trusteed

```bash
bin/magento dev:di:info Trusteed\\AgenticCommerce\\Observer\\SalesOrderSaveAfter
```

Revise `var/log/system.log` buscando entradas `[trusteed] outbox enqueue` tras
realizar un pedido de prueba.
