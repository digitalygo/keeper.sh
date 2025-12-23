type EventCallback = (data: unknown) => void;

export class BroadcastClient {
  private socket: WebSocket | null = null;
  private listeners = new Map<string, Set<EventCallback>>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private shouldReconnect = true;

  constructor(private url: string) {}

  connect(): void {
    this.shouldReconnect = true;
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.listeners.get("$open")?.forEach((callback) => callback(null));
    };

    this.socket.onmessage = (messageEvent) => {
      try {
        const { event, data } = JSON.parse(messageEvent.data as string);
        this.listeners.get(event)?.forEach((callback) => callback(data));
      } catch (error) {
        console.warn("invalid broadcast message received", error);
      }
    };

    this.socket.onclose = () => {
      this.listeners.get("$close")?.forEach((callback) => callback(null));
      if (!this.shouldReconnect) return;
      this.scheduleReconnect();
    };

    this.socket.onerror = () => {
      this.listeners.get("$error")?.forEach((callback) => callback(null));
    };
  }

  on(event: string, callback: EventCallback): () => void {
    const existing = this.listeners.get(event);

    if (existing) {
      existing.add(callback);
    } else {
      this.listeners.set(event, new Set([callback]));
    }

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  private scheduleReconnect(): void {
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, 3000);
  }

  disconnect(): void {
    this.shouldReconnect = false;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.socket?.close();
    this.socket = null;
  }

  get connected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}
