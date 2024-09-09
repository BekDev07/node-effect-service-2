import { Request, Response } from "express";
import { logProductAction, getProductActions } from "../dao/actionDao";

export const logProductActionController = async (
  req: Request,
  res: Response
) => {
  console.log("salom");
  const { product_id, shop_id, action_type, action_details } = req.body;
  if (!product_id || !shop_id || !action_type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newAction = await logProductAction({
      product_id,
      shop_id,
      action_type,
      action_details,
    });
    res.status(201).json(newAction);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: `Error logging action: ${error.message}` });
    } else {
      return res.status(500).json({ error: "Unknown error occured" });
    }
  }
};

export const getProductActionsController = async (
  req: Request,
  res: Response
) => {
  const { shop_id, plu, action_type, start_date, end_date, page, limit } =
    req.query;
  const offset = page
    ? (parseInt(page as string) - 1) * (parseInt(limit as string) || 10)
    : 0;

  try {
    const actions = await getProductActions(
      shop_id ? parseInt(shop_id as string) : undefined,
      plu as string,
      action_type as string,
      start_date as string,
      end_date as string,
      parseInt(limit as string) || 10,
      offset
    );
    res.status(200).json(actions);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: `Error logging action: ${error.message}` });
    } else {
      return res.status(500).json({ error: "Unknown error occured" });
    }
  }
};
