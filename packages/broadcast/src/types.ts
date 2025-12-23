import type { ServerWebSocket } from "bun";

export interface BroadcastData {
  userId: string;
}

export type Socket = ServerWebSocket<BroadcastData>;
