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
import BackButton from "../components/common/BackButton";
import InfoHeader from "../components/contentRequest/titlePhase/InfoHeader";
import Button from "../components/contentRequest/Button";
import { Api } from "../helpers/api";

enum PagePhase {
  title = "title",
  content = "content",
}

const ContentRequest: NextPage = () => {
  const router = useRouter();
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [pagePhase, setPagePhase] = useState(PagePhase.title);
  const [content, setContent] = useState("");

  if (!user.uId) {
    router.push("/login");
    return <div>Loading...</div>;
  }

  const backPhase = () => {
    setPagePhase(PagePhase.title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const handleNextClick = () => setPagePhase(PagePhase.content);
  const handleSubmitClick = async () => {
    if (
      title.trim().length === 0 ||
      description.trim().length === 0 ||
      content.trim().length === 0
    ) {
      alert("내용을 모두 채워주세요");
      return;
    }
    const data = {
      uId: user.uId,
      aTitle: title,
      aDescription: description,
      aContent: content,
      aCategory: "",
      aCreateDate: new Date().toISOString(),
    };
    const res = await Api.post(BoardApiPath.write, data);
    if (!res.ok) {
      const json = await res.json();
      console.error(json);
      return;
    }
    router.push("/profile?tab=myRequest");
  };

  return (
    <>
      <Navigation />
      <main className={styles.boardContainer}>
        <BackButton onClick={backPhase} />
        <div className={styles.requestContainer}>
          {pagePhase === PagePhase.title ? (
            <>
              <InfoHeader />
              <div>
                <div className={styles.subtitleContainer}>
                  <div className={styles.subTitle}>Title about request.</div>
                  <div className={styles.guideText}>{title.length}/20</div>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  className={styles.inputTitle}
                  maxLength={20}
                  placeholder="Placeholder"
                />
              </div>
              <div>
                <div className={styles.subtitleContainer}>
                  <div className={styles.subTitle}>Explanatory note.</div>
                  <div className={styles.guideText}>
                    {description.length}/140
                  </div>
                </div>
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  className={styles.inputDescription}
                  maxLength={140}
                  placeholder="Placeholder"
                />
              </div>
              <div />
              <Button label={"Next"} onClick={handleNextClick} />
            </>
          ) : (
            <>
              <div className={styles.inputContainer}>
                <textarea
                  value={content}
                  onChange={handleContentChange}
                  className={styles.inputPost}
                  maxLength={140}
                  placeholder="Placeholder"
                />
              </div>
              <Button label={"Posting"} onClick={handleSubmitClick} />
            </>
          )}
        </div>
        <Image
          src="/440-756.png"
          alt="img3"
          width={440}
          height={756}
          className={styles.img3}
        />
      </main>
      <Footer />
    </>
  );
};

export default ContentRequest;
