import { ARTICLE_STATUS } from "./board";

export interface CommonSocket {
  path: string;
}
export interface UserSocket {
  userId: string;
  name: string;
  email: string;
}
// PHASE 2. emoji
export type MessageType = "SYSTEM" | "NORMAL" | "EMOJI";
export interface MessageSocket {
  messageId?: string;
  aId: string;
  from: string;
  to?: string[];
  type: MessageType;
  timestamp: string;
  textBody: string;
}
export interface BoardSocket {
  aId: string;
  editorId: string;
  boardStatus: ARTICLE_STATUS;
  editedList: BoardEditSocket[];
}
export interface BoardEditSocket {
  seq: string;
  body: string;
  // TODO: sanitizer 하고 싶다면...
  // seq1: My names is
  // seq2: My <span style="color: red">names</span><span style="color:blue">name</span> is
}
export interface UpdateBoardStatusSocket {
  aId: string;
  editorId: string;
  status: ARTICLE_STATUS;
}
