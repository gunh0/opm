import { BoardInfo, UserInfo } from "opm-models";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";

import CompleteButtonGroup from "./CompleteButtonGroup";
import NonValidViewerButtonGroup from "./NonValidViewerButtonGroup";
import AcceptButtonGroup from "./AcceptButtonGroup";
import SaveButtonGroup from "./SaveButtonGroup";
import CompleteCheckButtonGroup from "./CompleteCheckButtonGroup";
import WaitingButtonGroup from "./WaitingButtonGroup";

interface BoardButtonContainerProps {
  onEditingButtonClick: () => void;
  onCompleteButtonClick: () => void;
  onAcceptButtonClick: () => void;
  onSaveButtonClick: () => void;
}

const BoardButtonContainer: FunctionComponent<BoardButtonContainerProps> = (
  props,
) => {
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const board = useSelector<RootState, BoardInfo>((state) => state.board);

  const nonValidViewer = ![board.eId, board.uId].includes(user.uId);
  const isMyRequest = board.uId === user.uId;

  if (board.aStatus === "COMPLETE") {
    return <CompleteButtonGroup />;
  }

  if (board.aStatus === "INIT") {
    return isMyRequest ? (
      <WaitingButtonGroup />
    ) : (
      <AcceptButtonGroup {...props} />
    );
  }

  if (nonValidViewer) {
    return <NonValidViewerButtonGroup />;
  }

  return isMyRequest ? (
    <CompleteCheckButtonGroup {...props} />
  ) : (
    <SaveButtonGroup {...props} />
  );
};

export default BoardButtonContainer;
