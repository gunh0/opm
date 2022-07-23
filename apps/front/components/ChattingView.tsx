import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { SocketPath, Url } from "../models";
import styles from "../styles/Chatting.module.scss";
import { MessageSocket } from "../types";

const ChattingView: NextPage = () => {
  const [socketId, setSocketId] = useState<string>();

  useEffect((): any => {
    const socket = io(Url.SOCKET, { transports: ["websocket"] });
    socket.on(SocketPath.CONNECTION, () => {
      setSocketId(socket.id);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
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
          className={styles.chatInput}
          placeholder="Please Enter Your Message"
        />
      </div>
      {/* <div>Socket ID: {socketId}</div> */}
    </div>
  );
};

export default ChattingView;
