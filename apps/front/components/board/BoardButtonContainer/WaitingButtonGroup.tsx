import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

const WaitingButtonGroup: FunctionComponent = () => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.blankButton} />
      <div className={styles.completionButton}>Waiting</div>
    </div>
  );
};

export default WaitingButtonGroup;
