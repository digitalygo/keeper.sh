import type { Socket } from "./types";

export const connections = new Map<string, Set<Socket>>();
