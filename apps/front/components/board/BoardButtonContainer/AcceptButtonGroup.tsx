import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

const AcceptButtonGroup: FunctionComponent<{
  onAcceptButtonClick: () => void;
}> = ({ onAcceptButtonClick }) => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.blankButton} />
      <div className={styles.acceptButton} onClick={onAcceptButtonClick}>
        Accept
      </div>
    </div>
  );
};

export default AcceptButtonGroup;
