import { useEffect } from "react";
import type { URLRecord } from "../types/URLtable";

export const useURLWebSocket = (onMessage: (data: URLRecord) => void) => {
  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_URL);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (err) {
        console.error("WebSocket parse error:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = (event) => {
      console.warn("WebSocket closed:", event.code, event.reason);
    };
  }, [onMessage]);
};
