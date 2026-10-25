# EJERCICIO 01 - Game Vault

## 1. Descripción

Game Vault es una aplicación desarrollada con React Native y Expo que permite consultar y visualizar una colección de videojuegos almacenados en una base de datos PostgreSQL.

La aplicación se comunica con un backend desarrollado con NestJS, que utiliza TypeORM para acceder a los datos persistidos.

## 2. Tecnologías utilizadas

- **Frontend:** React Native y Expo.
- **Backend:** NestJS.
- **ORM:** TypeORM.
- **Base de datos:** PostgreSQL.
- **Comunicación:** API REST mediante peticiones HTTP.

## 3. Estructura del proyecto

```text
EJERCICIO-01/
├── backend/
│   └── Código del servidor NestJS
├── frontend/
│   └── Código de la aplicación móvil
└── README.md
```

## 4. Funcionamiento

1. La aplicación móvil solicita la colección de videojuegos al backend.
2. El Controller recibe la petición HTTP.
3. El Service utiliza el Repository de TypeORM para consultar los datos.
4. TypeORM accede a PostgreSQL.
5. El backend devuelve la información mediante una respuesta HTTP.
6. El frontend procesa la respuesta y muestra los videojuegos en pantalla.

## 5. API REST

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/videojuegos` | Obtiene la colección de videojuegos. |

## 6. Instalación y ejecución

### Backend

Acceder a la carpeta `backend/`, instalar las dependencias y arrancar el servidor utilizando los scripts definidos en `package.json`.

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

Acceder a la carpeta `frontend/`, instalar las dependencias y ejecutar la aplicación con Expo.

```bash
cd frontend
npm install
npx expo start
```

## 7. Comprobaciones

- Verificar que el backend arranca correctamente.
- Comprobar que PostgreSQL contiene los videojuegos.
- Consultar el endpoint `GET /videojuegos`.
- Verificar que la aplicación móvil muestra los datos recibidos desde la API.

## 8. Estado del ejercicio

Indicar qué funcionalidades están implementadas y cuáles quedan pendientes de completar o verificar.