import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

const SaveButtonGroup: FunctionComponent<{
  onSaveButtonClick: () => void;
}> = ({ onSaveButtonClick }) => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.blankButton}></div>
      <div className={styles.acceptButton} onClick={onSaveButtonClick}>
        Save
      </div>
    </div>
  );
};

export default SaveButtonGroup;
