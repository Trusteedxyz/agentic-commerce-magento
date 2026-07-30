[English](README.md) | **Español** | [Français](README.fr.md) | [Deutsch](README.de.md)

# Trusteed Agentic Commerce para Magento 2

Permite que los nuevos compradores online, los agentes de IA, realicen compras en tu tienda de forma segura y fiable gracias a Trusteed: la red que fomenta la confianza entre negocios y agentes.

- **Define tus reglas de negocio**: a quién permites comprar, hasta qué importe, qué categorías no quieres ofrecer a los agentes, establece límites de precio, mantén niveles de stock para protegerte frente a posibles agentes fraudulentos, y mucho más.
- **Recibos a prueba de manipulaciones**: generamos recibos firmados electrónicamente y criptográficamente invulnerables que sirven como prueba de la transacción real en caso de disputa. Compatible con las normativas eIDAS (UE, Reino Unido) y eSIGN (EE. UU.).
- **Analítica de agentes**: consulta estadísticas sobre las compras de los agentes — cuánto gastan, qué productos compran y con qué frecuencia.
- **Bloqueo de agentes**: bloquea agentes potencialmente peligrosos o problemáticos.
- **Divisas digitales**: habilita compras en divisas digitales gracias al protocolo X402.
- **Transacciones entre pares**: permite el comercio directo entre pares (peer-to-peer) entre agentes y comercios.

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

Cada pedido originado por un agente genera un recibo de confianza firmado, listado en **Trusteed → Mis ventas → Recibos de venta** con su estado de verificación y URI del recibo — enlaza al verificador público en `receipts.trusteed.xyz`, o pega el JWS directamente en la herramienta **Trust Receipts** (ver arriba) para comprobarlo.

## Características

- **Endpoint MCP** en `/.well-known/mcp-manifest.json` — descubierto automáticamente por las plataformas de agentes de IA
- **Cola de salida de webhooks (outbox)** — entrega fiable de pedidos/envíos/reembolsos al backend de Trusteed con reintento y backoff automáticos
- **Verificación del token del agente** — valida la identidad del agente en cada solicitud de checkout
- **Puerta de aprobación (HITL)** — aprobación humana configurable (human-in-the-loop) para pedidos de agentes de alto valor
- **Trust Receipts** — cada transacción de un agente genera un recibo firmado criptográficamente (Ed25519)
- **Panel de administración** — SPA que muestra sesiones de agentes, ventas, reglas y estado de salud
- **Registro de auditoría** — cada interacción de un agente queda registrada con su identidad y el veredicto

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

### Vía Composer (recomendado)

```bash
composer require trusteed/agentic-commerce-magento
bin/magento module:enable Trusteed_AgenticCommerce
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento cache:flush
```

### Carga manual

1. **Descarga el `.zip` instalable** desde la última GitHub Release:
   [**⬇ trusteed-agentic-commerce-magento-1.1.1.zip**](https://github.com/Trusteedxyz/agentic-commerce-magento/releases/latest/download/trusteed-agentic-commerce-magento-1.1.1.zip)
   — o consulta todas las versiones en la [página de Releases](https://github.com/Trusteedxyz/agentic-commerce-magento/releases).
2. Descomprime en `app/code/Trusteed/AgenticCommerce/`
3. Ejecuta los comandos anteriores desde la raíz de tu Magento

## Configuración

1. Inicia sesión en tu **Panel de Administración** de Magento
2. Ve a **Trusteed → Setup Wizard**
3. Introduce tu **API Key** desde [app.trusteed.xyz/settings](https://app.trusteed.xyz/settings)
4. Selecciona las vistas de tienda que quieres exponer a los agentes de IA
5. Haz clic en **Save & Verify** — el asistente comprueba la conectividad y registra tu tienda

### Ajustes avanzados

Navega a **Stores → Configuration → Trusteed → Agentic Commerce**:

| Ajuste | Valor por defecto | Descripción |
|---------|---------|-------------|
| API Base URL | `https://api.trusteed.xyz` | Endpoint del backend de Trusteed |
| Webhook secret version | `1` | Rótalo tras el compromiso de una clave |
| HITL enforcement mode | `observe` | `observe` solo registra; `enforce` bloquea los pedidos por encima del umbral |
| HITL amount threshold | `500.00` | Los pedidos por encima de este valor requieren aprobación humana |
| Agent token TTL | `300` | Antigüedad máxima (en segundos) de un token de agente válido |

## Páginas de administración

Tras la instalación aparece un menú **Trusteed** en la barra lateral del admin de Magento:

| Página | Ruta | Descripción |
|------|------|-------------|
| Dashboard | Trusteed → Dashboard | Vista en tiempo real de las sesiones de agentes |
| Sales | Trusteed → Ventas | Pedidos y recibos originados por agentes |
| Rules | Trusteed → Reglas | Reglas de aplicación (basadas en CEL) |
| Agents | Trusteed → Agentes | Identidades de agentes conectados |
| Security | Trusteed → Seguridad | Registro de auditoría y alertas de anomalías |
| Settings | Trusteed → Ajustes | Configuración del módulo |

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
