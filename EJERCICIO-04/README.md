# EJERCICIO 04 - Food Spots

## Descripción

Food Spots permite registrar un restaurante desde una aplicación móvil. El formulario envía los datos a una API REST y el backend los guarda en PostgreSQL.

## Tecnologías

- Frontend: React Native, Expo y TypeScript.
- Backend: NestJS.
- Persistencia: TypeORM y PostgreSQL.
- Comunicación: HTTP y JSON.

## Modelo de datos

La entidad `Restaurante` incluye `id`, `nombre`, `tipo`, `ciudad`, `puntuacion` y `precioMedio`.

## Funcionamiento

1. El usuario introduce el nombre, tipo, ciudad y precio medio.
2. La aplicación envía una petición `POST` con esos campos y una puntuación establecida en el frontend.
3. El controlador recibe el cuerpo de la petición mediante `CreateRestauranteDto`.
4. El servicio crea la entidad con el Repository de TypeORM y la guarda en PostgreSQL.
5. La aplicación muestra un mensaje según el resultado de la petición.

## API REST

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/restaurantes` | Crea y devuelve un restaurante. |

El cuerpo JSON debe incluir `nombre`, `tipo`, `ciudad`, `puntuacion` y `precioMedio`.

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

Actualiza la URL de la API en `frontend/App.tsx` para que el móvil o emulador pueda alcanzar el backend.

## Comprobaciones

- Verificar que el backend arranca y conecta con PostgreSQL.
- Enviar un restaurante mediante el formulario.
- Comprobar la respuesta HTTP y verificar que el registro se ha guardado en la base de datos.
