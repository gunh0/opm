import { FunctionComponent } from "react";

import styles from "../../styles/Board.module.scss";

interface BoardCompleteContentProps {
  originText: string;
  editedText: string;
}

const BoardCompleteContent: FunctionComponent<BoardCompleteContentProps> = ({
  originText,
  editedText,
}) => {
  return (
    <div className={styles.textBox}>
      <div className={styles.originText}>{originText}</div>
      <div className={styles.editedText}>{editedText}</div>
    </div>
  );
};

export default BoardCompleteContent;
