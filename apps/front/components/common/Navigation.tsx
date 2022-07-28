import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import styles from "../../styles/Navigation.module.scss";

interface NavigationProps {
  isTop?: boolean;
  isHome?: boolean;
}

const Navigation: NextPage<NavigationProps> = ({
  isTop = true,
  isHome = false,
}) => {
  const homeTrans = isHome && isTop;

  return (
    <div className={styles.default}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <Image src="/svg/logo.png" alt="logo" width={56} height={56} />
          </a>
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/profile">
          <a>
            {homeTrans ? (
              <Image
                src="/svg/profileWhite.svg"
                alt="profile"
                width={56}
                height={56}
              />
            ) : (
              <Image
                src="/svg/profile.svg"
                alt="profile"
                width={56}
                height={56}
              />
            )}
          </a>
        </Link>
        <div>
          {homeTrans ? (
            <Image
              src="/svg/alarmWhite.svg"
              alt="alert"
              width={56}
              height={56}
            />
          ) : (
            <Image src="/svg/alarm.svg" alt="alert" width={56} height={56} />
          )}
        </div>
        <button
          className={homeTrans ? styles.buttonTransparent : styles.button}
        >
          Request
        </button>
      </div>
    </div>
  );
};

export default Navigation;
