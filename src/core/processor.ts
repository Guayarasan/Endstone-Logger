export function processLog(raw: any) {
  return {
    type: raw.type,
    player: raw.player,
    world: raw.world || "overworld",
    x: Math.floor(raw.x),
    y: Math.floor(raw.y),
    z: Math.floor(raw.z),
    data: raw,
    timestamp: Date.now()
  };
}
