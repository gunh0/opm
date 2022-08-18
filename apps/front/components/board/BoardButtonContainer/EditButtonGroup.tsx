import { BoardInfo } from "opm-models";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import styles from "../../../styles/Board.module.scss";

const EditButtonGroup: FunctionComponent<{
  onEditingButtonClick: () => void;
}> = ({ onEditingButtonClick }) => {
  const board = useSelector<RootState, BoardInfo>((state) => state.board);

  return (
    <div className={styles.buttonContainer}>
      <div className={styles.editingButton} onClick={onEditingButtonClick}>
        Editing
      </div>
      <div
        className={`${
          board.aEditList ? styles.acceptButton : styles.completionButton
        }`}
      >
        Completion
      </div>
    </div>
  );
};

export default EditButtonGroup;
