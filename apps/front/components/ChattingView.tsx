import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
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
  
  // const currentTime = now

  const [sendChatList, setSendChatList] = useState([{
    messageId: '0',
    boardId: '0',
    from: 'me',
    to: 'you',
    type: 'SYSTEM',
    timestamp: '',
    textBody: 'open chatting room',
  }]);

  return (
    <div className={styles.container}>
      <div className={styles.bubbleContainer}>
        {sendChatList.map((el) => (
          <div key={el.messageId}>{el.textBody}</div>
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
