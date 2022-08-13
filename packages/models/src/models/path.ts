export type UrlKey = "SOCKET" | "SERVER";

export type SocketKey =
  | "CONNECT"
  | "MESSAGE"
  | "ROOM_DATA"
  | "DISCONNECT"
  | "ERROR";

export type UserApiKey =
  | "all"
  | "signup"
  | "signin"
  | "myArticleList"
  | "myEditingList";

export type BoardApiKey =
  | "all"
  | "write"
  | "edit"
  | "accept"
  | "cancel"
  | "proofread";
