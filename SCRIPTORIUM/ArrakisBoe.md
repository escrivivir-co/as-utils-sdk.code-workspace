# Arrakis BOE — índice de evidencias para layer2

> **Propósito**: acumular evidencia dispersa sobre el BOE de Arrakis sin cerrar todavía el diseño.  
> **Criterio de lectura**: búsqueda selectiva de `BOE` en las rutas indicadas + lectura de documentos vertebrales para reconstruir tipología de pipeline.  
> **Fecha de corte**: 2026-05-02.

---

## 1. Lectura ejecutiva

El BOE de Arrakis aparece como un **ledger custom append-only** para el teatro ARG: no es “blockchain generalista”, sino una cadena/registro oficial de disposiciones, eventos, turnos y evidencias que puede sincronizarse por Oasis/Scuttlebutt como mensajes `scriptorium-boe`.

La tipología recurrente es:

```text
Plataformas / chat / agentes
	↓
BDC como evidencia conversacional
	↓
Arrakis decide estado / turno / hito
	↓
BOE registra disposición append-only
	↓
GitARG materializa turno/código cuando aplica
	↓
Decoherence valida BOE ↔ BDC ↔ estado/código
	↓
Network serializa/fusiona BOEs vía Oasis P2P
```

Esta forma encaja con una futura lectura de **layer2**: Arrakis BOE puede operar como capa deliberativa/operativa sobre una red base, y devolver únicamente entradas verificables o resúmenes firmables al feed principal.

---

## 2. Fuentes rastreadas

### 2.1 Rutas con `BOE` directo

| Ruta | Evidencia relevante |
|---|---|
| [`.github/plugins/arg-board/agents/boe.agent.md`](../../.github/plugins/arg-board/agents/boe.agent.md) | BOE como custodio del registro oficial, append-only, estructura `boe-YYYY-MM-DD.json`, validación de unicidad y persistencia. |
| [`.github/plugins/arg-board/agents/arrakis.agent.md`](../../.github/plugins/arg-board/agents/arrakis.agent.md) | Arrakis delega a BOE y declara BOE/BDC/estado/obras/actores/monomitos como fuentes de verdad. |
| [`.github/plugins/arg-board/agents/decoherence.agent.md`](../../.github/plugins/arg-board/agents/decoherence.agent.md) | Decoherence valida consistencia entre BOE, BDC y código/estado. |
| [`.github/plugins/arg-board/agents/git-arg.agent.md`](../../.github/plugins/arg-board/agents/git-arg.agent.md) | GitARG publica autoridad, turnos y cierres como disposiciones BOE. |
| [`.github/plugins/arg-board/instructions/arg-engine.instructions.md`](../../.github/plugins/arg-board/instructions/arg-engine.instructions.md) | Define `BOE` como registro inmutable de eventos y pipeline `Plataformas → BDC → BOE → Git → Decoherence → Reportes`. |
| [`.github/plugins/arg-board/manifest.md`](../../.github/plugins/arg-board/manifest.md) | BOE como fuente de verdad y memoria histórica; BDC como feeds conversacionales; plataformas Oasis/Telegram/Discord/Twitch. |
| [`ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/README.md`](../../ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/README.md) | Estado runtime: Teatro Arrakis, BOE publicado de ejemplo y estructura `ARCHIVO/PLUGINS/ARG_BOARD/BOE/`. |
| [`ARCHIVO/PLUGINS/ARG_BOARD/BOE/boe-2025-12-20.json`](../../ARCHIVO/PLUGINS/ARG_BOARD/BOE/boe-2025-12-20.json) | Ejemplo vivo de boletín: génesis, actores, obras, metadata y estado `publicado: true`. |
| [`.github/plugins/network/agents/network.agent.md`](../../.github/plugins/network/agents/network.agent.md) | Publicar/recibir/sincronizar BOEs con Oasis como `scriptorium-boe`. |
| [`.github/plugins/network/instructions/network.instructions.md`](../../.github/plugins/network/instructions/network.instructions.md) | BOE como cadena hipervinculada y reglas append-only, timestamp, deduplicación por hash, multi-autor. |
| [`.github/agents/plugin_ox_network.agent.md`](../../.github/agents/plugin_ox_network.agent.md) | Bridge de sincronización P2P de BOEs entre Scriptoriums mediante Oasis. |
| [`.github/agents/plugin_ox_argboardapp.agent.md`](../../.github/agents/plugin_ox_argboardapp.agent.md) | ArgBoardApp registra sesiones en BOE. |
| [`.github/agents/revisor.agent.md`](../../.github/agents/revisor.agent.md) | Revisor delega auditoría ARG a Decoherence para validar BOE, personajes y estado del teatro. |
| [`.github/plugins/agent-creator/agents/agent-creator.agent.md`](../../.github/plugins/agent-creator/agents/agent-creator.agent.md) | AgentCreator consulta BOE para obras disponibles y despliega agentes como personajes vía Arrakis. |

### 2.2 Rutas sin `BOE` directo pero útiles para contexto

| Ruta | Contexto útil |
|---|---|
| [`VibeCodingSuite/ARRAKIS_THEATER.md`](../ARRAKIS_THEATER.md) | Arrakis Theater se define como infraestructura cinemática interactiva para sesiones hackerspace, compatible con red Scuttlebutt/Oasis y dinámica de MC/elenco/público. |
| [`VibeCodingSuite/ECOSYSTEM_OVERVIEW.md`](../ECOSYSTEM_OVERVIEW.md) | Ecosistema transmedia: público, elenco, escenario VS Code, red en tiempo real + Scuttlebutt asíncrona/P2P, maquinaria teatral y MCP. |
| [`VibeCodingSuite/SCRIPTORIUM/Parliament.md`](./Parliament.md) | Índice previo main ↔ layer2 ↔ main: Arrakis BOE como layer2 efímera/deliberativa que devuelve mensajes append-only verificables. |

---

## 3. Evidencias base del BOE local

### 3.1 Custodio append-only

`BOE` se define como “Gestor del Boletín Oficial del Estado” y “Custodio del registro oficial”. Su principio explícito es: **inmutable** y **append-only** ([`boe.agent.md`, líneas 9-20](../../.github/plugins/arg-board/agents/boe.agent.md#L9-L20)).

Reglas operativas del agente:

- trabaja con `BOE/*.json`;
- respeta estructura de BOE real: sumario + secciones;
- no inventa datos;
- no modifica disposiciones publicadas ([`boe.agent.md`, líneas 23-30](../../.github/plugins/arg-board/agents/boe.agent.md#L23-L30)).

### 3.2 Unidad de almacenamiento

La unidad canónica declarada es `boe-YYYY-MM-DD.json` con:

- `fecha`;
- `numero`;
- `sumario[]`;
- `secciones{}`;
- `publicado` ([`boe.agent.md`, líneas 35-67](../../.github/plugins/arg-board/agents/boe.agent.md#L35-L67), [`boe-init.prompt.md`, líneas 7-16](../../.github/plugins/arg-board/prompts/boe-init.prompt.md#L7-L16)).

El prompt `boe-agregar` formaliza el alta de disposición: entrada de sumario + cuerpo opcional en `secciones[identificador]`, con URL local `secciones/{identificador}` ([`boe-agregar.prompt.md`, líneas 7-39](../../.github/plugins/arg-board/prompts/boe-agregar.prompt.md#L7-L39)).

### 3.3 Tipos de disposiciones

El agente BOE agrupa disposiciones en familias:

- **Teatro Arrakis**: `ARRAKIS-GENESIS-*`, `ARRAKIS-OBRA-*`, `ARRAKIS-ESTRENO-*`, `ARRAKIS-TEMPORADA-*`, `ARRAKIS-ACTOR-*`, `ARRAKIS-WALLET-*`, `ARRAKIS-PLAT-*`.
- **Gestión Git**: `GIT-AUTORIDAD-*`, `GIT-TURNO-*`, `GIT-CIERRE-*`.
- **Decoherence**: `DECO-CONFLICTO-*`, `DECO-RESOLUCION-*` ([`boe.agent.md`, líneas 82-110](../../.github/plugins/arg-board/agents/boe.agent.md#L82-L110)).

### 3.4 Ejemplo runtime

El BOE runtime `boe-2025-12-20.json` muestra una génesis publicada para `Scriptorium Transmedia`, registro de actores y registro de obras ([`boe-2025-12-20.json`, líneas 1-34](../../ARCHIVO/PLUGINS/ARG_BOARD/BOE/boe-2025-12-20.json#L1-L34)).

Su cuerpo incluye metadata de génesis (`modo`, `timeout_turno`, `temporada`, `monomitos`, `lore_source`) y registros de actores/obras con arquetipos y funciones ([`boe-2025-12-20.json`, líneas 35-139](../../ARCHIVO/PLUGINS/ARG_BOARD/BOE/boe-2025-12-20.json#L35-L139)).

---

## 4. Arrakis como orquestador de fuentes

### 4.1 Fuentes de verdad declaradas

Arrakis declara estas fuentes:

| Fuente | Ubicación | Función |
|---|---|---|
| BOE | `ARCHIVO/PLUGINS/ARG_BOARD/BOE/*.json` | Registro oficial de disposiciones |
| Teatro State | `.arrakis/theater_state.json` | Estado actual del teatro |
| Obras | `.arrakis/obras.json` | Catálogo de obras |
| Actores | `.arrakis/actores.json` | Registro de agentes |
| Monomitos | `.arrakis/monomitos.json` | Progreso del Camino del Héroe |
| BDCs | `ChatExport_*/result.json` | Feeds de conversaciones |

Fuente: [`arrakis.agent.md`, líneas 58-67](../../.github/plugins/arg-board/agents/arrakis.agent.md#L58-L67).

### 4.2 Delegación

Arrakis no hace todo: delega operaciones especializadas a:

- BOE para publicación de disposiciones oficiales;
- GitARG para turnos y PRs;
- Decoherence para coherencia;
- AutomataHeroe para ejecución autónoma;
- PlatformCom para plataformas externas ([`arrakis.agent.md`, líneas 120-128](../../.github/plugins/arg-board/agents/arrakis.agent.md#L120-L128)).

### 4.3 Génesis de teatro

El prompt `arrakis-genesis` crea `.arrakis/`, inicializa estado vivo, monomitos y tickets; después invoca BOE para `boe-init` y publica `ARRAKIS-GENESIS-*` ([`arrakis-genesis.prompt.md`, líneas 16-24](../../.github/plugins/arg-board/prompts/arrakis-genesis.prompt.md#L16-L24), [`arrakis-genesis.prompt.md`, líneas 93-123](../../.github/plugins/arg-board/prompts/arrakis-genesis.prompt.md#L93-L123)).

En el mismo flujo registra plataformas iniciales, incluyendo Oasis/Scuttlebutt como plataforma principal, con autoridad agéntica y semilla actual ([`arrakis-genesis.prompt.md`, líneas 125-206](../../.github/plugins/arg-board/prompts/arrakis-genesis.prompt.md#L125-L206)).

---

## 5. BDC → BOE → Git → Decoherence

### 5.1 Pipeline declarada

Las instrucciones ARG definen el flujo de datos:

```text
Plataformas → BDC → BOE → Git → Decoherence → Reportes
```

Fuente: [`arg-engine.instructions.md`, líneas 43-52](../../.github/plugins/arg-board/instructions/arg-engine.instructions.md#L43-L52).

El mismo documento sitúa `BOE/`, `ChatExport_*/result.json` y `DECOHERENCE/` como directorios del sistema ([`arg-engine.instructions.md`, líneas 140-149](../../.github/plugins/arg-board/instructions/arg-engine.instructions.md#L140-L149)).

### 5.2 Turno automático

`arrakis-turno-auto` evalúa obras activas leyendo:

- estado del teatro;
- obras;
- monomitos;
- actores;
- BDCs como evidencias;
- BOE como disposiciones publicadas;
- journey state por actor ([`arrakis-turno-auto.prompt.md`, líneas 16-24](../../.github/plugins/arg-board/prompts/arrakis-turno-auto.prompt.md#L16-L24)).

Durante cada turno revisa mensajes en BDC, identifica interacciones relevantes y decide si avanzar, continuar, advertir o bloquear ([`arrakis-turno-auto.prompt.md`, líneas 47-99](../../.github/plugins/arg-board/prompts/arrakis-turno-auto.prompt.md#L47-L99)).

### 5.3 Git como turno materializado

GitARG es “árbitro de turnos” y publica autoridad, turnos y cierres como disposiciones BOE ([`git-arg.agent.md`, líneas 9-20](../../.github/plugins/arg-board/agents/git-arg.agent.md#L9-L20), [`git-arg.agent.md`, líneas 33-42](../../.github/plugins/arg-board/agents/git-arg.agent.md#L33-L42)).

El prompt `git-init-turno` abre un turno publicando “Autoridad del Juego” y “Convocatoria/Estado del Turno” en BOE, además de crear rama de turno ([`git-init-turno.prompt.md`, líneas 1-6](../../.github/plugins/arg-board/prompts/git-init-turno.prompt.md#L1-L6), [`git-init-turno.prompt.md`, líneas 25-38](../../.github/plugins/arg-board/prompts/git-init-turno.prompt.md#L25-L38)).

### 5.4 Decoherence como auditoría

Decoherence valida BOE, BDC y código en tres niveles:

- L1: protocolo/estructura BOE;
- L2: consistencia interna sumario ↔ secciones;
- L3: contraste con BDC, cachés y PRs ([`decoherence.agent.md`, líneas 23-30](../../.github/plugins/arg-board/agents/decoherence.agent.md#L23-L30), [`decoherence.agent.md`, líneas 59-78](../../.github/plugins/arg-board/agents/decoherence.agent.md#L59-L78)).

El prompt `deco-scan-lite` valida estructura, URLs locales, cuerpos, epígrafes y secciones, escribiendo resultados en `DECOHERENCE/cache/` e `index.json` sin mutar el BOE ([`deco-scan-lite.prompt.md`, líneas 7-29](../../.github/plugins/arg-board/prompts/deco-scan-lite.prompt.md#L7-L29)).

---

## 6. BOE como memoria, fuente y “blockchain” custom

### 6.1 Cadena hipervinculada

El plugin Network describe el BOE como **cadena hipervinculada** que registra todo lo que ocurre en el teatro. Cada entrada tiene timestamp, tipo, actor, contenido y hash ([`network.instructions.md`, líneas 21-36](../../.github/plugins/network/instructions/network.instructions.md#L21-L36)).

Reglas de sincronización:

- append-only;
- ordenación por timestamp;
- deduplicación por hash;
- multi-autor con `scriptorium_id` y `autor_pubkey` ([`network.instructions.md`, líneas 45-64](../../.github/plugins/network/instructions/network.instructions.md#L45-L64)).

### 6.2 Fuente de verdad suprema

La documentación AlephScript contrapone el estado tradicional fragmentado con un stack donde:

```text
BOE/      → registro oficial de TODO
BDC/      → conversaciones transmedia
.arrakis/ → estado vivo del teatro
.heroe/   → progreso de agentes
Git       → código generado / derivado
```

Fuente: [`07_DEVOPS_VS_ALEPHSCRIPT.md`, líneas 223-239](../../.github/plugins/arg-board/docs/07_DEVOPS_VS_ALEPHSCRIPT.md#L223-L239).

El mismo tramo declara: “BOE es la fuente de verdad suprema”, “BOE se compila en libros PDF” y “cada acción tiene disposición en BOE” ([`07_DEVOPS_VS_ALEPHSCRIPT.md`, líneas 241-246](../../.github/plugins/arg-board/docs/07_DEVOPS_VS_ALEPHSCRIPT.md#L241-L246)).

### 6.3 Primitiva SYNC

La sintaxis AlephScript define `SYNC` como sincronización con fuentes de verdad; fuentes válidas: `BOE`, `BDC`, `.arrakis/*`, `.heroe/*` ([`04_SINTAXIS_ALEPHSCRIPT.md`, líneas 278-292](../../.github/plugins/arg-board/docs/04_SINTAXIS_ALEPHSCRIPT.md#L278-L292)).

El arquetipo MENTOR custodia BOE y BDCs, sincroniza feeds y ejecuta Decoherence ([`05_ARQUETIPOS_DEVOPS.md`, líneas 515-548](../../.github/plugins/arg-board/docs/05_ARQUETIPOS_DEVOPS.md#L515-L548)).

---

## 7. Network/Oasis como entrada y salida

### 7.1 Bridge P2P

`plugin_ox_network` conecta VS Code con el plugin Network para sincronizar BOEs entre Scriptoriums mediante Oasis/Scuttlebutt ([`plugin_ox_network.agent.md`, líneas 1-20](../../.github/agents/plugin_ox_network.agent.md#L1-L20), [`plugin_ox_network.agent.md`, líneas 43-61](../../.github/agents/plugin_ox_network.agent.md#L43-L61)).

El agente Network declara responsabilidades: publicar BOEs locales, recibir BOEs remotos y fusionar BOEs de múltiples orígenes ([`network.agent.md`, líneas 40-49](../../.github/plugins/network/agents/network.agent.md#L40-L49)).

### 7.2 Publicación

Publicar BOE consiste en:

1. leer BOE local;
2. identificar entradas no publicadas;
3. serializarlas como `scriptorium-boe`;
4. publicar al feed Oasis;
5. actualizar `sync-state.json` ([`publicar-boe.prompt.md`, líneas 23-90](../../.github/plugins/network/prompts/publicar-boe.prompt.md#L23-L90)).

### 7.3 Recepción y merge

Recibir BOE consiste en filtrar mensajes `scriptorium-boe` por `obra_id`, comparar hashes, validar firmas y fusionar append-only con orden por timestamp ([`recibir-boe.prompt.md`, líneas 24-76](../../.github/plugins/network/prompts/recibir-boe.prompt.md#L24-L76)).

La sincronización bidireccional hace `PUBLICAR` + `RECIBIR`, ordena por timestamp/hash, detecta conflictos y escribe `boe-sync.json` ([`sincronizar-boe.prompt.md`, líneas 15-81](../../.github/plugins/network/prompts/sincronizar-boe.prompt.md#L15-L81)).

---

## 8. Integraciones laterales

### 8.1 ArgBoardApp

ArgBoardApp conecta obras de navegación interactiva wiki-racer y declara como capacidad “registrar sesiones en BOE” ([`plugin_ox_argboardapp.agent.md`, líneas 35-51](../../.github/agents/plugin_ox_argboardapp.agent.md#L35-L51)).

### 8.2 AgentCreator

AgentCreator produce agentes especializados a partir de agentes base + fuentes de datos, con despliegue opcional en ARG_BOARD ([`agent-creator.agent.md`, líneas 1-8](../../.github/plugins/agent-creator/agents/agent-creator.agent.md#L1-L8)).

Tiene handoffs para:

- desplegar agente creado como personaje en Teatro ARG vía Arrakis;
- consultar obras disponibles vía BOE ([`agent-creator.agent.md`, líneas 26-38](../../.github/plugins/agent-creator/agents/agent-creator.agent.md#L26-L38)).

El prompt de génesis de héroe publica el nacimiento del agente en BOE y obliga al agente a respetar BOE + BDC como fuente de verdad ([`heroe-genesis.prompt.md`, líneas 168-219](../../.github/plugins/arg-board/prompts/heroe-genesis.prompt.md#L168-L219)).

### 8.3 Revisor

Revisor tiene handoff ARG para auditar coherencia global de obra: BOE, personajes y estado del teatro, delegando en Decoherence ([`revisor.agent.md`, líneas 31-39](../../.github/agents/revisor.agent.md#L31-L39)).

### 8.4 Teatro transmedia y ecosistema VibeCoding

`ARRAKIS_THEATER.md` sitúa Arrakis Theater como spin-off para sesiones hackerspace sobre WebRTC/streaming y red Scuttlebutt Oasis, con roles de Casa Arrakis, elenco y público/chat ([`ARRAKIS_THEATER.md`, líneas 1-8](../ARRAKIS_THEATER.md#L1-L8)).

`ECOSYSTEM_OVERVIEW.md` describe la red de comunicación como combinación de Socket.io en tiempo real y Scuttlebutt asíncrono/P2P, sobre VS Code, Twitch/chat y maquinaria teatral ([`ECOSYSTEM_OVERVIEW.md`, líneas 1-35](../ECOSYSTEM_OVERVIEW.md#L1-L35)).

---

## 9. Tipología de pipeline para montar el puzzle después

### A. Ingesta / fuentes

- `Plataformas`: Oasis, Telegram, Discord, Twitch.
- `BDC`: feeds conversacionales exportados (`ChatExport_*/result.json`).
- `.arrakis/*`: estado vivo y catálogos.
- `.heroe/*`: estado individual de actores.

Evidencias: [`manifest.md`, líneas 138-150](../../.github/plugins/arg-board/manifest.md#L138-L150), [`arrakis.agent.md`, líneas 58-67](../../.github/plugins/arg-board/agents/arrakis.agent.md#L58-L67), [`04_SINTAXIS_ALEPHSCRIPT.md`, líneas 278-292](../../.github/plugins/arg-board/docs/04_SINTAXIS_ALEPHSCRIPT.md#L278-L292).

### B. Capa de decisión / turno

- Arrakis coordina estado, obras y monomitos.
- GitARG abre/cierra turnos y ramas.
- Héroe/actores ejecutan etapas.

Evidencias: [`arrakis.agent.md`, líneas 75-117](../../.github/plugins/arg-board/agents/arrakis.agent.md#L75-L117), [`git-arg.agent.md`, líneas 44-72](../../.github/plugins/arg-board/agents/git-arg.agent.md#L44-L72), [`arrakis-turno-auto.prompt.md`, líneas 26-118](../../.github/plugins/arg-board/prompts/arrakis-turno-auto.prompt.md#L26-L118).

### C. Registro / ledger BOE

- BOE registra disposiciones oficiales.
- Su estructura es sumario + secciones.
- Su regla funcional es append-only.

Evidencias: [`boe.agent.md`, líneas 13-20](../../.github/plugins/arg-board/agents/boe.agent.md#L13-L20), [`boe.agent.md`, líneas 129-140](../../.github/plugins/arg-board/agents/boe.agent.md#L129-L140), [`boe-agregar.prompt.md`, líneas 20-44](../../.github/plugins/arg-board/prompts/boe-agregar.prompt.md#L20-L44).

### D. Validación / decoherence

- L1 valida estructura.
- L2 valida consistencia interna.
- L3 contrasta con BDC/cachés/PRs.
- Los conflictos pueden registrarse de vuelta como disposiciones.

Evidencias: [`decoherence.agent.md`, líneas 23-48](../../.github/plugins/arg-board/agents/decoherence.agent.md#L23-L48), [`decoherence.agent.md`, líneas 59-78](../../.github/plugins/arg-board/agents/decoherence.agent.md#L59-L78).

### E. Publicación / sincronización P2P

- Network publica entradas BOE locales al feed Oasis como `scriptorium-boe`.
- Recibe entradas remotas y fusiona por hash/timestamp.
- Mantiene estado de sincronización.

Evidencias: [`network.agent.md`, líneas 55-82](../../.github/plugins/network/agents/network.agent.md#L55-L82), [`network.instructions.md`, líneas 45-64](../../.github/plugins/network/instructions/network.instructions.md#L45-L64), [`sincronizar-boe.prompt.md`, líneas 15-81](../../.github/plugins/network/prompts/sincronizar-boe.prompt.md#L15-L81).

### F. Cierre / publicación derivada

- BOE puede generar libro de disposiciones según superficie declarada del agente BOE.
- La documentación AlephScript explicita documentación auto-generada y compilación en libros PDF.
- Git deriva código/ramas/commits de disposiciones de turno.

Evidencias: [`boe.agent.md`, líneas 73-78](../../.github/plugins/arg-board/agents/boe.agent.md#L73-L78), [`07_DEVOPS_VS_ALEPHSCRIPT.md`, líneas 241-246](../../.github/plugins/arg-board/docs/07_DEVOPS_VS_ALEPHSCRIPT.md#L241-L246), [`git-arg.agent.md`, líneas 44-72](../../.github/plugins/arg-board/agents/git-arg.agent.md#L44-L72).

---

## 10. Notas para conexión con layer2

Estas notas no cierran diseño; solo recogen piezas reutilizables:

1. **BOE ya tiene semántica de ledger**: append-only + hash + timestamp + multi-autor.
2. **BDC ya funciona como capa de evidencia**: no todo debe entrar al BOE; el BOE puede registrar disposiciones/resúmenes y referenciar evidencia externa.
3. **Arrakis ya opera ciclos abstractos**: estado de teatro, monomitos, turnos, fases y etapas; no necesita fijarse a payload Oasis para funcionar.
4. **Network ya define el borde P2P**: `scriptorium-boe` es el sobre de salida/entrada para Oasis.
5. **Decoherence ya define verificación cruzada**: BOE ↔ BDC ↔ estado/código.
6. **VibeCoding aporta escenario**: VS Code + streaming + chat + Scuttlebutt/P2P como infraestructura performativa.
7. **Parliament.md deja el puente conceptual**: layer2 opera rápido/volátil y regresa como mensajes append-only verificables ([`Parliament.md`, líneas 358-431](./Parliament.md#L358-L431)).

---

## 11. Índice mínimo de rutas de seguimiento

| Tema | Ruta primaria |
|---|---|
| BOE local | [`.github/plugins/arg-board/agents/boe.agent.md`](../../.github/plugins/arg-board/agents/boe.agent.md) |
| Orquestación | [`.github/plugins/arg-board/agents/arrakis.agent.md`](../../.github/plugins/arg-board/agents/arrakis.agent.md) |
| Pipeline ARG | [`.github/plugins/arg-board/instructions/arg-engine.instructions.md`](../../.github/plugins/arg-board/instructions/arg-engine.instructions.md) |
| Turnos Git | [`.github/plugins/arg-board/agents/git-arg.agent.md`](../../.github/plugins/arg-board/agents/git-arg.agent.md) |
| Validación | [`.github/plugins/arg-board/agents/decoherence.agent.md`](../../.github/plugins/arg-board/agents/decoherence.agent.md) |
| Sync P2P | [`.github/plugins/network/agents/network.agent.md`](../../.github/plugins/network/agents/network.agent.md) |
| Contrato Network | [`.github/plugins/network/instructions/network.instructions.md`](../../.github/plugins/network/instructions/network.instructions.md) |
| Runtime ARG Board | [`ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/README.md`](../../ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/README.md) |
| BOE de ejemplo | [`ARCHIVO/PLUGINS/ARG_BOARD/BOE/boe-2025-12-20.json`](../../ARCHIVO/PLUGINS/ARG_BOARD/BOE/boe-2025-12-20.json) |
| Teatro Vibe | [`VibeCodingSuite/ARRAKIS_THEATER.md`](../ARRAKIS_THEATER.md) |
| Ecosistema | [`VibeCodingSuite/ECOSYSTEM_OVERVIEW.md`](../ECOSYSTEM_OVERVIEW.md) |

