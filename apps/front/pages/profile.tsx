import type { NextPage } from "next";
import { useState } from "react";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import MyRequestMenu from "../components/profile/MyRequestMenu";
import ProfileMenu from "../components/profile/ProfileMenu";
import WorksMenu from "../components/profile/WorksMenu";
import styles from "../styles/Profile.module.scss";

const Profile: NextPage = () => {
  const menuArr = [
    {
      title: "Profile",
      content: <ProfileMenu />,
    },
    {
      title: "My Request",
      content: <MyRequestMenu />,
    },
    {
      title: "Works",
      content: <WorksMenu />,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <div className={styles.menuContainer}>
          <div className={styles.menu}>
            {menuArr.map((section, index) => (
              <div key={index}>
                <button
                  className={`${styles.button_deSelected} ${
                    activeIndex === index
                      ? styles.button_selected
                      : styles.button_deSelected
                    }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {section.title}
                </button>
              </div>
            ))}
          </div>
          <div className={styles.logoutBtn}>Log out</div>
        </div>
        <div className={styles.content}>{menuArr[activeIndex].content}</div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
