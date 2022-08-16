import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

const NonValidViewerButtonGroup: FunctionComponent = () => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.blankButton}></div>
      <span>This post is being edited</span>
    </div>
  );
};

export default NonValidViewerButtonGroup;
