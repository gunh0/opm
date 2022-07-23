import type { NextPage } from "next";

import styles from "../../styles/Header.module.scss";

const Header: NextPage = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerBody}>
        <div className={styles.mainText}>
          English proofreading for
          <br />
          Writers, Students, Business and
          <br />
          You.
        </div>
        <div className={styles.subText}>
          Editing services for everyone who need revision for language errors.
        </div>
      </div>
    </div>
  );
};

export default Header;
