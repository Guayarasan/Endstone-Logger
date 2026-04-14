import { eventBus } from "../core/eventBus";

export function registerInteractionEvents(server: any) {

  // Interacción con bloques (clic derecho típico)
  server.events.playerInteract.subscribe((event: any) => {
    if (!event.block) return;

    eventBus.emit("log", {
      type: "block_interact",
      player: event.player.name,
      x: event.block.location.x,
      y: event.block.location.y,
      z: event.block.location.z,
      world: event.block.dimension.id,
      data: {
        block: event.block.typeId
      }
    });
  });

  // Apertura de inventarios (cofres, shulkers, etc)
  server.events.inventoryOpen.subscribe((event: any) => {
    if (!event.inventory) return;

    const holder = event.inventory.container;

    let x = 0, y = 0, z = 0, world = "unknown";

    if (holder?.location) {
      x = holder.location.x;
      y = holder.location.y;
      z = holder.location.z;
      world = holder.dimension?.id || "overworld";
    }

    eventBus.emit("log", {
      type: "container_open",
      player: event.player.name,
      x,
      y,
      z,
      world,
      data: {
        inventoryType: event.inventory.type
      }
    });
  });

  // Botones, palancas, puertas (redstone/interacción física)
  server.events.blockActivate.subscribe((event: any) => {
    if (!event.block) return;

    eventBus.emit("log", {
      type: "block_activate",
      player: event.player.name,
      x: event.block.location.x,
      y: event.block.location.y,
      z: event.block.location.z,
      world: event.block.dimension.id,
      data: {
        block: event.block.typeId
      }
    });
  });

}
