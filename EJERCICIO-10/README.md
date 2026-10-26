# EJERCICIO 10 - Wander

## Descripción

Wander es una aplicación móvil desarrollada con React Native y TypeScript para consultar, crear, actualizar y eliminar destinos de viaje. El frontend se comunica con un backend NestJS, que utiliza TypeORM para persistir los datos en PostgreSQL.

Como ampliación, el modelo de destino incluye el campo `presupuesto`, que se muestra en euros en la interfaz.

## Tecnologías

- Frontend: React Native, Expo y TypeScript.
- Backend: NestJS.
- ORM: TypeORM.
- Base de datos: PostgreSQL.
- Comunicación: API REST mediante HTTP y JSON.

## Modelo de datos

La entidad `Destino` contiene los campos `id`, `ciudad`, `pais`, `descripcion` y `presupuesto`.

## Funcionamiento

1. Al abrirse, la aplicación solicita la lista de destinos.
2. El backend consulta los registros mediante el Repository de TypeORM.
3. El frontend muestra los destinos y su presupuesto.
4. El formulario envía una petición `POST` para crear un destino.
5. Las acciones de edición y eliminación envían peticiones `PATCH` y `DELETE` con el identificador.
6. Tras cada operación, la aplicación vuelve a cargar la lista para mostrar el estado actualizado.
7. Si una petición falla, la interfaz muestra un mensaje de error.

## API REST

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/destinos` | Obtiene todos los destinos. |
| GET | `/destinos/:id` | Obtiene un destino por identificador. |
| POST | `/destinos` | Crea un destino con ciudad, país, descripción y presupuesto. |
| PATCH | `/destinos/:id` | Actualiza los campos enviados para un destino. |
| DELETE | `/destinos/:id` | Elimina un destino. |

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

En `frontend/App.tsx`, configura `API_URL` con la dirección accesible del ordenador donde se ejecuta el backend. El emulador o dispositivo debe poder comunicarse con esa dirección.

La conexión a PostgreSQL está configurada en `backend/src/app.module.ts`. Revisa el nombre de la base de datos, usuario y contraseña para que coincidan con tu entorno local.

## Comprobaciones

- Verificar que el backend arranca y conecta con PostgreSQL.
- Consultar `GET /destinos` y comprobar la respuesta.
- Crear un destino y comprobar que aparece en la lista.
- Actualizar un destino y verificar el resultado.
- Eliminar un destino y comprobar que desaparece.
- Comprobar que el presupuesto aparece en la interfaz y se conserva al recargar la lista.
- Probar el comportamiento de la aplicación cuando no puede conectar con el backend.

