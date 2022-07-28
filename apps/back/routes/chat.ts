import mongoose from "mongoose";

const chatModel = new mongoose.Schema({
  a_id: "string",
  u_id: "string",
  a_title: "string",
  a_description: "string",
  a_content: "string",
  a_category: "string",
  a_editList: "string",
  a_editDate: "string",
  a_status: "string",
  e_id: "string",
  a_hit: "string",
});

chatModel.set("collection", "Chat");

const Chat = mongoose.model("Chat", chatModel);

export const showAllChat = async (_, res) => {
  const allChat = await Chat.find();
  console.log(allChat);
  return res.json(allChat);
}
