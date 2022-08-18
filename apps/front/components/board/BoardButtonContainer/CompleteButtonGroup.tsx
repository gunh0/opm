import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

const CompleteButtonGroup: FunctionComponent = () => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.blankButton} />
      <div className={styles.completionButton}>Edited post</div>
    </div>
  );
};

export default CompleteButtonGroup;
