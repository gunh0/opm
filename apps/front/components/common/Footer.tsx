import type { NextPage } from "next";

import styles from "../../styles/Footer.module.scss";

const Footer: NextPage = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.text}>© 2022 OPM. All Rights reserved</div>
    </div>
  );
};

export default Footer;
