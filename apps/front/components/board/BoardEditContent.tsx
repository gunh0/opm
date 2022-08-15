import { ChangeEvent, FunctionComponent } from "react";

import styles from "../../styles/Board.module.scss";

interface BoardEditContentProps {
  text: string;
  onChange: (e: ChangeEvent) => void;
}

const BoardEditContent: FunctionComponent<BoardEditContentProps> = ({
  text,
  onChange,
}) => {
  return (
    <textarea
      className={styles.textBox}
      defaultValue={text}
      onChange={onChange}
    />
  );
};

export default BoardEditContent;
