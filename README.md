# 'Arrakis Theater' es un spin-off de la 'Arrakis de SolarNet Hub'

- **La necesidad**: infraestructura cinemática interactiva para sesiones de hackerspace sobre WebRTC o canales stream convencionales compatibles con el *"FRAMEWORK retro 0.5.0"*, la *"alephscript:mcp-mesh:dev/astillero"* y la *"red Scuttlebut Oasis (parte del Kit SolarNet Hub)"*.
- **La solución**: Un MC (master of ceremonies) (MAESTRO_CEREMONIAS.md), un teatro digital (./theater), una obra para representar (RELATO_CANONICO_OASIS42.md) sobre un mapa de misión (MAPA_MISION_RETRO.md).
- **¿Quién participa?**: Hay tres roles:

    - **Habitante de la Casa Arrakis (la de SolarNet Hub)**: preparan y despliegan el teatro. Durante la sesión, monitorizan y operan. Al acabar, recogen el teatro y commitean EL GRAN INDICE y los blogs para los "revisited".
    - **Habitante de la Casa Arrakis Net**: son miembros del Elenco y participaran en la sesión mediante técnicas de LiveSharedCoding aplicando técnicas de programación extrema y otras formas de literatura, lírica y retórica. Consultar lista de IDEs compatibles.
    - **Público: Son "el chat"**; intervendrán en la acción mediante encuestas, comandos, y otras formas comunes de interacción desde el chat.
- **¿Cuándo, cómo, cuánto...?**: Todos los viernes con horario indefinido a través de ARRAKIS_NET (mirar carteles para info de donde están los repos para arrakis, los guiones para el elenco, y los escenarios para el público). Dinámica: El maestro de ceremonias conduce la sesión, **la Casa Arrakis** en las sombras, **el Elenco** en pantalla y **el público** en el chat.

---

## Addenda — Los 4 roles sobre el escenario layer2

> **Fuente DRY**: [SCRIPTORIUM/Parliament.md](SCRIPTORIUM/Parliament.md), [SCRIPTORIUM/ScriptorioumRoom.md](SCRIPTORIUM/ScriptorioumRoom.md), [SCRIPTORIUM/Firehose.md](SCRIPTORIUM/Firehose.md), [SCRIPTORIUM/ArrakisBoe.md](SCRIPTORIUM/ArrakisBoe.md), [SCRIPTORIUM/Future-machine.md](SCRIPTORIUM/Future-machine.md).
> Esta addenda no reabre el diseño: cristaliza un ejemplo concreto de **una sesión de viernes** sobre la layer2 Scriptorium, mapeando los roles ya definidos (MC, Casa Arrakis, Elenco, Público) a payloads SSB reales y al BOE.

### A. Mapa de roles · clásicos ↔ layer2

| Rol clásico Arrakis Theater | Rol layer2 Scriptorium | Identidad técnica | Evidencia |
|---|---|---|---|
| **Habitante Casa Arrakis** (sombras) | Pub / snapshotter / notario | `pub.escrivivir.co` con `ssb-admin publish-json` | [Parliament.md §1.2 / §6](SCRIPTORIUM/Parliament.md), `OASIS_PUB/tools/ssb-admin.js` L109-L140 |
| **Maestro de Ceremonias** | Master de la Room agéntica | `MAKE_MASTER` sobre Socket.IO mesh (puerto 3010) | [ScriptorioumRoom.md §3.1](SCRIPTORIUM/ScriptorioumRoom.md) |
| **Habitante Casa Arrakis Net (Elenco)** | Inhabitants firmantes | feed `@...ed25519` + `CLIENT_REGISTER` + `CLIENT_SUSCRIBE` | [Parliament.md §2.4](SCRIPTORIUM/Parliament.md), [ScriptorioumRoom.md §3.1](SCRIPTORIUM/ScriptorioumRoom.md) |
| **Público (el chat)** | Firehoses de participantes | `firehose.atproto.raw`, `bothub.telegram.msg`, `room.message`, chats de stream | [Firehose.md §1-§2](SCRIPTORIUM/Firehose.md) |

### B. Ejemplo trabajado · sesión de viernes “votación de obra siguiente”

Caso de uso: el Elenco propone una obra para el viernes siguiente. La sesión debe **devolver a Oasis** algo que el ciclo político de la main entienda, sin saltarse las ventanas 7/15/60.

#### B.1 `snapshot_in` (Casa Arrakis prepara el teatro)

La Casa Arrakis pide al pub un snapshot SSB con claves de mensaje y hashes. Mínimo extraído desde el feed:

| Tipo SSB | Campo de interés | Origen |
|---|---|---|
| `pub` | `address.key`, `host`, `port` | anuncio del propio pub |
| `tribe` | `tribeId` de la Casa Arrakis Net, `members`, `inviteMode` | `tribes_model.js` L52-L78 |
| `parliamentTerm` | `termId`, `method`, `powerType/Id`, `startAt`, `endAt` | `parliament_model.js` L1086-L1137 |
| `parliamentProposal` (abiertas) | `proposalId`, `voteId`, `deadline` | `parliament_model.js` L696-L703 |

Resultado: `snapshot_in.hash` queda firmado y entra como bloque #0 del BOE de la sesión.

#### B.2 Apertura de Room (MC entra en escena)

```text
MC                    →  MAKE_MASTER  room=arrakis-viernes-2026-05-08
Elenco (cada feed)    →  CLIENT_REGISTER + CLIENT_SUSCRIBE
Casa Arrakis (bots)   →  registran capabilities GET_BOE / SET_BOE
Público (firehose)    →  buffers raw conectados, sin voto aún
```

Bloque BOE #0:

```json
{
  "version": "scriptorium-boe/0.1",
  "session_id": "arrakis-viernes-2026-05-08",
  "obra_id": "votacion-obra-siguiente",
  "snapshot_in": { "hash": "sha256:...", "termId": "...", "tribeId": "..." },
  "rules": { "method": "DEMOCRACY", "ttl_session": "tarde-viernes" }
}
```

#### B.3 Acción en sesión (Elenco + Público)

- **Elenco** propone 3 obras candidatas → cada propuesta entra como `entries[]` del BOE con `evidenceHash` del mensaje fuente.
- **Público (firehose)** reacciona en chats/Telegram → la `Conversation Builder` selecciona qué pasa a pieza ([Firehose.md §2.4](SCRIPTORIUM/Firehose.md)).
- **MC** invoca capability `vote.tally` sobre la Room (efímero).
- Future-machine acumula vector → corpus → grafo → **universo** (la obra elegida con su sinopsis solidificada).

Todo esto vive en TTL = sesión. Si no cristaliza, se evapora.

#### B.4 `summary_out` y retorno a Oasis (Casa Arrakis recoge el teatro)

La Casa Arrakis valida con Decoherence (BOE ↔ conversación ↔ artefacto) y publica **tres salidas** en cascada de menor a mayor acoplamiento político ([Parliament.md §6.C](SCRIPTORIUM/Parliament.md)):

1. **Notaría cross-Scriptorium** — `ssb-admin publish-json` con payload `scriptorium-boe`:
     ```json
     {
       "version": "scriptorium-boe/0.1",
       "obra_id": "votacion-obra-siguiente",
       "summary_out": { "obra_elegida": "...", "votes": 7, "hash_boe": "sha256:..." },
       "signatures": ["@elenco1...", "@elenco2...", "@mc..."],
       "target_main_action": "tribe-content"
     }
     ```
2. **Registro comunitario** — `tribe-content` con `contentType: 'feed'` o `'forum'` en la tribu Casa Arrakis Net (`tribes_content_model.js` L100-L143). Aquí queda el rastro narrativo.
3. **Activación política** *(opcional, solo si toca)* — `parliamentProposal` o `votes` de tribu si la decisión debe pasar por el ciclo main de 7/15/60 días (`parliament_model.js` L682-L703, `votes_model.js` L144-L182).

#### B.5 Lo que NO se hace

Conforme a [Parliament.md §5](SCRIPTORIUM/Parliament.md):

- **No** se publica `parliamentLaw` desde la layer2: la promulgación es competencia exclusiva del cierre de término en la main.
- **No** se reescriben tips: si hay corrección, se usa `replaces` o `tombstone` como hace ya el modelo SSB.
- **No** se asume ciclo interno completo de gobernanza de tribu (`tribeParliamentTerm` aparece como superficie parcial).

### C. Lectura del escenario

| Plano | Quién lo sostiene | TTL | Payload canónico |
|---|---|---|---|
| Sombras (preparación / cierre / commit) | Casa Arrakis | sesión + commit a EL GRAN INDICE | `scriptorium-boe`, git |
| Pantalla (deliberación viva) | MC + Elenco | sesión (volátil) | `ROOM_MESSAGE`, capabilities |
| Chat (presión y feedback) | Público vía firehoses | cursor de stream | `firehose.*`, `bothub.*`, `room.message` |
| Radicoma (memoria que sobrevive) | Pub Oasis/SSB | append-only, ciclos 7/15/60 días | `tribe-content`, `parliamentProposal`, `votes`, `scriptorium-boe` |

Regla resumen: **lo que no pasa por `summary_out` firmado y publicado al pub no existe en Oasis**. El viernes siguiente, la sesión empieza otra vez por `snapshot_in`.