import mysql from "mysql2/promise";
import { config } from "../config";

export const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10
});

export async function insertLogs(logs: any[]) {
  if (logs.length === 0) return;

  const values = logs.map(l => [
    l.type, l.player, l.world,
    l.x, l.y, l.z,
    JSON.stringify(l.data),
    l.timestamp
  ]);

  await pool.query(
    `INSERT INTO logs (type, player, world, x, y, z, data, timestamp)
     VALUES ?`,
    [values]
  );
}
