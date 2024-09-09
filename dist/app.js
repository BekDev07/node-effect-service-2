"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const actionRoutes_1 = __importDefault(require("./routes/actionRoutes"));
const dbConnect_1 = require("./db/dbConnect");
const swagger_1 = require("./swagger");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1", actionRoutes_1.default);
app.use("/api-docs", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dbConnect_1.testConnection)();
        app.listen(port, () => {
            console.log("App started successfully");
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error connecting to the database", err.stack);
            process.exit(1);
        }
        console.log("Unknown error occured");
    }
}))();
