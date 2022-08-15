import {
  UrlKey,
  SocketKey,
  UserApiKey,
  BoardApiKey,
  BoardApiEndPoint,
  UserApiEndPoint,
} from "../models/path";

export const Url: Record<UrlKey, string> = {
  SOCKET: "ws://localhost:8080",
  SERVER: "http://localhost:8080",
};
export const UserApiPath: Record<UserApiKey, string> = {
  all: UserApiEndPoint.all,
  signup: UserApiEndPoint.signup,
  signIn: UserApiEndPoint.signIn,
};
export const BoardApiPath: Record<BoardApiKey, BoardApiEndPoint> = {
  one: BoardApiEndPoint.one,
  all: BoardApiEndPoint.all,
  write: BoardApiEndPoint.write,
  edit: BoardApiEndPoint.edit,
  delete: BoardApiEndPoint.delete,
  accept: BoardApiEndPoint.accept,
  cancel: BoardApiEndPoint.cancel,
  proofread: BoardApiEndPoint.proofread,
  listByUser: BoardApiEndPoint.listByUser,
  editingListByUser: BoardApiEndPoint.editingListByUser,
  hitUp: BoardApiEndPoint.hitUp,
};
export const SocketPath: Record<SocketKey, string> = {
  END: "end",
  CONNECT: "connect",
  MESSAGE: "message",
  ROOM_DATA: "roomData",
  DISCONNECT: "disconnect",
  ERROR: "error",
};
