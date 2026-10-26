# EJERCICIO 10 - Wander

## 1. Descripción

Wander es una aplicación desarrollada con React Native y TypeScript que permite gestionar una lista de destinos de viaje: consultarlos, crearlos, actualizarlos y eliminarlos.

La aplicación se comunica con un backend mediante una API REST. Como mejora sobre el enunciado original, cada destino incluye un nuevo campo, `presupuesto`, con el importe estimado en euros del viaje.

## 2. Tecnologías utilizadas

- **Frontend:** React Native y TypeScript.
- **Backend:** API REST (indicar tecnología utilizada).
- **Base de datos:** (indicar sistema de persistencia).
- **Comunicación:** API REST mediante peticiones HTTP con `fetch` y datos en formato JSON.

## 3. Estructura del proyecto

```text
EJERCICIO-XX/
├── backend/
│   └── Código del servidor
├── frontend/
│   └── App.tsx y código de la aplicación móvil
└── README.md
```

## 4. Funcionamiento

1. Al abrirse, la aplicación solicita la lista de destinos al backend.
2. El backend devuelve los destinos en formato JSON.
3. El frontend los muestra en pantalla, cada uno en su propia tarjeta.
4. Al crear un destino, la aplicación envía los datos del formulario mediante una petición `POST`.
5. Al editar o eliminar un destino, la aplicación envía una petición `PATCH` o `DELETE` sobre su identificador.
6. Tras cada operación, la aplicación vuelve a solicitar la lista para mostrarla actualizada.
7. Si alguna petición falla, se muestra un mensaje de error en pantalla.

## 5. Modelo de datos

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | número | Identificador único del destino. |
| `ciudad` | texto | Ciudad del destino. |
| `pais` | texto | País al que pertenece la ciudad. |
| `descripcion` | texto | Descripción breve del destino. |
| `presupuesto` | número | **Nuevo.** Presupuesto estimado del viaje, en euros. |

## 6. Mejora implementada

Se ha añadido el campo `presupuesto` a los destinos.

- El formulario de creación incluye un campo numérico de presupuesto. Si el valor introducido no es un número, se guarda `0`.
- La petición `POST` envía el nuevo campo junto al resto de datos.
- Cada tarjeta de destino muestra el presupuesto bajo su descripción.
- Los destinos creados antes de la mejora, que no tienen este campo, se muestran con un presupuesto de `0 €`.

## 7. API REST

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/destinos` | Obtiene la lista de destinos. |
| POST | `/destinos` | Crea un destino con `ciudad`, `pais`, `descripcion` y `presupuesto`. |
| PATCH | `/destinos/:id` | Actualiza parcialmente un destino. |
| DELETE | `/destinos/:id` | Elimina un destino. |

## 8. Instalación y ejecución

### Backend

Acceder a la carpeta `backend/`, instalar las dependencias y arrancar el servidor utilizando los scripts definidos en `package.json`. El servidor debe escuchar en el puerto `3000`.

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

Acceder a la carpeta `frontend/`, instalar las dependencias y ejecutar la aplicación utilizando los scripts definidos en `package.json`.

```bash
cd frontend
npm install
npm start
```

### Configuración de la URL de la API

En `App.tsx`, sustituir `TU_IP_LOCAL` por la dirección IP local del ordenador donde se ejecuta el backend:
El dispositivo o emulador y el ordenador deben estar conectados a la misma red.

## 9. Comprobaciones

- Verificar que el backend arranca correctamente.
- Consultar el endpoint `GET /destinos` y comprobar que devuelve la lista.
- Crear un destino con presupuesto y verificar que aparece en la aplicación.
- Comprobar que el campo `presupuesto` se guarda en el backend y se conserva al recargar la aplicación.
- Editar y eliminar un destino y verificar que la lista se actualiza.
- Detener el backend y comprobar que la aplicación muestra el mensaje de error.

## 10. Estado del ejercicio

**Implementado en el frontend:**

- [x] Listado de destinos.
- [x] Creación de destinos.
- [x] Actualización de destinos.
- [x] Eliminación de destinos.
- [x] Mensajes de error ante fallos de la API.
- [x] Nuevo campo `presupuesto` en el formulario y en las tarjetas.
- [x] Confirmar que el backend acepta y persiste el campo `presupuesto`.
