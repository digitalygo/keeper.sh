import { log } from "@keeper.sh/log";
import { connections } from "./state";
import type { Socket } from "./types";

export type { BroadcastData, Socket } from "./types";

export const emit = (userId: string, event: string, data: unknown): void => {
  const userConnections = connections.get(userId);

  if (!userConnections || userConnections.size === 0) {
    return;
  }

  const message = JSON.stringify({ event, data });
  for (const socket of userConnections) {
    socket.send(message);
  }

  log.debug(
    { userId, event, connectionCount: userConnections.size },
    "broadcast sent",
  );
};

export const addConnection = (userId: string, socket: Socket): void => {
  const existing = connections.get(userId);
  log.debug({ userId }, "adding connection");

  if (existing) {
    existing.add(socket);
    return;
  }

  connections.set(userId, new Set([socket]));
};

export const removeConnection = (userId: string, socket: Socket): void => {
  const userConnections = connections.get(userId);
  if (userConnections) {
    userConnections.delete(socket);
    if (userConnections.size === 0) {
      connections.delete(userId);
    }
  }
  log.debug({ userId }, "connection removed");
};

export const getConnectionCount = (userId: string): number => {
  return connections.get(userId)?.size ?? 0;
};

export const websocketHandler = {
  open(socket: Socket) {
    addConnection(socket.data.userId, socket);
  },
  close(socket: Socket) {
    removeConnection(socket.data.userId, socket);
  },
  message(_socket: Socket, _message: string | Buffer) {
    // Client-to-server messages not implemented
  },
};
