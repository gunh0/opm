export type UrlKey = "SOCKET" | "SERVER";

export type SocketKey =
  | "END"
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
  | "one"
  | "all"
  | "write"
  | "edit"
  | "delete"
  | "accept"
  | "cancel"
  | "proofread";
