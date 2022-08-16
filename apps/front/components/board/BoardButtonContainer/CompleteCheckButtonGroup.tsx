import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

const CompleteCheckButtonGroup: FunctionComponent<{
  onCompleteButtonClick: () => void;
}> = ({ onCompleteButtonClick }) => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.blankButton} />
      <div className={styles.acceptButton} onClick={onCompleteButtonClick}>
        Completion
      </div>
    </div>
  );
};

export default CompleteCheckButtonGroup;
