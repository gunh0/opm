import { UrlKey, SocketKey, ApiKey } from "../models/path";

export const Url: Record<UrlKey, string> = {
  SOCKET: "ws://localhost:8080",
  SERVER: "http://localhost:8080",
};
export const ApiPath: Record<ApiKey, string> = {
  signup: "/user/signup",
};
export const SocketPath: Record<SocketKey, string> = {
  CONNECT: "connect",
  MESSAGE: "message",
  ROOM_DATA: "roomData",
  DISCONNECT: "disconnect",
};
