import Image from "next/image";
import { FunctionComponent } from "react";

import styles from "../../../styles/Profile.module.scss";

const RightButton: FunctionComponent = () => {
  return (
    <div className={styles.rightBtn}>
      <Image
        src="/svg/delete.svg"
        width={16}
        height={18}
        alt="delete"
        title="delete"
      />
    </div>
  );
};

export default RightButton;
