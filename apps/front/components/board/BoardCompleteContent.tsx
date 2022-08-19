import { FunctionComponent } from "react";
import Diff from "../../hooks/diff";

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
      <Diff string1={originText} string2={editedText} mode="words" />
    </div>
  );
};

export default BoardCompleteContent;
