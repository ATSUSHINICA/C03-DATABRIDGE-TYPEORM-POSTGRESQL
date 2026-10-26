# EJERCICIO 07 - Sneaker Vault

## Descripción

Sneaker Vault permite consultar y gestionar un catálogo de zapatillas: listar, consultar por identificador, crear, actualizar y eliminar registros.

## Tecnologías

- Frontend: React Native, Expo y TypeScript.
- Backend: NestJS.
- Persistencia: TypeORM y PostgreSQL.
- Comunicación: API REST mediante HTTP y JSON.

## Modelo de datos

La entidad `Sneaker` contiene `id`, `marca`, `modelo`, `precio`, `talla` y `stock`.

## Funcionamiento

1. La aplicación solicita el catálogo de zapatillas al backend.
2. El backend utiliza el Repository de TypeORM para recuperar los registros.
3. La interfaz muestra marca, modelo, talla, precio y disponibilidad.
4. El usuario puede crear un registro de ejemplo, rebajar el precio o eliminar una zapatilla.
5. Después de cada operación, la aplicación vuelve a cargar la colección desde la API.

## API REST

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/sneakers` | Lista las zapatillas. |
| GET | `/sneakers/:id` | Obtiene una zapatilla por ID. |
| POST | `/sneakers` | Crea una zapatilla. |
| PATCH | `/sneakers/:id` | Actualiza los campos enviados. |
| DELETE | `/sneakers/:id` | Elimina una zapatilla. |

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

La URL definida en `frontend/App.tsx` debe apuntar a la dirección del backend accesible desde el dispositivo o emulador.

## Comprobaciones

- Probar el listado y la consulta por identificador.
- Crear una zapatilla y comprobar que aparece en la lista.
- Actualizar su precio y comprobar el resultado.
- Eliminarla y verificar que deja de aparecer.
