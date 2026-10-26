# EJERCICIO 01 - Game Vault

## Descripción

Game Vault es una aplicación móvil desarrollada con React Native y Expo para consultar una colección de videojuegos persistida en PostgreSQL. El backend está implementado con NestJS y utiliza TypeORM.

## Tecnologías

- Frontend: React Native, Expo y TypeScript.
- Backend: NestJS.
- ORM: TypeORM.
- Base de datos: PostgreSQL.
- Comunicación: API REST mediante HTTP y JSON.

## Modelo de datos

La entidad `Videojuego` contiene los campos `id`, `titulo`, `plataforma`, `puntuacion` y `genero`.

## Funcionamiento

1. La aplicación móvil solicita la colección al backend.
2. El controlador recibe la petición HTTP.
3. El servicio consulta los datos mediante el Repository de TypeORM.
4. TypeORM accede a PostgreSQL.
5. La API devuelve los videojuegos y el frontend los muestra en pantalla.

## API REST

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/videojuegos` | Obtiene la colección de videojuegos. |

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

Configura la URL de la API en `frontend/App.tsx` para que apunte al backend que estás ejecutando. En un dispositivo físico, usa una dirección accesible desde ese dispositivo; `localhost` normalmente se refiere al propio dispositivo.

## Comprobaciones

- Comprobar que PostgreSQL está iniciado y que la configuración de conexión coincide con la instalación local.
- Consultar `GET /videojuegos` y verificar la respuesta JSON.
- Abrir la aplicación móvil y comprobar que muestra los datos devueltos por la API.
