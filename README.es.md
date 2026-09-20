[English](README.md) | **Español** | [Français](README.fr.md) | [Deutsch](README.de.md)

# Trusteed Agentic Commerce para Magento 2

Los agentes de IA son un tipo nuevo de comprador online. Con Trusteed, la red que conecta a negocios y agentes, pueden comprar en tu tienda con las condiciones que tú fijes.

- Define tus reglas de negocio: a quién dejas comprar, hasta qué importe, qué categorías no quieres ofrecer a los agentes, límites de precio, niveles de stock que te protejan de agentes fraudulentos, y más.
- Recibe recibos firmados. Cada transacción genera un recibo firmado criptográficamente, en el que cualquier manipulación se detecta, y que te sirve como evidencia de la compra si hay una disputa. Alineado con eIDAS (UE) y eSIGN (EE. UU.).
- Consulta lo que hacen los agentes: cuánto gastan, qué productos compran y con qué frecuencia.
- Bloquea a los agentes que parezcan peligrosos o den problemas.
- Acepta compras en divisas digitales mediante el protocolo X402.
- Deja que agentes y comercios comercien directamente entre pares (peer-to-peer).

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

Cada pedido originado por un agente genera un recibo de confianza firmado. Aparece en **Trusteed → Mis ventas → Recibos de venta** con su estado de verificación y el URI del recibo. Desde ahí puedes abrir el verificador público en `receipts.trusteed.xyz`, o pegar el JWS directamente en la herramienta **Trust Receipts** (ver arriba) para comprobarlo.

## Características

- Endpoint MCP en `/.well-known/mcp-manifest.json`, que las plataformas de agentes de IA descubren automáticamente.
- Cola de salida de webhooks (outbox): entrega fiable de pedidos, envíos y reembolsos al backend de Trusteed, con reintento y backoff automáticos.
- Verificación del token del agente: valida la identidad del agente en cada solicitud de checkout.
- Puerta de aprobación (HITL): aprobación humana (human-in-the-loop) configurable para pedidos de agentes de alto valor.
- Trust Receipts: cada transacción de un agente genera un recibo firmado criptográficamente (Ed25519).
- Panel de administración: un SPA que muestra sesiones de agentes, ventas, reglas y estado de salud.
- Registro de auditoría: cada interacción de un agente queda registrada con su identidad y el veredicto.

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
- Una cuenta de Trusteed ([regístrate gratis en trusteed.xyz](https://trusteed.xyz))

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
   o consulta todas las versiones en la [página de Releases](https://github.com/Trusteedxyz/agentic-commerce-magento/releases).
2. Descomprime en `app/code/Trusteed/AgenticCommerce/`
3. Ejecuta los comandos anteriores desde la raíz de tu Magento

## Configuración

1. Inicia sesión en tu **Panel de Administración** de Magento
2. Ve a **Trusteed → Configuración** (el asistente de configuración)
3. Haz clic en **Conectar con Trusteed →**. El asistente comprueba la conectividad y registra tu tienda
4. Selecciona las vistas de tienda que quieres exponer a los agentes de IA
5. Haz clic en **Guardar**

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

### 1.1.1

- Corrección: la página «Mis Ventas» montaba un placeholder estático (bloque Dashboard + `ventas.phtml`) que nunca llegaba al listado real de TrustReceipts. Ahora monta el SPA de administración real en la sección «Mis Ventas», igual que Reglas y Agentes.
- Bundle del SPA de administración reconstruido.

### 1.1.0

- Corrección: la aplicación de reglas en checkout se saltaba por completo en checkouts orgánicos (sin agente). Reglas del comerciante como monto máximo, países bloqueados y restricciones de horario comercial nunca se ejecutaban salvo que hubiera un DID de agente presente. Estas reglas ahora aplican en todo checkout, con o sin agente.
- Añadido: un evaluador de válvula de seguridad offline que aplica las mismas reglas universales del comerciante localmente cuando la API remota de evaluación de reglas no está disponible, en vez de recurrir solo a una política general de permitir/bloquear todo.
- Corrección de seguridad: el snapshot de enforcement obtenido del backend de Trusteed ahora se verifica criptográficamente (comprobación de firma Ed25519 contra el JWKS publicado) antes de confiar en él, en lugar de decodificarse sin verificación.
- Corrección de seguridad: `EnforcementClient` ya no fabrica una firma `dev-bypass` de relleno cuando el secreto HMAC aún no está configurado. Ahora las solicitudes fallan de forma segura y abierta (`ALLOW`, manteniendo la postura existente de «un conector sin configurar nunca bloquea») con una línea de log distinta para que el equipo de operaciones distinga una instalación a medio configurar de una totalmente sin configurar.
- Se corrigió que el endpoint de soporte «Send diagnostics» llamaba a la ruta de backend incorrecta (`/api/v1/embed/support/report` → `/v1/embed/support/report`).

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
