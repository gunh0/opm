import Image from "next/image";
import { FunctionComponent } from "react";

import styles from "../../styles/Error.module.scss";

interface ErrorProps {
  title?: string;
  description?: string;
}

const Error: FunctionComponent<ErrorProps> = ({
  title = "",
  description = "",
}) => {
  return (
    <div className={styles.background}>
      <div className={styles.logo}>
        <Image src="/svg/error.svg" alt="error" width={72} height={72} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default Error;
