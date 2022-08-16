import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

const CompleteButtonGroup: FunctionComponent = () => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.blankButton} />
      <span>Edited post</span>
    </div>
  );
};

export default CompleteButtonGroup;
