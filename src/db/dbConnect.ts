import { Pool } from "pg";

const pool = new Pool({
  connectionString: `postgresql://postgres.vxlejaiatocwtyudkxoy:${process.env.DB_PASSWORD}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`,
});

export const pgQuery = async (query: string, params: any[] = []) => {
  const client = await pool.connect();
  try {
    const res = await client.query(query, params);
    return res.rows;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error executing query", err.stack);
    } else {
      console.log("Unknown error occured");
    }
    throw err;
  } finally {
    client.release();
  }
};

export const testConnection = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected successfully");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error connecting to the database", err.stack);
      process.exit(1);
    }
  }
};
