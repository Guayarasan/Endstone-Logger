import { eventBus } from "./core/eventBus";
import { processLog } from "./core/processor";
import { addLog } from "./core/buffer";

import { registerBlockEvents } from "./events/block";
import { registerEntityEvents } from "./events/entity";
import { registerInteractionEvents } from "./events/interaction";
import { registerScanCommand } from "./commands/scan";

export default function (server: any) {

  registerBlockEvents(server);
  registerEntityEvents(server);
  registerInteractionEvents(server);
  registerScanCommand(server);

  eventBus.on("log", (raw) => {
    const log = processLog(raw);
    addLog(log);
  });

}
