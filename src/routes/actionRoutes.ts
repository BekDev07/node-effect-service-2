import { Router } from "express";
import {
  logProductActionController,
  getProductActionsController,
} from "../controllers/actionController";

const router = Router();

router.post("/actions", logProductActionController);
router.get("/actions", getProductActionsController);

export default router;
