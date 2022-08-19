import { BoardInfo } from "opm-models";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import styles from "../../styles/Board.module.scss";
import Diff from "../../hooks/diff";

interface BoardContentProps {
  originText: string;
  editedText: string;
}

const BoardContent: FunctionComponent<BoardContentProps> = ({
  originText,
  editedText,
}) => {
  const board = useSelector<RootState, BoardInfo>((state) => state.board);

  return (
    <div className={styles.textBox}>
      <Diff string1={originText} string2={editedText} mode="words" />
    </div>
  );
};

export default BoardContent;
