export type ARTICLE_STATUS = "INIT" | "EDITING" | "DONE" | "COMPLETE";
export interface BoardInfo {
  aId: string;
  uId: string;
  eId: string;
  aTitle: string;
  aDescription: string;
  aContent: string;
  aCategory: string;
  aCreateDate: string;
  aEditDate: string;
  aHit: number;
  aEditList: BoardEditList[];
  aStatus: ARTICLE_STATUS;
}

export interface BoardEditList {
  seq: number;
  aProofread: string;
  aProofreadDate: string;
}
