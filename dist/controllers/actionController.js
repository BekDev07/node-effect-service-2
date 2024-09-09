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
exports.getProductActionsController = exports.logProductActionController = void 0;
const actionDao_1 = require("../dao/actionDao");
const logProductActionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("salom");
    const { product_id, shop_id, action_type, action_details } = req.body;
    if (!product_id || !shop_id || !action_type) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const newAction = yield (0, actionDao_1.logProductAction)({
            product_id,
            shop_id,
            action_type,
            action_details,
        });
        res.status(201).json(newAction);
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ error: `Error logging action: ${error.message}` });
        }
        else {
            return res.status(500).json({ error: "Unknown error occured" });
        }
    }
});
exports.logProductActionController = logProductActionController;
const getProductActionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shop_id, plu, action_type, start_date, end_date, page, limit } = req.query;
    const offset = page
        ? (parseInt(page) - 1) * (parseInt(limit) || 10)
        : 0;
    try {
        const actions = yield (0, actionDao_1.getProductActions)(shop_id ? parseInt(shop_id) : undefined, plu, action_type, start_date, end_date, parseInt(limit) || 10, offset);
        res.status(200).json(actions);
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ error: `Error logging action: ${error.message}` });
        }
        else {
            return res.status(500).json({ error: "Unknown error occured" });
        }
    }
});
exports.getProductActionsController = getProductActionsController;
