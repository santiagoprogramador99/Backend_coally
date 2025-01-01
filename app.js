require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes'); // Verifica que este archivo exista
const errorHandler = require('./middlewares/errorHandler'); // Asegúrate de que el middleware esté implementado
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();

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
                url: `http://localhost:${process.env.PORT || 5000}`, // Cambiar si el puerto cambia en producción
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
    apis: ['./routes/*.js'], // Verifica que las rutas contengan los comentarios de Swagger
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
