# Guía de Usuario — Trusteed Agentic Commerce para Magento 2

Versión 1.0.0

---

## Tabla de Contenidos

1. [Descripción General](#1-descripción-general)
2. [Cómo Funciona el Comercio con Agentes IA](#2-cómo-funciona-el-comercio-con-agentes-ia)
3. [Panel de Administración](#3-panel-de-administración)
4. [Mis ventas](#4-mis-ventas)
5. [A quién le vendo](#5-a-quién-le-vendo)
6. [Mis Reglas](#6-mis-reglas)
7. [Métodos de pago](#7-métodos-de-pago)
8. [Seguridad](#8-seguridad)
9. [Ajustes](#9-ajustes)
10. [Trust Receipts (Recibos de Confianza)](#10-trust-receipts-recibos-de-confianza)
11. [Ver Pedidos de Agentes en el Magento Estándar](#11-ver-pedidos-de-agentes-en-el-magento-estándar)
12. [Comprender la Insignia de Trust Receipt](#12-comprender-la-insignia-de-trust-receipt)
13. [HITL — Aprobaciones Humanas en el Proceso](#13-hitl--aprobaciones-humanas-en-el-proceso)
14. [Preguntas Frecuentes](#14-preguntas-frecuentes)

---

## 1. Descripción General

Trusteed Agentic Commerce conecta su tienda Magento con asistentes de compras IA
como Claude, ChatGPT y otros agentes compatibles con MCP. Cuando un cliente le pide
a su asistente IA que "compre un widget azul en [su tienda]", el agente:

1. Descubre su tienda a través del manifiesto MCP en `/.well-known/mcp.json`
2. Navega por su catálogo y añade artículos al carrito
3. Valida el pedido con sus reglas (límites de precio, agentes permitidos, umbrales HITL)
4. Completa la compra y recibe un Trust Receipt firmado criptográficamente

Cada paso queda registrado, es auditable y controlable desde el menú **Trusteed**
del administrador.

---

## 2. Cómo Funciona el Comercio con Agentes IA

```
Cliente → Agente IA → Descubrimiento MCP → Su Tienda Magento
                              ↓
                    Motor de Reglas Trusteed
                              ↓
                    Pedido Creado en Magento
                              ↓
                    Trust Receipt (firmado)
```

**Conceptos clave:**

| Término | Significado |
|---------|-------------|
| **Agente** | Un asistente IA (Claude, ChatGPT, etc.) que actúa en nombre de un cliente |
| **MCP** | Model Context Protocol — el estándar abierto que los agentes usan para interactuar con tiendas |
| **Trust Receipt** | Prueba firmada criptográficamente de cada transacción de agente (Ed25519) |
| **Regla** | Una restricción definida por el comerciante (valor máximo, agentes permitidos, umbral HITL) |
| **HITL** | Human-in-the-Loop — los pedidos por encima de un umbral requieren su aprobación manual |
| **Modo de cumplimiento** | `observe` = solo registrar; `enforce` = bloquear pedidos que infrinjan reglas |

---

## 3. Panel de Administración

**Ruta:** Trusteed → Inicio

El panel es su punto de partida. Muestra:

- **Estado de conexión** — banner verde que confirma que su tienda está conectada a Trusteed
- **Store ID** — su identificador único en la red Trusteed
- **Accesos rápidos** — atajos a las cuatro secciones principales

### Estados del banner de conexión

| Banner | Significado |
|--------|-------------|
| Verde "Your store is connected" | La tienda está activa y recibiendo tráfico de agentes |
| Amarillo "Connection pending" | El Asistente de Configuración no se ha completado — vaya a Trusteed → Configuración |
| Rojo "Store disconnected" | Credenciales de API no válidas o API de Trusteed inaccesible |

---

## 4. Mis ventas

**Ruta:** Trusteed → Mis ventas

Esta sección muestra todos los pedidos realizados por agentes IA en su tienda. Tiene cuatro pestañas:

### Pestaña My orders (Mis pedidos)

Lista los pedidos realizados por agentes con:
- Número de pedido (enlaza a la vista de pedido estándar de Magento)
- Identidad del agente (plataforma IA + cliente)
- Total del pedido
- Estado del Trust Receipt (PENDING / ISSUED / VERIFIED)
- Fecha

Los pedidos realizados por agentes aparecen aquí **y** en la lista estándar de
**Ventas → Pedidos**. Son pedidos normales de Magento y siguen su flujo de
cumplimiento habitual.

### Pestaña AI sales (Ventas IA)

Métricas agregadas: ingresos totales de pedidos de agentes, valor medio de pedido,
productos más comprados por agentes.

### Pestaña Keys (Claves)

Claves API emitidas a plataformas IA para acceder al endpoint MCP de su tienda.
Cada clave está vinculada a una plataforma de agente específica y puede revocarse
individualmente.

### Pestaña Audit (Auditoría)

Registro de auditoría por pedido que muestra cada evaluación de regla, verificación
de token y decisión de cumplimiento para cada pedido de agente.

---

## 5. A quién le vendo

**Ruta:** Trusteed → Agentes

Gestione qué agentes IA tienen permitido comprar en su tienda.

### Lista de agentes

Muestra todos los agentes que han accedido a su tienda, con:
- DID del agente (identificador descentralizado)
- Plataforma (Claude, ChatGPT, etc.)
- Primera visita / última visita
- Estado (Permitido / Bloqueado)
- Número de pedidos

### Bloquear un agente

Haga clic en cualquier fila de agente y cambie el interruptor de **Estado** a
**Bloqueado**. El agente recibirá una decisión `BLOCK` en su próximo intento de
pedido. Los pedidos completados existentes no se ven afectados.

### Niveles de identidad del agente

| Nivel | Descripción |
|-------|-------------|
| `verified` | El agente presentó un token de identidad criptográfica válido |
| `unverified` | El agente se identificó pero el token no pudo verificarse criptográficamente |
| `anonymous` | No se presentó identidad de agente |

Puede configurar niveles mínimos de confianza en **Mis Reglas**.

---

## 6. Mis Reglas

**Ruta:** Trusteed → Reglas

Las reglas definen cómo se evalúan los pedidos de agentes antes de realizarse.
Cada regla puede estar en modo `observe` (solo registrar) o `enforce` (bloquear infracciones).

### Reglas comunes

| Código | Nombre | Descripción |
|--------|--------|-------------|
| R001 | Identidad de agente requerida | Rechaza agentes anónimos |
| R005 | Importe máximo de pedido | Bloquea pedidos por encima de un umbral configurado |
| R007 | Categorías de productos permitidas | Restringe qué categorías pueden comprar los agentes |
| R011 | Guardia de abandono de carrito | Marca patrones sospechosos de abandono de carrito |
| R022 | Guardia de abuso de reintentos | Limita la frecuencia de reintentos de pedido por agente |
| R043 | Umbral HITL | Envía pedidos por encima de un valor para revisión humana en lugar de aprobación automática |

### Modos de regla

- **Observe**: la regla evalúa y registra su veredicto, pero nunca bloquea un pedido.
  Úselo al desplegar inicialmente una regla para entender su impacto antes de aplicarla.
- **Enforce**: la regla bloquea o escala los pedidos que la infringen.

### Cambiar una regla al modo enforce

1. Navegue a **Trusteed → Reglas**
2. Haga clic en la regla que desea aplicar
3. Cambie **Modo** de `observe` a `enforce`
4. Haga clic en **Guardar**

> **Consejo:** Comience con todas las reglas en modo `observe` durante al menos 7 días.
> Revise el registro de auditoría en **Mis ventas → Audit** para entender cuántos
> pedidos se habrían visto afectados antes de cambiar a `enforce`.

---

## 7. Métodos de pago

**Ruta:** Trusteed → Métodos de pago

Configure el orden en que Trusteed intenta cobrar los pedidos de agentes:

1. **Método principal** — se intenta primero (p. ej., protocolo de micropago x402)
2. **Método alternativo** — se intenta si el principal falla (p. ej., tarjeta guardada)

Cuando un agente realiza un pedido, Trusteed intenta el método principal. Si falla,
pasa al siguiente método en la secuencia. Si todos los métodos fallan, el pedido no
se crea.

> **Para cambiar el orden de sus métodos de pago**, contacte con el soporte de Trusteed
> en support@trusteed.xyz o acceda al portal principal en trusteed.xyz/dashboard.

---

## 8. Seguridad

**Ruta:** Trusteed → Seguridad

La página de Seguridad le ofrece visibilidad y control sobre quién accede a su tienda.

### Registro de auditoría

Un registro cronológico de cada interacción de agente:
- Marca temporal
- Identidad del agente
- Acción (navegar / añadir al carrito / pago / cobro)
- Resultado de la evaluación de reglas (ALLOW / BLOCK / ESCALATE)
- ID de Trust Receipt (para pedidos completados)

### Alertas de anomalías

Trusteed monitoriza los patrones de comportamiento de los agentes y le alerta cuando:
- Un agente intenta pedidos de valor inusualmente alto
- El mismo agente reintenta un pedido bloqueado múltiples veces
- Una plataforma de agente desconocida intenta acceder

### Estado de webhooks

Muestra la salud del pipeline de entrega de webhooks:
- Profundidad de la bandeja de salida (entregas pendientes)
- Marca temporal de la última entrega exitosa
- Tasa de errores de entrega

---

## 9. Ajustes

**Ruta:** Trusteed → Ajustes

### Modo de fallo del sistema de cumplimiento

Controla qué sucede cuando la API de Trusteed es temporalmente inaccesible:

| Modo | Comportamiento |
|------|----------------|
| `observe` | Si la API está caída, todos los pedidos se permiten. Las infracciones se registran retroactivamente. Use en entornos de bajo riesgo. |
| `enforce` | Si la API está caída, todos los pedidos de agentes se bloquean. Use en entornos de alto valor o regulados. |

Las reglas de nivel 1 (R001, R007) siempre se evalúan localmente, incluso cuando
la API es inaccesible, independientemente de esta configuración.

---

## 10. Trust Receipts (Recibos de Confianza)

**Ruta:** Trust Receipts → Verify Receipt

Los Trust Receipts son pruebas firmadas criptográficamente de las transacciones de
agentes. Usan firmas Ed25519 (RFC 8037) y son emitidos por la API de Trusteed tras
cada pedido de agente exitoso.

### Qué contiene un Trust Receipt

- ID y monto del pedido
- Identidad del agente (DID)
- Identidad del comerciante
- Marca temporal
- Método de pago utilizado
- Firma criptográfica

### Verificar un recibo

1. Navegue a **Trust Receipts → Verify Receipt**
2. Pegue la cadena JWS del recibo del cliente
3. Haga clic en **Verify**

Resultados:
- **VERIFIED** — la firma es válida; el recibo es auténtico e inalterado
- **INVALID** — la firma no coincide; el recibo puede haber sido alterado
- **INDETERMINATE** — la verificación no pudo completarse (p. ej., endpoint JWKS inaccesible)

### Auto-Test

**Trust Receipts → Self-Test** ejecuta la suite de conformidad integrada contra su
instalación para confirmar que el verificador funciona correctamente.

### Registro de Auditoría

**Trust Receipts → Audit Log** muestra cada intento de verificación con el veredicto,
la latencia y el usuario administrador que realizó la verificación.

---

## 11. Ver Pedidos de Agentes en el Magento Estándar

Los pedidos de agentes son pedidos normales de Magento y aparecen en
**Ventas → Pedidos** junto a los pedidos realizados por humanos. Se distinguen por:

- La etiqueta **Trusteed** en la columna de origen del pedido
- El campo `trusteed_receipt_uri` visible en la página de detalle del pedido

Usted tramita, factura y envía los pedidos de agentes exactamente como cualquier
otro pedido. Cuando envíe un pedido, Trusteed es notificado automáticamente
a través de la bandeja de salida de webhooks.

---

## 12. Comprender la Insignia de Trust Receipt

En la página de detalle del pedido (**Ventas → Pedidos → [Pedido]**), una insignia
de Trust Receipt muestra el estado del recibo:

| Insignia | Significado |
|----------|-------------|
| **PENDING** | Pedido creado; recibo aún no emitido por Trusteed |
| **ISSUED** | Recibo emitido y URI almacenada en el pedido |
| **VERIFIED** | El recibo ha sido verificado a través del verificador de Trust Receipts |

La insignia enlaza directamente a la página Trust Receipts → Verify Receipt con
el URI del recibo pre-rellenado.

---

## 13. HITL — Aprobaciones Humanas en el Proceso

Cuando la regla **R043** está activa en modo `enforce` y un pedido de agente supera
su umbral HITL configurado, el pedido no se crea automáticamente. En su lugar:

1. El agente recibe una respuesta de "aprobación del comerciante pendiente"
2. El pedido aparece en **Trusteed → Mis ventas** con estado **HITL_PENDING**
3. Usted recibe una notificación en la campana de notificaciones del administrador

### Aprobar un pedido pendiente

1. Abra **Trusteed → Mis ventas**
2. Haga clic en el pedido con estado **HITL_PENDING**
3. Revise los detalles del pedido y la identidad del agente
4. Haga clic en **Aprobar** para crear el pedido, o en **Rechazar** para cancelarlo

Los pedidos aprobados siguen el procesamiento normal de pedidos de Magento.
Los pedidos rechazados quedan registrados en el historial de auditoría y el
agente es notificado.

### Configurar el umbral HITL

El umbral se configura en el panel de su cuenta de Trusteed en
[trusteed.xyz/dashboard/agent-trust](https://trusteed.xyz/dashboard/agent-trust).
Se aplica globalmente a todas las plataformas que se conectan a su tienda.

---

## 14. Preguntas Frecuentes

**P: ¿Los pedidos de agentes cuentan para mis análisis e informes de Magento?**

Sí. Los pedidos de agentes son pedidos estándar de Magento y aparecen en todos los
informes estándar (Ventas → Informes, Business Intelligence, etc.).

**P: ¿Pueden los agentes aplicar códigos de descuento?**

Solo los códigos de descuento que hayan sido explícitamente incluidos en la lista
permitida de sus reglas de Trusteed. Por defecto, los agentes no pueden aplicar
cupones arbitrarios (regla R009).

**P: ¿Qué ocurre con los pedidos de agentes si Trusteed está caído?**

Depende de su configuración de **Modo de fallo del sistema de cumplimiento**
(consulte Ajustes). En modo `observe`, los pedidos se procesan normalmente. En
modo `enforce`, los pedidos de agentes se bloquean hasta que se restaure la
conectividad.

**P: ¿Puedo limitar qué productos pueden comprar los agentes?**

Sí — configure la regla **R007 (Categorías de productos permitidas)** en **Mis Reglas**.

**P: ¿Cómo se gestionan los pagos de los agentes?**

Los agentes pagan usando los métodos configurados en **Métodos de pago**. El método
más común es el protocolo de micropago x402, que permite a los agentes pagar en
nombre de los clientes usando credenciales de pago preautorizadas.

**P: ¿Se comparten los datos de mis clientes con los agentes IA?**

No. Los agentes reciben información de productos y precios, pero nunca datos
personales (PII) de los clientes. Los datos de confirmación del pedido se
proporcionan al agente tras una compra exitosa, limitados a lo necesario para
que el cliente reciba su confirmación de compra.

**P: ¿Cómo puedo abrir un caso de soporte?**

Envíe un correo a support@trusteed.xyz con su Store ID (visible en
**Trusteed → Inicio**), el ID de pedido o URI del Trust Receipt, y una descripción
del problema.
