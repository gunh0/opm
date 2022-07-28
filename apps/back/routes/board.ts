import mongoose from "mongoose";
import { BoardInfo } from "../../front/types";

const boardModel = new mongoose.Schema<BoardInfo>([]);

boardModel.set("collection", "Board");

const Board = mongoose.model("Board", boardModel);

export default {
  async showAllBoard (_, res) {
    const allBoard = await Board.find();
    return res.json(allBoard);
  },
};