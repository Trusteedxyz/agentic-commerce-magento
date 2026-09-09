# Guía de Instalación — Trusteed Agentic Commerce para Magento 2

Versión 1.2.1 · Magento Open Source y Adobe Commerce 2.4.7 / 2.4.8 · PHP 8.2+

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

| Componente          | Mínimo                    | Recomendado    |
| ------------------- | ------------------------- | -------------- |
| Magento Open Source | 2.4.7                     | 2.4.8          |
| Adobe Commerce      | 2.4.7                     | 2.4.8          |
| PHP                 | 8.2                       | 8.3            |
| Extensiones PHP     | `curl`, `json`, `openssl`, `sodium` | igual |
| MySQL / MariaDB     | 8.0 / 10.6                | MySQL 8.0      |
| Composer            | 2.x                       | 2.7+           |
| Cron                | Requerido                 | —              |

> **`ext-sodium` es un requisito, no una opción.** Realiza las comprobaciones Ed25519
> en las que se apoyan la verificación del token de agente y la verificación del
> snapshot de enforcement. Sin ella, ambas verificaciones devuelven `indeterminate`:
> el conector no puede establecer la identidad del agente, así que nunca confirma a
> ningún agente como verificado. El módulo **no** incluye ningún fallback en PHP puro:
> `paragonie/sodium_compat` no está declarado como dependencia, por lo que la rama de
> compatibilidad que hay en el código es inalcanzable en una instalación normal.
> `ext-sodium` viene incluida y activada por defecto en prácticamente todas las
> compilaciones de PHP 8.2+.

---

## 2. Lista de Verificación Previa

Antes de instalar, confirme que:

- [ ] Dispone de una cuenta Trusteed en [trusteed.xyz/dashboard](https://trusteed.xyz/dashboard)
- [ ] El cron de Magento está en funcionamiento (`bin/magento cron:run` finaliza sin errores)
- [ ] Su proyecto Magento puede autenticarse contra `repo.magento.com` (clave pública / clave privada), **o** realizará la instalación manual desde el `.zip`
- [ ] Ha activado el modo de mantenimiento en producción:
  ```bash
  bin/magento maintenance:enable
  ```
- [ ] Ha realizado una copia de seguridad completa de la base de datos

---

## 3. Instalación vía Composer

### 3.1 Comprobar la autenticación del repositorio de Magento

Este módulo **no** se distribuye a través del Magento Marketplace, así que no necesita
credenciales propias de Marketplace. Solo hará falta la autenticación contra
`repo.magento.com` porque su propio proyecto Magento ya descarga de ahí sus paquetes,
como es lo habitual:

```bash
composer config http-basic.repo.magento.com <CLAVE_PUBLICA> <CLAVE_PRIVADA>
```

### 3.2 Requerir el paquete

Este paquete **todavía no está publicado en Packagist**, así que primero hay que
indicarle a Composer dónde encontrarlo. Añada lo siguiente al `composer.json` de su
proyecto Magento, fusionándolo con las entradas `repositories` que ya tuviera:

```json
{
  "repositories": [
    { "type": "vcs", "url": "https://github.com/Trusteedxyz/agentic-commerce-magento" }
  ]
}
```

Solo entonces se resolverá el `require`:

```bash
composer require trusteed/agentic-commerce-magento:^1.2
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

Use este método si prefiere no añadir una entrada de repositorio en Composer. Descargue
el `.zip` instalable desde la
[última GitHub Release](https://github.com/Trusteedxyz/agentic-commerce-magento/releases/latest)
— el archivo adjunto se llama `trusteed-agentic-commerce-magento-<versión>.zip`.

### 4.1 Extraer el archivo

```bash
unzip trusteed-agentic-commerce-magento-1.2.1.zip -d /tmp/trusteed-module
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

| Sección                        | Propósito                                                           |
| ------------------------------ | ------------------------------------------------------------------- |
| Conecta tu tienda con Trusteed | Conexión de la tienda — **empiece por aquí** (ver §6)               |
| Checkout Enforcement (CEL)     | Credenciales y modo de fallo del enforcement de checkout (ver §6.4) |
| Internal HMAC Secret           | Firma las llamadas internas de latido a la API de Trusteed (§5.3)   |

> **No hay ningún valor que copiar a mano para conectar la tienda.** El
> Merchant ID, el token de integración y el secreto de webhook los rellena el
> propio asistente durante la conexión (§6). Si busca esos campos en el
> formulario no los verá: están ocultos a propósito.

### 5.2 Configurar Vistas de Tienda

En **¿Qué tiendas quieres activar?** seleccione las vistas de tienda que desea
exponer a los agentes IA. Los agentes solo pueden navegar y comprar en las vistas
de tienda habilitadas.

### 5.3 Secreto HMAC Interno (sólo si Trusteed se lo ha entregado)

El secreto HMAC firma las llamadas internas a la API (cabecera `X-Internal-Auth`).
**No es autoservicio y no aparece en ninguna pantalla del panel**: lo provisiona
el equipo de Trusteed y sólo se entrega a las cuentas que lo necesitan.

Si no le han dado uno, **deje el campo vacío y continúe** — la instalación
funciona sin él. Si se lo han entregado, péguelo en **Internal HMAC Secret** y
haga clic en **Guardar**.

---

## 6. Conexión con Trusteed

La conexión es un flujo de autorización en ventana emergente, al estilo de
«iniciar sesión con…». **No se pega ninguna credencial a mano.**

### 6.1 Requisito previo: una cuenta de Trusteed

Necesita una cuenta en [trusteed.xyz](https://trusteed.xyz). Si aún no la tiene,
créela antes de continuar: la ventana emergente del paso siguiente le pedirá
iniciar sesión.

### 6.2 Pulsar "Conectar con Trusteed →"

En el Asistente de Configuración (**Trusteed → Configuración**), pulse
**Conectar con Trusteed →**. Ocurre esto:

1. Se abre una ventana emergente hacia `trusteed.xyz/connect/magento`.
2. Usted inicia sesión y autoriza la conexión de esta tienda.
3. La ventana se cierra y devuelve al asistente un **token de un solo uso**
   junto con su Merchant ID.
4. El asistente guarda el formulario, y **el servidor de Magento** canjea ese
   token por las credenciales definitivas (Connection ID, secreto de webhook y
   secreto de embed). El token no se guarda en ningún sitio: sólo vive durante
   ese canje.

Si su navegador bloquea las ventanas emergentes, permítalas para el dominio de
su back office y vuelva a pulsar el botón.

### 6.3 Comprobar que ha funcionado

Tras el guardado verá el mensaje **«Trusteed configuration saved successfully»**.
En **Tiendas → Configuración → Trusteed → Agentic Commerce** el campo
**Connection ID** habrá dejado de estar vacío. Ése es el indicador fiable de que
la conexión se completó.

> **No modifique a mano el Integration Token ni el Webhook Secret** en esa
> pantalla después de conectar. El backend guarda su propia copia de los
> secretos emitidos durante el canje; sobrescribirlos localmente rompe la firma
> de los webhooks sin ningún aviso. Si necesita rotarlos, vuelva a pulsar
> **Conectar con Trusteed →**.

### 6.4 Activar el enforcement de checkout (paso aparte)

Conectar la tienda **no activa el enforcement de checkout**. Ese módulo necesita
dos credenciales más, que Trusteed provisiona por separado:

| Campo del asistente         | Config path                            |
| --------------------------- | -------------------------------------- |
| Enforcement Installation ID | `trusteed/enforcement/installation_id` |
| Enforcement HMAC Secret     | `trusteed/enforcement/hmac_secret`     |

Mientras el **Installation ID** esté vacío, `EnforcementClient` deja pasar todos
los checkouts sin evaluar ni una regla. Es deliberado —una tienda a medio
configurar no debe bloquear ventas—, pero significa que **no está protegido
todavía**. El módulo se lo recuerda con un aviso en el panel de administración
hasta que ambos valores estén puestos.

Si quiere enforcement, pídale esas dos credenciales a Trusteed, péguelas en el
asistente y guarde. Si no las necesita, puede dejar el aviso: el resto del
módulo funciona.

---

## 7. Verificación de la Instalación

### 7.1 Comprobar el estado del módulo

```bash
bin/magento module:status Trusteed_AgenticCommerce
# Esperado: Module is enabled
```

### 7.2 Verificar tablas de la base de datos

Magento 2 no tiene ningún comando de validación de esquema (`doctrine:schema:validate`
pertenece a Doctrine, no a Magento). Compruebe los objetos directamente:

```bash
mysql -u <usuario> -p <bbdd> -e "DESCRIBE trusteed_webhook_outbox;"
mysql -u <usuario> -p <bbdd> -e "SHOW COLUMNS FROM sales_order LIKE 'trusteed_%';"
```

### 7.3 Verificar el endpoint del manifiesto MCP

```bash
curl -sf https://<TU_TIENDA>/.well-known/mcp.json
# Debe devolver un manifiesto JSON cuyas claves de primer nivel incluyan
# schema_version, issuer, merchant_id, store_views, capabilities y signature
```

O deje que el módulo lo compruebe por usted, incluida la reescritura del servidor web:

```bash
bin/magento trusteed:check-webserver
```

No existe ninguna ruta de frontend `/trusteed/...`: el `frontName` de frontend del
módulo es `nlweb`, y `/.well-known/mcp.json` lo sirve un router propio, no un
`frontName`.

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

| Trabajo                  | Programación | Propósito                                                                                                 |
| ------------------------ | ------------ | --------------------------------------------------------------------------------------------------------- |
| `trusteed_webhook_drain` | Cada minuto  | Entrega los webhooks pendientes desde la bandeja de salida a la API de Trusteed con reintento exponencial |
| `trusteed_lag_heartbeat` | Cada minuto  | Emite una métrica de latencia para que el panel de Trusteed pueda alertar sobre retrasos                  |

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

No hay ningún fallback al que recurrir: `paragonie/sodium_compat` no está declarado
como dependencia de este módulo, así que `ext-sodium` tiene que estar presente.
Mientras falte, la verificación del token de agente y la del snapshot de enforcement
devuelven ambas `indeterminate` y ningún agente llega a confirmarse como verificado.
Confirme que está cargada con:

```bash
php -m | grep -i sodium
```

### Los pedidos no aparecen en el panel de Trusteed

```bash
bin/magento dev:di:info Trusteed\\AgenticCommerce\\Observer\\SalesOrderSaveAfter
```

Revise `var/log/system.log` buscando entradas `[trusteed] outbox enqueue` tras
realizar un pedido de prueba.
