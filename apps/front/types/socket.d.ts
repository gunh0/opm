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
  messageId: string;
  boardId: string;
  from: string;
  to: string;
  type: MessageType;
  timestamp: string;
  textBody: string;
}
export type BOARD_STATUS = "LOADING" | "EDITING" | "DONE"; // TODO: 상태 추가
export interface BoardSocket {
  boardId: string;
  editorId: string;
  boardStatus: BOARD_STATUS;
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
  boardId: string;
  editorId: string;
  status: BOARD_STATUS;
}
