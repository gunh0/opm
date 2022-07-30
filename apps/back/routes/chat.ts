import mongoose from "mongoose";
import { MessageSocket } from "opm-models";

const chatModel = new mongoose.Schema({
  c_id: "string",
  b_id: "string",
  data: Array<MessageSocket>,
});

chatModel.set("collection", "Chat");

const Chat = mongoose.model("Chat", chatModel);

const showAllChat = async (_, res) => {
  const allChat = await Chat.find();
  return res.json(allChat);
};

const chat = {
  showAllChat,
};

export default chat;
