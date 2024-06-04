export type UrlKey =
  | "LOCAL_SOCKET"
  | "REAL_SOCKET"
  | "LOCAL_SERVER"
  | "REAL_SERVER";

export type SocketKey =
  | "END"
  | "CONNECT"
  | "MESSAGE"
  | "ROOM_DATA"
  | "DISCONNECT"
  | "ERROR";

export type UserApiKey = "all" | "signup" | "signIn";

export enum UserApiEndPoint {
  all = "/user/all",
  signup = "/user/signup",
  signIn = "/user/login",
}

export type BoardApiKey =
  | "one"
  | "all"
  | "write"
  | "edit"
  | "delete"
  | "accept"
  | "cancel"
  | "proofread"
  | "complete"
  | "listByUser"
  | "editingListByUser"
  | "hitUp"
  | "changeBoardState";

export enum BoardApiEndPoint {
  one = "/board/article",
  all = "/board/articleList",
  write = "/board/writeArticle",
  edit = "/board/editArticle",
  delete = "/board/deleteArticle",
  accept = "/board/acceptArticle",
  cancel = "/board/cancelArticle",
  proofread = "/board/proofreadArticle",
  complete = "/board/completeArticle",
  listByUser = "/board/myArticleList",
  editingListByUser = "/board/myEditingList",
  hitUp = "/board/hitUpArticle",
  changeBoardState = "/board/changeBoardState",
}
