# EJERCICIO 05 - Travel Book

## Descripción

Travel Book permite modificar el estado de un viaje existente mediante una petición HTTP `PATCH`.

## Tecnologías

- Frontend: React Native, Expo y TypeScript.
- Backend: NestJS.
- Persistencia: TypeORM y PostgreSQL.
- Comunicación: API REST mediante HTTP y JSON.

## Modelo de datos

La entidad `Viaje` contiene `id`, `destino`, `pais`, `fecha` y `estado`.

## Funcionamiento

1. La aplicación presenta el viaje con identificador `1` y permite editar su estado.
2. Al guardar, envía el nuevo estado en el cuerpo JSON de `PATCH /viajes/1`.
3. El controlador recibe el identificador y los campos enviados.
4. El servicio busca el viaje, aplica los cambios recibidos y guarda la entidad mediante TypeORM.
5. Si el identificador no existe, el backend devuelve un error `404`; la aplicación informa del resultado de la operación.

Si la tabla está vacía, el servicio crea un viaje de ejemplo al iniciar.

## API REST

| Método | Endpoint | Descripción |
|---|---|---|
| PATCH | `/viajes/:id` | Actualiza los campos enviados de un viaje existente. |

Ejemplo de cuerpo JSON:

```json
{
  "estado": "COMPLETADO"
}
```

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

Asegúrate de que `frontend/App.tsx` contiene una URL de API accesible desde el dispositivo o emulador.

## Comprobaciones

- Consultar que el backend arranca correctamente.
- Probar una actualización con `PATCH /viajes/1`.
- Comprobar que el nuevo estado queda guardado en PostgreSQL.
- Probar un identificador inexistente.
