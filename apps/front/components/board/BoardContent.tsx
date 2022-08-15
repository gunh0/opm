import { ARTICLE_STATUS } from "opm-models";
import { FunctionComponent } from "react";

import styles from "../../styles/Board.module.scss";

interface BoardContentProps {
  originText: string;
  editedText: string;
  articleStatus: ARTICLE_STATUS;
}

const BoardContent: FunctionComponent<BoardContentProps> = ({
  originText,
  editedText,
  articleStatus,
}) => {
  return (
    <div className={styles.textBox}>
      {articleStatus === "COMPLETE" ? editedText : originText}
    </div>
  );
};

export default BoardContent;
