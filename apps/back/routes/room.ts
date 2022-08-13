import { randomUUID } from "crypto";

import { Request, Response } from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { MessageSocket } from "opm-models";

import opmServer from "../app";

const roomModel = new mongoose.Schema({
  rId: "string",
  bId: "string",
  chatList: Array<MessageSocket>,
});

roomModel.set("collection", "Room");
const Room = mongoose.model("Room", roomModel);

interface RoomData {
  boardId: number;
}

const io = new Server(opmServer, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  const roomData = {} as RoomData;
  console.info("server received connection!", socket.id);

  socket.on("roomData", (data) => {
    roomData.boardId = data.boardId;
    socket.emit("message", {
      boardId: roomData.boardId,
      messageId: randomUUID(),
      type: "SYSTEM",
      from: "SYSTEM",
      to: socket.id,
      timestamp: new Date().toISOString(),
      textBody: "open chatting room",
    });
  });

  socket.on("message", (data) => {
    console.info("received", data);
    socket.emit("message", { ...data, messageId: randomUUID() });
  });

  socket.on("disconnect", () => {
    console.info("disconnect", socket.id);
  });
});

const showAllRoom = async (_: Request, res: Response) => {
  const allRoom = await Room.find();
  return res.status(200).send({ data: allRoom });
};

const room = {
  showAllRoom,
};

export default room;
