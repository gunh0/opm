import { UrlKey, SocketKey, UserApiKey, BoardApiKey } from "../models/path";

export const Url: Record<UrlKey, string> = {
  SOCKET: "ws://localhost:8080",
  SERVER: "http://localhost:8080",
};
export const UserApiPath: Record<UserApiKey, string> = {
  all: "/user/all",
  signup: "/user/signup",
  signin: "/user/login",
};
export const BoardApiPath: Record<BoardApiKey, string> = {
  all: "/board/allArticle",
  write: "/board/writeArticle",
  edit: "/board/editArticle",
  accept: "/board/acceptArticle",
  cancel: "/board/calcelArticle",
  proofread: "/board/proofreadArticle",
};
export const SocketPath: Record<SocketKey, string> = {
  CONNECT: "connect",
  MESSAGE: "message",
  ROOM_DATA: "roomData",
  DISCONNECT: "disconnect",
  ERROR: "error",
};
