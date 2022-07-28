import { UrlKey, SocketKey } from "../../types/path";

export const Url: Record<UrlKey, string> = {
  SOCKET: "ws://localhost:8080",
};
export const SocketPath: Record<SocketKey, string> = {
  CONNECTION: "connect",
  MESSAGE: "message",
  ROOM_DATA: "roomData",
};
