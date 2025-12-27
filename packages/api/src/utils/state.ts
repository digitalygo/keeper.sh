interface SocketTokenEntry {
  userId: string;
  timeout: ReturnType<typeof setTimeout>;
}

// TODO: Move to Redis
export const socketTokens = new Map<string, SocketTokenEntry>();
