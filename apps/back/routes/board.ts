import mongoose from "mongoose";
import { BoardInfo } from "opm-models";

const boardModel = new mongoose.Schema<BoardInfo>([] as unknown as BoardInfo);

boardModel.set("collection", "Board");

const Board = mongoose.model("Board", boardModel);

const showAllBoard = async (_, res) => {
  const allBoard = await Board.find();
  return res.json(allBoard);
};

const board = {
  showAllBoard,
};

export default board;
