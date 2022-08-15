import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

const InfoHeader: FunctionComponent = () => {
  return (
    <div>
      <div className={styles.title}>Request description.</div>
      <div className={styles.description}>
        Write down explains about your proofreading commision.
      </div>
    </div>
  );
};

export default InfoHeader;
