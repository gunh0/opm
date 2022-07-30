import { UrlKey, SocketKey } from "../models/path";

export const Url: Record<UrlKey, string> = {
  SOCKET: "ws://localhost:8080",
};
export const SocketPath: Record<SocketKey, string> = {
  CONNECTION: "connect",
  MESSAGE: "message",
  ROOM_DATA: "roomData",
};
