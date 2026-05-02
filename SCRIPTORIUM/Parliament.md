# VERSION BORRADOR (ESTA SECCIÓN ESTÁ SUBSUMIDA, CONTRASTAR CON CÓDIGO REAL, V 0.7.4)

====== Parliament (Government system) =====

===== Introduction =====

[[:socialnet/overview|OASIS]] contains its own Parliament, a self-regulated and participatory system that governs the internal political organization of the network.

{{ :socialnet:oasis-parliament.png?nolink&600 |}}

The main idea behind this implementation is **to experiment with decentralized governance and collective decision-making**, allowing OASIS inhabitants to organize, propose, and vote on laws through different democratic or autocratic methods.

The Parliament represents __the social pulse of the network__ — an evolving simulation of power distribution, influence, and collaboration between individuals and tribes.

===== How Parliament works (rules) =====

- **Cycles**: Elections are resolved every 2 months; candidatures are continuous and reset when a new government is chosen.

- **Candidatures**: Any inhabitant may propose themself, another inhabitant, or any tribe. Each inhabitant can propose up to 3 candidatures per cycle; duplicates in the same cycle are rejected.

- **Election**: The winner is the candidature with the most votes at resolution time.

- **Ties**: Tie-break order — highest inhabitant karma; if tied, oldest profile; if still tied, earliest proposal; then lexicographic by ID.

- **Fallback**: If no one votes, the latest proposed candidature wins. If there are no candidatures, a random tribe is selected.

- **Government view**: The Government tab shows the current government and its statistics.

- **Forms of government include**:

     * Anarchy (simple majority)
     * Democracy (50%+1)
     * Majority (80%)
     * Minority (20%)
     * Karmatocracy (highest-karma proposals)
     * Dictatorship (instant approval)

- **Anarchy**: Anarchy is the default mode. If no candidature is elected at resolution, Anarchy is proclaimed. Under Anarchy, any inhabitant can propose laws.

- **Proposals**: If you are the ruling inhabitant or part of the ruling tribe, you can publish law proposals. Non-dictatorship methods create a public voting process.

- **Proposal limit**: Each inhabitant may publish at most 3 law proposals per cycle.

- **Laws**: When a proposal reaches its approval threshold, it becomes a Law and appears in the Laws tab with its enactment date.

- **Revocations**: Any approved law can be revocate using current goverment method ruling.

- **Historical**: The Historical tab displays every past government cycle and information about its management.

- **Leaders**: The Leaders tab contains a ranking of inhabitants or tribes that have governed (or stood as candidates), ordered by efficiency.

===== Government methods =====

The Parliament **can operate under multiple systems of governance**. Each form defines how decisions are made, how power is distributed, and how proposals become law.

==== Anarchy ====

{{ :socialnet:anarchy.png?nolink&200 |}}

**Default mode of OASIS governance.**
If no valid government is elected, Anarchy is proclaimed.
In this state, __any inhabitant can propose laws__, and decisions emerge organically through open participation.

==== Minority ====

{{ :socialnet:minority.png?nolink&200 |}}

__A system where 20% approval is sufficient for a proposal to become law.__
Encourages experimentation and agility, allowing minority voices to shape the network’s direction.

==== Democracy ====

{{ :socialnet:democracy.png?nolink&200 |}}

__Requires a 50% + 1 majority for decisions to pass.__
Balances fairness and inclusivity, making it the standard method for collaborative governance in OASIS.

==== Majority ====

{{ :socialnet:majority.png?nolink&200 |}}

__Demands an 80% consensus for approval.__
This form promotes strong collective alignment and long-term stability over rapid change.

==== Karmatocracy ====

{{ :socialnet:karmatocracy.png?nolink&200 |}}

__Power is weighted by karma, rewarding social contribution and reputation__.
Proposals backed by high-karma inhabitants or tribes gain precedence, making influence a measurable and dynamic factor.

==== Dictatorship ====

{{ :socialnet:dictatorship.png?nolink&200 |}}

In Dictatorship, __the elected ruler can instantly approve laws without a public vote__.
It is a high-risk, high-efficiency mode that tests the resilience and trust of the community.

===== Purpose =====

The Parliament of [[:socialnet/overview|OASIS]] is not merely a governance mechanic — **it is a social experiment in collective intelligence and digital democracy**.

By enabling multiple political systems to coexist and evolve, the Parliament __allows the community to observe the consequences of governance choices in real time__: how consensus emerges, how influence circulates, and how stability or chaos arises from collective behavior.

Ultimately, its purpose is to mirror human political diversity in a digital ecosystem — to learn how communities self-organize, distribute power, and maintain balance without central authority.

# VERSIÓN V2

## V2.0 — Índice DRY de evidencia: Pub.Tribes.Parliament y ciclos de tiempo en Oasis 0.7.4

> **Objetivo de esta sección**: indexar evidencia verificable —no mover ni copiar la implementación— para entender cómo se conectan `Pub`, `Tribes`, `Parliament` y los ciclos temporales de Oasis 0.7.4. Este índice prepara la interfaz conceptual para una futura **layer2 Scriptorium/Arrakis BOE**: extraer estado de Oasis main, operar fuera de la main y devolver un resumen verificable.
>
> **Convención DRY**: cada bloque apunta a rutas canónicas. Las rutas absolutas sirven como referencia de workspace; los enlaces relativos sirven para navegar desde este archivo dentro del Scriptorium.

### 0. Filtro agéntico local aplicado

- En `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort` no aparece material agéntico local tipo `.github/`, `CLAUDE.md`, `AGENTS.md`, `*.agent.md` o `*.instructions.md`.
- La fuente Scriptorium-local de integración es `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\README-SCRIPTORIUM.md` ([relativo](../../BlockchainComPort/README-SCRIPTORIUM.md)), que ya define Oasis como submódulo Scuttlebutt para sincronización de BOEs.
- El pub específico de Scriptorium vive en `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\OASIS_PUB` ([relativo](../../BlockchainComPort/OASIS_PUB/README.md)).
- El puente agéntico Scriptorium existente está en `.github/plugins/network/` y `ARCHIVO/PLUGINS/NETWORK/`:
  - `C:\Users\aleph\OASIS\aleph-scriptorium\.github\plugins\network\docs\README.md` ([relativo](../../.github/plugins/network/docs/README.md))
  - `C:\Users\aleph\OASIS\aleph-scriptorium\.github\plugins\network\agents\network.agent.md` ([relativo](../../.github/plugins/network/agents/network.agent.md))
  - `C:\Users\aleph\OASIS\aleph-scriptorium\ARCHIVO\PLUGINS\NETWORK\README.md` ([relativo](../../ARCHIVO/PLUGINS/NETWORK/README.md))

### 1. Índice de fuentes canónicas

#### 1.1 Oasis core: backend, Parliament, Tribes, feeds y mensajes

1. `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\src\backend\backend.js`  
     [Router/backend principal](../../BlockchainComPort/src/backend/backend.js). Evidencia clave:
     - `ensureTerm()` y `runSweepOnce()` conectan navegación/estado con resolución de término y barrido de propuestas ([líneas 51-76](../../BlockchainComPort/src/backend/backend.js#L51-L76)).
     - `GET /parliament` compone la vista con gobierno, candidaturas, propuestas, leyes, histórico, leaders y revocaciones ([líneas 1458-1527](../../BlockchainComPort/src/backend/backend.js#L1458-L1527)).
     - `GET /tribe/:tribeId?section=governance` conecta gobernanza de tribu con Parliament global ([líneas 1698-1716](../../BlockchainComPort/src/backend/backend.js#L1698-L1716)).
     - Endpoints de entrada a Parliament: candidaturas, votos, propuestas, cierre, resolución y revocaciones ([líneas 3510-3608](../../BlockchainComPort/src/backend/backend.js#L3510-L3608)).
     - Endpoints de entrada a Tribes/feed/votations ([líneas 3185-3305](../../BlockchainComPort/src/backend/backend.js#L3185-L3305)).
     - Endpoints de feed público (`/feed`) y acciones de microfeed ([líneas 1922-1938](../../BlockchainComPort/src/backend/backend.js#L1922-L1938), [líneas 2991-3016](../../BlockchainComPort/src/backend/backend.js#L2991-L3016)).
     - Endpoints de chats y mensajes de chat ([líneas 2178-2222](../../BlockchainComPort/src/backend/backend.js#L2178-L2222), [líneas 3886-3960](../../BlockchainComPort/src/backend/backend.js#L3886-L3960)).

2. `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\src\models\parliament_model.js`  
     [Máquina de estado de Parliament](../../BlockchainComPort/src/models/parliament_model.js). Evidencia clave:
     - Constantes temporales: `TERM_DAYS = 60`, `PROPOSAL_DAYS = 7`, `REVOCATION_DAYS = 15` ([líneas 6-9](../../BlockchainComPort/src/models/parliament_model.js#L6-L9)).
     - Lectura y publicación SSB: `publishMsg`, `createLogStream`, `createUserStream`, `listByType` ([líneas 47-134](../../BlockchainComPort/src/models/parliament_model.js#L47-L134)).
     - Ciclo electoral: candidaturas, desempates, archivado, resolución y término ([líneas 340-382](../../BlockchainComPort/src/models/parliament_model.js#L340-L382), [líneas 1070-1154](../../BlockchainComPort/src/models/parliament_model.js#L1070-L1154)).
     - Propuestas, votos, barrido y leyes ([líneas 471-791](../../BlockchainComPort/src/models/parliament_model.js#L471-L791), [líneas 1014-1061](../../BlockchainComPort/src/models/parliament_model.js#L1014-L1061)).
     - Governanza interna de tribu: `tribeParliamentCandidature`, `tribeParliamentRule` y lectura de `tribeParliamentTerm` ([líneas 1192-1329](../../BlockchainComPort/src/models/parliament_model.js#L1192-L1329)).

3. `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\src\models\tribes_model.js`  
     [Modelo de Tribes](../../BlockchainComPort/src/models/tribes_model.js). Evidencia clave:
     - Payload raíz `type: 'tribe'` con miembros, invites, privacidad, subtribu y autor ([líneas 52-78](../../BlockchainComPort/src/models/tribes_model.js#L52-L78)).
     - Invitaciones, membresía y rotación/distribución de claves ([líneas 83-171](../../BlockchainComPort/src/models/tribes_model.js#L83-L171), [líneas 196-236](../../BlockchainComPort/src/models/tribes_model.js#L196-L236), [líneas 368-414](../../BlockchainComPort/src/models/tribes_model.js#L368-L414)).
     - Actualización append-only vía `replaces` y borrado vía `tombstone` ([líneas 242-264](../../BlockchainComPort/src/models/tribes_model.js#L242-L264), [líneas 438-450](../../BlockchainComPort/src/models/tribes_model.js#L438-L450)).

4. `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\src\models\tribes_content_model.js`  
     [Contenido interno de Tribes](../../BlockchainComPort/src/models/tribes_content_model.js). Evidencia clave:
     - Tipos válidos: `event`, `task`, `report`, `votation`, `forum`, `forum-reply`, `market`, `job`, `project`, `media`, `feed`, `pixelia` ([línea 5](../../BlockchainComPort/src/models/tribes_content_model.js#L5)).
     - Payload `type: 'tribe-content'` con `tribeId`, `contentType`, estado, deadline, votos, refeeds, opiniones y autor ([líneas 100-143](../../BlockchainComPort/src/models/tribes_content_model.js#L100-L143)).
     - Actualización por `replaces` y eliminación por `tombstone` ([líneas 151-193](../../BlockchainComPort/src/models/tribes_content_model.js#L151-L193), [líneas 196-204](../../BlockchainComPort/src/models/tribes_content_model.js#L196-L204)).

5. `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\src\models\feed_model.js`  
     [Microfeed público](../../BlockchainComPort/src/models/feed_model.js). Evidencia clave:
     - Payload `type: "feed"` con texto, autor, fecha, tags y menciones ([líneas 105-122](../../BlockchainComPort/src/models/feed_model.js#L105-L122)).
     - Acciones `type: "feed-action"`: `refeed`, `vote`, `comment` ([líneas 150-161](../../BlockchainComPort/src/models/feed_model.js#L150-L161), [líneas 190-200](../../BlockchainComPort/src/models/feed_model.js#L190-L200), [líneas 379-384](../../BlockchainComPort/src/models/feed_model.js#L379-L384)).

6. `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\src\models\votes_model.js`  
     [Votaciones genéricas](../../BlockchainComPort/src/models/votes_model.js). Evidencia clave:
     - Payload `type: 'votes'` con pregunta, opciones, deadline, votos, total, voters, tags, estado y timestamps ([líneas 144-175](../../BlockchainComPort/src/models/votes_model.js#L144-L175)).
     - Votar crea `tombstone` del tip anterior y publica un reemplazo con `replaces` ([líneas 270-310](../../BlockchainComPort/src/models/votes_model.js#L270-L310)).

7. `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\src\models\chats_model.js`  
     [Chats persistidos en SSB](../../BlockchainComPort/src/models/chats_model.js). Evidencia clave:
     - Payload `type: "chat"` con miembros, invites, estado, tags, autor y opcional `tribeId` ([líneas 163-190](../../BlockchainComPort/src/models/chats_model.js#L163-L190)).
     - Payload `type: "chatMessage"` con `chatId`, autor, fecha, texto/imagen y cifrado opcional por tribu/chat ([líneas 454-503](../../BlockchainComPort/src/models/chats_model.js#L454-L503)).
     - Rate limit: máximo 3 mensajes por hora por autor y chat ([líneas 459-467](../../BlockchainComPort/src/models/chats_model.js#L459-L467)).

#### 1.2 Pub de Scriptorium: salida/entrada de red

1. `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\OASIS_PUB\README.md`  
     [Diseño del PUB OASIS SCRIPTORIUM](../../BlockchainComPort/OASIS_PUB/README.md). Define `pub.escrivivir.co`, servicios, endpoints de panel y flujo de deploy.

2. `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\OASIS_PUB\docker-compose.pub.yml`  
     [Stack del pub](../../BlockchainComPort/OASIS_PUB/docker-compose.pub.yml). Evidencia clave:
     - `oasis-pub`: servidor Oasis/SSB, puerto SSB 8008, datos `.ssb` persistentes ([líneas 4-32](../../BlockchainComPort/OASIS_PUB/docker-compose.pub.yml#L4-L32)).
     - `pub-panel-api`: API local de estado/logs/restart, protegida por token ([líneas 35-56](../../BlockchainComPort/OASIS_PUB/docker-compose.pub.yml#L35-L56)).
     - `pub-web`: Caddy/HTTPS para web pública ([líneas 59-77](../../BlockchainComPort/OASIS_PUB/docker-compose.pub.yml#L59-L77)).

3. `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\OASIS_PUB\config\ssb\config`  
     [Config SSB del pub](../../BlockchainComPort/OASIS_PUB/config/ssb/config). Evidencia clave:
     - `pub: true`, `local: false`, conexiones públicas por SHS y `external: "pub.escrivivir.co"` ([líneas 7-35](../../BlockchainComPort/OASIS_PUB/config/ssb/config#L7-L35)).
     - Seed/autofollow hacia `solarnethub.com` ([líneas 21-22](../../BlockchainComPort/OASIS_PUB/config/ssb/config#L21-L22), [líneas 53-62](../../BlockchainComPort/OASIS_PUB/config/ssb/config#L53-L62)).

4. `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\OASIS_PUB\tools\ssb-admin.js`  
     [CLI admin SSB](../../BlockchainComPort/OASIS_PUB/tools/ssb-admin.js). Evidencia clave:
     - Comandos: `whoami`, `invite.create`, `publish-about`, `announce-pub`, `follow`, `publish-json` ([líneas 64-75](../../BlockchainComPort/OASIS_PUB/tools/ssb-admin.js#L64-L75)).
     - `announce-pub` publica `type: 'pub'` con `address.key`, `host`, `port` ([líneas 109-124](../../BlockchainComPort/OASIS_PUB/tools/ssb-admin.js#L109-L124)).
     - `publish-json` permite inyectar payload JSON arbitrario al feed SSB del pub ([líneas 135-140](../../BlockchainComPort/OASIS_PUB/tools/ssb-admin.js#L135-L140)).

5. `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\OASIS_PUB\panel-api\src\server.mjs`  
     [Panel API](../../BlockchainComPort/OASIS_PUB/panel-api/src/server.mjs). Evidencia clave:
     - `GET /public/status` devuelve estado público mínimo ([líneas 137-157](../../BlockchainComPort/OASIS_PUB/panel-api/src/server.mjs#L137-L157)).
     - `GET /api/pub/status`, `GET /api/pub/logs`, `POST /api/pub/restart` son endpoints privados con bearer token ([líneas 160-184](../../BlockchainComPort/OASIS_PUB/panel-api/src/server.mjs#L160-L184)).

#### 1.3 Scriptorium Network: forma propuesta de BOE sobre Oasis

1. `C:\Users\aleph\OASIS\aleph-scriptorium\BlockchainComPort\README-SCRIPTORIUM.md`  
     [Integración Aleph Scriptorium ↔ Oasis Network](../../BlockchainComPort/README-SCRIPTORIUM.md). Contiene formato de mensaje `scriptorium-boe` y flujo publicar/recibir BOE.

2. `C:\Users\aleph\OASIS\aleph-scriptorium\.github\plugins\network\docs\README.md`  
     [Plugin Network docs](../../.github/plugins/network/docs/README.md). Define sincronización de BOEs entre Scriptoriums por Oasis/Scuttlebutt.

3. `C:\Users\aleph\OASIS\aleph-scriptorium\.github\plugins\network\prompts\publicar-boe.prompt.md`  
     [Publicar BOE](../../.github/plugins/network/prompts/publicar-boe.prompt.md). Serializa entradas locales a `scriptorium-boe`.

4. `C:\Users\aleph\OASIS\aleph-scriptorium\.github\plugins\network\prompts\recibir-boe.prompt.md`  
     [Recibir BOE](../../.github/plugins/network/prompts/recibir-boe.prompt.md). Lee feed Oasis, filtra por `scriptorium-boe` y fusiona por `hash`.

5. `C:\Users\aleph\OASIS\aleph-scriptorium\.github\plugins\network\prompts\sincronizar-boe.prompt.md`  
     [Sincronizar BOE](../../.github/plugins/network/prompts/sincronizar-boe.prompt.md). Describe publicación + recepción bidireccional.

### 2. Lectura funcional: cómo se relacionan Pub, Tribes, Parliament y tiempo

#### 2.1 Pub no gobierna: transporta y replica

En el código inspeccionado, `OASIS_PUB` no implementa reglas parlamentarias propias. Es un nodo SSB/Oasis público con identidad, invite, estado, logs y publicación JSON. Su papel en la big picture es de **puerta de red**:

- anuncia la identidad del pub (`type: 'pub'`);
- permite crear invites reales cuando hay host público utilizable;
- mantiene un `.ssb` persistente;
- puede publicar payloads SSB vía `ssb-admin.js publish-json`;
- replica mensajes con peers según config SSB.

Para layer2: el pub es buen candidato a **notario/snapshotter** de Scriptorium, pero esa función todavía no aparece como endpoint específico; habría que construirla encima de lectura de log + `publish-json` o de un servicio nuevo.

#### 2.2 Tribes son contenedores sociales persistidos en SSB

Una tribu es un mensaje SSB `type: 'tribe'` con:

- `members`, `invites`, `inviteMode`;
- `isAnonymous` para privacidad efectiva;
- `parentTribeId` para subtribus;
- `author`, `createdAt`, `updatedAt`;
- actualización append-only por `replaces` y borrado por `tombstone`.

El contenido de tribu no reutiliza el payload raíz de la tribu: cuelga de `type: 'tribe-content'` y discrimina por `contentType`. Para layer2, esta es la vía natural para devolver resúmenes de sesión a una comunidad concreta sin tocar Parliament: `contentType: 'feed'`, `forum`, `votation`, `task`, etc.

#### 2.3 Parliament global es una máquina temporal de términos

Parliament global usa ciclos explícitos:

- término de gobierno: 60 días;
- ventana de propuesta: 7 días;
- ventana de revocación: 15 días.

El backend llama a `ensureTerm()` y `runSweepOnce()` al construir estado de Parliament. Si no hay término activo, `resolveElection()` crea uno. Si el término expiró, antes de elegir el siguiente se ejecuta `enactApprovedChanges()`: las propuestas aprobadas se convierten en `parliamentLaw`, y las revocaciones aprobadas tombstonean leyes.

Punto importante frente al borrador V0.7.4: en esta implementación, una propuesta que alcanza umbral queda `APPROVED` durante el término; la emisión de `parliamentLaw` ocurre al resolver el ciclo vencido, no necesariamente en el instante exacto del umbral.

#### 2.4 Candidaturas: Inhabitants o Tribes pueden entrar al gobierno global

`proposeCandidature()` resuelve el candidato como:

- `inhabitant` si es feed ID `@...ed25519` o nombre resoluble por `about`;
- `tribe` si coincide con una tribu existente.

Restricciones funcionales:

- métodos candidatos válidos: `DEMOCRACY`, `MAJORITY`, `MINORITY`, `DICTATORSHIP`, `KARMATOCRACY`;
- `ANARCHY` no se propone como método; aparece como fallback cuando no hay candidatura ganadora;
- cada proposer puede crear hasta 3 candidaturas por ciclo;
- no se admiten duplicados abiertos del mismo target en el ciclo;
- el voto de candidatura se registra actualizando la candidatura con `votes + 1` y `voters`.

El desempate de elección es: votos, karma, antigüedad de perfil/tribu, fecha de propuesta y orden lexicográfico de ID. Si hay candidaturas pero nadie vota, gana la candidatura más reciente. Si no hay candidaturas, se proclama `ANARCHY`.

#### 2.5 Gobierno de tribu: “parliament-lite” interno y puente al Parliament global

La sección `governance` de una tribu lee:

- término interno `tribeParliamentTerm` si existe;
- candidaturas internas `tribeParliamentCandidature`;
- reglas internas `tribeParliamentRule`;
- término global actual para saber si la tribu ya publicó candidatura global en ese ciclo.

Lo contrastado en código:

- existen rutas para publicar candidatura interna, votar candidatura interna y añadir/borrar reglas;
- existe ruta para que una tribu publique candidatura al Parliament global;
- no aparece, en los tramos inspeccionados, un resolvedor completo que publique `tribeParliamentTerm`; la UI/modelo lo lee, pero las escrituras localizadas son candidaturas y reglas. Por tanto, para layer2 conviene tratar la gobernanza interna de tribu como **superficie parcial** salvo que otra fuente del código complete el ciclo.

### 3. Ciclo temporal canónico de Parliament

1. **Estado inicial o término expirado**  
     `ensureTerm()` pide término actual. Si no existe uno activo, llama `resolveElection()`.

2. **Candidaturas abiertas dentro del ciclo**  
     El inicio de ciclo es `term.startAt`; si aún no hay término, se usa `now - 60 días`. Este corte controla límite de 3 candidaturas y duplicados.

3. **Resolución de elección**  
     Si el término anterior expiró, primero se promulgan cambios aprobados. Luego se elige candidatura ganadora, se crea `parliamentTerm` con `startAt = now` y `endAt = now + 60 días`, y se tombstonean candidaturas abiertas.

4. **Gobierno activo**  
     Puede proponer quien cumpla `canPropose()`:
     - en `ANARCHY`, cualquiera;
     - si gobierna un `inhabitant`, solo ese feed;
     - si gobierna una `tribe`, cualquier miembro de esa tribu.

5. **Propuestas**  
     Cada proposer puede usar hasta 3 slots por término, contando propuestas y leyes publicadas por ese proposer en el término. En métodos con votación (`DEMOCRACY`, `MAJORITY`, `MINORITY`, `ANARCHY`) se crea además un payload `votes` con deadline a 7 días.

6. **Barrido de propuestas y revocaciones**  
     `sweepProposals()` revisa expiraciones, umbrales y métodos especiales:
     - `DICTATORSHIP`: aprueba al expirar;
     - `KARMATOCRACY`: elige por karma del proposer al expirar;
     - métodos por voto: aprueba si alcanza umbral o cierra/rechaza al vencimiento.

7. **Promulgación**  
     Las propuestas `APPROVED` se convierten en `parliamentLaw` al cerrar el término. Las revocaciones `APPROVED` publican `tombstone` contra la ley y se marcan `ENACTED`.

### 4. Índice de payloads observados para feed/mensajes de red

| Payload SSB | Uso funcional | Campos índice | Fuente DRY |
|---|---|---|---|
| `pub` | Anuncio de pub SSB | `address.key`, `host`, `port` | [`ssb-admin.js`](../../BlockchainComPort/OASIS_PUB/tools/ssb-admin.js#L109-L124) |
| `tribe` | Comunidad/Tribe principal | `title`, `description`, `members`, `invites`, `inviteMode`, `isAnonymous`, `parentTribeId`, `author` | [`tribes_model.js`](../../BlockchainComPort/src/models/tribes_model.js#L52-L78) |
| `tribe-keys` | Distribución/rotación de claves de tribu | `tribeId`, `generation`, `memberKeys` | [`tribes_model.js`](../../BlockchainComPort/src/models/tribes_model.js#L196-L236) |
| `tribe-content` | Feed/evento/tarea/votación/foro/media dentro de una tribu | `tribeId`, `contentType`, `title`, `description`, `status`, `deadline`, `votes`, `refeeds`, `opinions`, `author` | [`tribes_content_model.js`](../../BlockchainComPort/src/models/tribes_content_model.js#L100-L143) |
| `feed` | Microfeed público | `text`, `author`, `createdAt`, `tags`, `mentions` | [`feed_model.js`](../../BlockchainComPort/src/models/feed_model.js#L105-L122) |
| `feed-action` | Acción sobre microfeed | `action`, `root`, `category`, `text`, `author`, `createdAt` | [`feed_model.js`](../../BlockchainComPort/src/models/feed_model.js#L150-L200), [`comment`](../../BlockchainComPort/src/models/feed_model.js#L379-L384) |
| `votes` | Votación genérica usada también por Parliament | `question`, `options`, `deadline`, `votes`, `totalVotes`, `voters`, `tags`, `status` | [`votes_model.js`](../../BlockchainComPort/src/models/votes_model.js#L144-L175) |
| `parliamentCandidature` | Candidatura global de habitante o tribu | `targetType`, `targetId`, `targetTitle`, `method`, `votes`, `voters`, `proposer`, `status` | [`parliament_model.js`](../../BlockchainComPort/src/models/parliament_model.js#L641-L664) |
| `parliamentTerm` | Gobierno global activo/histórico | `method`, `powerType`, `powerId`, `winnerVotes`, `totalVotes`, `startAt`, `endAt` | [`ANARCHY`](../../BlockchainComPort/src/models/parliament_model.js#L1086-L1105), [`winner`](../../BlockchainComPort/src/models/parliament_model.js#L1122-L1137) |
| `parliamentProposal` | Propuesta de ley | `title`, `description`, `method`, `termId`, `proposer`, `status`, `deadline`/`voteId` | [`parliament_model.js`](../../BlockchainComPort/src/models/parliament_model.js#L696-L703) |
| `parliamentLaw` | Ley promulgada al cierre de ciclo | `question`, `description`, `method`, `proposer`, `termId`, `voteId`, `votes`, `proposalId`, `enactedAt` | [`parliament_model.js`](../../BlockchainComPort/src/models/parliament_model.js#L1029-L1044) |
| `parliamentRevocation` | Revocación de ley | `lawId`, `title`, `reasons`, `method`, `termId`, `voteId`, `status` | [`parliament_model.js`](../../BlockchainComPort/src/models/parliament_model.js#L558-L603) |
| `tribeParliamentCandidature` | Candidatura interna de tribu | `tribeId`, `candidateId`, `method`, `votes`, `voters`, `proposer`, `status` | [`parliament_model.js`](../../BlockchainComPort/src/models/parliament_model.js#L1232-L1267) |
| `tribeParliamentRule` | Regla interna de tribu | `tribeId`, `title`, `body`, `author`, `createdAt` | [`parliament_model.js`](../../BlockchainComPort/src/models/parliament_model.js#L1271-L1284) |
| `chat` | Conversación persistida | `title`, `status`, `members`, `invites`, `author`, `tribeId` | [`chats_model.js`](../../BlockchainComPort/src/models/chats_model.js#L163-L190) |
| `chatMessage` | Mensaje de chat persistido | `chatId`, `author`, `createdAt`, `text`/`encryptedText`, `image`, `tribeId` | [`chats_model.js`](../../BlockchainComPort/src/models/chats_model.js#L454-L503) |
| `scriptorium-boe` | Payload Scriptorium propuesto para BOE distribuido | `version`, `obra_id`, `entrada`, `origen` | [`README-SCRIPTORIUM.md`](../../BlockchainComPort/README-SCRIPTORIUM.md), [`Network docs`](../../.github/plugins/network/docs/README.md) |
| `tombstone` | Eliminación lógica / cierre de tips antiguos | `target`, `deletedAt`, `author` | Ejemplos: [`parliament`](../../BlockchainComPort/src/models/parliament_model.js#L347-L348), [`tribes`](../../BlockchainComPort/src/models/tribes_model.js#L438-L450), [`votes`](../../BlockchainComPort/src/models/votes_model.js#L270-L310) |

### 5. Caveats críticos para diseñar una layer2

1. **Parliament global se indexa desde el feed del usuario actual para tipos `parliament*`.**  
     `listByType()` usa `readMyByTypes()` cuando el tipo empieza por `parliament`, y `readMyByTypes()` lee `createUserStream({ id: userId })`. Esto implica que, tal como está, Parliament no es todavía un reducer global de todos los feeds replicados. Para un layer2 de red, hace falta definir explícitamente quién firma/publica el estado canónico: cada participante, una tribu gobernante, o el pub `pub.escrivivir.co` como snapshotter.

2. **`votes` sí se leen del log general.**  
     Las propuestas parlamentarias por voto enlazan a `votes`, cuyo modelo usa `createLogStream`. Esto crea una mezcla: propuestas/terms/laws son `parliament*`, pero los votos asociados usan el sistema genérico de votaciones.

3. **Los chats no son realmente volátiles.**  
     `chat` y `chatMessage` se publican en SSB; aunque sirvan como mensajería casi-instantánea para UI, son persistentes y tienen rate limit. Si Arrakis BOE necesita volatilidad real, conviene que la layer2 opere fuera de SSB y solo devuelva snapshot/resumen final.

4. **La promulgación de leyes está ligada al cambio de término.**  
     La main de Oasis no debe recibir “ley efectiva” si solo hubo consenso parcial en layer2. La devolución debe mapearse a `parliamentProposal`, `votes`, `tribe-content` o `scriptorium-boe`, y dejar que el ciclo main promulgue.

5. **La gobernanza interna de tribu parece parcial.**  
     El código lee `tribeParliamentTerm`, pero en la evidencia localizada solo se publican candidaturas y reglas internas. No asumir un ciclo interno completo sin rastrear otra implementación.

### 6. Big picture de interfaz main ↔ layer2 ↔ main

#### A. Extraer estado de la main Oasis

**Entrada recomendada**: construir un snapshot Scriptorium desde SSB, no desde pantallas HTML.

Índice mínimo de extracción:

- identidad del pub: `whoami` del pub y `type: 'pub'` anunciado;
- habitantes: feeds `@...ed25519` y `about` relevantes;
- tribus: `tribe`, `tribe-keys` si aplica, `tribe-content` filtrado por `tribeId`;
- Parliament global: `parliamentTerm`, candidaturas abiertas, propuestas, revocaciones, leyes;
- votaciones: `votes` enlazadas por `voteId`;
- microfeed/chats si el caso de uso requiere contexto conversacional;
- claves de trazabilidad: SSB message key, author feed, timestamp, tipo y hash del contenido normalizado.

**Nota de diseño**: si el snapshot debe representar “la red” y no solo un cliente, debe agregarse desde el pub o desde un índice multi-feed; el modelo actual de Parliament usa feed propio para `parliament*`.

#### B. Operar en layer2 Scriptorium / Arrakis BOE

Layer2 puede usar nomenclatura compatible con Oasis:

- `Tribes` → grupos de participantes / salas / subcomunidades;
- `Inhabitants` → identidades firmantes;
- `Parliament` → reglas de decisión de la sesión;
- `BOE` → bitácora append-only de acciones, acuerdos y verificaciones.

Payload puente ya sugerido por Scriptorium Network: `scriptorium-boe`. Para este caso conviene extenderlo con:

- `snapshot_in`: hash del estado extraído de Oasis;
- `session_id`: sesión layer2;
- `tribe_id` / `obra_id` / `parliament_term_id` si aplica;
- `entries`: acciones layer2;
- `summary_out`: resumen verificable;
- `signatures`: participantes que aprueban el retorno;
- `target_main_action`: `tribe-content`, `parliamentProposal`, `votes`, `feed`, `scriptorium-boe`, etc.

#### C. Devolver estado a la main Oasis

Tres rutas de retorno, de menor a mayor acoplamiento político:

1. **Registro social**: publicar resumen como `tribe-content` (`contentType: 'feed'` o `forum`) en la tribu correspondiente. Útil para sesiones deliberativas sin efecto legal directo.
2. **Proceso político**: publicar `parliamentProposal` o una `votation` de tribu si el resumen debe activar el mecanismo de gobierno. Aquí no se debe saltar el ciclo de 7/15/60 días.
3. **Notaría Scriptorium**: publicar `scriptorium-boe` firmado vía `ssb-admin publish-json` desde el pub o desde cada participante. Útil para trazabilidad cross-Scriptorium y posterior merge.

Regla de seguridad funcional: la layer2 no debería “reescribir” Oasis; debe devolver mensajes append-only que Oasis ya sabe interpretar o mensajes `scriptorium-boe` que Scriptorium sabe verificar.

### 7. Mini referencia técnica rápida

| Pregunta | Referencia |
|---|---|
| ¿Dónde se fuerza/asegura término activo? | `backend.js` `ensureTerm()` ([L51-L59](../../BlockchainComPort/src/backend/backend.js#L51-L59)) |
| ¿Dónde se barre el estado de propuestas/revocaciones? | `backend.js` `runSweepOnce()` ([L61-L66](../../BlockchainComPort/src/backend/backend.js#L61-L66)); `parliament_model.js` `sweepProposals()` ([L740-L797](../../BlockchainComPort/src/models/parliament_model.js#L740-L797)) |
| ¿Cuánto dura cada ciclo? | `parliament_model.js` constantes temporales ([L6-L8](../../BlockchainComPort/src/models/parliament_model.js#L6-L8)) |
| ¿Cómo entra una tribu al Parliament global? | Endpoint `/tribe/:id/governance/publish-candidature` ([backend L3516-L3532](../../BlockchainComPort/src/backend/backend.js#L3516-L3532)) |
| ¿Cómo se propone una candidatura global? | Endpoint `/parliament/candidatures/propose` ([backend L3510-L3515](../../BlockchainComPort/src/backend/backend.js#L3510-L3515)); modelo `proposeCandidature()` ([model L638-L664](../../BlockchainComPort/src/models/parliament_model.js#L638-L664)) |
| ¿Cómo se crea propuesta parlamentaria? | Endpoint `/parliament/proposals/create` ([backend L3586-L3591](../../BlockchainComPort/src/backend/backend.js#L3586-L3591)); modelo `createProposal()` ([model L682-L703](../../BlockchainComPort/src/models/parliament_model.js#L682-L703)) |
| ¿Cómo se crea una votación genérica? | `votes_model.js createVote()` ([L144-L182](../../BlockchainComPort/src/models/votes_model.js#L144-L182)) |
| ¿Cómo se publica JSON bruto al pub? | `OASIS_PUB/tools/ssb-admin.js publish-json` ([L135-L140](../../BlockchainComPort/OASIS_PUB/tools/ssb-admin.js#L135-L140)) |
| ¿Dónde mirar salud/logs del pub? | `panel-api/src/server.mjs` endpoints ([L137-L184](../../BlockchainComPort/OASIS_PUB/panel-api/src/server.mjs#L137-L184)) |

### 8. Conclusión operativa para Arrakis BOE

Para la próxima conversación sobre Arrakis BOE, la interfaz más limpia sería:

1. `pub.escrivivir.co` o un cliente Oasis autorizado genera un **snapshot main** de SSB con claves de mensajes y hashes.
2. Arrakis BOE opera como **layer2 efímera/deliberativa** con sus propias reglas, pero conserva nombres compatibles: `Tribes`, `Inhabitants`, `Parliament`, `Law/Proposal/Vote`.
3. Los participantes verifican un **summary_out** con hash del snapshot inicial y hash del BOE layer2.
4. El retorno a Oasis se publica como:
     - `scriptorium-boe` para notaría cross-Scriptorium;
     - `tribe-content` para registro comunitario;
     - `parliamentProposal`/`votes` solo cuando se quiera activar el proceso político de la main.

La frontera importante: Oasis main es append-only y cíclica; layer2 puede ser rápida y volátil, pero su regreso debe respetar los ciclos y payloads que la main ya entiende.