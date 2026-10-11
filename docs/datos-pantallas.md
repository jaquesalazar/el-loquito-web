# Definición de pantallas y datos – CatTube

CatTube es la plataforma ficticia de videos cortos del universo de *El loquito*. Este documento define qué elementos y datos tiene cada pantalla de la PWA (versión escritorio).

## Pantalla 1: Perfil (`/`)

| Elemento | Dato | Ejemplo |
|---|---|---|
| Portada | imagen | `portada.jpg` |
| Avatar | imagen | `loquito.png` |
| Nombre | texto | El loquito |
| Usuario | texto | @elloquito |
| Biografía | texto | Humor absurdo. Gatos serios. Cero contexto. |
| Suscriptores | número | 12,400 (se muestra "12,4 mil") |
| Total de shorts | número | 28 |
| Botón Suscribirse | estado | suscrito / no suscrito |
| Pestañas | navegación | Shorts / Acerca de |
| Cuadrícula de shorts | lista | miniatura vertical, vistas, likes, título y fecha relativa ("Hace 2 días") |

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
| Mensaje | "Sin conexión. No se pudo cargar la página. Comprueba tu conexión a internet." |
| Botón | Reintentar |
| Contenido guardado | sección "Shorts guardados" con las miniaturas en caché |

## Panel de navegación (App Shell)

Logo de CatTube, Perfil, Shorts, Guardados, Instalar app e indicador de conexión (En línea / Sin conexión).

## Estados de la interfaz

| Estado | Cómo se muestra |
|---|---|
| Cargando | Esqueleto gris de las tarjetas |
| Error | Mensaje con botón Reintentar |
| Sin datos | "Aún no hay shorts" |
| Sin conexión | Franja de aviso superior |

## Formato de los datos

La API devuelve datos crudos (números y fechas reales) y la interfaz se encarga de darles formato, con funciones en `shared/utils/`:

| La API devuelve | La interfaz muestra |
|---|---|
| `12400` | 12,4 mil |
| `24800` | 24,8 mil |
| `2026-10-08` | Hace 2 días |

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
  "bio": "Humor absurdo. Gatos serios. Cero contexto.",
  "subscribers": 12400,
  "totalShorts": 28,
  "isSubscribed": false
}
```

### Ejemplo: `GET /shorts`

```json
[
  {
    "id": 1,
    "title": "Mi gato paga el alquiler",
    "thumbnail": "assets/thumbs/01.jpg",
    "views": 24800,
    "likes": 1200,
    "duration": 42,
    "publishedAt": "2026-10-08"
  }
]
```

### Ejemplo: `GET /shorts/{id}`

```json
{
  "id": 1,
  "title": "Mi gato paga el alquiler",
  "videoUrl": "assets/videos/01.mp4",
  "author": "@elloquito",
  "likes": 1200,
  "liked": false,
  "nextId": 2
}
```

### Ejemplos de POST

`POST /shorts/{id}/like` responde `{ "liked": true, "likes": 1201 }`

`POST /channel/subscribe` responde `{ "isSubscribed": true, "subscribers": 12401 }`