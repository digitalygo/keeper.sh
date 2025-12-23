import type { Socket } from "./types";

export const connections = new Map<string, Set<Socket>>();
export const pingIntervals = new WeakMap<Socket, ReturnType<typeof setInterval>>();
