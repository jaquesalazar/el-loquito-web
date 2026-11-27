# Evolución técnica de CatTube

## 1. Introducción

Este documento registra la evolución técnica de CatTube, la plataforma web progresiva (PWA) del proyecto *They Are Not Pigeons*. Se describen los principales cambios realizados durante su desarrollo, desde la propuesta inicial de arquitectura e interfaz hasta la integración de funcionalidades, conexión con el backend, almacenamiento local y pruebas de funcionamiento.

El propósito es mostrar cómo evolucionó la aplicación, qué tecnologías y estructuras se incorporaron y cómo se fueron ampliando sus funcionalidades de acuerdo con las necesidades del proyecto.

---

## 2. Evolución del desarrollo

### 10 de octubre de 2026 – Planeación y propuesta inicial

Se estableció la propuesta de arquitectura e interfaz de CatTube, definiendo su funcionamiento como una aplicación de una sola página (SPA), con una estructura visual basada en App Shell y una organización modular por características.

También se plantearon las principales pantallas de la plataforma, entre ellas el perfil del canal, el visor de shorts y las pantallas de estado y desconexión. Se definió una primera propuesta de consumo de API, así como la estrategia PWA para permitir la instalación y contemplar el funcionamiento sin conexión.

En esta etapa se elaboraron los wireframes, diagramas y la estructura inicial de carpetas.

### 16 de octubre de 2026 – Configuración del proyecto

Se inició la implementación de la aplicación utilizando React y Vite. Se configuró el entorno de desarrollo y se estableció la estructura base del proyecto, separando los componentes generales de las funcionalidades principales.

Esta organización permitió comenzar el desarrollo de las diferentes secciones de manera independiente.

### 20 de octubre de 2026 – Desarrollo del perfil y los shorts

Se comenzó con la implementación de las pantallas principales de CatTube.

Se desarrolló el perfil del canal, incorporando sus elementos visuales y la cuadrícula de videos. También se trabajó en el visor de shorts, con reproducción vertical, navegación e interacciones.

Durante esta etapa se utilizaron datos locales y de prueba para construir y revisar la interfaz antes de completar la conexión con el backend.

### 22 de octubre de 2026 – Estados de interfaz y configuración PWA

Se incorporaron diferentes estados visuales de la aplicación, como carga, errores y ausencia de conexión.

También se trabajó en la configuración de los elementos principales de la PWA, incluyendo el manifiesto, el Service Worker y la página de respaldo para el modo sin conexión.

Durante esta etapa se incorporó la estructura visual inicial de la sección de estadísticas, destinada a mostrar información relacionada con seguidores, dinero y cohesión. Su integración con los datos del jugador y el backend se desarrolló en etapas posteriores.

### 23 de octubre de 2026 – Configuración de Docker

Se incorporaron archivos de configuración relacionados con Docker, como parte de los recursos para preparar el entorno del proyecto y facilitar su ejecución.

### 27 de octubre de 2026 – Ajustes visuales

Se realizaron modificaciones en la interfaz para mejorar la presentación de los elementos y mantener una distribución adecuada en las diferentes resoluciones de pantalla.

Estos ajustes permitieron continuar refinando la experiencia visual de CatTube.

### 31 de octubre de 2026 – Mejoras iniciales del funcionamiento sin conexión

Se trabajó en el comportamiento de la aplicación cuando se pierde la conexión a internet.

Se incorporaron mecanismos para identificar el estado de conectividad, recuperar recursos almacenados y mostrar información relacionada con la disponibilidad del servidor.

También se realizaron ajustes para permitir el acceso a determinados videos previamente guardados y se integraron recursos relacionados con la descarga de la aplicación móvil.

### 8 de noviembre de 2026 – Integración de videos y comentarios

Se avanzó en la conexión de CatTube con el backend desarrollado en Spring Boot y la base de datos PostgreSQL.

Se incorporó un cliente HTTP centralizado y se adaptaron los servicios de la aplicación para recuperar los videos asignados a cada jugador y consultar sus comentarios.

También se implementó la comunicación necesaria para registrar nuevos comentarios y recuperar los que ya se encontraban almacenados en la base de datos.

### Etapas posteriores – Estadísticas, progreso e interacciones

Se amplió la integración entre la PWA y el backend para trabajar con el progreso individual de los jugadores en los videos.

Se incorporaron funcionalidades relacionadas con likes, vistas y comentarios, además del seguimiento de las estadísticas del jugador, como seguidores, dinero y cohesión.

También se trabajó en la sincronización de las interacciones realizadas sin conexión, de manera que determinados registros almacenados localmente pudieran enviarse al servidor cuando se recuperara la conectividad.

### Etapas posteriores – Mejoras del funcionamiento offline

Se reforzó el almacenamiento local mediante el uso de Cache Storage, IndexedDB y localStorage.

Se trabajó en la recuperación de videos previamente almacenados, la conservación local de comentarios y el registro de interacciones durante periodos sin conexión.

Además, se incorporaron mecanismos para diferenciar el estado de la conexión a internet del estado de disponibilidad del backend, permitiendo mostrar mensajes adecuados según cada situación.

### Etapas posteriores – Preparación y despliegue de la PWA

Se realizaron ajustes en la configuración de producción y en los recursos necesarios para preparar la aplicación como PWA.

Se revisó el proceso de compilación, la generación de recursos y la preparación de los archivos necesarios para su instalación y funcionamiento.

---

## 3. Organización técnica

Durante el desarrollo se mantuvo el enfoque de SPA con App Shell planteado desde el pre-proyecto. La organización modular también se conservó y se amplió conforme se incorporaron nuevas funcionalidades.

Estos conceptos cumplen funciones diferentes y complementarias: la SPA define el comportamiento de navegación, el App Shell establece la estructura visual principal y la arquitectura modular organiza el código por funcionalidades.

La estructura del proyecto se fue ampliando para separar las responsabilidades de cada sección:

| Carpeta                 | Responsabilidad                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `src/features/profile/` | Funcionalidades relacionadas con el perfil del canal y la presentación de sus videos.    |
| `src/features/shorts/`  | Reproducción de shorts, interacciones, comentarios y seguimiento del progreso.           |
| `src/features/stats/`   | Visualización y consulta de las estadísticas del jugador.                                |
| `src/shared/services/`  | Servicios compartidos, comunicación con el backend y manejo de solicitudes HTTP.         |
| `src/pwa/`              | Registro y configuración relacionada con el Service Worker.                              |
| `public/`               | Recursos públicos, manifiesto, íconos, página offline y archivos necesarios para la PWA. |
| `scripts/`              | Scripts auxiliares para preparar los recursos de la aplicación.                          |

Esta organización permitió agregar nuevas secciones sin concentrar toda la lógica en un solo lugar y facilitó el mantenimiento de la aplicación.

---

## 4. Pruebas realizadas

Durante el desarrollo se realizaron pruebas para verificar tanto la interfaz como la comunicación entre CatTube y el backend.

Entre las principales comprobaciones se encuentran:

- **Interfaz:** revisión de las pantallas de perfil, shorts, estadísticas y navegación en diferentes tamaños de pantalla.
- **Compilación:** ejecución de `npm run build` para comprobar que la aplicación pudiera generarse correctamente para producción.
- **Conexión con el backend:** consulta del endpoint de salud para verificar la disponibilidad del servidor.
- **Videos:** recuperación de los videos asignados al jugador y comprobación de su reproducción.
- **Comentarios:** consulta y registro de comentarios, verificando su almacenamiento en la base de datos.
- **Likes:** registro de interacciones y conservación de los datos durante periodos sin conexión.
- **Vistas:** registro de reproducciones y posterior sincronización con el backend.
- **Funcionamiento offline:** recuperación de recursos y videos previamente almacenados, además de la conservación local de comentarios e interacciones.
- **Estadísticas:** consulta y visualización de la información correspondiente al progreso del jugador.

En las pruebas de funcionamiento sin conexión se comprobó que la aplicación podía conservar determinadas interacciones localmente y sincronizarlas posteriormente. Como parte de estas comprobaciones, se registraron y después se sincronizaron seis vistas, se conservaron likes y un comentario durante la desconexión, y se almacenaron tres videos para su recuperación local.

Estas pruebas permitieron comprobar que las funcionalidades principales continuaban disponibles en distintos escenarios de conectividad.

---

## 5. Organización de repositorios

El desarrollo se organizó en dos repositorios independientes para separar la aplicación web de la lógica del servidor.

| Repositorio                   | Función                                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `jaquesalazar/el-loquito-web` | Contiene el desarrollo de CatTube, su interfaz, funcionalidades y configuración PWA.                |
| `jaquesalazar/base-loquito`   | Contiene el backend desarrollado con Spring Boot y la integración con PostgreSQL mediante Supabase. |

Ambos repositorios mantienen su propio control de versiones y proceso de desarrollo. La comunicación entre ellos se realiza mediante los endpoints de la API.

---

## 6. Estado actual del proyecto

Como resultado de las etapas de desarrollo, CatTube cuenta con las siguientes funcionalidades:

- Interfaz web adaptable a diferentes tamaños de pantalla.
- Perfil del canal y cuadrícula de shorts.
- Reproducción de videos e interacciones.
- Registro de likes, vistas y comentarios.
- Consulta de estadísticas del jugador.
- Integración con el backend y la base de datos PostgreSQL.
- Identificación del estado de conexión a internet y disponibilidad del servidor.
- Almacenamiento local de determinados recursos e interacciones.
- Recuperación de videos previamente almacenados.
- Preparación de la aplicación como PWA para su instalación y uso.

La aplicación mantiene una organización modular y una separación entre el frontend y el backend, lo que permite continuar incorporando funcionalidades sin modificar por completo la estructura existente.

---

## 7. Conclusión

El desarrollo de CatTube pasó de una propuesta inicial de arquitectura e interfaz a una aplicación web progresiva con funcionalidades integradas y comunicación con un backend.

Durante este proceso se mantuvo el planteamiento de SPA con App Shell y se amplió la organización modular para incorporar nuevas secciones, como estadísticas, interacciones y almacenamiento local.

Las pruebas realizadas permitieron verificar la reproducción de videos, el registro de interacciones, la persistencia de comentarios y la recuperación de recursos sin conexión. Asimismo, la integración con Spring Boot y PostgreSQL permitió conectar las funcionalidades de la aplicación con la información almacenada en el servidor.

De esta manera, CatTube evolucionó de un diseño inicial a una plataforma funcional dentro del proyecto *They Are Not Pigeons*, con una estructura preparada para continuar creciendo y mejorando.
