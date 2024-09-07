import { pgQuery } from "../db/dbConnect";

interface ProductAction {
  product_id: number;
  shop_id: number;
  action_type: string;
  action_details: string;
}

export const logProductAction = async (action: ProductAction) => {
  const query = `INSERT INTO product_action_logs (product_id, shop_id, action_type, action_details)
                 VALUES ($1, $2, $3, $4) RETURNING *`;
  const params = [
    action.product_id,
    action.shop_id,
    action.action_type,
    action.action_details,
  ];
  return pgQuery(query, params);
};

export const getProductActions = async (
  shop_id?: number,
  plu?: string,
  action_type?: string,
  start_date?: string,
  end_date?: string,
  limit: number = 10,
  offset: number = 0
) => {
  let query = `
    SELECT pal.*, p.plu, p.name AS product_name, s.name AS shop_name
    FROM product_action_logs pal
    JOIN products p ON pal.product_id = p.id
    JOIN shops s ON pal.shop_id = s.id
    WHERE 1=1`;

  const params: any[] = [];

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

  query += ` ORDER BY pal.action_date DESC LIMIT $${
    params.length + 1
  } OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  return pgQuery(query, params);
};
