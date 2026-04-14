import { insertLogs } from "../database/mysql";
import { config } from "../config";

let buffer: any[] = [];

export function addLog(log: any) {
  buffer.push(log);
}

setInterval(async () => {
  if (buffer.length === 0) return;

  const toSave = buffer;
  buffer = [];

  try {
    await insertLogs(toSave);
  } catch (e) {
    console.error("DB ERROR", e);
  }
}, config.flushInterval);
