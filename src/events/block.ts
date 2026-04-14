import { eventBus } from "../core/eventBus";

export function registerBlockEvents(server: any) {
  server.events.blockBreak.subscribe((event: any) => {
    eventBus.emit("log", {
      type: "block_break",
      player: event.player.name,
      x: event.block.location.x,
      y: event.block.location.y,
      z: event.block.location.z,
      world: event.block.dimension.id,
      data: { block: event.block.typeId }
    });
  });

  server.events.blockPlace.subscribe((event: any) => {
    eventBus.emit("log", {
      type: "block_place",
      player: event.player.name,
      x: event.block.location.x,
      y: event.block.location.y,
      z: event.block.location.z,
      world: event.block.dimension.id,
      data: { block: event.block.typeId }
    });
  });
}
