import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

const NonValidEditingButtonGroup: FunctionComponent = () => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.blankButton}></div>
      <span>This post is waiting for editor ...</span>
    </div>
  );
};

export default NonValidEditingButtonGroup;
