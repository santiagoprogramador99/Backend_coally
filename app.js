require('dotenv').config();  
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();

// Configuración del puerto
const port = process.env.PORT || 5000;

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'Tasks API documentation using Swagger',
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production' 
                    ? `https://backend-coally-1.onrender.com`  // Cambia esta URL a la URL de tu aplicación en Render
                    : `http://localhost:${port}`,  // Esto será para tu entorno local
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Middleware de configuración
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
