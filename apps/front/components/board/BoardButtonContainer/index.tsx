import { BoardInfo, UserInfo } from "opm-models";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import { BoardPhase } from "../../../pages/board/[id]";

import CompleteButtonGroup from "./CompleteButtonGroup";
import NonValidViewerButtonGroup from "./NonValidViewerButtonGroup";
import NonValidEditingButtonGroup from "./NonValidEditingButtonGroup";
import AcceptButtonGroup from "./AcceptButtonGroup";
import SaveButtonGroup from "./SaveButtonGroup";
import CompleteCheckButtonGroup from "./CompleteCheckButtonGroup";
import WaitingButtonGroup from "./WaitingButtonGroup";
import EditButtonGroup from "./EditButtonGroup";

interface BoardButtonContainerProps {
  boardPhase: BoardPhase;
  onEditingButtonClick: () => void;
  onCompleteButtonClick: () => void;
  onAcceptButtonClick: () => void;
  onSaveButtonClick: () => void;
}

const BoardButtonContainer: FunctionComponent<BoardButtonContainerProps> = (
  props,
) => {
  const { boardPhase } = props;
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const board = useSelector<RootState, BoardInfo>((state) => state.board);

  const nonValidViewer = ![board.eId, board.uId].includes(user.uId);
  const nonValidEditing = !user.uId;

  const isMyRequest = board.uId === user.uId;

  if (nonValidEditing && board.aStatus === "EDITING") {
    return <NonValidEditingButtonGroup />;
  }

  if (nonValidViewer) {
    return <NonValidViewerButtonGroup />;
  }

  if (board.aStatus === "COMPLETE") {
    return <CompleteButtonGroup />;
  }

  if (board.aStatus === "EDITING") {
    if (boardPhase === "edit") {
      return <SaveButtonGroup {...props} />;
    }
    return <EditButtonGroup {...props} />;
  }

  if (board.aStatus === "INIT") {
    return isMyRequest ? (
      <WaitingButtonGroup />
    ) : (
      <AcceptButtonGroup {...props} />
    );
  }

  if (board.uId === user.uId) {
    return <CompleteCheckButtonGroup {...props} />;
  }

  return <EditButtonGroup {...props} />;
};

export default BoardButtonContainer;
