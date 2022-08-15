import Image from "next/image";
import { FunctionComponent } from "react";

import styles from "../../styles/Board.module.scss";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: FunctionComponent<BackButtonProps> = ({ onClick }) => {
  return (
    <div className={styles.backContainer} onClick={onClick}>
      <Image src="/backbutton.png" alt="logo" width={56} height={56} />
    </div>
  );
};

export default BackButton;
