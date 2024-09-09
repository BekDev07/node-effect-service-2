"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = exports.swaggerUi = exports.swaggerDefinition = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
exports.swaggerDefinition = {
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
    swaggerDefinition: exports.swaggerDefinition,
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.swaggerSpec = swaggerSpec;
