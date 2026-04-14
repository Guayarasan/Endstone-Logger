import { eventBus } from "../core/eventBus";

export function registerEntityEvents(server: any) {
  server.events.entityDie.subscribe((event: any) => {
    if (!event.damageSource?.damagingEntity) return;

    eventBus.emit("log", {
      type: "entity_kill",
      player: event.damageSource.damagingEntity.name,
      x: event.deadEntity.location.x,
      y: event.deadEntity.location.y,
      z: event.deadEntity.location.z,
      world: event.deadEntity.dimension.id,
      data: { entity: event.deadEntity.typeId }
    });
  });
}
