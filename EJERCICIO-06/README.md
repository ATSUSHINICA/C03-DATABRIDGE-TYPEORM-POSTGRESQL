# EJERCICIO 06 - My Library

## Descripción

My Library muestra una colección de libros y permite eliminarlos o marcar su estado de lectura como leído.

## Tecnologías

- Frontend: React Native, Expo y TypeScript.
- Backend: NestJS.
- Persistencia: TypeORM y PostgreSQL.
- Comunicación: API REST mediante HTTP y JSON.

## Modelo de datos

La entidad `Libro` contiene información del libro, como `id`, `titulo`, `autor`, `genero` y `estado_leido`.

## Funcionamiento

1. La aplicación solicita la colección de libros al abrirse.
2. El backend devuelve los registros ordenados por título.
3. El usuario puede eliminar un libro o marcarlo como leído.
4. El backend realiza la operación mediante el Repository de TypeORM.
5. La aplicación actualiza su lista local después de la operación.

Si la tabla está vacía, el servicio inserta libros de ejemplo al iniciar.

## API REST

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/libros` | Obtiene los libros ordenados por título. |
| DELETE | `/libros/:id` | Elimina un libro por identificador. |
| PATCH | `/libros/:id/leido` | Cambia `estado_leido` a `LEIDO`. |

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

Configura la URL de la API en `frontend/App.tsx` según la dirección de tu backend.

## Comprobaciones

- Comprobar que `GET /libros` devuelve registros.
- Marcar un libro como leído y verificar el cambio en PostgreSQL.
- Eliminar un libro y comprobar que desaparece de la lista.
- Probar un identificador inexistente en las operaciones por ID.
