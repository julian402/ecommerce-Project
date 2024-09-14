# [Backend] Proyecto Ecommerce, Articulos Deportivos

## Prerrequisitos

Tener instalados Node y NPM:

- [Node.js](https://nodejs.org/es/download/)
- [npm](https://www.npmjs.com/get-npm) (Node Package Manager)

## Endpoints de la Api

### Autenticación

- `POST /api/login` → Iniciar seción de un usuario.

## Usuarios
- `GET /api/users` → Lista todos los usuarios registrados en la Base de Datos.
- `POST /api/users` → Permite la creación de un nuevo usuario.
- `PATCH /api/users` → Permite Actualizar un usuario a traves del Id tomado en la autenticación.
- `DELETE /api/users` → Permite Eliminar (soft) un usuario a traves del Id tomado en la autenticación.

## Categorias de Productos
- `GET /api/productCategory` → Lista todos las Categorias de productos registradas en la Base de Datos.
- `GET /api/productCategory/:id` → Traer la Categoria que coincida con el Id ingresado.
- `POST /api/productCategory` → Permite la creación de una nueva Categoria, solo usuarios administradores
- `PATCH /api/productCategory` → Permite Actualizar una categoria a traves del Id ingresado por body, solo usuarios Administradores.
- `DELETE /api/productCategory` → Permite Eliminar (soft) una categoria a traves del Id ingresado por body, solo usuarios Administradores.

## Productos
- `GET /api/products` → Lista todos los productos registrados en la Base de Datos.
- `GET /api/products/:name` → Lista todos los productos que contengan en su nombre la palabra ingresada.
- `POST /api/products` → Permite la creación de un nuevo producto, solo usuarios administradores.
- `PATCH /api/products` → Permite Actualizar un producto a traves del Id ingresado por body, solo usuarios Administradores.
- `DELETE /api/products` → Permite Eliminar (soft) un producto a traves del Id ingresado por body, solo usuarios Administradores.

## Locaciones
- `GET /api/locations` → Lista todos las Locaciones registradas en la Base de Datos.
- `GET /api/locations/:id` → Traer la locación que coincida con el Id ingresado.
- `POST /api/locations` → Permite la creación de una nueva locación, solo usuarios Registrados
- `PATCH /api/locations` → Permite Actualizar una locación a traves del Id ingresado por body, solo usuarios Registrados.
- `DELETE /api/locations` → Permite Eliminar (soft) una locación a traves del Id ingresado por body, solo usuarios Registrados.

## Orden de Compra
- `GET /api/purchaseorder` → Lista todos las ordenes de compra registradas en la Base de Datos.
- `GET /api/purchaseorder` → Lista las ordenes de compra del Id de un usuario registrado.
- `POST /api/purchaseorder` → Permite la creación de una nueva orden de compra, solo usuarios Registrados.
- `DELETE /api/purchaseorder` → Permite Eliminar (soft) una orden de compra a traves del Id ingresado por body, solo usuarios Registrados.
