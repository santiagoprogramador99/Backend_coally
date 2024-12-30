# Backend - Task Manager

## Descripción

Este es el backend para la aplicación "Task Manager", desarrollado con **Node.js**, **Express** y **MongoDB** utilizando **Mongoose**. La API permite gestionar tareas con operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y filtrar tareas por estado (completada o pendiente). También incluye validaciones, manejo de errores estructurado y documentación de la API con **Swagger**.

## Endpoints disponibles

### **POST /api/tasks**
Crea una nueva tarea.

- **Campos requeridos**:
  - `title` (string): Título de la tarea. *Requerido*.
  - `description` (string): Descripción de la tarea. *Opcional*.
  
- **Respuestas**:
  - **201 Created**: Tarea creada correctamente.
  - **400 Bad Request**: Si el campo `title` no está presente.

### **GET /api/tasks**
Obtiene la lista de tareas.

- **Parámetros de consulta**:
  - `status` (string): Filtra las tareas por estado. Puede ser `completed` o `pending`.

- **Respuestas**:
  - **200 OK**: Lista de tareas.
  - **500 Internal Server Error**: En caso de error del servidor.

### **GET /api/tasks/:id**
Obtiene los detalles de una tarea específica.

- **Parámetros**:
  - `id` (string): El ID de la tarea que se quiere obtener.

- **Respuestas**:
  - **200 OK**: Detalles de la tarea.
  - **404 Not Found**: Si no se encuentra la tarea con el ID especificado.

### **PUT /api/tasks/:id**
Actualiza los campos de una tarea específica.

- **Parámetros**:
  - `id` (string): El ID de la tarea a actualizar.

- **Campos opcionales**:
  - `title` (string): Nuevo título de la tarea.
  - `description` (string): Nueva descripción de la tarea.
  - `completed` (boolean): Nuevo estado de la tarea (true o false).

- **Respuestas**:
  - **200 OK**: Tarea actualizada correctamente.
  - **400 Bad Request**: Si los datos enviados no son válidos.
  - **404 Not Found**: Si no se encuentra la tarea con el ID especificado.

### **DELETE /api/tasks/:id**
Elimina una tarea específica.

- **Parámetros**:
  - `id` (string): El ID de la tarea a eliminar.

- **Respuestas**:
  - **200 OK**: Tarea eliminada correctamente.
  - **404 Not Found**: Si no se encuentra la tarea con el ID especificado.

## Requerimientos Técnicos

- **Node.js** y **Express** para la creación de la API REST.
- **MongoDB** como base de datos y **Mongoose** para la gestión de modelos y esquemas.
- **express-validator** para validar los datos de entrada.
- **Swagger** para documentar los endpoints de la API.
- Manejo de errores estructurado con respuestas claras para el cliente:
  - **400 Bad Request**: Para datos incorrectos o faltantes.
  - **404 Not Found**: Para recursos no encontrados.
  - **500 Internal Server Error**: En caso de errores del servidor.

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/santiagoprogramador99/Backend_coally.git
    cd backend-task-manager
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

    ```env
    MONGODB_URI=mongodb:MONGO_URI=mongodb+srv://santimaestro99:uU2NltH73UCeqloP@taskmanager.ggceh.mongodb.net/taskmanager

    PORT=5000
    ```

    - **MONGODB_URI**: URI de conexión a tu base de datos MongoDB.
    - **PORT**: Puerto en el que se ejecutará el servidor (por defecto es 5000).

4. Inicia el servidor:

    ```bash
    npm start
    ```

El servidor estará disponible en [http://localhost:5000](http://localhost:5000).

## Pruebas

Para ejecutar las pruebas unitarias del backend, utiliza **Jest**:

```bash
npm test
