# EJERCICIO 08 - My Playlist

## Descripción

My Playlist muestra una playlist y sus canciones relacionadas. La aplicación permite añadir una canción a la playlist y volver a cargar los datos para reflejar el resultado.

## Tecnologías

- Frontend: React Native, Expo y TypeScript.
- Backend: NestJS.
- Persistencia: TypeORM y PostgreSQL.
- Comunicación: API REST mediante HTTP y JSON.

## Modelo de datos y relación

El backend utiliza las entidades `Playlist` y `Cancion`. Una playlist contiene una colección de canciones y la relación se define mediante TypeORM con una relación `ManyToOne` desde canción hacia playlist.

## Funcionamiento

1. La aplicación solicita la playlist con identificador `1`.
2. El backend carga la playlist junto con sus canciones relacionadas.
3. El frontend muestra el nombre de la playlist y sus canciones.
4. Al pulsar «Añadir canción», envía el título, artista e identificador de la playlist mediante una petición `POST`.
5. Después de la petición, la aplicación vuelve a solicitar la playlist.

Si no existen playlists, el servicio crea una playlist y una canción de ejemplo al iniciar.

## API REST

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/playlists/:id` | Obtiene una playlist con sus canciones. |
| POST | `/playlists` | Crea una canción a partir del título, artista y referencia a la playlist. |

## Instalación y ejecución

Backend:

```bash
cd backend
npm install
npm run start:dev
```

Frontend, en otra terminal:

```bash
cd frontend
npm install
npx expo start
```

Comprueba que la URL de la API en `frontend/App.tsx` apunta al backend accesible desde el dispositivo o emulador.

## Comprobaciones

- Consultar una playlist con `GET /playlists/1`.
- Comprobar que la respuesta contiene la relación de canciones.
- Añadir una canción y volver a cargar la playlist para verificar el resultado.
