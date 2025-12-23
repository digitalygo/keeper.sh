import useSWRSubscription from "swr/subscription";
import { socketMessageSchema, syncStatusSchema, type SyncStatus } from "@keeper.sh/data-schemas";

const getSocketUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_SOCKET_URL;
  if (!url) throw new Error("NEXT_PUBLIC_SOCKET_URL is not set");
  return url;
};

const fetchSocketToken = async (): Promise<string> => {
  const response = await fetch("/api/socket/token");
  if (!response.ok) throw new Error("Failed to fetch socket token");
  const { token } = await response.json();
  return token;
};

const createSocketUrl = (baseUrl: string, token: string): string => {
  const url = new URL(baseUrl);
  url.searchParams.set("token", token);
  return url.toString();
};

type StatusMap = Map<string, SyncStatus>;
type Next = (error?: Error | null, data?: StatusMap | ((prev?: StatusMap) => StatusMap)) => void;

export function useSyncStatus() {
  const subscribe = (baseUrl: string, { next }: { next: Next }) => {
      let socket: WebSocket | null = null;
      let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

      const connect = async () => {
        try {
          const token = await fetchSocketToken();
          socket = new WebSocket(createSocketUrl(baseUrl, token));

          socket.onmessage = (messageEvent) => {
            const message = JSON.parse(String(messageEvent.data));
            if (!socketMessageSchema.allows(message)) return;

            if (message.event === "ping") {
              socket?.send(JSON.stringify({ event: "pong" }));
              return;
            }

            if (message.event !== "sync:status") return;
            if (!syncStatusSchema.allows(message.data)) return;

            const status = message.data;
            next(null, (prev: Map<string, SyncStatus> | undefined) => {
              const map = new Map(prev ?? []);
              map.set(status.provider, status);
              return map;
            });
          };

          socket.onclose = () => {
            reconnectTimer = setTimeout(connect, 3000);
          };

          socket.onerror = () => {
            next(new Error("WebSocket error"));
          };
        } catch {
          reconnectTimer = setTimeout(connect, 3000);
        }
      };

      connect();

      return () => {
        if (reconnectTimer) clearTimeout(reconnectTimer);
        socket?.close();
      };
    };

  return useSWRSubscription(getSocketUrl(), subscribe);
}
