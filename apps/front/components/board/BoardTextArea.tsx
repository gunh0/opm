import { BoardInfo, UserInfo } from "opm-models";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";

import { BoardPhase } from "../../pages/board/[id]";
import { RootState } from "../../store";

import BoardCompleteContent from "./BoardCompleteContent";
import BoardContent from "./BoardContent";
import BoardEditContent from "./BoardEditContent";

interface BoardAreaProps {
  boardPhase: BoardPhase;
  boardText: string;
  setEditText: (value: string) => void;
}

const BoardTextArea: FunctionComponent<BoardAreaProps> = ({
  boardPhase,
  boardText,
  setEditText,
}) => {
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const board = useSelector<RootState, BoardInfo>((state) => state.board);

  const handleEditContentChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLTextAreaElement;
    setEditText(value);
  };

  if (boardPhase === BoardPhase.view && board.aStatus !== "COMPLETE") {
    return (
      <BoardContent
        originText={board.aContent}
        editedText={
          board.aEditList?.[board.aEditList.length - 1]?.aProofread ?? ""
        }
      />
    );
  }

  const isValidViewer =
    board.aStatus === "DONE" && [board.uId, board.eId].includes(user.uId);
  if (board.aStatus === "COMPLETE" || isValidViewer) {
    return (
      <BoardCompleteContent
        originText={board.aContent}
        editedText={
          board.aEditList?.[board.aEditList.length - 1]?.aProofread ?? ""
        }
      />
    );
  }

  return (
    <BoardEditContent text={boardText} onChange={handleEditContentChange} />
  );
};

export default BoardTextArea;
