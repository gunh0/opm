import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BoardApiPath, BoardInfo, StatusCode, Url, UserInfo } from "opm-models";
import { useDispatch, useSelector } from "react-redux";

import ChatView from "../../components/chat/ChatView";
import Navigation from "../../components/common/Navigation";
import styles from "../../styles/Board.module.scss";
import { RootState } from "../../store";
import BoardButtonContainer from "../../components/board/BoardButtonContainer";
import { Api } from "../../helpers/api";
import BackButton from "../../components/common/BackButton";
import AdImage from "../../components/common/AdImage";
import BoardTextArea from "../../components/board/BoardTextArea";
import { clearBoard } from "../../store/slice/board";
import { setBoard } from "../../store/slice/board";
import Loading from "../../components/common/Loading";

export enum BoardPhase {
  view = "view",
  edit = "edit",
}

const Board: NextPage = () => {
  const router = useRouter();
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const board = useSelector<RootState, BoardInfo>((state) => state.board);
  const dispatch = useDispatch();
  const { id: pathAid } = router.query;

  const [boardPhase, setBoardPhase] = useState(BoardPhase.view);
  const [editText, setEditText] = useState("");
  const [boardText, setBoardText] = useState(
    board.aEditList?.[board.aEditList.length - 1]?.aProofread ?? board.aContent,
  );
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    if (isRender || !pathAid) {
      return;
    }
    const callApi = async () => {
      const res = await Api.get(`${BoardApiPath.one}?aId=${pathAid}`);
      const { data } = await res.json();
      if (!data) return;
      dispatch(setBoard(data));
    };
    setIsRender(true);
    callApi();

    return () => {
      dispatch(clearBoard());
    };
  }, [pathAid, dispatch, isRender]);

  const handleAcceptButtonClick = async () => {
    if (!user.uId) {
      return router.push("/login");
    }
    const param = {
      aId: board.aId,
      eId: user.uId,
    };
    const res = await Api.post(BoardApiPath.accept, param);
    if (!res.ok) {
      alert("something wrong...");
      return;
    }
    const { code, data } = await res.json();
    if (code === StatusCode.BAD_REQUEST) {
      alert("BAD REQUEST");
      return;
    }
    if (code === StatusCode.NOT_INIT) {
      alert("BAD REQUEST, Article is NOT init");
      return;
    }
    dispatch(setBoard(data));
  };
  const movePage = () => {
    router.push("/");
  };
  const handleEditingButtonClick = async () => {
    if (!user.uId) return;
    const param: Partial<BoardInfo> = {
      aId: board.aId,
      aStatus: "EDITING",
    };
    await Api.post(BoardApiPath.changeBoardState, param);
    setBoardPhase(BoardPhase.edit);
  };
  const handleCompleteButtonClick = async () => {
    if (!user.uId) return;
    const param: Partial<BoardInfo> = {
      aId: board.aId,
      aStatus: "COMPLETE",
    };
    await Api.post(BoardApiPath.changeBoardState, param);
    setBoardPhase(BoardPhase.view);
    router.push("/profile?tab=myRequest");
  };
  const handleSaveButtonClick = async () => {
    const { uId } = user;
    const { aId } = board;
    const data = {
      aId,
      eId: uId,
      aProofread: editText,
      aProofreadDate: new Date().toISOString(),
    };
    const res = await Api.post(BoardApiPath.proofread, data);
    const json = await res.json();
    if (json.code === StatusCode.BAD_REQUEST) {
      // TODO: set modal
      alert("INVALID USER");
      setBoardPhase(BoardPhase.view);
      return;
    }
    const { aEditList } = json.data as BoardInfo;
    setBoardText(aEditList[aEditList.length - 1].aProofread);
    setBoardPhase(BoardPhase.view);
  };

  const isOpenChat =
    board.aStatus !== "INIT" && [board.eId, board.uId].includes(user.uId);

  return (
    <>
      <Head>
        <title>Content View WireFrame</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={styles.boardContainer}>
        <BackButton onClick={movePage} />
        <div className={styles.textContainer}>
          <BoardTextArea
            boardPhase={boardPhase}
            boardText={boardText}
            setEditText={setEditText}
          />
          <BoardButtonContainer
            boardPhase={boardPhase}
            onAcceptButtonClick={handleAcceptButtonClick}
            onCompleteButtonClick={handleCompleteButtonClick}
            onEditingButtonClick={handleEditingButtonClick}
            onSaveButtonClick={handleSaveButtonClick}
          />
        </div>
        <div className={styles.chatContainer}>
          {isOpenChat ? <ChatView /> : <AdImage src={"/ad/newjeans.jpeg"} />}
        </div>
      </main>
    </>
  );
};

export default Board;
