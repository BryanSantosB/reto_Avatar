# Reto técnico – Carrito de compras

## Descripción

Este proyecto implementa un sistema simple de carrito de compras que consume una API externa de productos.

El sistema permite:

* listar productos disponibles
* agregar productos al carrito
* visualizar el carrito
* eliminar productos del carrito

El objetivo del proyecto es demostrar el consumo de APIs externas, manejo de base de datos y una estructura básica de backend y frontend.

---

## Tecnologías utilizadas

### Backend

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* Axios

### Frontend

* React
* Vite
* Tailwind CSS

---

## Estructura del proyecto

El proyecto está dividido en dos partes principales:

```
backend/
frontend/
```

### Backend

El backend se encarga de:

* consumir la API externa de productos
* gestionar la lógica del carrito
* persistir los productos agregados al carrito en la base de datos

Estructura principal:

```
controllers/
services/
routes/
prisma/
utils/
```

### Frontend

El frontend permite:

* visualizar los productos
* agregar productos al carrito
* visualizar el carrito
* eliminar productos del carrito

---

## API de productos utilizada

Los productos se obtienen desde la siguiente API pública:

https://dummyjson.com/products

---

## Modelo de datos

Se utilizan dos entidades principales.

### Order

Representa el carrito del usuario.

Campos principales:

* id
* usuarioId
* totalCompra

### OrderItem

Representa un producto dentro del carrito.

Campos principales:

* id
* carritoId
* productoId
* nombre
* imagen
* precio
* sku

Cuando un producto se agrega al carrito se guarda un snapshot del producto (nombre, imagen y precio).
Esto evita depender nuevamente de la API externa para mostrar los datos del carrito.

---

## Instalación y ejecución

### 1. Clonar el repositorio

```
git clone https://github.com/BryanSantosB/reto_Avatar.git
```

---

### 2. Backend

Entrar a la carpeta del backend:

```
cd backend
```

Instalar dependencias:

```
npm install
```

Crear archivo `.env` con las siguientes variables:

```
PORT=3000
APP_API_URL=https://dummyjson.com
DATABASE_URL=postgresql://usuario:password@localhost:5432/reto_avatar
```

Ejecutar migraciones de Prisma:

```
npx prisma migrate dev
```

Iniciar servidor:

```
npm run dev
```

---

### 3. Frontend

Entrar a la carpeta del frontend:

```
cd frontend
```

Instalar dependencias:

```
npm install
```

Iniciar aplicación:

```
npm run dev
```

---

## Endpoints principales

Obtener productos

```
GET /api/productos
```

Agregar producto al carrito

```
POST /api/cart/add
```

Ejemplo de body:

```
{
  "userId": 1,
  "productId": 2
}
```

Obtener carrito del usuario

```
GET /api/cart/:userId
```

Eliminar producto del carrito

```
DELETE /api/cart/item/:itemId
```
