import { FunctionComponent } from "react";

import styles from "../../styles/Home.module.scss";

const HomeBody: FunctionComponent = () => {
  return (
    <video
      src="/cover.mp4"
      className={styles.videoSection}
      autoPlay
      muted
      loop
    />
  );
};

export default HomeBody;
