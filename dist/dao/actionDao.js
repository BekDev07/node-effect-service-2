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
exports.getProductActions = exports.logProductAction = void 0;
const dbConnect_1 = require("../db/dbConnect");
const logProductAction = (action) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO product_action_logs (product_id, shop_id, action_type, action_details)
                 VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [
        action.product_id,
        action.shop_id,
        action.action_type,
        action.action_details,
    ];
    return (0, dbConnect_1.pgQuery)(query, params);
});
exports.logProductAction = logProductAction;
const getProductActions = (shop_id, plu, action_type, start_date, end_date, limit = 10, offset = 0) => __awaiter(void 0, void 0, void 0, function* () {
    let query = `
    SELECT pal.*, p.plu, p.name AS product_name, s.name AS shop_name
    FROM product_action_logs pal
    JOIN products p ON pal.product_id = p.id
    JOIN shops s ON pal.shop_id = s.id
    WHERE 1=1`;
    const params = [];
    if (shop_id) {
        query += ` AND pal.shop_id = $${params.length + 1}`;
        params.push(shop_id);
    }
    if (plu) {
        query += ` AND p.plu = $${params.length + 1}`;
        params.push(plu);
    }
    if (action_type) {
        query += ` AND pal.action_type = $${params.length + 1}`;
        params.push(action_type);
    }
    if (start_date) {
        query += ` AND pal.action_date >= $${params.length + 1}`;
        params.push(start_date);
    }
    if (end_date) {
        query += ` AND pal.action_date <= $${params.length + 1}`;
        params.push(end_date);
    }
    query += ` ORDER BY pal.action_date DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    return (0, dbConnect_1.pgQuery)(query, params);
});
exports.getProductActions = getProductActions;
