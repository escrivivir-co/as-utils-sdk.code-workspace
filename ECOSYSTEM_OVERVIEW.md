# 🎭 Arquitectura del Ecosistema Transmedia

Este documento describe la arquitectura general del "Teatro de Realidad Aumentada", un ecosistema diseñado para crear narrativas interactivas y colaborativas a través de live-coding y streaming.

```mermaid
graph TD
    subgraph "Público"
        Twitch_Chat
    end

    subgraph "Actores (Elenco)"
        Developers["Desarrolladores / Live-Coders"]
    end

    subgraph "Escenario (Entorno de Actuación)"
        A1["mcp-vscode-ext"]
        Developers -- "Actúan en" --> A1
    end

    subgraph "Red de Comunicación (Sistema Nervioso)"
        B1["mcp-core-sdk (Socket.io - Tiempo Real)"]
        B2["mpc_oasis-sdk (Scuttlebutt - Asíncrono/P2P)"]
        B1 <--> B2
    end

    subgraph "Maquinaria Teatral (Director de Escena)"
        C1["mcp-state-machine-driver"]
        C1 -- "Proyecta Eventos/UIs en" --> A1
        C2["mcp-vibe-framework (Agente Retro)"]
        C2 -- "Asiste a" --> Developers
    end

    subgraph "Control de Producción"
        D1["mcp-node-red-contrib-sdk"]
        D1 -- "Monitoriza y Controla" --> C1
        D1 -- "Monitoriza y Controla" --> B1
    end

    subgraph "Protocolo Universal (Inteligencia y Herramientas)"
        E1["mcp-presets-site (Zeus UI)"]
        E2["mcp-model-sdk (SLMo42 AI Service)"]
        E3["mcp-mesh-sdk (MCPGaia Server)"]
        E1 --> E2 --> E3
        C2 -- "Utiliza IA y Herramientas de" --> E2
    end
    
    subgraph "Libreto y Mitología"
        F1["as-utils-sdk.code-workspace-data"]
        F1 -- "Define la Narrativa para" --> C1
    end

    %% Conexiones Principales
    Twitch_Chat --> mcp-twitch-bot-sdk
    mcp-twitch-bot-sdk -- "Canal de Chat" --> B1
    A1 -- "Conecta vía" --> B1

```

## Leyenda de Componentes

*   **Público**: Los espectadores que interactúan desde plataformas como Twitch.
*   **Actores (Elenco)**: Los desarrolladores o creadores que realizan el live-coding.
*   **Escenario**: El entorno de desarrollo (VS Code) donde ocurre la "actuación".
*   **Red de Comunicación**: La infraestructura de red que conecta a todos los participantes, tanto en tiempo real como de forma asíncrona.
*   **Maquinaria Teatral**: Los sistemas que dirigen la narrativa, gestionan los eventos y asisten a los actores.
*   **Control de Producción**: Herramientas para que los administradores supervisen y gestionen el "espectáculo".
*   **Protocolo Universal (MCP)**: La columna vertebral de IA y herramientas que dota de inteligencia y capacidades al ecosistema.
*   **Libreto y Mitología**: La base de conocimiento que contiene la narrativa, lore y guiones del universo.
