# Scriptorium Room — layer2 agéntica sobre MCP core

> **Propósito**: cubrir la capa Room que permite mapear un espacio `oasis.tribe.parliament`-like a una sala agéntica operable en layer2.  
> **Archivo foco**: [`MCPGallery/mcp-channels-sdk/ws-server/packages/socket-gym-demo/src/index.ts`](../../MCPGallery/mcp-channels-sdk/ws-server/packages/socket-gym-demo/src/index.ts).  
> **Core de abstracción**: [`MCPGallery/mcp-core-sdk`](../../MCPGallery/mcp-core-sdk/).  
> **Relación previa**: [`Parliament.md`](./Parliament.md), [`ArrakisBoe.md`](./ArrakisBoe.md), [`ECOSYSTEM_OVERVIEW.md`](../ECOSYSTEM_OVERVIEW.md).  
> **Fecha de corte**: 2026-05-02.

---

## 1. Lectura ejecutiva

`Scriptorium Room` es la abstracción que convierte una comunidad deliberativa en una **room agéntica**. Para esta investigación, el acceso a una room equivale funcionalmente a ser **inhabitant** de un espacio Oasis: quien entra en la room puede escuchar, emitir, solicitar capabilities y participar en conversaciones que después pueden condensarse en BOE.

La implementación mínima ya existe como demo:

```ts
import { SocketIoMeshLogics } from '@alephscript/mcp-core-sdk';

const mesh = new SocketIoMeshLogics();
mesh.init(3010);
```

Fuente: [`socket-gym-demo/src/index.ts`](../../MCPGallery/mcp-channels-sdk/ws-server/packages/socket-gym-demo/src/index.ts).

El detalle importante no es el payload de `oasis.parliament`, sino la forma SDK:

```text
Inhabitant / agente / bot / UI
	↓ CLIENT_REGISTER
Socket.IO mesh runtime
	↓ CLIENT_SUSCRIBE
Room = tribu/sesión/obra/turno layer2
	↓ MAKE_MASTER / capabilities
Master agéntico expone acciones GET_* / SET_*
	↓ ROOM_MESSAGE
Conversación layer2 observable
	↓
Firehoses + Conversation Builder
	↓
BOE append-only / summary reintegrable
```

---

## 2. Evidencia directa

### 2.1 Demo mínima

El archivo de foco no implementa lógica de dominio: arranca un `SocketIoMeshLogics` en el puerto `3010`. Esto lo convierte en una **sala vacía pero operable**, apta para que los componentes restantes se registren como inhabitants/masters ([`index.ts`](../../MCPGallery/mcp-channels-sdk/ws-server/packages/socket-gym-demo/src/index.ts)).

### 2.2 `mcp-core-sdk` como core AlephScript

`mcp-core-sdk` se declara como paquete `@alephscript/mcp-core-sdk`, versión `1.3.0`, con exports para server, client, types, utils y vector-db ([`package.json`](../../MCPGallery/mcp-core-sdk/package.json)).

El README de integración lo define como biblioteca core que proporciona:

- `BaseMCPServer`;
- `AlephScriptServer`;
- `AlephScriptClient`;
- transporte WebSocket/Socket.IO para comunicación real-time ([`README-SCRIPTORIUM.md`](../../MCPGallery/mcp-core-sdk/README-SCRIPTORIUM.md)).

### 2.3 Mesh + REST orchestration

`SocketIoMeshLogics` extiende `SocketIoMesh` y añade:

- discovery automático de rooms/capabilities;
- API REST `/mesh/*`;
- invocación de capabilities entre rooms ([`SocketIoMeshLogics.ts`, líneas 1-10](../../MCPGallery/mcp-core-sdk/src/server/SocketIoMeshLogics.ts#L1-L10)).

Endpoints relevantes:

| Endpoint | Función |
|---|---|
| `GET /mesh` | Estado resumido del mesh |
| `GET /mesh/rooms` | Rooms activas |
| `GET /mesh/rooms/:id` | Detalle de una room |
| `GET /mesh/capabilities` | Capabilities expuestas |
| `POST /mesh/invoke/:room` | Invocar capability |
| `GET /mesh/health` | Health check |

Fuente: [`SocketIoMeshLogics.ts`, líneas 60-130](../../MCPGallery/mcp-core-sdk/src/server/SocketIoMeshLogics.ts#L60-L130).

---

## 3. Protocolo Room como inhabitants layer2

### 3.1 Entidades

| Concepto Room | Equivalente Oasis-like | Evidencia |
|---|---|---|
| `SocketClient` registrado | Inhabitant/session | `CLIENT_REGISTER` guarda `usuario` + `sesion` en `sockets` ([`SocketServer.ts`, líneas 129-136](../../MCPGallery/mcp-core-sdk/src/server/SocketServer.ts#L129-L136)). |
| Suscripción a room | Entrada a tribu/sala | `CLIENT_SUSCRIBE` hace `socket.join(args.room)` y actualiza `roomsSockets` ([`SocketServer.ts`, líneas 138-155](../../MCPGallery/mcp-core-sdk/src/server/SocketServer.ts#L138-L155)). |
| Room | Espacio layer2 de deliberación | `rooms` y `roomsSockets` mantienen master y miembros ([`SocketServer.ts`, líneas 26-35](../../MCPGallery/mcp-core-sdk/src/server/SocketServer.ts#L26-L35)). |
| Master | Autoridad/capability provider de la sala | `MAKE_MASTER` declara master de room ([`SocketServer.ts`, líneas 207-213](../../MCPGallery/mcp-core-sdk/src/server/SocketServer.ts#L207-L213)). |
| Capability | Acción invocable en layer2 | `SocketIoMeshLogics` registra capabilities por room y permite `/mesh/invoke` ([`SocketIoMeshLogics.ts`, líneas 147-166](../../MCPGallery/mcp-core-sdk/src/server/SocketIoMeshLogics.ts#L147-L166)). |

### 3.2 Eventos canónicos

El protocolo `MASTER-ROOM` define eventos:

- `CLIENT_REGISTER`;
- `CLIENT_SUSCRIBE`;
- `ROOM_MESSAGE`;
- `MAKE_MASTER`;
- `RELEASE_MASTER`;
- `GET_CAPABILITIES` / `SET_CAPABILITIES`;
- `GET_SERVER_STATE` / `SET_SERVER_STATE` ([`room-protocol.ts`, líneas 70-92](../../MCPGallery/mcp-core-sdk/src/types/room-protocol.ts#L70-L92)).

### 3.3 GET/SET como contrato de capabilities

El servidor trata cualquier evento `GET_*` como petición hacia el master de la room, y cualquier `SET_*` como respuesta hacia el requester o la room ([`SocketServer.ts`, líneas 188-205](../../MCPGallery/mcp-core-sdk/src/server/SocketServer.ts#L188-L205), [`SocketServer.ts`, líneas 362-413](../../MCPGallery/mcp-core-sdk/src/server/SocketServer.ts#L362-L413)).

`BaseRoomManager` formaliza este patrón: registra capabilities, escucha `GET_*`, ejecuta handler y responde con `SET_*` ([`BaseRoomManager.ts`, líneas 72-128](../../MCPGallery/mcp-core-sdk/src/client/BaseRoomManager.ts#L72-L128), [`BaseRoomManager.ts`, líneas 196-235](../../MCPGallery/mcp-core-sdk/src/client/BaseRoomManager.ts#L196-L235)).

---

## 4. Room como layer2 `oasis.tribe.parliament`-like

No definimos aquí protocolos `oasis.parliament`; diseñamos un SDK que permite implementarlos.

La correspondencia conceptual queda así:

| Oasis-like | Room SDK | Función layer2 |
|---|---|---|
| `tribe` | `roomId` | Contenedor de participantes y conversación. |
| `inhabitant` | `CLIENT_REGISTER` + `CLIENT_SUSCRIBE` | Identidad operativa dentro de la sala. |
| `parliament session` | turno/obra/sesión room | Deliberación temporal fuera de main. |
| propuesta / voto / ley | capability `GET_*` + conversación + BOE draft | Acción abstracta implementable por master. |
| estado canónico | `GET /mesh/rooms`, `GET_CAPABILITIES`, BOE | Lectura verificable de participantes/capabilities + registro. |
| cierre/reintegración | `summary_out` / BOE block | Resultado que vuelve a main como entrada append-only. |

La room no tiene que saber qué es una ley de Oasis; basta con que pueda:

1. registrar habitantes;
2. exponer capabilities;
3. transportar mensajes;
4. observar conversación;
5. entregar material a firehose/conversation builder;
6. fijar resumen en BOE.

---

## 5. Conexión con el esquema de ecosistema

`ECOSYSTEM_OVERVIEW.md` ya dibuja el escenario:

- Público desde Twitch/chat;
- Elenco en VS Code/live-coding;
- red de comunicación con Socket.io real-time + Scuttlebutt asíncrono/P2P;
- maquinaria teatral/state machine;
- MCP como capa de inteligencia y herramientas;
- libreto/mitología como base narrativa ([`ECOSYSTEM_OVERVIEW.md`, líneas 3-69](../ECOSYSTEM_OVERVIEW.md#L3-L69)).

La Room es el punto donde ese dibujo se vuelve operable:

```text
Twitch / Telegram / Oasis / VS Code / agentes MCP
	↓
Socket.IO mesh (`SocketIoMeshLogics`)
	↓
Rooms por obra / tribu / turno / sesión
	↓
Masters agénticos con capabilities
	↓
Firehoses y BOE
```

---

## 6. Relación con BOE y Firehose

El BOE no se edita “en vivo” por esta capa. La room produce conversación y acciones; la edición teatral posterior decide qué bloque BOE se conserva y cómo se reintegra.

Relación con los dos documentos previos:

- [`Parliament.md`](./Parliament.md): main/Oasis es append-only y cíclica; layer2 opera rápido y vuelve con mensajes verificables.
- [`ArrakisBoe.md`](./ArrakisBoe.md): BOE registra disposiciones/resúmenes; BDC conversa; Decoherence valida.
- [`Firehose.md`](./Firehose.md): firehoses capturan feeds de participantes y construyen conversaciones mergeables al BOE.

---

## 7. Abstracción SDK propuesta

Esta investigación apunta a un SDK, no a un protocolo cerrado:

### 7.1 Primitivas

| Primitiva | Descripción |
|---|---|
| `RoomMesh` | Wrapper de `SocketIoMeshLogics` con puertos/namespaces y API `/mesh`. |
| `InhabitantSession` | Registro + suscripción de participante, humano o agente. |
| `CapabilityMaster` | Servicio que se declara master de una room y expone `GET_*`. |
| `RoomConversationTap` | Observador que convierte `ROOM_MESSAGE` en eventos de conversación. |
| `FirehoseAdapter` | Adaptador de red/chat/bot hacia eventos normalizados. |
| `BoeConversationBuilder` | Compone bloque BOE a partir de mensajes + evidencias + decisiones. |

### 7.2 Contrato mínimo

```ts
type RoomLayer2Event = {
  roomId: string;
  inhabitantId: string;
  source: 'socket' | 'oasis' | 'telegram' | 'twitch' | 'bothub' | 'atproto';
  kind: 'message' | 'capability_request' | 'capability_result' | 'state' | 'decision';
  payload: unknown;
  timestamp: string;
};
```

Esto permite implementar protocolos `oasis.tribe.parliament` después sin fijarlos ahora.

---

## 8. Observación técnica para alinear implementación

El core canónico usa `ROOM_MESSAGE`:

- servidor escucha `ROOM_MESSAGE` ([`SocketServer.ts`, línea 82](../../MCPGallery/mcp-core-sdk/src/server/SocketServer.ts#L82));
- cliente core emite `ROOM_MESSAGE` ([`SocketClient.ts`, líneas 121-137](../../MCPGallery/mcp-core-sdk/src/client/SocketClient.ts#L121-L137));
- browser client del channels SDK también emite `ROOM_MESSAGE`.

El cliente local de `mcp-mesh-sdk` emite `room` en minúscula ([`mcp-mesh-sdk/src/libs/alephscript-client.ts`, líneas 60-69](../../MCPGallery/mcp-mesh-sdk/src/libs/alephscript-client.ts#L60-L69)). Para el SDK layer2 conviene abstraer el transporte para aceptar/adaptar ambos nombres de evento, sin hacer depender el modelo de room de esta diferencia de implementación.

---

## 9. Resumen operativo

1. `socket-gym-demo` arranca una mesh Room vacía en `3010`.
2. `mcp-core-sdk` aporta protocolo `CLIENT_REGISTER` / `CLIENT_SUSCRIBE` / `ROOM_MESSAGE` / `MAKE_MASTER`.
3. Una room representa el espacio layer2; sus miembros son inhabitants.
4. Un master de room expone capabilities; los demás piden `GET_*` y reciben `SET_*`.
5. Firehoses observan redes/chats/bots y alimentan conversaciones.
6. El teatro edita esas conversaciones y las reintegra en BOE.

