# Definición de pantallas y datos – CatTube

CatTube es la plataforma ficticia de videos cortos del universo de *El loquito*. Este documento define qué elementos y datos tiene cada pantalla de la PWA (versión escritorio).

## Pantalla 1: Perfil (`/`)

| Elemento | Dato | Ejemplo |
|---|---|---|
| Portada | imagen | `portada.jpg` |
| Avatar | imagen | `loquito.png` |
| Nombre | texto | El loquito |
| Usuario | texto | @elloquito |
| Suscriptores | número | 12,400 (se muestra "12.4K") |
| Total de shorts | número | 8 |
| Botón Suscribirse | estado | suscrito / no suscrito |
| Pestañas | navegación | Shorts / Acerca de |
| Cuadrícula de shorts | lista | miniatura vertical, vistas y likes |

Interacciones: suscribirse o cancelar, clic en un short para abrir el visor.

## Pantalla 2: Visor de shorts (`/shorts/:id`)

| Elemento | Dato |
|---|---|
| Video | URL del archivo |
| Título | texto |
| Autor | @elloquito |
| Likes | número |
| Estado de me gusta | dado / no dado |
| Botones | me gusta, compartir, guardar, anterior, siguiente, regresar al perfil |

## Pantalla 3: Sin conexión

| Elemento | Dato |
|---|---|
| Mensaje | "Sin conexión" |
| Botón | Reintentar |
| Contenido guardado | shorts disponibles en caché |

## Panel de navegación (App Shell)

Logo de CatTube, Perfil, Shorts, Guardados, Instalar app e indicador de conexión (En línea / Sin conexión).

## Estados de la interfaz

| Estado | Cómo se muestra |
|---|---|
| Cargando | Esqueleto gris de las tarjetas |
| Error | Mensaje con botón Reintentar |
| Sin datos | "Aún no hay shorts" |
| Sin conexión | Franja de aviso superior |

## Endpoints

| Endpoint | Para qué |
|---|---|
| `GET /channel` | Datos del perfil |
| `GET /shorts` | Lista de shorts del perfil |
| `GET /shorts/{id}` | Datos de un short |
| `POST /shorts/{id}/like` | Dar me gusta |
| `POST /channel/subscribe` | Suscribirse |

### Ejemplo: `GET /channel`

```json
{
  "id": 1,
  "name": "El loquito",
  "username": "@elloquito",
  "avatar": "assets/loquito.png",
  "cover": "assets/portada.jpg",
  "bio": "Escucha, que esto es importante.",
  "subscribers": 12400,
  "totalShorts": 8,
  "isSubscribed": false
}
```

### Ejemplo: `GET /shorts`

```json
[
  {
    "id": 1,
    "title": "Discurso en la plaza",
    "thumbnail": "assets/thumbs/01.jpg",
    "views": 58000,
    "likes": 3200,
    "duration": 42
  }
]
```

### Ejemplo: `GET /shorts/{id}`

```json
{
  "id": 1,
  "title": "Discurso en la plaza",
  "videoUrl": "assets/videos/01.mp4",
  "author": "@elloquito",
  "likes": 3200,
  "liked": false,
  "nextId": 2
}
```

### Ejemplos de POST

`POST /shorts/{id}/like` responde `{ "liked": true, "likes": 3201 }`

`POST /channel/subscribe` responde `{ "isSubscribed": true, "subscribers": 12401 }`