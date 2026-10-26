# EJERCICIO 09 - Event Radar

## Descripción

Event Radar muestra eventos y permite filtrar la lista por ciudad y categoría desde la aplicación móvil.

## Tecnologías

- Frontend: React Native, Expo y TypeScript.
- Backend: NestJS.
- Persistencia: TypeORM y PostgreSQL.
- Comunicación: API REST mediante HTTP y JSON.

## Modelo de datos

La entidad `Evento` contiene `id`, `nombre`, `ciudad`, `categoria` y `fecha`.

## Funcionamiento

1. La aplicación solicita los eventos al backend.
2. El usuario puede activar o desactivar filtros de ciudad y categoría.
3. La aplicación añade los filtros seleccionados a la URL como parámetros de consulta.
4. El servicio construye la consulta con los filtros recibidos y recupera los registros mediante TypeORM.
5. La interfaz muestra los eventos devueltos por la API.

Si la tabla está vacía, el servicio crea eventos de ejemplo al iniciar.

## API REST

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/eventos` | Devuelve todos los eventos. |
| GET | `/eventos?ciudad=Zaragoza` | Filtra los eventos por ciudad. |
| GET | `/eventos?categoria=Tecnologia` | Filtra los eventos por categoría. |
| GET | `/eventos?ciudad=Zaragoza&categoria=Tecnologia` | Aplica ambos filtros. |

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

Actualiza la URL de la API en `frontend/App.tsx` para que apunte al backend accesible desde el dispositivo o emulador.

## Comprobaciones

- Consultar `GET /eventos` y verificar la lista completa.
- Probar el filtro por ciudad.
- Probar el filtro por categoría.
- Probar ambos filtros a la vez.
