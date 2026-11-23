# They Are Not Pigeons

## Equipo “Arcoiris”

| Integrante | Matrícula |
|---|---|
| Erick Noel Aguilar Chavarria | 1123150103 |
| Valeria Castillo López | 1122150036 |
| Alexandro De la Vega Rodríguez | 1123150120 |
| Ana Sofia Pérez Ortega | 1123150060 |
| Jaqueline Salazar Rivera | 1123150100 |
| Moira Villalobos Hinojos | 1123150011 |

**Grupo:** IDGS102N  
**Institución:** Universidad Tecnológica de Chihuahua

---

# CatTube – Aplicación web progresiva (PWA)

## 1. Descripción del proyecto

**They Are Not Pigeons** es un videojuego de estrategia narrativa que incorpora diferentes elementos y plataformas dentro de su universo. Entre ellos se encuentra **CatTube**, una plataforma ficticia de videos cortos inspirada en servicios como YouTube.

Este repositorio contiene el desarrollo de CatTube como una aplicación web progresiva (PWA), utilizando React y conectándose a un Backend independiente que administra la información y su almacenamiento en PostgreSQL.

La aplicación permite identificar a los jugadores, consultar sus perfiles, visualizar videos, registrar interacciones y revisar estadísticas relacionadas con su actividad dentro de la plataforma.

## 2. Objetivo

Desarrollar una aplicación web progresiva que represente el funcionamiento de CatTube dentro del universo de They Are Not Pigeons.

El propósito es ofrecer una plataforma organizada y adaptable a diferentes dispositivos, en la que los jugadores puedan consultar contenido e interactuar con los videos. Además, se busca mantener la información mediante la comunicación con el Backend e incorporar mecanismos que permitan conservar algunas funcionalidades cuando no se dispone de conexión a Internet.

## 3. Tecnologías utilizadas

Durante el desarrollo se utilizaron diferentes tecnologías y herramientas, considerando tanto los requisitos establecidos por el docente como las necesidades del proyecto.

| Tecnología | Uso y motivo de implementación |
|---|---|
| React | Se utilizó para construir las interfaces mediante componentes reutilizables y mantener organizadas las diferentes pantallas de CatTube. |
| JavaScript | Se empleó para desarrollar la lógica de la aplicación, gestionar las interacciones y comunicar las pantallas con los servicios del Backend. |
| Vite | Se utilizó como herramienta de desarrollo y compilación por su rapidez y facilidad para trabajar con React. |
| CSS | Se empleó para definir los estilos, la distribución de los elementos y la adaptación visual de las pantallas. |
| Node.js | Se utilizó como entorno necesario para ejecutar las herramientas de desarrollo y los procesos del proyecto. |
| npm | Permitió instalar, administrar y ejecutar las dependencias y los comandos configurados en el proyecto. |
| Service Worker | Se incorporó para administrar recursos almacenados y permitir que determinadas partes de la aplicación estén disponibles sin conexión. |
| Web App Manifest | Se utilizó para definir la información de CatTube como aplicación web progresiva y permitir su instalación en dispositivos compatibles. |
| Local Storage e IndexedDB | Se emplearon para conservar información en el navegador y apoyar algunas funcionalidades cuando no hay conexión. |
| API REST | Se utilizó para establecer la comunicación entre la PWA y los servicios del Backend. |
| PostgreSQL | Se utiliza como sistema de gestión de base de datos para almacenar y consultar la información del proyecto desde el Backend. |
| Git y GitHub | Se utilizaron para llevar el control de versiones, registrar los avances y mantener organizado el desarrollo del proyecto. |

Algunas tecnologías y características, como React y el desarrollo de una PWA, formaron parte de los requisitos indicados para el proyecto por el docente. Otras herramientas, como Vite, Node.js y npm, se utilizaron para facilitar la configuración, el desarrollo y la compilación de la aplicación.

## 4. Desarrollo de la aplicación

El desarrollo de CatTube se organizó en módulos para mantener separadas sus funcionalidades y facilitar el trabajo sobre cada una de las pantallas. Durante el proceso se trabajó en la estructura general, la conexión con el Backend, el almacenamiento de información y la adaptación de la aplicación para su funcionamiento como PWA.

### 4.1. Inicialización y estructura del proyecto

Se inició el proyecto utilizando React y Vite. Posteriormente, se organizó la estructura de carpetas para separar las pantallas principales, los componentes reutilizables y los servicios compartidos.

Esta organización permitió trabajar en cada módulo sin concentrar toda la funcionalidad en un solo archivo.

**Archivos principales:**

- `src/App.jsx`: integración general de las pantallas.
- `src/features/`: contiene los módulos principales de la aplicación.
- `src/shared/`: reúne componentes, hooks y servicios compartidos.
- `src/main.jsx`: punto de entrada de la aplicación.

**Pruebas realizadas:**

- Instalación de las dependencias.
- Inicio de la aplicación en el entorno local.
- Verificación de la carga de las pantallas.
- Comprobación de la estructura general del proyecto.

### 4.2. Username – Identificación del jugador

Se desarrolló la pantalla de identificación para permitir que el jugador ingrese mediante su nombre de usuario. Esta sección se conectó con el Backend para registrar o recuperar la información correspondiente y relacionar las operaciones posteriores con el jugador identificado.

**Archivos principales:**

- `src/features/username/UsernamePage.jsx`
- `src/features/username/usernameService.js`

**Pruebas realizadas:**

- Identificación mediante nombre de usuario.
- Consulta de información del jugador.
- Verificación de la conservación de la sesión.
- Comprobación del identificador utilizado en las consultas posteriores.

### 4.3. Profile – Perfil del creador

Se desarrolló la pantalla de perfil para mostrar la información del creador y los videos asociados a su cuenta. Se incorporó la consulta de información desde el Backend y la presentación de las publicaciones mediante una cuadrícula de videos.

Esta sección permite consultar los datos principales del jugador y visualizar el contenido que forma parte de su perfil.

**Archivos principales:**

- `src/features/profile/ProfilePage.jsx`
- `src/features/profile/data.js`
- `src/features/profile/components/ShortsGrid.jsx`
- `src/features/profile/components/ShortCard.jsx`

**Pruebas realizadas:**

- Consulta de la información del perfil.
- Recuperación de los videos asociados al creador.
- Verificación de las métricas mostradas.
- Comprobación de la presentación de las publicaciones.
- Revisión de los estados de carga, error y ausencia de contenido.

### 4.4. Shorts – Visualización e interacción con videos

Se desarrolló la pantalla Shorts para consultar y reproducir los videos disponibles en CatTube. En esta sección se incorporó la recuperación de información desde el Backend, incluyendo los títulos, descripciones, hashtags y métricas de las publicaciones.

También se trabajó en las interacciones principales de la plataforma, permitiendo registrar likes, vistas, comentarios y compartidos. Además, se incorporó el seguimiento del progreso individual de los jugadores en los videos.

**Funcionalidades principales:**

- **Likes:** registro de reacciones en los videos.
- **Vistas:** registro de las visualizaciones realizadas.
- **Comentarios:** consulta y publicación de comentarios.
- **Compartidos:** representación del contador de veces que se comparte un video.
- **Progreso individual:** seguimiento de las interacciones de cada jugador con los videos.
- **Navegación:** desplazamiento entre los diferentes videos disponibles.

**Archivos principales:**

- `src/features/shorts/ShortsPage.jsx`
- `src/features/shorts/shortsService.js`
- `src/features/shorts/viewsStorage.js`
- `src/features/shorts/commentsService.js`
- `src/features/shorts/commentsStorage.js`
- `src/features/shorts/components/ShortPlayer.jsx`
- `src/features/shorts/components/ActionButtons.jsx`
- `src/features/shorts/components/CommentsPanel.jsx`

**Pruebas realizadas:**

- Consulta y reproducción de videos.
- Registro de likes y vistas.
- Consulta y publicación de comentarios.
- Verificación del progreso individual.
- Comprobación del almacenamiento local.
- Revisión de la reproducción de recursos previamente almacenados.

### 4.5. Stats – Estadísticas del jugador

Se desarrolló la pantalla Stats para presentar información relacionada con la actividad del jugador dentro de CatTube.

En esta sección se incorporó la consulta de métricas desde el Backend y su representación mediante tarjetas y gráficas, facilitando la visualización de los datos relacionados con la cohesión, los seguidores y el dinero del jugador.

**Archivos principales:**

- `src/features/stats/StatsPage.jsx`
- `src/features/stats/statsService.js`
- `src/features/stats/useStats.js`
- `src/features/stats/StatCard.jsx`
- `src/features/stats/CohesionChart.jsx`
- `src/features/stats/FollowersChart.jsx`
- `src/features/stats/MoneyChart.jsx`

**Pruebas realizadas:**

- Consulta de las estadísticas del jugador.
- Verificación de los datos recibidos desde el Backend.
- Comprobación de la presentación de tarjetas y gráficas.
- Revisión de la información correspondiente al jugador identificado.

### 4.6. Integración con el Backend

Una parte importante del desarrollo consistió en establecer la comunicación entre CatTube y el Backend mediante servicios REST.

Esta integración permitió que la aplicación consultara y enviara información relacionada con los usuarios, videos, interacciones, comentarios y estadísticas. De esta manera, la información puede ser administrada y almacenada mediante los servicios del Backend y PostgreSQL.

También se incorporó un mecanismo para comprobar la disponibilidad del servicio y detectar posibles problemas de conexión.

**Archivos principales:**

- `src/shared/services/apiClient.js`: comunicación general con el Backend.
- `src/shared/hooks/useBackendStatus.js`: verificación de disponibilidad del servicio.
- `src/features/username/usernameService.js`: operaciones relacionadas con los usuarios.
- `src/features/shorts/shortsService.js`: operaciones relacionadas con los videos.
- `src/features/shorts/commentsService.js`: operaciones relacionadas con los comentarios.
- `src/features/stats/statsService.js`: operaciones relacionadas con las estadísticas.

**Pruebas realizadas:**

- Verificación de la disponibilidad del Backend.
- Consulta de información desde la PWA.
- Comprobación de las respuestas de los servicios.
- Revisión del registro y recuperación de información.
- Identificación de errores cuando el Backend no se encuentra disponible.

### 4.7. Funcionamiento sin conexión y sincronización

Se incorporaron mecanismos para que CatTube pudiera conservar parte de su funcionamiento cuando el dispositivo pierde la conexión a Internet.

Para ello, se trabajó en la detección del estado de conexión, el almacenamiento local de información y la recuperación de recursos previamente consultados. También se implementó el registro de vistas pendientes para enviarlas al Backend cuando se restablece la conexión.

Estas funcionalidades permiten mejorar la continuidad de uso de la aplicación, aunque algunas operaciones siguen dependiendo de la disponibilidad del Backend.

**Archivos principales:**

- `src/shared/hooks/useOnlineStatus.js`: detección del estado de conexión.
- `src/shared/components/OfflineBanner.jsx`: aviso cuando no existe conexión.
- `src/features/shorts/viewsStorage.js`: almacenamiento local de vistas.
- `src/features/shorts/commentsStorage.js`: almacenamiento local de comentarios.
- `public/service-worker.js`: administración de recursos y caché.
- `public/offline.html`: página de respaldo sin conexión.
- `src/pwa/registerSW.js`: registro del Service Worker.

**Pruebas realizadas:**

- Detección de pérdida y recuperación de conexión.
- Verificación de los recursos almacenados.
- Recuperación de información local.
- Revisión de la reproducción de videos previamente almacenados.
- Registro de vistas sin conexión.
- Comprobación de la sincronización de vistas pendientes al recuperar la conexión.

### 4.8. Configuración de la PWA

Se realizaron los ajustes necesarios para que CatTube pudiera funcionar como una aplicación web progresiva.

Se incorporaron el manifiesto de la aplicación, los iconos y el Service Worker, permitiendo preparar la instalación desde navegadores compatibles y administrar los recursos necesarios para su funcionamiento.

**Archivos principales:**

- `public/manifest.webmanifest`: configuración general de la aplicación.
- `public/icons/`: iconos utilizados por la PWA.
- `public/service-worker.js`: administración de recursos y caché.
- `src/pwa/registerSW.js`: registro del Service Worker.
- `scripts/prepare-pwa.js`: preparación de recursos para producción.

**Pruebas realizadas:**

- Verificación del manifiesto.
- Comprobación de los iconos.
- Registro y activación del Service Worker.
- Revisión de la instalación de CatTube como aplicación independiente.
- Comprobación de los recursos disponibles sin conexión.

### 4.9. Limpieza y mantenimiento

Durante las últimas etapas se realizó una revisión de la estructura del proyecto para identificar archivos de prueba, recursos innecesarios y referencias que ya no correspondían a la implementación actual.

Se conservaron los archivos utilizados por los módulos principales, los componentes compartidos y la configuración necesaria para el funcionamiento de la PWA.

**Directorios revisados:**

- `src/features/`
- `src/shared/`
- `src/pwa/`
- `public/`
- `scripts/`

**Pruebas realizadas:**

- Revisión de referencias a archivos eliminados.
- Comprobación de la estructura del proyecto.
- Compilación posterior a los cambios.
- Verificación de que los módulos continuaran funcionando.

## 5. Métodos utilizados

Durante el desarrollo de CatTube se utilizaron diferentes métodos para organizar el trabajo, comunicar los componentes de la aplicación y administrar la información.

### 5.1. Desarrollo modular

Se dividió la aplicación en módulos independientes, como Username, Profile, Shorts y Stats. Cada uno cuenta con sus propios componentes y servicios, lo que permitió desarrollar y modificar sus funcionalidades de manera organizada.

### 5.2. Comunicación mediante API REST

Se utilizó una arquitectura de comunicación entre cliente y servidor. La PWA realiza solicitudes HTTP al Backend para consultar o enviar información, mientras que el Backend procesa las operaciones y se comunica con PostgreSQL.

Para realizar estas operaciones se utilizaron los siguientes métodos HTTP:

| Método | Uso dentro de CatTube |
|---|---|
| GET | Consultar información de usuarios, videos, progreso, comentarios e historial de estadísticas. |
| POST | Identificar al jugador, registrar likes, registrar vistas y publicar comentarios. |
| DELETE | Eliminar comentarios. |

Las solicitudes se realizan desde los servicios de cada módulo mediante el cliente de comunicación ubicado en `src/shared/services/apiClient.js`. Este utiliza `fetch` para enviar las peticiones al Backend.

No se utilizaron métodos PUT ni PATCH en los servicios revisados de la PWA.

### 5.3. Persistencia de información

Se utilizaron diferentes mecanismos de almacenamiento dependiendo del tipo de información y de su disponibilidad:

- **PostgreSQL:** almacenamiento principal de los datos administrados por el Backend.
- **Local Storage:** conservación de información en el navegador.
- **IndexedDB:** almacenamiento local de datos que requieren una administración más amplia.
- **Cache Storage:** conservación de recursos para facilitar su recuperación sin conexión.

### 5.4. Desarrollo incremental

La aplicación se construyó por etapas. Primero se preparó la estructura general y después se incorporaron las pantallas y funcionalidades de manera progresiva.

Esto permitió revisar los avances, corregir problemas y realizar modificaciones sin tener que desarrollar toda la aplicación al mismo tiempo.

### 5.5. Pruebas funcionales y de integración

Se realizaron verificaciones sobre las funcionalidades de la PWA y su comunicación con el Backend. También se revisó el comportamiento de la aplicación ante situaciones como la pérdida de conexión, la recuperación de recursos y la disponibilidad de los servicios.

## 6. Pruebas generales del proyecto

Además de las verificaciones realizadas durante el desarrollo de cada módulo, se ejecutaron pruebas generales para revisar la compilación y el comportamiento de la aplicación.

### 6.1. Compilación del proyecto

Para comprobar que la aplicación pudiera prepararse para producción, se ejecutó el siguiente comando:

```bash
npm run build
```

Este comando ejecuta el proceso de compilación de Vite y posteriormente el script `scripts/prepare-pwa.js`, encargado de preparar los recursos de la PWA.

La compilación se realizó correctamente utilizando Vite 8.3.4.

**Resultados obtenidos:**

| Elemento | Resultado |
|---|---:|
| Versión de Vite | 8.3.4 |
| Módulos transformados | 72 |
| Tamaño de `dist/index.html` | 1.14 kB |
| Tamaño del CSS generado | 53.16 kB |
| Tamaño del JavaScript generado | 293.00 kB |
| Recursos incluidos en la PWA | 14 |
| Tiempo de compilación | 625 ms |
| Estado | Correcto |

Al finalizar, el proceso mostró los siguientes resultados:

```text
✓ built in 625ms
PWA preparada: 14 recursos incluidos.
Versión de caché: cattube-static-2f6537bafd11
```

Los archivos generados se almacenaron en la carpeta `dist/`, y se confirmó que la preparación de los recursos de la PWA finalizó correctamente.

### 6.2. Verificación del almacenamiento local

Se revisaron los mecanismos de almacenamiento disponibles en el navegador mediante las herramientas de desarrollador.

Se verificaron los siguientes recursos:

- **Cache Storage:** almacenamiento de recursos estáticos y multimedia.
- **Local Storage:** conservación de información utilizada por los módulos.
- **IndexedDB:** almacenamiento de información para determinadas operaciones sin conexión.

También se revisó el comportamiento de la información pendiente de sincronización.

### 6.3. Pruebas de conectividad

Se comprobó el comportamiento de la aplicación al perder y recuperar la conexión a Internet.

Durante estas verificaciones se revisó la disponibilidad de los recursos almacenados, la presentación de los avisos de conexión y la comunicación con el Backend después de recuperar el servicio.

## 7. Control de versiones

Para organizar el desarrollo se utilizó Git como herramienta de control de versiones y GitHub como plataforma de alojamiento del repositorio.

Se trabajó con dos ramas principales:

| Rama | Propósito |
|---|---|
| `main` | Mantener la versión principal del proyecto. |
| `develop` | Integrar los cambios realizados durante el desarrollo. |

Durante el proceso se crearon ramas independientes para trabajar en cada nueva funcionalidad, modificación o mejora de la aplicación. Esto permitió mantener los cambios organizados y evitar trabajar directamente sobre la versión principal mientras una funcionalidad se encontraba en desarrollo.

Una vez terminados los cambios, se registraron mediante commits y se integraron en las ramas principales después de revisar su funcionamiento.

### 7.1. Flujo de trabajo

El proceso de trabajo con Git se realizó de la siguiente manera:

1. Crear una rama para desarrollar una funcionalidad o modificación.
2. Realizar los cambios correspondientes.
3. Registrar los avances mediante commits.
4. Integrar los cambios en la rama `develop`.
5. Verificar que la integración se realizara correctamente.
6. Incorporar los cambios de `develop` en `main`.
7. Actualizar el repositorio remoto en GitHub.

## 8. Instalación y ejecución

Para ejecutar CatTube en un entorno local es necesario contar con Node.js, npm, Git y un navegador web compatible.

### 8.1. Clonar el repositorio

```bash
git clone https://github.com/jaquesalazar/el-loquito-web.git
```

### 8.2. Ingresar a la carpeta del proyecto

```bash
cd el-loquito-web
```

### 8.3. Instalar las dependencias

```bash
npm install
```

### 8.4. Configurar la conexión con el Backend

La PWA necesita conocer la dirección del Backend para realizar las solicitudes HTTP.

Se debe configurar la dirección correspondiente al servicio en la configuración utilizada por el proyecto.

En el entorno local, el Backend se ejecuta en el puerto `8080`.

Las credenciales de la base de datos se administran desde el Backend y no deben incluirse en el repositorio de la PWA.

### 8.5. Ejecutar el proyecto

Para iniciar la aplicación en modo de desarrollo se utiliza:

```bash
npm run dev
```

Vite mostrará la dirección local desde la cual se podrá acceder a CatTube mediante el navegador.

### 8.6. Generar la compilación de producción

```bash
npm run build
```

Los archivos generados se almacenan en la carpeta `dist/`.

## 9. Organización de los repositorios

El desarrollo de They Are Not Pigeons se encuentra organizado mediante repositorios independientes para mantener separadas las responsabilidades de cada componente.

### CatTube – PWA

Contiene la aplicación web, sus pantallas, componentes, estilos, servicios de comunicación y configuración como aplicación web progresiva.

**Repositorio:**

https://github.com/jaquesalazar/el-loquito-web

### Backend – Base

Contiene los servicios encargados de administrar la información, realizar las operaciones correspondientes y comunicarse con la base de datos PostgreSQL.

**Repositorio:**

https://github.com/jaquesalazar/base-loquito

Ambos repositorios se mantienen separados durante el desarrollo. La PWA consume los servicios proporcionados por el Backend mediante solicitudes HTTP, mientras que este último se encarga de procesar y almacenar la información.

## 10. Conclusión

Durante el desarrollo de CatTube se estableció una estructura modular que permitió organizar e implementar las principales funcionalidades de la plataforma.

Se trabajó en los módulos Username, Profile, Shorts y Stats, incorporando la identificación de jugadores, la consulta de perfiles, la visualización de videos, el registro de interacciones y la presentación de estadísticas.

También se realizó la integración con el Backend para consultar y administrar la información almacenada en PostgreSQL. De igual manera, se incorporaron mecanismos de almacenamiento local, detección de conectividad y recuperación de recursos para mejorar la disponibilidad de la aplicación cuando no existe conexión a Internet.

Finalmente, se realizaron verificaciones de ejecución, compilación, comunicación con el Backend y funcionamiento offline. El uso de Git y GitHub permitió mantener un historial organizado de los cambios y facilitar el trabajo sobre los diferentes módulos.

Como resultado, CatTube cuenta con una aplicación web progresiva integrada al universo de **They Are Not Pigeons**, cuya estructura permite continuar desarrollando y mejorando sus funcionalidades junto con los demás componentes del proyecto.