# Diagramas de CatTube

## 1. Arquitectura general

```mermaid
flowchart LR
    U["Usuario<br/>navegador o PWA instalada"] --> SHELL

    subgraph PWA["CatTube PWA (React)"]
        SHELL["App Shell<br/>Navbar y rutas"]
        PROFILE["Módulo Perfil"]
        SHORTS["Módulo Shorts"]
        SHARED["Shared<br/>componentes y apiClient"]
        SHELL --> PROFILE
        SHELL --> SHORTS
        PROFILE --> SHARED
        SHORTS --> SHARED
    end

    SHARED --> SW["Service Worker<br/>caché y modo offline"]
    SW -->|con conexión| API["API REST<br/>mock JSON ahora, Spring Boot después"]
    SW -.->|sin conexión| CACHE[("Cache Storage")]
    API --> DB[("PostgreSQL")]
```

## 2. Organización del código (feature-based)

```mermaid
flowchart TD
    MAIN["main.jsx"] --> APP["app/<br/>App Shell"]
    MAIN --> PWA["pwa/<br/>registro del Service Worker"]
    APP --> PROFILE["features/profile"]
    APP --> SHORTS["features/shorts"]
    PROFILE --> SHARED["shared/<br/>components, hooks, utils"]
    SHORTS --> SHARED
    SHARED --> API["services/apiClient.js"]
    STYLES["styles/<br/>variables, base, responsive"] --> APP
```

Regla de dependencias: los módulos de `features/` no se importan entre sí y solo usan `shared/`.

## 3. Flujo de navegación

```mermaid
flowchart LR
    A["Perfil<br/>/"] -->|clic en un short| B["Visor de shorts<br/>/shorts/:id"]
    B -->|flecha regresar| A
    B -->|anterior o siguiente| B
    A -->|pestaña| C["Acerca de"]
    C -->|pestaña Shorts| A
    A -.->|sin conexión y sin caché| D["Pantalla offline"]
    B -.->|sin conexión y sin caché| D
    D -->|Reintentar| A
```

## 4. Secuencia del Service Worker

```mermaid
sequenceDiagram
    actor U as Usuario
    participant P as PWA React
    participant SW as Service Worker
    participant C as Cache Storage
    participant API as API

    U->>P: Abre CatTube
    P->>SW: Registra el Service Worker
    SW->>C: Guarda el App Shell (evento install)
    U->>P: Abre el perfil
    P->>SW: GET /shorts
    alt Hay conexión
        SW->>API: GET /shorts
        API-->>SW: Lista de shorts
        SW->>C: Guarda una copia
        SW-->>P: Lista de shorts
    else Sin conexión
        SW->>C: Busca la última copia
        C-->>SW: Lista guardada
        SW-->>P: Lista guardada
    end
    P-->>U: Muestra los shorts
```

Si no hay conexión y tampoco hay copia, el Service Worker responde con `offline.html`.

## 5. Me gusta sin conexión (Background Sync)

```mermaid
sequenceDiagram
    actor U as Usuario
    participant P as PWA React
    participant SW as Service Worker
    participant API as API

    U->>P: Da me gusta sin conexión
    P->>P: Actualiza el contador en pantalla
    P->>SW: POST /shorts/1/like
    SW->>SW: No hay red, guarda la acción en cola
    Note over SW: Vuelve la conexión
    SW->>API: Reenvía POST /shorts/1/like
    API-->>SW: liked true y likes actualizados
```