import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Dynamic API Documentation",
    version: "1.0.0",
    description: "API documentation with dynamic updates",
  },
  servers: [
    {
      url: "http://localhost:5001/api/v1",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi, swaggerSpec };
