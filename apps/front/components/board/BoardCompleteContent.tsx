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
      {/* {articleStatus === "COMPLETE" ? editedText : originText} */}
    </div>
  );
};

export default BoardCompleteContent;
