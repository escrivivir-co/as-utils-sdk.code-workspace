# Copilot Instructions for AlephScript SDK Workspace

You are an expert developer working with the **AlephScript SDK Ecosystem** - a comprehensive multi-project workspace containing seven interconnected repositories focused on MCP (Model Context Protocol) development, AI integration, and real-time communication systems.

## 🏗️ Workspace Architecture

This workspace contains **seven specialized repositories** working together:

### Core MCP Infrastructure
- **`mcp-presets-site/`**: Zeus MCP Mesh SDK Web Interface (Node.js + HyperAxe, Port 3012)
- **`mcp-mesh-sdk/`**: MCPGaia Implementation with multi-UI support
- **`mcp-model-sdk/`**: SLMo42 AI Inference Service (GPU-optimized node-llama-cpp, Port 4001)
- **`mcp-core-sdk/`**: AlephScript Socket.IO library for real-time communication

### Extended Ecosystem
- **`mpc_oasis-sdk/`**: Dockerized Oasis networking application (blockchain-secured P2P)
- **`mcp-state-machine-driver/`**: State machine orchestration with Blockly UI integration
- **`mcp-node-red-contrib-sdk/`**: Node-RED integration with 13 contrib nodes + Angular UI

## 🔄 Critical Service Integration Chain

The **core integration pattern** follows this architecture:
```
Zeus (3012) → SLMo42 (4001) → MCPGaia (3003)
     ↑              ↑               ↑
   Web UI       REST Proxy      MCP Server
```

### Key Ports & Services
- **Zeus**: `3012` - Main web interface (Express + HyperAxe)
- **SLMo42**: `4001` - AI inference + MCP proxy (node-llama-cpp + GPU)
- **MCPGaia**: `3003` - Core MCP server (20 tools, 7 resources, 3 prompts)
- **Mesh SDK**: `3010` - Development server with Zeus submodule integration
- **State Machine Driver**: `3050` - MCP Service Launcher orchestration

## ⚙️ Development Workflows

### Zeus MCP Presets Site (Primary Focus)
```bash
# Development commands
cd mcp-presets-site/zeus && npm start           # Main server (3012)
cd mcp-presets-site/zeus && npm run debug:e2e   # E2E tests with Playwright

# Agent-based development (chat modes)
# Use .github/chatmodes/*.chatmode.md files:
# - backend-agent.chatmode.md (Express.js routing, MCP integration)
# - frontend-agent.chatmode.md (HyperAxe templates, themes)  
# - config-agent.chatmode.md (Settings, feature flags, i18n)
# - validation-agent.chatmode.md (Quality gates, testing)
# - integration-agent.chatmode.md (Cross-component communication)
# - agente-operador.chatmode.md (Multi-console ecosystem startup & health validation)
# - agente-interactivo-mcp.chatmode.md (Advanced MCP operations & preset testing)
```

### GPU-Accelerated AI Service (SLMo42)
```bash
# mcp-model-sdk development
cd mcp-model-sdk && npm start                   # GPU-optimized inference (4001)
cd mcp-model-sdk && npm run gpu:check           # GPU diagnostics
cd mcp-model-sdk && npm run test:functions      # Function calling tests
cd mcp-model-sdk && npm run query:prod:mcp      # MCP integration tests
```

### State Machine & Orchestration
```bash
# mcp-state-machine-driver
cd mcp-state-machine-driver && npm start        # Orchestrated startup sequence
cd mcp-state-machine-driver && npm run launcher # Service launcher (3050)
cd mcp-state-machine-driver && npm run mcp:devops # DevOps MCP server
```


## 🧪 Testing & Validation

### Service Health Validation Protocol
```bash
# External services integration check
curl -s http://localhost:3003/health              # MCPGaia status
curl -s http://localhost:4001/ai/ui/mcp/list      # SLMo42 catalog proxy
curl -s http://localhost:3012/api/mcp/servers     # Zeus integration
```

### E2E Testing (Zeus with Playwright)
```bash
cd mcp-presets-site/zeus
npm run test:e2e:setup        # One-time Playwright setup
npm run debug:e2e             # Start server + run tests  
npm run test:e2e:headed       # Debug with visible browser
```

### GPU Testing (SLMo42)
```bash
cd mcp-model-sdk
npm run gpu:check             # Hardware diagnostics
npm run test:all-gpu          # Complete GPU validation chain
npm run query:prod:mcp        # Test MCP function calling
```

## 🔗 Cross-Component Communication

### Submodule Integration (Mesh SDK ↔ Presets Site)
```bash
# mcp-mesh-sdk includes mcp-presets-site as submodule
cd mcp-mesh-sdk
git submodule update --init
npm run web:zeus:install      # Update Zeus submodule
npm run web:zeus             # Launch Zeus via submodule (3012)
```

### Socket.IO Real-time Communication (Core SDK)
```javascript
// AlephScript Core SDK pattern
import { AlephScriptServer } from '@alephscript/core';
const server = new AlephScriptServer(httpServer);
// Namespaces, rooms, broadcast patterns
```

### Node-RED Integration (Contrib SDK)
```bash
cd mcp-node-red-contrib-sdk
npm run install:node-red-auto    # Automated Node-RED setup
# 13 contrib nodes: Bot, App Channel, Sys Channel, UI Channel, Orchestrator
```

## 🎨 Code Quality Standards

### Multi-language Support
- **English-only** for all new code, comments, and documentation
- **Spanish legacy code** exists but should be refactored to English
- **Configuration-driven** i18n support via `getConfig().locale`

### Agent Specialization Boundaries
- **Backend Agent**: Express.js routing, middleware, MCP protocol integration
- **Frontend Agent**: HyperAxe templates, CSS themes, UI components
- **Config Agent**: Settings management, feature flags, JSON configuration
- **Validation Agent**: Testing protocols, quality gates, sprint validation
- **Integration Agent (Indra)**: Cross-service communication, external dependencies

### Directory Structure Conventions
```
project-root/
├── backend/         # Express.js application logic
├── server/          # HTTP server infrastructure  
├── client/assets/   # Static files (CSS, JS, themes)
├── configs/         # JSON configuration files  
├── models/          # Data models and business logic
├── views/           # HyperAxe templates and components
├── test/            # Unit tests, E2E tests, mock data
└── PLANIFICACION/   # Project documentation and sprint logs
```

## 🔧 Debug & Troubleshooting

### External Service Dependencies
- **Service Start Order**: MCPGaia (3003) → SLMo42 (4001) → Zeus (3012)
- **Mock Data Fallback**: Auto-switch to `test/mock_mcp_catalog.json` when services unavailable
- **GPU Requirements**: NVIDIA GPU with CUDA for SLMo42 inference optimization
- **Docker Support**: Oasis SDK provides containerized deployment patterns

### Common Integration Issues
- **Port Conflicts**: Use `npm run cleannode` to kill lingering Node.js processes
- **CORS Configuration**: Ensure permissive origins for cross-service communication  
- **MCP Protocol**: Verify JSON-RPC format for tool execution and resource access
- **Theme Loading**: Check CSS paths in HyperAxe templates (`/assets/themes/${theme}.css`)

## 🤖 Operational Agent System

### Agente Operador (Multi-Console Startup)
**Purpose**: Orchestrate parallel startup of all three core services
**Usage**: Select "Agente Operador" in VS Code Copilot Chat
**Capabilities**:
- Launch three parallel console sessions (MCPGaia, SLMo42, Zeus)
- Validate service health and cross-component integration
- Monitor startup logs and identify configuration issues
- Establish readiness for interactive operations

**Startup Sequence**:
```bash
# Terminal A: mcp-mesh-sdk (MCPGaia - Port 3003)
cd mcp-mesh-sdk && npm start

# Terminal B: mcp-model-sdk (SLMo42 - Port 4001)  
cd mcp-model-sdk && npm start

# Terminal C: mcp-presets-site/zeus (Zeus - Port 3012)
cd mcp-presets-site/zeus && npm start
```

### Agente Interactivo MCP (Advanced Operations)
**Purpose**: Execute complex MCP preset validation and tool execution scenarios
**Usage**: Select "Agente Interactivo MCP" in VS Code Copilot Chat (after Agente Operador)
**Inheritance**: Extends debug-validation-agent capabilities
**Capabilities**:
- Advanced preset existence validation and structure checking
- Custom prompt execution with preset preselection
- Multi-step MCP workflow orchestration
- Real-time cross-service communication monitoring

**Example Operations**:
```bash
# Preset validation example
"Comprueba que existe el preset 'BasicServerStatus' y lanza una petición con prompt '¿Cuál es el estado de mi servidor?' asegurándote de preseleccionar el preset indicado"

# Advanced tool execution
curl -X POST http://localhost:4001/ai \
  -H "Content-Type: application/json" \
  -d '{"input": "¿Cuál es el estado de mi servidor?", "preset": "BasicServerStatus", "usePresetTools": true}'
```

## 🚀 Quick Start Commands

### Automated Agent Workflow
1. **Start**: Select "Agente Operador" → Sistema se inicia automáticamente
2. **Validate**: Agent verifies all services healthy and integrated
3. **Transition**: "Sistema preparado - transfiriendo control a AgenteInteractivoMCP"
4. **Operate**: Select "Agente Interactivo MCP" → Execute advanced operations

### Manual Ecosystem Startup
```bash
# Terminal 1: Start MCP server
cd mcp-state-machine-driver && npm run mcp:devops

# Terminal 2: Start AI inference service  
cd mcp-model-sdk && npm start

# Terminal 3: Start main web interface
cd mcp-presets-site/zeus && npm start

# Validate: http://localhost:3012 (Zeus UI)
```

Always prioritize **agent specialization**, **configuration-driven development**, and **comprehensive testing** when working in this ecosystem. Use the operational agents for complex startup and validation scenarios.