import { pool } from "../database/mysql";

export function registerScanCommand(server: any) {
  server.commands.register("scan", async (player: any, args: any[]) => {
    const radius = parseInt(args[0]) || 50;

    const { x, y, z } = player.location;

    const [rows] = await pool.query(
      `SELECT * FROM logs
       WHERE x BETWEEN ? AND ?
       AND y BETWEEN ? AND ?
       AND z BETWEEN ? AND ?
       ORDER BY timestamp DESC
       LIMIT 50`,
      [x - radius, x + radius, y - radius, y + radius, z - radius, z + radius]
    );

    player.sendMessage(`Encontrados ${rows.length} logs`);
  });
}
