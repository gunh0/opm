import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { BoardApiPath, Url, UserInfo } from "opm-models";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import styles from "../styles/Board.module.scss";
import { RootState } from "../store";

const ContentRequest: NextPage = () => {
  const router = useRouter();
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  if (!user.uId) {
    router.push("/login");
    return <div>Loading...</div>;
  }

  const movePage = () => {
    router.push("/");
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);
  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.currentTarget.value);

  const handleNextClick = () => {
    const data = { aTitle: title, aDescription: description };

    // TODO: description 노출되도록 변경되도록 해야함. phase 등 추가 필요

    // fetch(`${Url.SERVER}${BoardApiPath.write}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <div>
      <Navigation />
      <div className={styles.main}>
        <div className={styles.leftContainer}>
          <div className={styles.backBtnContainer}>
            <Image
              src="/backbutton.png"
              alt="logo"
              width={56}
              height={56}
              onClick={movePage}
              className={styles.backBtn}
            />
          </div>
          <div>
            <div className={styles.title}>Request description.</div>
            <div className={styles.description}>
              Write down explains about your proofreading commision.
            </div>
            <div className={styles.requestContainer}>
              <div className={styles.inputContainer}>
                <div className={styles.subtitleContainer}>
                  <div className={styles.subTitle}>Title about request.</div>
                  <div className={styles.guideText}>{title.length}/20</div>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={onChangeTitle}
                  className={styles.inputTitle}
                  maxLength={20}
                  placeholder="Placeholder"
                />
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.subtitleContainer}>
                  <div className={styles.subTitle}>Explanatory note.</div>
                  <div className={styles.guideText}>
                    {description.length}/140
                  </div>
                </div>
                <textarea
                  value={description}
                  onChange={onChangeDescription}
                  className={styles.inputDescription}
                  maxLength={140}
                  placeholder="Placeholder"
                />
              </div>
            </div>
            <div className={styles.nextButtonContainer}>
              <div className={styles.loginBtn} onClick={handleNextClick}>
                Next
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/440-756.png"
          alt="img3"
          width={440}
          height={756}
          className={styles.img3}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ContentRequest;
