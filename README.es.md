[English](README.md) | **Español** | [Français](README.fr.md) | [Deutsch](README.de.md)

# Trusteed Agentic Commerce para Magento 2

Permite que los nuevos compradores online, los agentes de IA, realicen compras en tu tienda de forma segura y fiable gracias a Trusteed: la red que fomenta la confianza entre negocios y agentes.

- **Define tus reglas de negocio**: a quién permites comprar, hasta qué importe, qué categorías no quieres ofrecer a los agentes, establece límites de precio, mantén niveles de stock para protegerte frente a posibles agentes fraudulentos, y mucho más.
- **Recibos a prueba de manipulaciones**: generamos recibos firmados electrónicamente y criptográficamente invulnerables que sirven como prueba de la transacción real en caso de disputa. Compatible con las normativas eIDAS (UE, Reino Unido) y eSIGN (EE. UU.).
- **Analítica de agentes**: consulta estadísticas sobre las compras de los agentes — cuánto gastan, qué productos compran y con qué frecuencia.
- **Bloqueo de agentes**: bloquea agentes potencialmente peligrosos o problemáticos.
- **Divisas digitales**: la red Trusteed liquida los pagos de los agentes sobre el protocolo x402. Este
  módulo no procesa esos pagos por su cuenta: tu checkout de Magento sigue tal cual está hoy; los
  rails se configuran en el lado de Trusteed y se muestran en el panel de administración.
- **Transacciones entre agente y comercio**: los agentes compran en tu tienda a través de la red
  Trusteed, que aporta la identidad, las reglas y el recibo de cada pedido. El cobro sigue pasando
  por los métodos de pago que ya tienes en Magento.

## Capturas de pantalla

| Panel de control | Ventas de agentes | Reglas de negocio |
|-----------|------------|----------------|
| ![Dashboard](docs/screenshots/screenshot-02-dashboard.png) | ![Sales](docs/screenshots/screenshot-04-ventas.png) | ![Rules](docs/screenshots/screenshot-05-rules.png) |

| Agentes | Reglas y opciones | Recibos de confianza |
|--------|----------------|----------------|
| ![Agents](docs/screenshots/screenshot-06-agentes.png) | ![Rules Detail](docs/screenshots/screenshot-07-rules-detail.png) | ![Trust Receipts](docs/screenshots/screenshot-08-trust-receipts.png) |

| Asistente de configuración | Configuración del asistente |
|-------------|-------------|
| ![Setup](docs/screenshots/screenshot-01-setup-wizard.png) | ![Config](docs/screenshots/screenshot-03-setup-wizard-config.png) |

| Ventas IA — Listado de recibos automatizados |
|------------------------------------------------|
| ![Listado de recibos](docs/screenshots/screenshot-09-receipts-list.png) |

Cada pedido originado por un agente genera un recibo de confianza firmado, listado en **Trusteed → Mis ventas → Recibos de venta** con su estado de verificación y su URI. Desde el listado puedes abrir el detalle de un recibo para ver sus campos y copiar el JWS en bruto. Verificar por tu cuenta un JWS cualquiera todavía no tiene un endpoint público dedicado.

## Características

- **Endpoint MCP** en `/.well-known/mcp.json` — descubierto automáticamente por las plataformas de agentes de IA
- **Cola de salida de webhooks (outbox)** — entrega fiable de pedidos/envíos/reembolsos al backend de Trusteed con reintento y backoff automáticos
- **Verificación del token del agente** — valida la identidad del agente en cada solicitud de checkout
- **Puerta de aprobación (HITL)** — cuando salta la regla R043 del backend, el pedido queda retenido a la espera de aprobación humana en vez de enviarse
- **Trust Receipts** — cada transacción de un agente genera un recibo firmado criptográficamente (Ed25519)
- **Panel de administración** — SPA que muestra sesiones de agentes, ventas, reglas y estado de salud
- **Registro de auditoría** — cada interacción de un agente queda registrada con su identidad y el veredicto

## Documentación

- [Guía de instalación](docs/INSTALLATION_GUIDE_ES.md) ([EN](docs/INSTALLATION_GUIDE.md)) — requisitos, instalación, conexión, verificación y resolución de problemas
- [Guía de usuario](docs/USER_GUIDE_ES.md) ([EN](docs/USER_GUIDE.md)) — uso diario del panel de administración y de las reglas de negocio
- [Manual de referencia](docs/REFERENCE_MANUAL_ES.md) ([EN](docs/REFERENCE_MANUAL.md)) — endpoints, rutas de configuración, comandos de consola y modelo de datos

## Compatibilidad

| Versión de Magento | PHP | Estado |
|-----------------|-----|--------|
| Open Source 2.4.7 | 8.2, 8.3 | ✅ Compatible |
| Open Source 2.4.8 | 8.2, 8.3 | ✅ Compatible |
| Adobe Commerce 2.4.7 | 8.2, 8.3 | ✅ Compatible |
| Adobe Commerce 2.4.8 | 8.2, 8.3 | ✅ Compatible |

## Requisitos

- Magento Open Source o Adobe Commerce 2.4.7+
- PHP 8.2 u 8.3
- Una cuenta de Trusteed — [regístrate gratis en trusteed.xyz](https://trusteed.xyz)

## Instalación

### Vía Composer (desde GitHub, aún no publicado en Packagist)

Este paquete **todavía no está publicado en Packagist**, así que Composer no puede
resolverlo solo por su nombre. Añade primero el repositorio al `composer.json` de tu
proyecto Magento:

```json
{
  "repositories": [
    { "type": "vcs", "url": "https://github.com/Trusteedxyz/agentic-commerce-magento" }
  ]
}
```

Después instálalo:

```bash
composer require trusteed/agentic-commerce-magento:^1.2
bin/magento module:enable Trusteed_AgenticCommerce
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento cache:flush
```

### Carga manual

1. **Descarga el `.zip` instalable** desde la
   [**⬇ última GitHub Release**](https://github.com/Trusteedxyz/agentic-commerce-magento/releases/latest)
   — el fichero adjunto se llama `trusteed-agentic-commerce-magento-<versión>.zip`.
   Todas las versiones publicadas están en la [página de Releases](https://github.com/Trusteedxyz/agentic-commerce-magento/releases).
2. Descomprime en `app/code/Trusteed/AgenticCommerce/`
3. Ejecuta los comandos `bin/magento` anteriores desde la raíz de tu Magento

## Configuración

1. Inicia sesión en tu **Panel de Administración** de Magento
2. Ve a **Trusteed → Configuración** (el asistente de configuración)
3. Introduce tu **API Key** desde [trusteed.xyz/dashboard/settings](https://trusteed.xyz/dashboard/settings)
4. Selecciona las vistas de tienda que quieres exponer a los agentes de IA
5. Haz clic en **Save & Verify** — el asistente comprueba la conectividad y registra tu tienda

### Ajustes avanzados

Navega a **Stores → Configuration → Trusteed → Agentic Commerce**:

**API Connection** (`trusteed_general/general`):

| Ajuste | Descripción |
|---------|-------------|
| API Base URL | Endpoint del backend de Trusteed, p. ej. `https://api.trusteed.xyz` |
| Merchant ID | Tu identificador de comercio |
| Integration Token | Cifrado. Autentica esta tienda contra la API de Trusteed |
| Webhook Secret | Cifrado. Verifica las firmas de los webhooks entrantes |
| Internal HMAC Secret | Cifrado. Firma las llamadas internas de heartbeat y administración (`X-Internal-Auth`, HMAC-SHA256); lo provisiona el equipo de operaciones de Trusteed |
| Webhook Secret Version | Increméntalo al rotar el secreto de webhooks |
| Connection ID | Lo emite Trusteed al conectar la tienda; identifica esta tienda en la entrega de webhooks |

**Features** (`trusteed_general/features`):

| Ajuste | Descripción |
|---------|-------------|
| Enable WebMCP Bridge | Inyecta el bridge JavaScript del storefront. Se desactiva solo en temas Hyvä y PWA Studio |
| Enable Phase B (Embedded SPA) | Reservado para una versión futura — déjalo apagado salvo que te lo indique el soporte de Trusteed |

El comportamiento del enforcement (incluida la puerta de aprobación humana R043) no se configura aquí:
lo determinan las reglas que defines en **Trusteed → Mis Reglas** y el snapshot firmado de reglas que
sirve el backend. Los tokens de agente se aceptan con una antigüedad máxima de 330 segundos (más una
tolerancia de 30 segundos sobre `exp`); esta ventana es fija en el conector, no es un ajuste.

## Páginas de administración

Tras la instalación aparece un menú **Trusteed** en la barra lateral del admin de Magento:

| Página | Ruta | Descripción |
|------|------|-------------|
| Inicio | `trusteed/dashboard` | Vista general de las sesiones y la actividad de los agentes |
| ¿Cómo va mi tienda? | `trusteed/health` | Salud de la conexión y puntuación de confianza |
| Mis ventas | `trusteed/ventas` | Pedidos originados por agentes y sus recibos de confianza |
| A quién le vendo | `trusteed/agentes` | Identidades de agente que ha visto tu tienda |
| Mis Reglas | `trusteed/reglas` | Reglas de negocio que se aplican en el checkout |
| Métodos de pago | `trusteed/pagos` | Rails de pago que reporta Trusteed |
| Seguridad | `trusteed/seguridad` | Registro de auditoría y alertas de anomalías |
| Ajustes | `trusteed/ajustes` | Configuración del módulo |
| Configuración | `trusteed/setup/wizard` | Asistente de configuración (conectar o reconectar la tienda) |

## Desinstalación

```bash
bin/magento module:disable Trusteed_AgenticCommerce
bin/magento setup:upgrade
composer remove trusteed/agentic-commerce-magento
```

Para eliminar las tablas de base de datos:

```bash
bin/magento setup:db-declaration:generate-whitelist --module-name=Trusteed_AgenticCommerce
# Then manually drop: trusteed_webhook_outbox
# And columns on sales_order: trusteed_receipt_uri, trusteed_receipt_status
```

## Registro de cambios

### 1.2.1

- **Corregido** — `bin/magento trusteed:check-webserver` devolvía siempre `FAIL`, incluso con un
  manifiesto perfectamente servido. Aceptaba la respuesta solo si traía una clave `mcpVersion` de
  primer nivel; el manifiesto que emite este módulo nunca la ha tenido (la clave de versión es
  `schema_version`), así que la comprobación no podía pasar. A los comercios que seguían la guía de
  instalación se les decía que su webserver estaba mal configurado cuando no lo estaba.
- **Corregido — documentación** — el README anunciaba dos campos de configuración que no existen
  ("modo de enforcement HITL" y "umbral de importe HITL" — R043 no tiene umbral de importe
  configurable), omitía siete que sí existen y daba la ventana del token de agente como 300 segundos
  en vez de 330. La tabla de páginas de administración listaba seis páginas con nombres inventados en
  inglés; son nueve, y el menú está en castellano. El párrafo de los recibos de confianza apuntaba a
  `receipts.trusteed.xyz`, un host que no resuelve, y describía pegar un JWS en una herramienta de
  verificación que no existe. Las viñetas de x402 y de pagos entre pares prometían capacidades que
  este módulo no implementa. Los manuales de `docs/` no estaban enlazados desde ningún sitio, y sus
  secciones de referencia describían una forma de manifiesto, unas rutas de webhook, una política de
  reintentos, un comando de consola y una ruta de frontend que no coincidían con el código.

- **Corregido** — el bundle del panel de administración (`view/adminhtml/web/js/admin-spa.js`) se distribuía sin minificar: 869 KB / 25.064 líneas en vez de los 490 KB / 41 líneas que produce el comando de build documentado. Su procedencia no se podía verificar. Reconstruido desde la fuente.
- **Corregido** — la regla R047 (importe mínimo de aportación) no tenía campo en el panel de administración: sus parámetros existían en el esquema pero solo se podían configurar por API. También: al mostrar el nombre de una categoría del comercio se imprimían los delimitadores anti-inyección (`<<<MERCHANT_CONTENT_START>>> … <<<MERCHANT_CONTENT_END>>>`) alrededor en vez de quitarlos para la visualización.
- **Corregido — documentación** — `USER_GUIDE.md`/`USER_GUIDE_ES.md` describían cinco de las seis filas de la tabla de configuración de reglas con la regla equivocada: le decía al comercio que configurase `R007` para restringir categorías (R007 en realidad bloquea señales de abuso entre comercios) y `R005` como tope de importe (R005 en realidad bloquea agentes revocados). Corregido contra las definiciones reales; se añaden `R030`/`R032`/`R035`/`R042` para que la guía responda lo que el comercio pregunta de verdad. También se retira el claim falso de que R001/R007 "se evalúan siempre localmente" (el evaluador offline resuelve nueve reglas distintas, ninguna es R001 ni R007) y el claim falso de que R007 controla la visibilidad del catálogo vía un atributo `trusteed_agentic_visible` (el atributo real es `is_agentic_visible`, sin relación con ninguna regla CEL).

### 1.2.0

- **Corrección de seguridad** — el verificador de tokens de agente trataba `exp`, `iat` y `nonce` como opcionales. Las dos comprobaciones de tiempo colgaban de `> 0`, así que un token que simplemente OMITÍA el claim se saltaba entera la caducidad y el tope de antigüedad: era válido para siempre. Los tres claims son ahora obligatorios (`nonce` de 16 a 64 caracteres), igual que en el esquema canónico del token y en los demás conectores.
- **Corrección de seguridad** — se ignoraba la ventana de frescura que el snapshot de enforcement lleva FIRMADA (`validUntil`). Un snapshot vencido —servido por la API o por cualquier intermediario que lo cachee— se aplicaba como si estuviera vigente. Magento era el único conector que no lo miraba. Ahora un snapshot vencido se trata como ausente, de modo que se aplica la política de reserva del comerciante. `validUntil` viaja DENTRO del payload firmado, así que nadie puede alargarla; si falta o no se puede leer, no se considera vencido, porque degradar ante un formato inesperado bloquearía compras legítimas.
- **Corrección** — las puntuaciones de confianza con decimal se mostraban como "sin puntuación". La pestaña de Estado leía la puntuación con `is_int()`, y el motor redondea a un decimal, que `json_decode` convierte en un `float` de PHP: `is_int(81.4)` es falso, así que la puntuación se volvía `null` en silencio. Sólo sobrevivían los números enteros. Medido sobre las tiendas de producción el 2026-07-27: 44,7, 52,7, 55,7, 61,5 y 81,4 se mostraban todas como "sin puntuación". Ahora pasa por un único normalizador y se muestra con su decimal (`81.4`, no `81`), igual que en el resto de paneles.
- **Corrección** — la regla R036 (valor máximo por línea) leía su tope de un parámetro llamado `maxCents`; el nombre canónico es `maxCentsPerLine`, y es el único que acepta el esquema estricto del panel del comerciante. Con la clave equivocada la regla no podía dispararse nunca.
- **Novedad** — el conector informa ahora de qué señales de carrito sabe proyectar esta instalación (`POST /api/v1/enforcement/capabilities`, firmado con HMAC, una vez por versión del conjunto de capacidades). Sin eso, una regla cuya señal no llega devuelve `NO_SIGNAL` en cada compra: pasa en silencio, y el comerciante ve una regla en ENFORCE que no bloquea nada. Con el reporte, el panel puede avisarle justo al activarla. Magento proyecta 31 señales —más del doble que cualquier otra plataforma— porque además proyecta el historial del agente, que en las demás resuelve el servidor.

### 1.1.1

- **Corrección** — la página "Mis Ventas" montaba un placeholder estático (bloque Dashboard + `ventas.phtml`) que nunca llegaba al listado real de TrustReceipts. Ahora monta el SPA de administración real en la sección "Mis Ventas", igual que Reglas y Agentes.
- Bundle del SPA de administración reconstruido.

### 1.1.0

- **Corrección** — la aplicación de reglas en checkout se saltaba por completo en checkouts orgánicos (sin agente): reglas del comerciante como monto máximo, países bloqueados y restricciones de horario comercial nunca se ejecutaban salvo que hubiera un DID de agente presente. Estas reglas ahora aplican en todo checkout sin importar la presencia del agente.
- **Añadido** — un evaluador de válvula de seguridad offline que aplica las mismas reglas universales del comerciante localmente cuando la API remota de evaluación de reglas no está disponible, en vez de recurrir solo a una política general de permitir/bloquear todo.
- **Corrección de seguridad** — el snapshot de enforcement obtenido del backend de Trusteed ahora se verifica criptográficamente (comprobación de firma Ed25519 contra el JWKS publicado) antes de confiar en él, en lugar de decodificarse sin verificación.
- **Corrección de seguridad** — `EnforcementClient` ya no fabrica una firma `dev-bypass` de relleno cuando el secreto HMAC aún no está configurado; ahora las solicitudes fallan de forma segura y abierta (`ALLOW`, manteniendo la postura existente de "un conector sin configurar nunca bloquea") con una línea de log distinta para que el equipo de operaciones pueda distinguir una instalación a medio configurar de una totalmente sin configurar.
- Se corrigió que el endpoint de soporte "Send diagnostics" llamaba a la ruta de backend incorrecta (`/api/v1/embed/support/report` → `/v1/embed/support/report`).

### 1.0.0 (2026-06-18)

- Lanzamiento inicial
- Endpoint de manifiesto MCP
- Cola de salida de webhooks con reintento/backoff
- Verificación de token de agente (Ed25519)
- Puerta de aprobación HITL
- Panel de administración SPA

## Soporte

- Correo de soporte: support@trusteed.xyz
- Issues de GitHub: [github.com/Trusteedxyz/agentic-commerce-magento/issues](https://github.com/Trusteedxyz/agentic-commerce-magento/issues)

## Licencia

Open Software License 3.0 (OSL-3.0). Consulta [LICENSE](LICENSE) para el texto completo.
