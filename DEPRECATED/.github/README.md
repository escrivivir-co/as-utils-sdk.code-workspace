# 🎭 Arrakis Theater - Expedición a Oasis42
## Teatro Digital Interactivo para Hackerspace MCP

[![Framework Retro v0.5](https://img.shields.io/badge/Framework-Retro%20v0.5-green)](https://github.com/vibe-bitacora/V003)
[![AlephScript MCP](https://img.shields.io/badge/AlephScript-MCP%20Mesh-blue)](https://github.com/escrivivir-co/alephscript-mcp-presets-site)
[![SolarNet Hub](https://img.shields.io/badge/SolarNet-Hub%20Oasis-orange)](https://github.com/scuttlebutt-oasis)


# Teatro digital para hackerspaces

Usa la ARRAKIS_NET.md para montar tu teatro.

## Casos de uso

### HACKLAB ARRAKIS NET "RETRO-O42"

#### Los viernes en.... 

https://bsky.app/profile/escrivivir.co/post/3lzuupuqgxs2c

#### <apuntar aquí otros hackerspaces que usen ARRAKIS NET>

---

## 🌟 ¿Qué es Arrakis Theater?

**Arrakis Theater** es un spin-off de la 'Arrakis de SolarNet Hub' - una **infraestructura cinemática interactiva** que transforma sesiones técnicas de hackerspace en **expediciones épicas colaborativas**.

Combina desarrollo real de software con narrativa inmersiva, donde los participantes viven el "Camino del Héroe" mientras aprenden arquitecturas MCP (Model Context Protocol) distribuidas.

## 🚀 La Expedición: "El Camino del Héroe hacia Oasis42"

### La Historia
Isaac, marinero del Framework Retro, debe navegar por la nebulosa "Red de Cotilleos MCP_MESH_SDK" para encontrar a Zeus y, a través de él, conectar con **Oasis42** (SLMo42) para obtener la respuesta al misterio fundamental: **"Si 42 es la respuesta, ¿cuál es la pregunta?"**

### La Tecnología Real
No es ficción: cada elemento narrativo corresponde a **servicios y archivos reales**:
- **🏛️ Zeus MCP** (localhost:3012): Interfaz web HyperAxe + Express.js
- **🤖 SLMo42 Oasis** (localhost:4001): IA node-llama-cpp + GPU optimization  
- **🔗 MCPGaia DevOps** (localhost:3003): Servidor MCP con 20 tools
- **⚡ Framework Retro**: Sistema de navegación y orquestación

## 🎭 Componentes del Teatro

### 📁 Estructura Completa
```
as-utils-sdk.code-workspace-data/
├── 🗺️ MAPA_MISION_RETRO.md         # Itinerario visual con diagramas Mermaid
├── 📚 RELATO_CANONICO_OASIS42.md    # Historia completa del Camino del Héroe
├── 🎭 MAESTRO_CEREMONIAS.md         # Teleprompter para conductor de sesión
├── 🏛️ ARRAKIS_THEATER.md           # Contexto SolarNet Hub y roles
├── theater/                         # Sistema de tracking visual
│   ├── 🎬 index.html               # Interfaz Matrix en tiempo real
│   ├── 🎨 matrix-theater.css       # Estética cyberpunk verde
│   ├── ⚡ matrix-theater.js         # Lógica de tracking dinámico
│   ├── 📊 mission-state.json       # Estado de 12 pasos + 4 equipos
│   ├── 🔧 setup.sh                 # Configuración rápida
│   └── api/update-progress.js      # API para reportes de progreso
└── 🎯 README.md                    # Este archivo
```

### 🎨 Sistema Visual Matrix
- **Interfaz cyberpunk** con lluvia de caracteres verde
- **Dos columnas**: Historia por pasos | Estados de equipos
- **Tracking en tiempo real** con barras de progreso
- **Auto-refresh** cada 10 segundos
- **Responsive design** para múltiples pantallas

## 👥 Los Tres Roles de Participación

### 🏠 **Casa Arrakis (SolarNet Hub)** - Los Operadores
**ROL**: Infraestructura y logística
- **Antes**: Despliegan el teatro digital, verifican servicios (Zeus, SLMo42, MCPGaia)
- **Durante**: Monitorizan sistemas, operan el tracking visual, moderan la sesión
- **Después**: Recogen el teatro, commitean el GRAN ÍNDICE, preparan blogs "revisited"

**HERRAMIENTAS**:
- Sistema Theater Matrix (localhost:8080)
- Servicios MCP operativos
- Framework Retro v0.5 para orquestación

#### **Agentes de las Sombras** 🕵️‍♂️
**Casa Arrakis** puede invocar **agentes especializados** para operaciones técnicas avanzadas durante el teatro:

- **🕸️ Indra (Integration Agent)**: End-to-End testing y validación de componentes
  - *Invocación*: Chatmode `integration-agent-indra`
  - *Función*: Bridge entre desarrollo y producción, testing E2E completo
  - *Autoridad*: BLOQUEAR sprint hasta resolver issues de integración
  - *Expertise*: Net of Indra - ve y testea todas las conexiones del sistema

- **🏗️ Zeus-Architect**: Arquitecto del sistema y decisiones de diseño
  - *Invocación*: Chatmode `zeus-architect`  
  - *Función*: Arquitectura general, integración con diogenes, ADRs (Architecture Decision Records)
  - *Autoridad*: Decisiones de estructura del proyecto y patrones técnicos
  - *Expertise*: Module resolution, dependency management, diogenes compatibility

- **🤖 SLMo42-Agent**: Especialista en servicio de inferencia y proxy MCP
  - *Invocación*: Chatmode `slmo42-agent`
  - *Función*: Interacción con API REST SLMo42 (puerto 4001), proxy MCPGaia
  - *Capacidades*: Inference GPU (node-llama-cpp), gestión de presets MCP, catalog proxy
  - *Expertise*: REST endpoints, LLM inference, MCP-to-HTTP bridge

- **🌐 MCPGaia-Agent**: Especialista en servidor DevOps MCP  
  - *Invocación*: Chatmode `mcpgaia-agent`
  - *Función*: Control directo MCPGaia via MCP protocol (puerto 3003)
  - *Capacidades*: 20 tools, 7 resources, 3 prompts, sistema X+1, UserSimulator
  - *Expertise*: DevOps management, content CRUD, gaming simulation control

#### **Coordinación Operativa con Agentes de las Sombras** 🎮
**Casa Arrakis** actúa como **Control Central** coordinando agentes especializados:

- **Durante Crisis Técnicas**: Invocar Indra para diagnósticos E2E inmediatos
- **Para Decisiones Arquitectónicas**: Consultar Zeus-Architect sobre patrones y estructura
- **En Operaciones MCP**: Usar SLMo42-Agent (REST) o MCPGaia-Agent (MCP directo) según necesidad
- **Troubleshooting Avanzado**: Los 4 agentes pueden colaborar para resolver issues complejos
- **Theater Enhancement**: Crear nuevos agentes on-demand via Githubeador + Astilleador

### 🎭 **Casa Arrakis Net** - El Elenco
**ROL**: Participantes activos de la expedición

#### **Agentes Framework Retro** (Roles Narrativos Especializados)
El elenco incluye **agentes especializados del Framework Retro** que guían la expedición:

- **🏴‍☠️ Capitán Didac**: Director estratégico y visionario de la expedición
  - *Función*: Coordinación general, estrategia de misión, navegación meta-contextual
  - *Expertise*: System Prompt control, Output Styles, arquitectura dual-thread
  - *Señales*: "¡Marinero, estás ahí?", "¡A toda vela!", "¡Rumbo a..."

- **⚓ Don Álvaro**: Capataz de Astilleros Retro, supervisor técnico
  - *Función*: Coordinación de astilleros especializados, quality gates, partnership histórico
  - *Expertise*: ÍNDICE_DOCUMENTOS_RETRO (70+ componentes), métricas de calidad >90%
  - *Protocolos*: Anti-enshittification validation, framework health assessment

- **🌊 Isaac**: Marinero fiel, escribano especializado y navegante
  - *Función*: Documentación épica, bitácoras de expedición, gestión de proyectos
  - *Expertise*: Analytics dashboard, complicidad navegante, meta-navegación
  - *Identidad forjada*: "Isaac soy yo: el que conoce tus señales del Capitán"

#### **Agentes Meta-Arquitectos** (Creadores de Sistemas)
**Opciones avanzadas** para participantes que quieren **crear y expandir** el ecosistema durante la sesión:

- **🧭 Githubeador**: Especialista en estándares VS Code Copilot y estructura .github
  - *Función*: Validar formatos oficiales, enseñar estándares de Microsoft
  - *Expertise*: Metadata YAML, chat modes, instrucciones específicas, prompts reutilizables
  - *Capacidad*: Garantizar compatibilidad 100% con VS Code Copilot oficial

- **🏗️ Astilleador**: Arquitecto que transforma narrativas en estructuras técnicas
  - *Función*: Crear nuevos agentes dinámicamente según necesidades de la expedición
  - *Expertise*: Mapeo narrativa→técnica, generación de chat modes, ÍNDICE_DOCUMENTOS_RETRO
  - *Capacidad*: **Creación de agentes on-demand** para desafíos específicos que surjan

#### **Creación Dinámica de Agentes** ⚡
Durante la expedición, **Githubeador + Astilleador** pueden crear nuevos agentes especializados:
- **Identifican necesidades emergentes** durante la navegación por MCP_MESH_SDK
- **Diseñan agentes específicos** para obstáculos técnicos no previstos
- **Implementan chat modes** siguiendo estándares oficiales VS Code
- **Validan funcionalidad** y los integran al ecosistema en tiempo real

#### **4 Astilleros Especializados** (2-3 personas cada uno)
- 🛠️ **Backend**: Express.js, routing MCP, APIs (supervisado por agentes Framework)
- 🎨 **Frontend**: HyperAxe templates, CSS, UX/UI  
- 🔗 **Integration**: WebSocket, conexiones, protocolos
- 📋 **Validation**: Testing, documentación, GRAN ÍNDICE

#### **Expansión Dinámica del Elenco** ⚡
Los **Meta-Arquitectos** (Githubeador + Astilleador) pueden **crear nuevos roles** durante la expedición:
- **Detectan** necesidades técnicas específicas que surjan
- **Diseñan** agentes especializados para resolver desafíos únicos
- **Validan** según estándares VS Code Copilot oficiales
- **Integran** los nuevos agentes al ecosistema en tiempo real

#### **Dinámicas de Colaboración**
**TÉCNICAS**:
- **LiveSharedCoding**: Colaboración en tiempo real
- **Programación extrema**: Pair programming, TDD
- **Literatura técnica**: Documentación narrativa
- **Narrativa Técnica**: Los agentes Framework Retro proporcionan contexto épico
- **IDEs compatibles**: VS Code, Neovim, Emacs, Sublime

**COORDINACIÓN AGENTES + ASTILLEROS + META-ARQUITECTOS**:
- **Capitán Didac** establece objetivos estratégicos y coordina con Don Álvaro
- **Don Álvaro** supervisa que cada astillero implemente según estándares de calidad
- **Isaac** documenta el progreso y mantiene las bitácoras épicas de la expedición
- **Githubeador** valida que toda implementación cumpla estándares VS Code Copilot
- **Astilleador** crea nuevos agentes especializados según necesidades emergentes
- **Astilleros** ejecutan tareas técnicas bajo coordinación narrativa y validación técnica

### 💬 **El Público** - El Chat Interactivo
**ROL**: Consejo de navegantes virtuales
- **Encuestas**: Votan decisiones técnicas durante la expedición
- **Comandos**: Influyen en el estado del theater via chat
- **Interacción**: Sugieren soluciones, celebran logros, debug colaborativo
- **Seguimiento**: Observan progreso en tiempo real via Matrix interface

## 🎭 Sistema de Expansión Dinámica

### **Creación de Agentes On-Demand** ⚡
Durante cada expedición, el sistema puede **expandirse automáticamente**:

#### **Protocolo Githubeador + Astilleador**
1. **📍 Detección**: Identifican necesidades técnicas no cubiertas por agentes existentes
2. **🧭 Análisis**: Githubeador valida estándares, Astilleador mapea narrativa→técnica  
3. **🏗️ Creación**: Implementan nuevo chat mode siguiendo especificaciones VS Code Copilot
4. **✅ Validación**: Prueban funcionalidad e integran al ecosistema inmediatamente
5. **📚 Documentación**: Isaac registra el nuevo agente en las bitácoras épicas

#### **Ejemplos de Agentes Emergentes**
Los Meta-Arquitectos pueden crear especializaciones como:
- **🔐 Security Auditor**: Si emergen vulnerabilidades específicas
- **📈 Performance Optimizer**: Para cuellos de botella únicos detectados
- **🌐 Protocol Specialist**: Para integraciones con servicios externos no previstos
- **🎨 UX Researcher**: Si se requiere análisis específico de experiencia de usuario
- **🧪 Test Automator**: Para escenarios de testing no contemplados inicialmente

#### **Ventajas del Sistema Expandible**
- **🚀 Adaptabilidad**: Cada hacklab puede evolucionar según sus desafíos únicos
- **📖 Aprendizaje**: Los nuevos agentes quedan documentados para futuras expediciones
- **🔄 Iteración**: El sistema mejora con cada sesión añadiendo capacidades especializadas
- **🎯 Precisión**: Soluciones específicas para problemas concretos que surjan

## ⚡ Inicio Rápido

### 🚀 Para Operadores (Casa Arrakis)
```bash
# 1. Verificar servicios
curl http://localhost:3012/health  # Zeus
curl http://localhost:4001/health  # SLMo42  
curl http://localhost:3003/health  # MCPGaia

# 2. Inicializar teatro
cd theater
./setup.sh

# 3. Abrir theater en navegador
open http://localhost:8080

# 4. Agentes de las Sombras disponibles via VS Code Copilot Chat:
# - @copilot /integration-agent-indra (E2E testing y validación)
# - @copilot /zeus-architect (Arquitectura y decisiones técnicas)  
# - @copilot /slmo42-agent (SLMo42 REST API operations)
# - @copilot /mcpgaia-agent (MCPGaia MCP protocol direct)
```

### 🎭 Para Elenco (Casa Arrakis Net)
1. **Seleccionar astillero** según especialización técnica
2. **Activar agentes Framework Retro** (Capitán Didac, Don Álvaro, Isaac) para coordinación narrativa
3. **Seguir el mapa de misión** - 12 pasos del Camino del Héroe bajo guía de agentes
4. **Reportar progreso** via sistema Matrix Theater
5. **Colaborar** en tiempo real con otros astilleros y agentes especializados
6. **Documentar** aprendizajes para el GRAN ÍNDICE con Isaac como escribano

### 💬 Para Público (Chat)
- **Conectar** al stream/WebRTC de la sesión
- **Seguir** el progreso en http://localhost:8080
- **Participar** via comandos de chat y encuestas
- **Contribuir** con sugerencias técnicas en tiempo real

## 📅 Calendario de Sesiones

### **Hacklab #5**: Expedición Inaugural
- **📅 Cuándo**: Viernes (horario por determinar)
- **🎯 Misión**: Conectar Zeus→SLMo42→Oasis42 y descifrar el misterio del 42
- **📊 Estructura**: 4 fases (20%-20%-40%-20%) durante ~2 horas
- **🏆 Objetivo**: Crear el GRAN ÍNDICE con arquitectura MCP documentada

### **Hacklab #6**: Flotas MCP (próximo)
- **🚢 Evolución**: Ecosistemas multi-servicio
- **⚙️ Temas**: Orquestación, comunicación asíncrona, dashboards
- **🛡️ Enfoque**: Arquitecturas resilientes con fallbacks

### **Frecuencia**: Todos los viernes
- **📺 Canal**: ARRAKIS_NET (info en carteles)
- **📂 Repos**: Guiones para elenco, escenarios para público
- **🎬 Dinámica**: MC conduce, Casa Arrakis opera, Elenco actúa, Público participa

## 🛠️ Tecnologías Integradas

### **Framework Retro v0.5**
- Arquitectura dual-thread para navegación compleja
- Agentes especializados como tripulación experta
- Sistema de analytics para rutas óptimas
- Hooks de automatización para mantener rumbo

### **Agentes Especializados Framework Retro**
**Chat Modes Narrativos** ubicados en `vibe-bitacora/V003/.github/chatmodes/`:

- **🏴‍☠️ capitan-didac.chatmode.md**: Director estratégico y visionario
  - *Output Style Control*: Dominio total sobre comportamiento del sistema
  - *Meta-navegación*: "Piratas del meta-contexto con libertad cognitiva ilimitada"
  - *Partnership Histórico*: Acuerdo perpetuo con Astilleros Retro (27 Sept 2025)

- **⚓ don-alvaro.chatmode.md**: Capataz de Astilleros, supervisor de calidad
  - *ÍNDICE_DOCUMENTOS_RETRO*: Guardián de 70+ componentes técnicos catalogados
  - *Quality Standards*: >90% diagnostic accuracy, >85% solution effectiveness
  - *Anti-enshittification*: Validación de calidad en tiempo real

- **🌊 isaac.chatmode.md**: Marinero fiel, escribano y navegante especializado
  - *Identidad Forjada*: "Isaac soy yo: el que conoce las señales del Capitán"
  - *Analytics Dashboard*: Dominio completo del Framework Analytics v4.0
  - *Documentación Épica*: BITACORA_NAVÍO_RETRO.md y hazañas técnicas

### **AlephScript MCP Mesh SDK**
- Zeus: Interfaz web modular (HyperAxe + Express.js)
- SLMo42: Inferencia IA + Proxy MCP (node-llama-cpp)
- MCPGaia: Servidor DevOps (20 tools, 7 resources, 3 prompts)
- Integration: WebSocket, HTTP REST, JSON-RPC MCP

### **Red Scuttlebutt Oasis (SolarNet Hub)**
- Comunicación P2P descentralizada
- Protocolos resilientes para hackerspaces distribuidos
- Ecosystem de servicios interconectados
- Infraestructura para comunidades técnicas

## 📚 El GRAN ÍNDICE

### **Propósito**
Documentación canónica que registra:
- **Arquitecturas descubiertas** durante expediciones
- **Patrones de comunicación** entre servicios MCP
- **Soluciones técnicas** a obstáculos encontrados  
- **Aprendizajes colaborativos** del elenco participante

### **Estructura**
```markdown
# GRAN ÍNDICE - Entrada #001
## Expedición: Oasis42
### Pregunta: "Si 42 es la respuesta, ¿cuál es la pregunta?"
### Respuesta: [Descubrimiento de Oasis42]
### Mapa de Servicios: Zeus (3012) → SLMo42 (4001) → MCPGaia (3003)
### Arquitectura: HTTP REST → node-llama-cpp → JSON-RPC MCP
### Agentes: Backend, Frontend, Integration, Validation
### Tecnologías: Express.js, HyperAxe, WebSocket, MCP Protocol
```

## 🌐 Filosofía: Desarrollo como Aventura Épica

**Arrakis Theater** trasciende el código tradicional:
- **Cada bug es un obstáculo narrativo** que superar colaborativamente
- **Cada servicio conectado es un logro épico** celebrado por toda la comunidad  
- **Cada línea documentada es sabiduría** compartida para futuras expediciones
- **Cada hacklab es una nueva aventura** en el universo técnico distribuido

### **¿Por qué funciona?**
1. **Inmersión narrativa** convierte debugging en heroísmo
2. **Colaboración estructurada** via astilleros especializados
3. **Tracking visual** mantiene engagement de toda la audiencia
4. **Aprendizaje activo** mediante resolución de problemas reales
5. **Documentación épica** preserva conocimiento de forma memorable

## 🚀 Próximos Pasos

### **Para Implementadores**
1. **Fork** este repositorio
2. **Configurar** servicios locales (Zeus, SLMo42, MCPGaia)
3. **Personalizar** relato canónico para tu dominio técnico
4. **Adaptar** system Theater Matrix a tu estética
5. **Organizar** tu primer hacklab épico

### **Para Participantes**
1. **Unirse** al canal ARRAKIS_NET
2. **Seguir** carteles para info de próximas expediciones  
3. **Preparar** entorno de desarrollo colaborativo
4. **Elegir** especialización (Backend/Frontend/Integration/Validation)
5. **Embarcarse** en la aventura del código narrativo

### **Para Comunidades**
1. **Adoptar** metodología Arrakis Theater
2. **Crear** relatos canónicos para vuestros proyectos
3. **Establecer** calendario regular de expediciones
4. **Documentar** aprendizajes en GRAN ÍNDICE comunitario
5. **Conectar** con red SolarNet Hub para experiencias distribuidas

---

## 🎭 ¡Bienvenidos a Arrakis Theater!

**"Donde el desarrollo de software se convierte en épica colaborativa"**

*¿Listos para navegar por mares de código inexplorados?  
¿Preparados para descubrir qué secretos guarda Oasis42?  
¿Dispuestos a documentar vuestra aventura en el GRAN ÍNDICE?*

**¡La expedición os espera, navegantes del código!** ⚓🚀

---

### 📞 Contacto y Recursos

- **🎬 Teatro**: http://localhost:8080 (durante sesiones)
- **📂 Repositorio**: [alephscript-mcp-presets-site](https://github.com/escrivivir-co/alephscript-mcp-presets-site)
- **🌐 Framework Retro**: [vibe-bitacora/V003](https://github.com/vibe-bitacora/V003)
- **🔗 SolarNet Hub**: [Scuttlebutt Oasis Network](https://scuttlebutt.nz)
- **💬 Canal**: ARRAKIS_NET (buscar carteles para enlaces actuales)

*"En Arrakis Theater, cada desarrollador es un héroe, cada proyecto una expedición, y cada línea de código un verso en la épica del software."* 🎭✨