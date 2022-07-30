import { FunctionComponent } from "react";
import { MessageSocket } from "opm-models";

import { parseISO } from "../../helpers/date";
import styles from "../../styles/Chat.module.scss";

interface ChatMessageProps {
  message: MessageSocket;
  userId: string;
}

const ChatMessage: FunctionComponent<ChatMessageProps> = (props) => {
  const { message, userId } = props;
  const { textBody, timestamp, from } = message;
  const myChat = from === userId;

  return (
    <div
      className={`${
        myChat ? styles.messageContainerMy : styles.messageContainer
      }`}
    >
      {myChat && (
        <div className={styles.messageTimestamp}>{parseISO(timestamp)}</div>
      )}
      <div className={myChat ? styles.messageBoxMy : styles.messageBox}>
        {textBody}
      </div>
      {!myChat && (
        <div className={styles.messageTimestamp}>{parseISO(timestamp)}</div>
      )}
    </div>
  );
};

export default ChatMessage;
