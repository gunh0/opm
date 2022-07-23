import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import styles from "../../styles/Navigation.module.scss";

const Navigation: NextPage = () => {
  return (
    <div className={styles.default}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <Image
              src="/Navigation/logo.png"
              alt="logo"
              width={56}
              height={56}
            />
          </a>
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/profile">
          <a>
            <Image
              src="/Navigation/profile.png"
              alt="profile"
              width={40}
              height={40}
            />
          </a>
        </Link>
        <div>
          <Image
            src="/Navigation/alert.png"
            alt="alert"
            width={40}
            height={40}
          />
        </div>
        <button className={styles.button}>Request</button>
      </div>
    </div>
  );
};

export default Navigation;
