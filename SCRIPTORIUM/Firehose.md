# Firehose — feeds de participantes hacia conversaciones BOE

> **Propósito**: cubrir la capa de firehoses como puntos de entrada de mensajes de participantes para operar en layer2 y construir conversaciones mergeables al BOE.  
> **Archivo foco**: [`MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts`](../../MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts).  
> **Firehose ampliado**: [`MCPGallery/mcp-mesh-sdk/src/MCPBotHubServer.ts`](../../MCPGallery/mcp-mesh-sdk/src/MCPBotHubServer.ts) como bridge BotHubSDK/Telegram/IACM.  
> **Escenario**: [`ECOSYSTEM_OVERVIEW.md`](../ECOSYSTEM_OVERVIEW.md).  
> **Fecha de corte**: 2026-05-02.

---

## 1. Lectura ejecutiva

En esta investigación, **firehose** no significa solo “Bluesky AT Protocol”. Significa **punto de ingestión de mensajes de participantes** que Scriptorium puede recibir desde:

- redes federadas/P2P;
- AT Protocol/Bluesky;
- BotHubSDK/Telegram;
- chats de stream;
- rooms Socket.IO;
- otros bots/agentes MCP.

La función de la capa firehose es alimentar una conversación layer2 que después el teatro edita y condensa en BOE:

```text
Firehose externo / chat / bot / room
	↓
Normalización de eventos
	↓
Buffer / cursor / estado incremental
	↓
Conversation Builder
	↓
Bloque BOE editable
	↓
BOE final reintegrable
```

No se definen ahora los protocolos `oasis.parliament`; se diseña un SDK capaz de implementarlos luego.

---

## 2. Evidencia: MCPFirehoseServer

### 2.1 Pipeline AT Protocol actual

`MCPFirehoseServer` se presenta como “Bluesky AT Protocol Firehose + ONFALO CDR Labeling”. Su pipeline declarada:

```text
Jetstream WebSocket → Quality Filter → ONFALO Autoetiquetado → Ring Buffer
```

Fuente: [`MCPFirehoseServer.ts`, líneas 1-11](../../MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts#L1-L11).

### 2.2 Servicios internos

El servidor compone:

- `FirehoseConsumerService` para Jetstream;
- `FirehoseFilterEngine` para filtrado;
- `OntaloLabelerService` para etiquetado;
- `BlueskyAuthService` para publicar/responder en Bluesky;
- `AlephScriptClient` para mesh Socket.IO, hoy inicialización comentada ([`MCPFirehoseServer.ts`, líneas 13-20](../../MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts#L13-L20), [`MCPFirehoseServer.ts`, líneas 44-83](../../MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts#L44-L83)).

### 2.3 Buffers

El servidor mantiene dos buffers:

| Buffer | Uso |
|---|---|
| `labeledBuffer` | Posts etiquetados con ONFALO/CDR. |
| `rawBuffer` | Eventos filtrados sin etiquetar, pensados para delegación downstream / Node-RED. |

Fuente: [`MCPFirehoseServer.ts`, líneas 28-36](../../MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts#L28-L36).

### 2.4 Raw mode para downstream

El handler activo en constructor es `handleFirehoseEventNoProcessing`: filtra evento, resuelve handle DID→handle y empuja el evento crudo filtrado a `rawBuffer`, incrementando cursor monotónico ([`MCPFirehoseServer.ts`, líneas 76-82](../../MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts#L76-L82), [`MCPFirehoseServer.ts`, líneas 202-224](../../MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts#L202-L224)).

Esta forma es relevante para Scriptorium: permite que la capa de edición/conversación viva fuera del firehose.

### 2.5 Tools MCP relevantes

`MCPFirehoseServer` registra tools para:

- arrancar/parar/reanudar firehose;
- configurar modo `STREAM`, `N_FIRST`, `N_FIRST_INTERVAL`;
- obtener raw events con cursor incremental;
- obtener stats;
- obtener posts etiquetados;
- etiquetar texto on-demand;
- configurar reglas de filtro;
- publicar/responder en Bluesky si hay credenciales ([`MCPFirehoseServer.ts`, sección `setupTools`](../../MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts#L283-L681)).

La tool clave para layer2 es `firehose_get_raw`: devuelve eventos filtrados por `limit` y `since`, con `cursor` para polling incremental ([`MCPFirehoseServer.ts`, líneas 398-443](../../MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts#L398-L443)).

### 2.6 Resources MCP

Expone resources:

- `firehose://status`;
- `firehose://labeled/recent`;
- `firehose://labeled/top-quality`;
- `firehose://filter/rules` ([`MCPFirehoseServer.ts`, líneas 686-750](../../MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts#L686-L750)).

---

## 3. Evidencia: BotHub como firehose Telegram/IACM

### 3.1 BotHub también es firehose

`MCPBotHubServer` expone BotHubSDK como servidor MCP para Telegram/IACM. Su patrón declarado:

```text
RuntimeEmitter → Store<BaseRuntimeState> → MCP tools read/write the store
```

Fuente: [`MCPBotHubServer.ts`, líneas 1-11](../../MCPGallery/mcp-mesh-sdk/src/MCPBotHubServer.ts#L1-L11).

Para esta abstracción, BotHub es un firehose porque recibe mensajes de chat, comandos e IACM desde Telegram/mock/apps y los mantiene en store persistente.

### 3.2 Persistencia de mensajes

El servidor crea `FileMessageStore` en `ARCHIVO/PLUGINS/BOT_HUB_SDK/data/messages.json` y conecta `RuntimeEmitter` al store ([`MCPBotHubServer.ts`, líneas 126-150](../../MCPGallery/mcp-mesh-sdk/src/MCPBotHubServer.ts#L126-L150)).

### 3.3 Mesh room `bothub_ROOM`

BotHub inicializa un mesh client, se registra, se suscribe a `bothub_ROOM`, se declara master con features `BOTHUB_*` y reenvía eventos runtime a la room como `BOTHUB_EVENT` ([`MCPBotHubServer.ts`, líneas 157-210](../../MCPGallery/mcp-mesh-sdk/src/MCPBotHubServer.ts#L157-L210)).

### 3.4 Tools MCP de interés firehose

Tools relevantes para layer2:

- `bothub_boot`: arranca bot Telegram/mock;
- `bothub_status`: estado runtime;
- `bothub_broadcast`: emite a chats;
- `bothub_list_chats`: lista chats tracked;
- `bothub_send_iacm`: construye mensaje IACM;
- `bothub_parse_iacm`: parsea IACM desde texto;
- `bothub_get_messages`: obtiene mensajes recientes con cursor incremental;
- `bothub_get_chat_history`: historial por chat ([`MCPBotHubServer.ts`, sección `setupTools`](../../MCPGallery/mcp-mesh-sdk/src/MCPBotHubServer.ts#L229-L611)).

La tool clave equivalente a firehose es `bothub_get_messages`: entrega mensajes con `since_cursor`, `nextCursor`, `total` y `hasMore` ([`MCPBotHubServer.ts`, líneas 451-471](../../MCPGallery/mcp-mesh-sdk/src/MCPBotHubServer.ts#L451-L471)).

### 3.5 Resources MCP

BotHub expone:

- `bothub://state/current`;
- `bothub://logs/recent`;
- `bothub://messages/recent`;
- `bothub://apps/registry`;
- `bothub://iacm/reference` ([`MCPBotHubServer.ts`, líneas 613-707](../../MCPGallery/mcp-mesh-sdk/src/MCPBotHubServer.ts#L613-L707)).

---

## 4. Firehose como adaptador de participantes

### 4.1 Concepto

Un firehose es cualquier fuente con estas propiedades:

1. emite mensajes/eventos de participantes;
2. permite cursor o snapshot incremental;
3. conserva origen/canal/autor;
4. puede normalizarse a evento layer2;
5. puede alimentar una conversación editable;
6. no decide por sí solo qué entra al BOE final.

### 4.2 Contrato abstracto

```ts
type FirehoseEvent = {
  source: 'atproto' | 'telegram' | 'twitch' | 'oasis' | 'socket-room' | 'bothub' | 'other';
  channelId: string;
  participantId: string;
  participantHandle?: string;
  text?: string;
  payload: unknown;
  cursor?: string | number;
  timestamp: string;
  evidenceRef?: string;
};
```

### 4.3 Implementaciones ya visibles

| Implementación | Fuente | Cursor/buffer | Salida útil |
|---|---|---|---|
| `MCPFirehoseServer` | AT Protocol Jetstream | `rawBufferCursor`, `rawBuffer` | Eventos filtrados crudos o posts CDR etiquetados. |
| `MCPBotHubServer` | Telegram/BotHubSDK/IACM | `since_cursor`, store messages | Mensajes chat + IACM parseable. |
| Room mesh | Socket.IO `ROOM_MESSAGE` | observable por room | Eventos de inhabitants/capabilities. |
| Network BOE | Oasis/Scuttlebutt | feed `scriptorium-boe` | BOE remoto mergeable. |

---

## 5. De firehose a conversación BOE

La capa de edición queda fuera de scope, pero la tipología queda definida:

```text
1. Captura
   - firehose_get_raw
   - bothub_get_messages
   - ROOM_MESSAGE tap
   - Oasis feed

2. Normalización
   - source
   - participantId
   - room/channel
   - timestamp
   - payload/text
   - evidenceRef

3. Construcción de conversación
   - agrupar por room/obra/turno
   - ordenar por timestamp/cursor
   - marcar intervenciones de inhabitants
   - detectar decisiones/propuestas/acuerdos

4. Edición teatral
   - fuera de scope de este documento
   - produce bloque BOE revisable

5. Reintegración
   - BOE local append-only
   - Network `scriptorium-boe`
   - resumen verificable hacia main
```

Esta secuencia encaja con [`ArrakisBoe.md`](./ArrakisBoe.md): BDC conversa, BOE registra, Decoherence valida, Network sincroniza.

---

## 6. Relación con Room layer2

Firehose y Room se complementan:

| Room | Firehose |
|---|---|
| Define espacio layer2 y acceso de inhabitants. | Recibe flujos de mensajes de esos inhabitants o canales externos. |
| Expone capabilities con masters. | Alimenta conversation builder con evidencias. |
| Opera en tiempo real Socket.IO. | Puede operar en streaming, polling o batch. |
| Se parece a tribu/sesión/parliament. | Se parece a feed/log de participación. |
| No decide BOE por sí sola. | Tampoco decide BOE; suministra material. |

En términos Oasis-like:

```text
inhabitants entran a Room
	↓
participan por chat/bot/red/capability
	↓
firehoses capturan intervenciones
	↓
conversation builder ordena y contextualiza
	↓
teatro edita bloque BOE
	↓
BOE se reintegra/sincroniza
```

---

## 7. Encaje con `ECOSYSTEM_OVERVIEW.md`

El esquema activo ya define:

- Público: Twitch Chat;
- Actores: Developers / live-coders;
- Escenario: VS Code;
- Red: Socket.io tiempo real + Scuttlebutt asíncrono/P2P;
- Maquinaria teatral: state machine + agente retro;
- Protocolo MCP;
- Libreto y mitología ([`ECOSYSTEM_OVERVIEW.md`, líneas 3-69](../ECOSYSTEM_OVERVIEW.md#L3-L69)).

Firehose ocupa el borde entre **Público/Actores/Red** y **BOE**:

```text
Twitch Chat ─┐
Telegram  ───┼─> Firehose adapters ─> Conversation Builder ─> BOE
ATProto   ───┤
Oasis     ───┤
Rooms     ───┘
```

---

## 8. SDK layer2: piezas necesarias

### 8.1 `FirehoseAdapter`

Interfaz para fuentes heterogéneas:

```ts
interface FirehoseAdapter {
  id: string;
  source: FirehoseEvent['source'];
  start(): Promise<void>;
  stop(): Promise<void>;
  poll(cursor?: string | number): Promise<{ events: FirehoseEvent[]; cursor?: string | number }>;
}
```

### 8.2 `ConversationBuilder`

Agrupa eventos por room/obra/turno:

```ts
type ConversationBlock = {
  roomId: string;
  obraId?: string;
  turnoId?: string;
  fromCursor?: string | number;
  toCursor?: string | number;
  participants: string[];
  events: FirehoseEvent[];
  summaryDraft?: string;
  evidenceHash?: string;
};
```

### 8.3 `BoeMergeTarget`

Destino abstracto para reintegración:

```ts
type BoeMergeTarget = {
  kind: 'local-boe' | 'scriptorium-boe' | 'tribe-content' | 'parliamentProposal';
  targetId: string;
  payload: unknown;
  evidenceHash: string;
};
```

---

## 9. Observaciones de implementación

1. `MCPFirehoseServer` tiene mesh `IcariaBot` preparado pero comentado en constructor; hoy su vía estable es MCP tools/resources y buffers internos ([`MCPFirehoseServer.ts`, líneas 76-82](../../MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts#L76-L82), [`MCPFirehoseServer.ts`, líneas 124-174](../../MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts#L124-L174)).
2. `MCPBotHubServer` sí conecta a mesh si `BOTHUB_MESH_ENABLED !== "false"` y emite runtime events a `bothub_ROOM` ([`MCPBotHubServer.ts`, líneas 157-210](../../MCPGallery/mcp-mesh-sdk/src/MCPBotHubServer.ts#L157-L210)).
3. El core Room usa `ROOM_MESSAGE`; el cliente local de `mcp-mesh-sdk` usa `room` en minúscula. Para el SDK conviene encapsular ambos transportes en un adapter común, como se anotó en [`ScriptorioumRoom.md`](./ScriptorioumRoom.md#8-observación-técnica-para-alinear-implementación).
4. El modo raw de Firehose evita acoplar ingesta con edición: Scriptorium puede decidir después si etiqueta, resume, descarta o convierte a BOE.

---

## 10. Resumen operativo

1. Firehose captura feeds de participantes, no legisla.
2. BotHub es también firehose cuando actúa como puente Telegram/IACM.
3. Room define quién puede participar y qué capabilities operan.
4. Conversation Builder transforma eventos en conversación ordenada.
5. La edición teatral produce el bloque BOE final.
6. Network/Oasis reintegra el BOE como `scriptorium-boe` o el target que toque.

