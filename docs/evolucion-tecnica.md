# Evolución técnica de CatTube

## 1. Introducción

Este documento registra la evolución técnica de CatTube, la PWA del proyecto El loquito. Describe los principales cambios realizados desde la estructura inicial hasta la integración de videos y comentarios con el backend, incluyendo las fechas, los archivos involucrados y las pruebas realizadas.

La aplicación web se desarrolla con React y Vite. La comunicación con los servicios del proyecto se realiza mediante solicitudes HTTP al backend.

## 2. Historial cronológico

### 10 de octubre de 2026: estructura y planificación inicial

**Commits de referencia:** `ab45e04`, `0573f2d`, `5e88c70`, `a717086`, `bba8e4c`, `4f761a9`.

Se estableció la estructura inicial de la PWA siguiendo una organización SPA, App Shell y feature-based.

Se realizaron las siguientes actividades:

- Creación de carpetas para Perfil, Shorts, componentes compartidos, servicios, utilidades y estilos.
- Definición de las pantallas, sus datos, estados y endpoints propuestos.
- Elaboración de wireframes de escritorio.
- Creación de diagramas de arquitectura, navegación y funcionamiento del Service Worker.
- Preparación inicial de archivos para el manifest, Service Worker y registro de la PWA.
- Creación de archivos base para servicios y datos simulados.

**Motivo:** establecer una organización clara antes de comenzar la implementación de la interfaz y las funcionalidades.

### 16 de octubre de 2026: inicialización de React

**Commit de referencia:** `fe1f26c`.

Se inicializó el proyecto React utilizando Vite.

Se incorporaron los archivos de configuración, dependencias, estilos iniciales y punto de entrada de la aplicación.

**Motivo:** contar con una base funcional para desarrollar las pantallas de CatTube.

### 20 de octubre de 2026: implementación de Perfil y Shorts

**Commit de referencia:** `6e50de0`.

Se implementaron las pantallas principales de Perfil y Shorts.

Se agregaron componentes para:

- Información del perfil.
- Cuadrícula de videos.
- Reproductor de Shorts.
- Botones de interacción.
- Panel de comentarios.
- Navegación entre videos.
- Componentes visuales reutilizables.

En esta etapa se utilizaron datos locales y simulados para representar el funcionamiento de la plataforma.

**Motivo:** construir la experiencia visual y las interacciones principales antes de conectar los servicios reales.

### 22 de octubre de 2026: estados de interfaz y funcionamiento PWA

**Commits de referencia:** `72b5340`, `8ff7f50`, `70f8f18`, `b084934`.

Se incorporaron los estados de la interfaz y el soporte inicial para funcionamiento sin conexión.

Entre los cambios se encuentran:

- Estado de carga, error y ausencia de datos.
- Banner de conexión.
- Manifest de la PWA.
- Service Worker.
- Página de funcionamiento offline.
- Registro del Service Worker.
- Preparación de recursos y caché.

También se agregó la pantalla de Estadísticas, con tarjetas y gráficas para representar cohesión, seguidores, dinero e influencia.

**Motivo:** mejorar la experiencia de navegación, contemplar diferentes estados de la aplicación y ampliar las pantallas disponibles.

### 23 de octubre de 2026: configuración de Docker

**Commit de referencia:** `d769a4a`.

Se agregaron archivos de configuración para preparar un contenedor de CatTube:

- `Dockerfile`
- `.dockerignore`
- `nginx.conf`

Este cambio aparece registrado en la rama `practica/git-docker`.

**Motivo:** realizar la práctica de contenerización y preparar la aplicación para su ejecución mediante Docker.

### 27 de octubre de 2026: ajustes en Perfil

**Commit de referencia:** `0f01c7c`.

Se realizaron modificaciones en la pantalla de Perfil y en algunos componentes relacionados.

Se incorporaron imágenes para el avatar y la portada, además de ajustes en los estilos y componentes de Perfil y Shorts.

También se modificaron elementos de la pantalla de Estadísticas y del estado de error.

**Motivo:** mejorar la presentación visual y ajustar los componentes de la aplicación.

### 31 de octubre de 2026: mejoras offline y descarga de Android

**Commits de referencia:** `7f86676`, `617699f`.

Se mejoró el funcionamiento sin conexión y la detección del estado de conectividad.

Se modificaron elementos como:

- Service Worker.
- Hook de detección de conexión.
- Consulta y navegación de Shorts.
- Estados visuales de las pantallas.
- Archivo de comprobación de conexión.

También se agregó un modal para descargar la aplicación Android y se incorporó el archivo APK en `public/downloads/app-release.apk`.

**Motivo:** mejorar la experiencia cuando se pierde la conexión y facilitar el acceso a la versión Android.

### 8 de noviembre de 2026: integración de videos y comentarios con el backend

**Commit de referencia:** `7ebe19b`.

Se conectó la pantalla de Shorts con los servicios del backend para consultar y reproducir videos reales.

Se realizaron los siguientes cambios:

- Integración del cliente HTTP en `src/shared/services/apiClient.js`.
- Consulta de videos mediante `src/features/shorts/shortsService.js`.
- Adaptación de los datos recibidos del backend al formato utilizado por la interfaz.
- Reproducción de archivos de video mediante el reproductor HTML5.
- Creación de `src/features/shorts/commentsService.js`.
- Consulta de comentarios asociados a cada video.
- Publicación de comentarios mediante solicitudes al backend.
- Actualización de la interfaz después de publicar un comentario.
- Persistencia de comentarios en PostgreSQL.
- Mejoras visuales en los avatares, identificación del creador y componentes de comentarios.
- Ajustes en la configuración de Vite para la comprobación de conexión.

Los endpoints utilizados para los comentarios son:

| Método | Endpoint | Función |
|---|---|---|
| GET | `/api/videos` | Consultar videos. |
| GET | `/api/videos/{idVideo}/comentarios` | Consultar comentarios de un video. |
| POST | `/api/videos/{idVideo}/comentarios` | Publicar un comentario. |
| DELETE | `/api/videos/{idVideo}/comentarios/{idComentario}?idUsuario={idUsuario}` | Eliminar un comentario. |

**Motivo:** sustituir la dependencia de datos simulados por información consultada y almacenada mediante los servicios reales del proyecto.

## 3. Pruebas realizadas

Durante la integración del 8 de noviembre de 2026 se realizaron las siguientes comprobaciones:

| Prueba | Resultado |
|---|---|
| Compilación de producción con `npm run build` | Correcta |
| Consulta de videos desde el backend | Correcta |
| Reproducción de videos reales | Correcta |
| Visualización de comentarios | Correcta |
| Publicación de comentarios | Correcta |
| Actualización del comentario en pantalla | Correcta |
| Persistencia después de recargar la página | Correcta |
| Revisión de cambios con `git diff --check` | Correcta |

La compilación generó los recursos de producción y preparó los recursos de la PWA.

## 4. Control de versiones

Los cambios se gestionaron mediante Git y GitHub, utilizando ramas para organizar el desarrollo y commits para registrar las modificaciones.

El avance de integración de videos y comentarios quedó registrado con:

- **Rama:** `develop`
- **Commit:** `7ebe19b`
- **Mensaje:** `feat: integrar videos y comentarios con el backend`
- **Fecha:** 8 de noviembre de 2026
- **Archivos modificados:** 11
- **Inserciones:** 395
- **Eliminaciones:** 104

El commit fue enviado correctamente a `origin/develop`.

## 5. Organización de los proyectos

CatTube PWA y el proyecto Base se mantienen en repositorios independientes, de acuerdo con la organización establecida para el trabajo.

La PWA contiene la interfaz y los servicios de comunicación con el backend. El proyecto Base contiene los servicios del servidor y la administración de la base de datos PostgreSQL.

## 6. Estado de la evolución

Al 8 de noviembre de 2026, la PWA cuenta con las pantallas y componentes desarrollados durante las etapas anteriores, soporte offline, descarga de la aplicación Android e integración de videos y comentarios con el backend.

Este documento se actualizará conforme se incorporen nuevas funcionalidades y cambios al proyecto.
