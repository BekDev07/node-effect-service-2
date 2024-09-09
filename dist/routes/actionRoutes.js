"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actionController_1 = require("../controllers/actionController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /actions:
 *   post:
 *     summary: Create product action history
 *     description: Record an action taken on product stock, such as an increase or decrease.
 *     tags: [Product Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The ID of the product.
 *               shop_id:
 *                 type: integer
 *                 description: The ID of the shop where the action was performed.
 *               action_type:
 *                 type: string
 *                 description: The type of action (e.g., "increase" or "decrease").
 *               quantity_change:
 *                 type: integer
 *                 description: The quantity by which the stock was adjusted.
 *               action_date:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp of the action.
 *             example:
 *               product_id: 1
 *               shop_id: 2
 *               action_type: "decrease"
 *               quantity_change: -5
 *               action_date: "2024-09-08T14:00:00Z"
 *     responses:
 *       201:
 *         description: Action history created successfully.
 *       400:
 *         description: Invalid request data.
 */
router.post("/actions", actionController_1.logProductActionController);
/**
 * @swagger
 * /actions:
 *   get:
 *     summary: Get product action history
 *     description: Retrieve the history of actions (e.g., stock increase or decrease) performed on products.
 *     tags: [Product Actions]
 *     parameters:
 *       - in: query
 *         name: product_id
 *         schema:
 *           type: integer
 *         description: Filter by product ID
 *       - in: query
 *         name: shop_id
 *         schema:
 *           type: integer
 *         description: Filter by shop ID
 *       - in: query
 *         name: action_type
 *         schema:
 *           type: string
 *         description: Filter by action type (e.g., "increase" or "decrease")
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering actions
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering actions
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit the number of results
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Offset for pagination
 *     responses:
 *       200:
 *         description: List of product action history entries.
 *       400:
 *         description: Invalid query parameters.
 */
router.get("/actions", actionController_1.getProductActionsController);
exports.default = router;
