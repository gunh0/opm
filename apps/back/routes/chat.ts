import mongoose from "mongoose";
import { MessageSocket } from "../../front/types";

const chatModel = new mongoose.Schema({
  c_id: "string",
  b_id: "string",
  data: Array<MessageSocket>,
});

chatModel.set("collection", "Chat");

const Chat = mongoose.model("Chat", chatModel);

export default {
  async showAllChat (_, res) {
    const allChat = await Chat.find();
    return res.json(allChat);
  },
};
