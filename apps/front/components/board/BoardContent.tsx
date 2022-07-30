import { FunctionComponent } from "react";

import styles from "../../styles/Board.module.scss";

interface BoardContentProps {
  text: string;
}

const BoardContent: FunctionComponent<BoardContentProps> = ({ text }) => {
  return <div className={styles.textBox}>{text}</div>;
};

export default BoardContent;
