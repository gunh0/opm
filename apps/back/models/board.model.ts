import mongoose from "mongoose";
import { BoardInfo } from "opm-models";

const boardSchema = new mongoose.Schema<BoardInfo>({
  aId: "",
  uId: "",
  eId: "",
  aTitle: "",
  aDescription: "",
  aContent: "",
  aCategory: "",
  aCreateDate: "",
  aEditDate: "",
  aHit: 0,
  aEditList: [],
  aStatus: "String",
});
boardSchema.set("collection", "Board");
const Board = mongoose.model("Board", boardSchema);

export default Board;
