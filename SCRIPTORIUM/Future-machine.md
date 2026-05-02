# Future-machine — rack de solidificación BOE → voz → retorno layer2

> **Propósito**: documentar la future-machine como pipeline/rack que recibe un BOE inicial y material líquido de firehoses, lo solidifica por slots sucesivos y devuelve producción/corto/ejecución verificable al layer2.  
> **Fuente principal**: [`DocumentMachineSDK/.github/skills/engine-plan/SKILL.md`](../../DocumentMachineSDK/.github/skills/engine-plan/SKILL.md).  
> **Prompt asociado**: [`DocumentMachineSDK/.github/prompts/engine-plan.prompt.md`](../../DocumentMachineSDK/.github/prompts/engine-plan.prompt.md).  
> **Relación previa**: [`Parliament.md`](./Parliament.md), [`ArrakisBoe.md`](./ArrakisBoe.md), [`ScriptorioumRoom.md`](./ScriptorioumRoom.md), [`Firehose.md`](./Firehose.md).  
> **Fecha de corte**: 2026-05-02.

---

## 1. Lectura ejecutiva

La **future-machine** es el tramo de solidificación de la layer2: toma material conversacional y normativo todavía líquido —feeds, firehoses, BOE inicial, decisiones de sesión— y lo hace pasar por slots cada vez más estructurados hasta producir una **voz cristalizada** capaz de generar un retorno: producción, corto, universo, disposición BOE o ejecución verificable hacia `oasis.parliament`.

No es todavía el protocolo `oasis.parliament`. Es el SDK/pipeline que permite implementarlo después.

```text
BOE inicial / snapshot_in
				↓
Room layer2 con inhabitants
				↓
Firehoses de participantes
				↓
Conversaciones / piezas aceptadas
				↓
Vectores / memoria recuperable
				↓
Corpus acumulativo
				↓
Grafo de bifurcación
				↓
Universo instanciado
				↓
Producción / corto / ejecución
				↓
BOE final / summary_out
				↓
Retorno a Oasis main / Parliament
```

Idea fuerza: el BOE entra como contrato vivo de sesión, la future-machine lo mantiene e implementa, y al final devuelve una pieza sólida que puede reintegrarse.

---

## 2. Modelo canónico engine-plan

### 2.1 6 capas + 2 transversales

El skill `engine-plan` define la future-machine como cadena de **6 capas de datos + 2 agentes transversales**:

| Capa | Agente | Input canónico | Output canónico | Dossier SDK |
|---|---|---|---|---|
| 1 | `@Loreador` | Piezas en disco | `INDEX.md` + `LORE_F.md` | `lore-db-sdk` |
| 2 | `@Bartleby` | `LORE_F.md` o doc vía `/feed` | `.analisis.md` | core |
| 3 | `@Archivero` | Análisis + `corpus.md` actual | `corpus.md` actualizado | `corpus-sdk` |
| 4 | `@Grafista` | `LORE_F` + `corpus.md` | `grafo/*.json` | `grafo-sdk` |
| 5 | `@Demiurgo` | Grafo de bifurcación | `universo/*.md` | `universos-sdk` |
| 6 | `@Dramaturgo` | Universo spec | `cortos/*.md` | `cortos-sdk` |
| T | `@Pipeline` | cadena completa | refresh / inspect / gaps / logs | `future-machine-sdk` |
| T | `@Portal` / `@Cristalizador` | entrada/meta | navegación / infraestructura | core |

Fuente: [`engine-plan/SKILL.md`, §1](../../DocumentMachineSDK/.github/skills/engine-plan/SKILL.md).

### 2.2 Principios técnicos del skill

El skill fija tres principios relevantes para layer2:

1. **Doble fuente**: el grafo recibe `LORE_F` como datos factuales y `corpus.md` como analítica.
2. **Corpus acumulativo**: el corpus no se regenera; acumula deltas aprobados.
3. **Universo como concreción**: un universo rellena variables y elige inicializaciones; no es ficción libre, sino contrato del corto.

Fuente: [`engine-plan/SKILL.md`, §1](../../DocumentMachineSDK/.github/skills/engine-plan/SKILL.md).

---

## 3. Future-machine como rack de solidificación

### 3.1 Estados de materia

| Estado | Forma | Fuente | Slot que lo solidifica |
|---|---|---|---|
| Líquido | firehose/feed/chat/room events | [`Firehose.md`](./Firehose.md), [`ScriptorioumRoom.md`](./ScriptorioumRoom.md) | selección de piezas |
| Semilíquido | conversación ordenada / BDC | [`ArrakisBoe.md`](./ArrakisBoe.md) | pieza tipada / `LORE_*` |
| Pieza | fragmento aceptado por participantes | BOE + firehose evidence | `@Loreador` |
| Lore factual | inventario + hilo factual | `INDEX.md`, `LORE_F.md` | `@Bartleby` |
| Análisis | `.analisis.md` | lectura documental | `@Archivero` |
| Corpus | mapa analítico acumulativo | `corpus/corpus.md` | `@Grafista` |
| Grafo | nodos/arcos/huecos | `grafo/*.json` | `@Demiurgo` |
| Universo | spec concreta | `universo/*.md` | `@Dramaturgo` |
| Voz cristalizada | corto/producción/ejecución | `cortos/*.md` | BOE final + retorno |

### 3.2 Rack operativo

```text
slot_00_boe_in
	Entrada: snapshot_in + primer bloque BOE
	Salida: contrato de sesión + criterios de aceptación

slot_01_firehose_selection
	Entrada: feeds participantes
	Salida: conversación segmentada + candidatos a pieza

slot_02_piece_acceptance
	Entrada: candidatos
	Salida: piezas aprobadas por participantes

slot_03_vectorization
	Entrada: piezas aprobadas
	Salida: vectores / memoria recuperable / evidence refs

slot_04_lore_db
	Entrada: piezas + vectores + BOE refs
	Salida: INDEX + LORE_F

slot_05_corpus
	Entrada: LORE_F + análisis
	Salida: corpus acumulativo

slot_06_graph
	Entrada: LORE_F + corpus
	Salida: grafo de bifurcación

slot_07_universe
	Entrada: grafo + decisiones de inicialización
	Salida: universo spec

slot_08_production
	Entrada: universo + voz cristalizada
	Salida: corto / producción / ejecución

slot_09_boe_out
	Entrada: producción + hashes + firmas
	Salida: summary_out reintegrable
```

---

## 4. Entrada: BOE como contrato vivo de sesión

La future-machine no arranca desde cero. En esta línea de investigación, recibe:

- `BOE inicial`: primer bloque de sesión o disposición de Arrakis.
- `snapshot_in`: hash del estado extraído de Oasis main.
- `room/session`: espacio layer2 con inhabitants.
- `firehoses`: feeds de participantes.
- `criteria`: qué cuenta como pieza, validación, corpus, grafo, universo y producción.

Esto conecta con la interfaz main ↔ layer2 ↔ main definida en [`Parliament.md`](./Parliament.md), donde layer2 opera con `Tribes`, `Inhabitants`, `Parliament` y `BOE`, y vuelve con `summary_out`, firmas y `target_main_action`.

`ArrakisBoe.md` ya fija el BOE como ledger custom append-only: BDC conversa, BOE registra, Git materializa si aplica, Decoherence valida y Network sincroniza como `scriptorium-boe`.

---

## 5. Firehoses → piezas: el primer acto de solidificación

`Firehose.md` generaliza firehose como cualquier punto de entrada de mensajes de participantes: AT Protocol, Telegram/BotHub, Twitch, Oasis, rooms Socket.IO u otros bots MCP.

La future-machine añade una decisión política/técnica: **no todo feed se convierte en pieza**.

### 5.1 Criterio de pieza

Una parte del firehose solo entra a la máquina cuando los participantes aceptan que es pieza:

```ts
type PieceCandidate = {
	sourceEventIds: string[];
	roomId: string;
	participantIds: string[];
	proposedBy: string;
	textOrPayload: unknown;
	acceptance: {
		mode: 'explicit' | 'quorum' | 'editorial' | 'boe-disposition';
		acceptedBy: string[];
		timestamp: string;
	};
	evidenceHash: string;
};
```

### 5.2 Resultado

La salida de este acto no es todavía corpus. Es **pieza tipada**:

- referencia al BOE o conversación;
- hash de evidencia;
- autoría/participantes;
- motivo de aceptación;
- tipo narrativo o documental.

---

## 6. Piezas → vectores → corpus

El skill `engine-plan` comienza en “piezas en disco”, pero para layer2 hace falta explicitar un pre-slot vectorial: Scriptorium recibe material líquido y debe volverlo recuperable.

### 6.1 Vectorización como memoria, no verdad

Los vectores no sustituyen al BOE ni al corpus. Sirven para:

- recuperar piezas por semejanza;
- agrupar conversación;
- detectar duplicados semánticos;
- alimentar análisis downstream;
- sostener trazabilidad hacia evidencia.

### 6.2 Corpus acumulativo

El corpus es la primera solidificación analítica fuerte. Según el skill, no se regenera: **se acumula por capas sucesivas**. Cada merge añade delta aprobado sin reescribir lo anterior.

La relación con BOE debe ser append-only por diseño:

```text
pieza aprobada
		→ vector / evidenceRef
		→ análisis Bartleby
		→ diff Archivero
		→ merge corpus
		→ disposición/resumen BOE si el delta cambia estado de la sesión
```

---

## 7. Corpus → grafo → universo → voz cristalizada

### 7.1 Grafo

El `@Grafista` recibe doble fuente:

- `LORE_F`: datos, hechos, cronología.
- `corpus.md`: analítica, mecanismos, tensiones, ausencias.

De ahí produce nodos, arcos y huecos. En los logs reales se observa un grafo con nodos/arcos/huecos cargados como estado operativo de la machine.

Fuente: [`engine-log-2026-04-20-220000.md`](../../DocumentMachineSDK/engine-logs/engine-log-2026-04-20-220000.md).

### 7.2 Universo

El `@Demiurgo` convierte grafo en universo: rellena variables y elige inicializaciones. El universo es la spec concreta que consume Dramaturgo.

### 7.3 Voz cristalizada

El `@Dramaturgo` transforma universo en obra/corto/producción. En el log de ejemplo, la capa 6 genera un corto desde `universo-2`, `LORE_F`, `CORPUS_PREVIEW` y grafo, extrayendo firma de voz, registro, foco, consignas y diferencias con universo previo.

Fuente: [`engine-log-2026-04-20-220000.md`](../../DocumentMachineSDK/engine-logs/engine-log-2026-04-20-220000.md).

Esta es la “voz cristalizada”: no una respuesta improvisada del modelo, sino una producción que viene de piezas aceptadas, corpus acumulado, grafo y universo.

---

## 8. Salida: producción, corto o ejecución reintegrable

La salida puede tener varias formas:

| Salida | Uso | Retorno recomendado |
|---|---|---|
| `corto/*.md` | producción narrativa derivada de sesión | BOE + `scriptorium-boe` |
| `universo/*.md` | spec reusable | BOE local + corpus/grafo refs |
| `grafo/*.json` | estado estructural navegable | BOE técnico / evidence hash |
| `corpus.md` delta | cambio analítico | BOE disposición de corpus |
| `execution_summary` | ejecución política/técnica | `parliamentProposal`, `votes`, `tribe-content` o `scriptorium-boe` |

La regla funcional tomada de [`Parliament.md`](./Parliament.md): la layer2 no reescribe Oasis; devuelve mensajes append-only que Oasis o Scriptorium saben interpretar.

---

## 9. Smart contracts como vía auxiliar, no principal

Hay indicios de que harán falta **contratos** para automatizar aceptación, firma, quórum, hashes y retorno. Pero no deben ser la vía principal de esta fase.

### 9.1 Por qué no son vía principal

- La future-machine todavía está definiendo el SDK y los slots.
- El BOE ya cubre registro append-only y trazabilidad.
- La Room ya cubre inhabitants/capabilities.
- Firehose ya cubre ingesta/cursor/evidencia.
- Los protocolos Oasis Parliament todavía no se fijan aquí.

### 9.2 Qué sí podrían cubrir

Contratos auxiliares como **gates**, no como motor central:

| Contrato auxiliar | Función |
|---|---|
| `PieceAcceptanceContract` | Determina cuándo un fragmento de firehose pasa a pieza. |
| `VectorizationConsentContract` | Registra consentimiento para vectorizar una pieza. |
| `CorpusMergeContract` | Firma que un delta de corpus fue revisado/aprobado. |
| `GraphPromotionContract` | Declara que corpus+LORE_F producen grafo versionado. |
| `UniverseInstantiationContract` | Fija variables e inicializaciones de universo. |
| `BoeReturnContract` | Enlaza `snapshot_in`, `summary_out`, hashes y firmas para retorno. |

### 9.3 Forma recomendada por ahora

Implementarlos como schemas/typed contracts de Scriptorium, no como dependencia blockchain principal:

```ts
type FutureMachineGate = {
	gateId: string;
	slot: 'piece' | 'vector' | 'corpus' | 'graph' | 'universe' | 'production' | 'boe_return';
	inputHashes: string[];
	outputHash: string;
	acceptedBy: string[];
	rule: string;
	timestamp: string;
	boeRef?: string;
};
```

Si más adelante hay que anclar esto en smart contracts reales, esos contratos deberían ejecutar/verificar gates, no sustituir la future-machine.

---

## 10. Pipeline integrado con los cuatro documentos anteriores

```text
Parliament.md
	Define main ↔ layer2 ↔ main y límites de retorno a Oasis.

ArrakisBoe.md
	Define BOE como ledger custom append-only y evidencia de sesión.

ScriptorioumRoom.md
	Define room como espacio layer2 con inhabitants y capabilities.

Firehose.md
	Define puntos de feed de mensajes y conversación normalizable.

Future-machine.md
	Define rack de solidificación: piezas → vectores → corpus → grafo → universo → producción → retorno.
```

La future-machine no sustituye esas capas; las consume.

---

## 11. Evidencias de operación real

### 11.1 `engine-plan` como protocolo

El skill define:

- protocolo de simulación;
- contrato de existencia de agentes (`READY`, `BUILD`, `MISS`);
- formato de log;
- protocolo `run`, `inspect`, `gaps`, `data`, `spec`, `docs`;
- dependencias cross-dossier y ruta crítica.

Fuente: [`engine-plan/SKILL.md`](../../DocumentMachineSDK/.github/skills/engine-plan/SKILL.md).

### 11.2 Prompt `/engine-plan`

El prompt expone modos:

- big picture;
- foco por capa (`lore-db`, `corpus`, `grafo`, `universos`, `cortos`, `pipeline`);
- `log` y `log-std` como consola de simulación.

Fuente: [`engine-plan.prompt.md`](../../DocumentMachineSDK/.github/prompts/engine-plan.prompt.md).

### 11.3 Log publicado

`docs/engine.md` muestra un log renderizado de la future-machine con boot de slots, diagrama horizontal y tabla de plugins extra. Incluye evidencia de `log-std`, 9 slots READY y ruta crítica.

Fuente: [`docs/engine.md`](../../DocumentMachineSDK/docs/engine.md).

### 11.4 Dossier universo-1

El dossier `future-machine-universo-1` fija que la validación real debe hacerse contra `universo-1` y que el trabajo vivo se reorientó hacia una cadena de 5 agentes: Puzzle → Archivero Lore → Grafista → Demiurgo → Dramaturgo Cortos.

Fuentes:

- [`PLAN_FUTURE_MACHINE_UNIVERSO1.md`](../../DocumentMachineSDK/sala/archivo/sprint-cristalizacion-v1/dossiers/future-machine-universo-1/PLAN_FUTURE_MACHINE_UNIVERSO1.md)
- [`BACKLOG_FUTURE_MACHINE_UNIVERSO1.md`](../../DocumentMachineSDK/sala/archivo/sprint-cristalizacion-v1/dossiers/future-machine-universo-1/BACKLOG_FUTURE_MACHINE_UNIVERSO1.md)
- [`RESPUESTAS_USUARIO_FUTURE_MACHINE_UNIVERSO1.md`](../../DocumentMachineSDK/sala/archivo/sprint-cristalizacion-v1/dossiers/future-machine-universo-1/RESPUESTAS_USUARIO_FUTURE_MACHINE_UNIVERSO1.md)

---

## 12. Resumen operativo

1. El BOE inicial define la sesión y sus criterios.
2. Room da acceso a inhabitants y capabilities.
3. Firehose recoge la materia líquida de participantes.
4. Los participantes aceptan qué fragmentos pasan a piezas.
5. Las piezas pueden vectorizarse como memoria recuperable.
6. Loreador/Bartleby/Archivero solidifican en corpus.
7. Grafista/Demiurgo solidifican en grafo y universo.
8. Dramaturgo produce corto/obra/ejecución como voz cristalizada.
9. BOE final registra producción, hashes, firmas y retorno.
10. Oasis main recibe append-only, no una reescritura.

