// src/swagger.ts

import swaggerJSDoc from 'swagger-jsdoc'

// No explicit Options type since swagger-jsdoc has no TypeScript definitions
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'University Scheduling API',
            version: '1.0.0',
            description: 'API documentation for the University Course Scheduling System'
        },
        servers: [
            { url: 'http://localhost:5000', description: 'Local server' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ['./src/routes/*.ts', './src/models/swaggerSchemas.ts']
}

export const swaggerSpec = swaggerJSDoc(options)
