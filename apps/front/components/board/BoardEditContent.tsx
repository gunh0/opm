import { ChangeEvent, FunctionComponent } from "react";

import styles from "../../styles/Board.module.scss";

interface BoardEditContentProps {
  originText: string;
  onChange: (e: ChangeEvent) => void;
}

const BoardEditContent: FunctionComponent<BoardEditContentProps> = ({
  originText,
  onChange,
}) => {
  return (
    <textarea
      className={styles.textBox}
      defaultValue={originText}
      onChange={onChange}
    />
  );
};

export default BoardEditContent;
