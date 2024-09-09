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
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.pgQuery = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: `postgresql://postgres.vxlejaiatocwtyudkxoy:${process.env.DB_PASSWORD}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`,
});
const pgQuery = (query, params = []) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        const res = yield client.query(query, params);
        return res.rows;
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error executing query", err.stack);
        }
        else {
            console.log("Unknown error occured");
        }
        throw err;
    }
    finally {
        client.release();
    }
});
exports.pgQuery = pgQuery;
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.query("SELECT NOW()");
        console.log("Database connected successfully");
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error connecting to the database", err.stack);
            process.exit(1);
        }
    }
});
exports.testConnection = testConnection;
