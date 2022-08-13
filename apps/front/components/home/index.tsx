import { FunctionComponent } from "react";

import styles from "../../styles/Home.module.scss";

const HomeBody: FunctionComponent = () => {
  return (
    <div className={styles.videoContainer}>
      <h1 className={styles.firstLine}>English proofreading for</h1>
      <h1 className={styles.secondLine}>
        Writers, Students, Business and You.
      </h1>
      <h3 className={styles.description}>
        Editing services for everyone who need revision for language errors.
      </h3>
      <video
        src="/cover.mp4"
        className={styles.videoSection}
        autoPlay
        muted
        loop
      />
    </div>
  );
};

export default HomeBody;
