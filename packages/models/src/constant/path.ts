import { UrlKey, SocketKey, UserApiKey, BoardApiKey } from "../models/path";

export const Url: Record<UrlKey, string> = {
  SOCKET: "ws://localhost:8080",
  SERVER: "http://localhost:8080",
};
export const UserApiPath: Record<UserApiKey, string> = {
  all: "/user/all",
  signup: "/user/signup",
  signin: "/user/login",
  myArticleList: "/user/myArticleList",
  myEditingList: "/user/myEditingList",
};
export const BoardApiPath: Record<BoardApiKey, string> = {
  one: "/board/articleId",
  all: "/board/articleList",
  write: "/board/writeArticle",
  edit: "/board/editArticle",
  delete: "/board/deleteArticle",
  accept: "/board/acceptArticle",
  cancel: "/board/calcelArticle",
  proofread: "/board/proofreadArticle",
};
export const SocketPath: Record<SocketKey, string> = {
  END: "end",
  CONNECT: "connect",
  MESSAGE: "message",
  ROOM_DATA: "roomData",
  DISCONNECT: "disconnect",
  ERROR: "error",
};
