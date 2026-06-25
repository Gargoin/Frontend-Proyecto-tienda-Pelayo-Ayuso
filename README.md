# Frontend Proyecto tienda Pelayo Ayuso

Aplicación web desarrollada con React para consultar, buscar y administrar productos y series consumiendo una API REST.
Proyecto final del Bootcamp de Neoland Web Development.


## Características

- Listado de productos.
- Búsqueda en tiempo real.
- Filtros y ordenamiento.
- Vista de detalle.
- Botones para la administración
- Crear productos.
- Editar productos.
- Eliminar productos.
- Registro de usuarios.
- Inicio de sesión con JWT.
- Rutas protegidas mediante autenticación.
- Testing básico con Vitest.

---


## Tecnologías

- React
- Vite
- React Router DOM
- Context API
- Tailwind CSS
- Fetch API
- Vitest
- Testing Library

---


## Instalación

## Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

Ingresar al proyecto:

```bash
cd Frontend-Proyecto-tienda-Pelayo-Ayuso
```

Instalar dependencias:

```bash
npm install
```

---


## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto utilizando como referencia el archivo `.env.example`.

### .env.example

```env
VITE_API_URL=
```

### Ejemplo local

```env
VITE_API_URL=http://localhost:3000/api
```

### Ejemplo producción

```env
VITE_API_URL=https://mi-api.onrender.com/api
```

---


## Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

```txt
http://localhost:5173
```

---


## Ejecutar tests

```bash
npm test
```

---

## vite.config.js

```js

```

## Generar build de producción

```bash
npm run build
```

Los archivos generados se encontrarán en:

```txt
dist/
```

---


## Backend

Este proyecto consume una API REST desarrollada con:

- Node.js
- Express
- MongoDB Atlas
- JWT

La URL del backend se configura mediante:

```env
VITE_API_URL
```

---


## Estructura del proyecto

```txt
public/
└──imgs/

src/
│
├── assets/
├── components/
├── context/
├── hooks/
├── layouts/
├── loaders/
├── pages/
├── routes/
├── services/
├── tests/
│
├── App.jsx
├── index.css
├── index.css
└── main.jsx
```

---


## Autenticación

La aplicación utiliza JWT.

Al iniciar sesión se almacenan:

```txt
token
user
```

en el Local Storage del navegador.

---


## Deploy

Frontend desplegado en:

```txt
https://tu-api.onrender.com
```

Backend desplegado en:

```txt
https://tu-api.onrender.com
```

---


## Autor

Proyecto final del curso Full Stack de Neoland.

Autor: Pelayo Ayuso Plaza