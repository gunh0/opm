import { FunctionComponent } from "react";
import styles from "../../../styles/Board.module.scss";

const EditButtonGroup: FunctionComponent<{
  onEditingButtonClick: () => void;
}> = ({ onEditingButtonClick }) => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.editingButton} onClick={onEditingButtonClick}>
        Editing
      </div>
      <div className={styles.blankButton} />
    </div>
  );
};

export default EditButtonGroup;
