import type { NextPage } from "next";
import React, { useState } from "react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import MyRequestMenu from "../components/Profile/MyRequestMenu";
import ProfileMenu from "../components/Profile/ProfileMenu";
import WorksMenu from "../components/Profile/WorksMenu";
import styles from "../styles/Profile.module.scss";

const Profile: NextPage = () => {
  const menuArr = [
    {
      title: "Profile",
      content: <ProfileMenu />
    },
    {
      title: "My Request",
      content: <MyRequestMenu />
    },
    {
      title: "Works",
      content: <WorksMenu />
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <div className={styles.menu}>
          {menuArr.map((section, index) =>
            <div key={index}>
              <button className={`${styles.button_deSelected} ${activeIndex === index ? styles.button_selected : styles.button_deSelected}`} onClick={() => setActiveIndex(index)}>{section.title}</button>
            </div>
          )}
        </div>
        <div className={styles.content}>
          {menuArr[activeIndex].content}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
