export type ARTICLE_STATUS = "LOADING" | "EDITING" | "DONE";
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
  aHit: string;
  aEditList: BoardEditList[];
  aStatus: ARTICLE_STATUS;
}

export interface BoardEditList {
  seq: string;
  aProofread: string;
  aProofreadDate: string;
}
