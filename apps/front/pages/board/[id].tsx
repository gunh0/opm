import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { board } from "opm-dump";
import { UserInfo } from "opm-models";
import { useSelector } from "react-redux";

import BoardContent from "../../components/board/BoardContent";
import ChatView from "../../components/chat/ChatView";
import Navigation from "../../components/common/Navigation";
import styles from "../../styles/Board.module.scss";
import { RootState } from "../../store";

const Board: NextPage = () => {
  const router = useRouter();
  const user = useSelector<RootState, UserInfo>((state) => state.user);

  const [isAccept, setIsAccept] = useState(false);
  const handleAcceptButton = () => {
    if (!user.uId) {
      return router.push("/login");
    }
    setIsAccept(true);
  };
  const movePage = () => {
    router.push("/");
  };

  const handleEditingButton = () => {};

  const handleCompletionButton = () => {};

  return (
    <>
      <Head>
        <title>Content View WireFrame</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={styles.boardContainer}>
        <div className={styles.backContainer} onClick={movePage}>
          <Image src="/backbutton.png" alt="logo" width={56} height={56} />
        </div>
        <div className={styles.textContainer}>
          <BoardContent text={board.boardText} />
          <div className={styles.buttonContainer}>
            {isAccept ? (
              <>
                <div
                  className={styles.editingButton}
                  onClick={handleEditingButton}
                >
                  Editing
                </div>
                <div
                  className={styles.completionButton}
                  onClick={handleCompletionButton}
                >
                  Completion
                </div>
              </>
            ) : (
              <>
                <div className={styles.blankButton}></div>
                <div
                  className={styles.acceptButton}
                  onClick={handleAcceptButton}
                >
                  Accept
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.chatContainer}>
          {isAccept ? (
            <ChatView />
          ) : (
            <Image src="/440-756.png" alt="img" width={440} height={756} />
          )}
        </div>
      </main>
    </>
  );
};

export default Board;
