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
      <div>{originText}</div>
      <div>{editedText}</div>
    </div>
  );
};

export default BoardCompleteContent;
