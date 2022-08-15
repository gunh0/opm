import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { BoardApiPath, BoardInfo, StatusCode, Url, UserInfo } from "opm-models";
import { useSelector } from "react-redux";

import BoardContent from "../../components/board/BoardContent";
import ChatView from "../../components/chat/ChatView";
import Navigation from "../../components/common/Navigation";
import styles from "../../styles/Board.module.scss";
import { RootState } from "../../store";
import BoardButtonContainer from "../../components/board/BoardButtonContainer";
import BoardEditContent from "../../components/board/BoardEditContent";

export enum BoardPhase {
  view = "view",
  edit = "edit",
}

const Board: NextPage = () => {
  const router = useRouter();
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const board = useSelector<RootState, BoardInfo>((state) => state.board);
  const [isAccept, setIsAccept] = useState(false);
  const [boardPhase, setBoardPhase] = useState(BoardPhase.view);
  const [editText, setEditText] = useState("");
  const [boardText, setBoardText] = useState(
    board.aEditList?.[board.aEditList.length - 1]?.aProofread ?? board.aContent,
  );

  const handleAcceptButtonClick = () => {
    if (!user.uId) {
      return router.push("/login");
    }
    setIsAccept(true);
  };
  const movePage = () => {
    router.push("/");
  };
  const handleEditingButtonClick = () => {
    setBoardPhase(BoardPhase.edit);
  };
  const handleCompletionButtonClick = () => {
    setBoardPhase(BoardPhase.view);
  };
  const handleEditContentChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLTextAreaElement;
    setEditText(value);
  };
  const handleSaveButtonClick = () => {
    const { uId } = user;
    const { aId } = board;
    const data = {
      aId,
      eId: uId,
      aProofread: editText,
      aProofreadDate: new Date().toISOString(),
    };

    fetch(`${Url.SERVER}${BoardApiPath.proofread}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const json = await res.json();
        if (json.code === StatusCode.BAD_REQUEST) {
          throw new Error("INVALID USER");
        }
        const { aEditList } = json.data as BoardInfo;
        setBoardText(aEditList[aEditList.length - 1].aProofread);
      })
      .finally(() => {
        setBoardPhase(BoardPhase.view);
      });
  };

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
          {boardPhase === BoardPhase.view ? (
            <BoardContent text={boardText} />
          ) : (
            <BoardEditContent
              originText={boardText}
              onChange={handleEditContentChange}
            />
          )}
          <BoardButtonContainer
            isAccept={isAccept}
            boardPhase={boardPhase}
            onAcceptButtonClick={handleAcceptButtonClick}
            onCompletionButtonClick={handleCompletionButtonClick}
            onEditingButtonClick={handleEditingButtonClick}
            onSaveButtonClick={handleSaveButtonClick}
          />
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
