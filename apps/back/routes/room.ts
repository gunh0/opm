import mongoose from "mongoose";
import { MessageSocket } from "opm-models";

const roomModel = new mongoose.Schema({
  rId: "string",
  bId: "string",
  chatList: Array<MessageSocket>,
});

roomModel.set("collection", "Room");

const Room = mongoose.model("Room", roomModel);

const showAllRoom = async (_, res) => {
  const allRoom = await Room.find();
  return res.json(allRoom);
};

const room = {
  showAllRoom,
};

export default room;
