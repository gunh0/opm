import type { NextPage } from "next";
import { KeyboardEventHandler, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { SocketPath, Url } from "../models";
import styles from "../styles/Chatting.module.scss";
import { MessageSocket } from "../types";

const ChattingView: NextPage = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect((): any => {
    if (socket) {
      return;
    }
    const socketClient = io(Url.SOCKET, { transports: ["websocket"] });
    socketClient.on(SocketPath.CONNECTION, () => {
      console.info("connected!", socketClient.id);
    });
    setSocket(socketClient);

    return () => {
      console.info("disconnected!", socketClient.id);
      socketClient.disconnect();
    };
  }, []);

  const [sendChatList, setSendChatList] = useState([
    {
      messageId: "0",
      boardId: "0",
      from: "me",
      to: "you",
      type: "SYSTEM",
      timestamp: "Wen 21:09",
      textBody: "open chatting room",
    },
  ]);

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    const { key } = event;
    if (key !== "Enter") {
      return;
    }
    event.preventDefault();
    if (!socket) {
      throw new Error("SOCKET ERROR");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bubbleContainer}>
        {sendChatList.map((el) => (
          <div className={styles.messageContainer} key={el.messageId}>
            <div className={styles.messageBox}>{el.textBody}</div>
            <div className={styles.messageTimestamp}>{el.timestamp}</div>
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <textarea
          onKeyDown={handleKeyDown}
          className={styles.chatInput}
          placeholder="Please Enter Your Message"
        />
      </div>
    </div>
  );
};

export default ChattingView;
