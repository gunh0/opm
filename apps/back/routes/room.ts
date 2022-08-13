import { Request, Response } from "express";
import mongoose from "mongoose";
import { MessageSocket } from "opm-models";

const roomModel = new mongoose.Schema({
  rId: "string",
  bId: "string",
  chatList: Array<MessageSocket>,
});

roomModel.set("collection", "Room");
const Room = mongoose.model("Room", roomModel);

const showAllRoom = async (_: Request, res: Response) => {
  const allRoom = await Room.find();
  return res.status(200).send({ data: allRoom });
};

const room = {
  showAllRoom,
};

export default room;
