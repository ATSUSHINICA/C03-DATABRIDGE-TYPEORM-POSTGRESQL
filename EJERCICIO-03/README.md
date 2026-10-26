# EJERCICIO 03 - Pet Profile

## Descripción

Pet Profile muestra la ficha de una mascota consultando sus datos en el backend.

## Tecnologías

- Frontend: React Native, Expo y TypeScript.
- Backend: NestJS.
- Persistencia: TypeORM y PostgreSQL.
- Comunicación: API REST mediante HTTP y JSON.

## Modelo de datos

La entidad `Mascota` contiene `id`, `nombre`, `raza`, `edad`, `ciudad` y `energia`. El campo `energia` admite un valor nulo en la base de datos.

## Funcionamiento

1. La aplicación solicita la mascota con identificador `1`.
2. El controlador recibe el identificador de la URL y lo convierte a número.
3. El servicio busca el registro con `findOneBy` a través del Repository de TypeORM.
4. Si no existe, el servicio devuelve un error `404`; si existe, el frontend muestra su nombre, raza, edad, ciudad y nivel de energía.

Si la tabla está vacía, el servicio añade una mascota de ejemplo al iniciar.

## API REST

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/mascotas/:id` | Obtiene la ficha de una mascota por su identificador. |

Ejemplo: `GET /mascotas/1`.

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

Comprueba que la URL definida en `frontend/App.tsx` apunta al backend accesible desde el emulador o dispositivo.

## Comprobaciones

- Verificar que el backend conecta con PostgreSQL.
- Consultar `GET /mascotas/1` y comprobar los datos devueltos.
- Probar un identificador inexistente y comprobar la respuesta de error.
- Comprobar que la aplicación representa los datos de la mascota.
