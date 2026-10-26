# EJERCICIO 02 - CineBox

## Descripción

CineBox muestra una colección de películas almacenadas en PostgreSQL. La aplicación móvil consulta la API y representa el título, género, año, puntuación y si la película es favorita.

## Tecnologías

- Frontend: React Native, Expo y TypeScript.
- Backend: NestJS.
- Persistencia: TypeORM y PostgreSQL.
- Comunicación: API REST con HTTP y JSON.

## Modelo de datos

La entidad `Pelicula` contiene los campos `id`, `titulo`, `genero`, `anio`, `puntuacion` y `favorita`. El campo `favorita` tiene `false` como valor predeterminado.

## Funcionamiento

1. Al abrir la aplicación, el frontend solicita las películas al backend.
2. El controlador delega la consulta en el servicio.
3. El servicio obtiene los registros mediante el Repository de TypeORM y los ordena por puntuación descendente.
4. La aplicación muestra los datos recibidos.

Si la tabla está vacía, el servicio inserta películas de ejemplo al iniciar el módulo.

## API REST

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/peliculas` | Devuelve las películas ordenadas por puntuación descendente. |

## Instalación y ejecución

En una terminal, ejecutar el backend:

```bash
cd backend
npm install
npm run start:dev
```

En otra terminal, ejecutar el frontend:

```bash
cd frontend
npm install
npx expo start
```

Configura la URL de la API en `frontend/App.tsx` para que apunte a la dirección accesible del ordenador donde se ejecuta el backend. En un dispositivo físico, ambos deben poder comunicarse a través de la red.

## Comprobaciones

- Verificar que PostgreSQL está disponible y que el backend arranca.
- Consultar `GET /peliculas` y comprobar la respuesta JSON.
- Abrir la aplicación y comprobar que aparecen los datos de las películas.
