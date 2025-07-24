import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/db/schema";

const pool = new Pool({ ssl: { rejectUnauthorized: false } });
export const db = drizzle({
  client: pool,
  schema,
});

export async function query(text: string, params: (string | string[])[] = []) {
  try {
    const res = await pool.query(text, params);
    return { successful: true, data: res.rows };
  } catch (err) {
    console.error(err);
    return { successful: false, error: "SQL query failed." };
  }
}
