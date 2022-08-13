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

  // const user = window.localStorage.getItem("user");
  const user = "";

  // TODO: 유효성 검증
  const checkUserValidation = (user: any) => {
    if (!user) {
      return false;
    }
    return true;
  };

  const handleProfile = () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    const isValid = checkUserValidation(user);
    window.location.href = isValid ? "/profile" : "/login";
  };

  const handleRequest = () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    const isValid = checkUserValidation(user);
    window.location.href = isValid ? "/contentRequest" : "/login";
  };

  return (
    <div className={`${homeTrans ? styles.transparent : styles.default}`}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            {homeTrans ? (
              <Image
                src="/svg/logo-secondary.svg"
                alt="logo"
                width="116px"
                height="56px"
              />
            ) : (
              <Image
                src="/svg/logo-primary.svg"
                alt="logo"
                width={116}
                height={56}
              />
            )}
          </a>
        </Link>
      </div>
      <div className={styles.links}>
        <div onClick={handleProfile}>
          <a>
            {homeTrans ? (
              <Image
                src="/svg/profileWhite.svg"
                alt="profile"
                width={56}
                height={56}
                className={styles.icon}
              />
            ) : (
              <Image
                src="/svg/profile.svg"
                alt="profile"
                width={56}
                height={56}
                className={styles.icon}
              />
            )}
          </a>
        </div>
        <div>
          {homeTrans ? (
            <Image
              src="/svg/alarmWhite.svg"
              alt="alert"
              width={56}
              height={56}
              className={styles.icon}
            />
          ) : (
            <Image
              src="/svg/alarm.svg"
              alt="alert"
              width={56}
              height={56}
              className={styles.icon}
            />
          )}
        </div>
        <button
          className={homeTrans ? styles.buttonTransparent : styles.button}
          onClick={handleRequest}
        >
          Request
        </button>
      </div>
    </div>
  );
};

export default Navigation;
