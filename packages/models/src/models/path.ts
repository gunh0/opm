export type UrlKey = "SOCKET" | "SERVER";

export type SocketKey =
  | "CONNECT"
  | "MESSAGE"
  | "ROOM_DATA"
  | "DISCONNECT"
  | "INVALID";

export type UserApiKey = "all" | "signup" | "signin";

export type BoardApiKey =
  | "all"
  | "write"
  | "edit"
  | "accept"
  | "cancel"
  | "proofread";
