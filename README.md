# Prueba Técnica Fullstack Monstruo Creativo - Frontend

## Descripción del Proyecto
Este proyecto es una aplicación web que gestiona usuarios con diferentes roles y controla el acceso a ciertas rutas en función del tipo de usuario. El front-end está desarrollado utilizando React (Create React App), junto con Redux, Tailwind CSS, Axios y React Router para proporcionar una experiencia de usuario fluida y eficiente.

## Objetivo
El objetivo principal es implementar un sistema que permita la autenticación de usuarios y la gestión de roles, garantizando que el acceso a las rutas y elementos de la interfaz se controle adecuadamente según el rol del usuario.

## Tecnologías Utilizadas
- **React**: Librería para construir interfaces de usuario.
- **Redux**: Para manejar el estado de la aplicación de manera predecible.
- **Tailwind CSS**: Framework CSS para un diseño moderno y responsive.
- **Axios**: Para realizar solicitudes HTTP al backend.
- **React Router**: Para la gestión de rutas y navegación en la aplicación.

## Requerimientos del Proyecto

1. **Autenticación de Usuarios**
   - Implementación de un sistema de registro y login.
   - Los usuarios deben ser asignados a uno de los siguientes roles: Admin, EditorCatálogo o EditorAmbiente.
   - Control de acceso a las rutas protegidas basado en el rol del usuario.

2. **Roles y Permisos**
   - **Admin**: Acceso completo a todas las rutas en el front-end.
   - **EditorCatálogo**: Acceso a rutas de lectura y funcionalidades de creación y edición en el catálogo de tienda (nombre del ítem, precio, etc.).
   - **EditorAmbiente**: Acceso a rutas de lectura y funciones de creación y edición en registros de consumo de agua por día (día de registro, cantidad en litros, etc.).

3. **Implementación de Rutas**
   - Rutas públicas y protegidas utilizando `react-router-dom`.
   - Lógica que verifica el rol del usuario antes de permitir el acceso a rutas sensibles.
   - Elementos de la interfaz (por ejemplo, menús) que se muestran u ocultan según el rol del usuario autenticado.

4. **Formulario de Login**
   - Creación de un formulario de login en la página de inicio para facilitar el acceso de los usuarios.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   npm i
   npm start
   ```
