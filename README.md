# CatTube – PWA de El loquito

Propuesta de arquitectura e interfaz de la **plataforma web** del proyecto integrador *El loquito* (Equipo Arcoiris, grupo IDGS102N, Universidad Tecnológica de Chihuahua).

> **Estado:** pre-proyecto. Este repositorio documenta la arquitectura, la estructura de carpetas, la estrategia PWA, el diseño de consumo de API y la interfaz modular UI/UX. El código funcional se desarrollará en las siguientes etapas.

10 de Octubre del 2026

## 1. Contexto

*El loquito* es un videojuego de estrategia narrativa y sátira social, parte de un ecosistema de tres plataformas conectadas:

| Plataforma | Tecnología | Función |
|---|---|---|
| Videojuego | Unity (C#) | Núcleo de la experiencia |
| Aplicación móvil | Flutter | Generación de contenido breve |
| **Plataforma web (este repo)** | **React (PWA)** | **Consulta y seguimiento del movimiento** |

**CatTube** es la plataforma ficticia de videos cortos dentro del universo del juego. En ella vive el canal de **El loquito**: la web permite ver su perfil, sus shorts, interactuar con ellos y consultar su alcance.

---

## 2. Componentes Clave de la Propuesta

### A. Consumo de API (Integración de endpoints)
La aplicación está diseñada para consumir datos remotos de manera asíncrona mediante un cliente HTTP centralizado (`src/shared/services/apiClient.js`), permitiendo la recuperación y renderizado dinámico de listas de datos.

| Endpoint | Propósito en la Interfaz |
|---|---|
| `GET /channel` | Recuperación de datos del perfil y métricas de suscriptores |
| `GET /shorts` | Obtención de la lista de videos cortos para renderizado dinámico |
| `GET /shorts/{id}` | Recuperación detallada de un short específico |
| `POST /shorts/{id}/like` | Envío de interacciones de usuario ("me gusta") |
| `POST /channel/subscribe` | Envío de acción de suscripción al canal |

- **Estrategia de transición:** En esta fase de pre-proyecto, los datos se estructuran mediante archivos JSON simulados ubicados en `public/mock/`. La arquitectura modular permite conectar el backend real (Spring Boot) cambiando únicamente las variables de entorno en el cliente API sin alterar los componentes visuales.

### B. Estrategia PWA (Soporte offline y segundo plano)
Se contempla la implementación de los elementos nativos de una Aplicación Web Progresiva para garantizar el funcionamiento sin conexión y tareas en segundo plano:
- **Manifiesto (`public/manifest.webmanifest`):** Define metadatos, modo `standalone`, colores corporativos e íconos de acceso directo (192px y 512px) para la instalación en dispositivos.
- **Service Workers (`public/service-worker.js`):** Interceptor de peticiones bajo las siguientes estrategias:
  * *Cache First:* Para elementos estáticos del App Shell (HTML, CSS, JS, íconos) asegurando carga instantánea.
  * *Network First:* Para los datos dinámicos de la API, respaldados con caché local ante pérdida de red.
  * *Página Offline (`public/offline.html`):* Respaldo visual automático cuando la navegación pierde conectividad.
- **Segundo plano (Background Sync propuesto):** Sincronización en cola para acciones de usuario (como dar "me gusta" sin conexión) para reintentar su envío al restablecerse el internet.

### C. Experiencia de Usuario (UI/UX y diseño modular)
El diseño se rige bajo una arquitectura modular por características (*feature-based*) utilizando JavaScript (ES Modules) y CSS modular:
- **Estructura Modular:** Aislamiento de responsabilidades en carpetas dedicadas (`src/features/profile/`, `src/features/shorts/`, `src/shared/`).
- **Diseño Adaptativo (`src/styles/responsive.css`):** Uso avanzado de CSS Grid y Flexbox para soportar tres vistas principales:
  * *Escritorio (> 1024px):* Panel lateral completo y cuadrícula de 5 columnas.
  * *Tablet (601px - 1024px):* Panel lateral compacto y cuadrícula de 3 columnas.
  * *Móvil (hasta 600px):* Barra de navegación inferior móvil y cuadrícula de 2 columnas.

---

## 3. Interfaz y Wireframes (UI/UX)
La documentación gráfica de las pantallas del sistema se encuentra alojada en la carpeta `docs/wireframes/`:
- **Perfil del canal:** Portada, avatar, datos, botón Suscribirse y grid de shorts.
- **Visor de shorts:** Reproductor vertical, interacciones y navegación.
- **Pantallas de estado y sin conexión:** Gestión visual de carga, errores y modo offline.

## 4. Diagramas de la Aplicación
*(Nota: Los diagramas de arquitectura general, flujos de navegación y secuencia del Service Worker se encuentran integrados en el repositorio dentro de `docs/diagramas/` o visualizados mediante Mermaid).*

## 5. Arquitectura del Proyecto

**SPA (Single Page Application) con App Shell.**
- **Reglas de dependencia:** Los módulos de `features/` no se cruzan entre sí; dependen exclusivamente de `shared/`, centralizando toda la lógica de red y utilidades.

### Estructura de carpetas actual
```text
el-loquito-web/
├── README.md
├── .gitignore
├── package.json              (se genera al inicializar el proyecto con Vite)
├── index.html                (único HTML de la SPA; lo genera Vite)
├── docs/
│   ├── datos-pantallas.md    (elementos, estados y endpoints por pantalla)
│   ├── diagramas/
│   └── wireframes/           (imágenes de interfaz de usuario)
├── public/
│   ├── manifest.webmanifest
│   ├── service-worker.js
│   ├── offline.html
│   ├── icons/
│   └── mock/                 (datos estructurados para la API mock)
└── src/
    ├── app/                  (App Shell y layout base)
    │   └── layout/
    ├── features/
    │   ├── profile/          (Módulo de perfil del canal)
    │   └── shorts/           (Módulo de visor vertical de videos)
    ├── shared/
    │   ├── components/       (Componentes reutilizables)
    │   ├── services/         (apiClient.js)
    │   ├── hooks/
    │   └── utils/            (format.js para datos crudos)
    ├── pwa/                  (registerSW.js)
    ├── styles/               (variables.css y responsive.css)
    └── assets/