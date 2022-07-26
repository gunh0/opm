import type { NextPage } from "next";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { parseISO } from "../../helpers/date";
import { ErrorMessage } from "../../helpers/error";
import { SocketPath, Url } from "../../models";
import styles from "../../styles/Chat.module.scss";
import { MessageSocket } from "../../types";

import ChatMessage from "./ChatMessage";

const testData = {
  userId: "me",
  boardId: "test0",
  from: "me",
  to: "you",
};

const ChatView: NextPage = () => {
  const [socket, setSocket] = useState<Socket>();
  const [chatList, setChatList] = useState<MessageSocket[]>([]);
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    if (socket) {
      return;
    }
    const socketClient = io(Url.SOCKET, { transports: ["websocket"] });
    socketClient.on(SocketPath.CONNECTION, () => {
      console.info("connected!", socketClient.id);
      socketClient.emit(SocketPath.ROOM_DATA, { boardId: testData.boardId });
    });
    setSocket(socketClient);
    socketClient.on(SocketPath.MESSAGE, (data: any) => {
      setChatList((prev) => [...prev, data]);
    });

    return () => {
      console.info("disconnected!", socketClient.id);
      socketClient.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!chatListRef.current || chatList.length === 0) {
      return;
    }
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [chatList, chatListRef]);

  const handleTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const { key } = event;
    const text = event.target.value;
    if (key !== "Enter") {
      return;
    }
    if (text.length === 0) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    if (!socket) {
      throw new Error(ErrorMessage.SOCKET_CLOSED);
    }
    const message: MessageSocket = {
      ...testData,
      type: "NORMAL",
      timestamp: new Date().toISOString(),
      textBody: text,
    };
    socket.emit(SocketPath.MESSAGE, message);
    event.target.value = "";
  };

  return (
    <div className={styles.container}>
      <div ref={chatListRef} className={styles.bubbleContainer}>
        {chatList.map((chat) => (
          <ChatMessage
            key={chat.messageId}
            message={chat}
            userId={testData.userId}
          />
        ))}
      </div>
      <div className={styles.inputContainer}>
        <textarea
          onKeyDown={handleTextAreaKeyDown}
          className={styles.chatInput}
          placeholder="Please Enter Your Message"
        />
      </div>
    </div>
  );
};

export default ChatView;
