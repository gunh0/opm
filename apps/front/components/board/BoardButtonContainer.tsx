import { BoardInfo, UserInfo } from "opm-models";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import { BoardPhase } from "../../pages/board/[id]";
import { RootState } from "../../store";
import styles from "../../styles/Board.module.scss";

interface BoardButtonContainerProps {
  boardPhase: BoardPhase;
  onEditingButtonClick: () => void;
  onCompletionButtonClick: () => void;
  onAcceptButtonClick: () => void;
  onSaveButtonClick: () => void;
}

const ViewPhaseButtonGroup: FunctionComponent<BoardButtonContainerProps> = ({
  onEditingButtonClick,
  onCompletionButtonClick,
  onAcceptButtonClick,
}) => {
  const board = useSelector<RootState, BoardInfo>((state) => state.board);

  if (board.aStatus === "INIT") {
    return (
      <>
        <div className={styles.blankButton} />
        <div className={styles.acceptButton} onClick={onAcceptButtonClick}>
          Accept
        </div>
      </>
    );
  }

  if (board.eId === board.uId) {
    return (
      <>
        <div className={styles.editingButton} onClick={onEditingButtonClick}>
          Editing
        </div>
        <div
          className={styles.completionButton}
          onClick={onCompletionButtonClick}
        >
          Completion
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.blankButton}></div>
      <span>This post is being edited.</span>
    </>
  );
};

const EditPhaseButtonGroup: FunctionComponent<{
  onSaveButtonClick: () => void;
}> = ({ onSaveButtonClick }) => {
  return (
    <>
      <div className={styles.blankButton}></div>
      <div className={styles.acceptButton} onClick={onSaveButtonClick}>
        Save
      </div>
    </>
  );
};

const WaitButtonGroup = () => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.blankButton}></div>
      <div className={styles.completionButton}>Waiting...</div>
    </div>
  );
};

const BoardButtonContainer: FunctionComponent<BoardButtonContainerProps> = (
  props,
) => {
  const { boardPhase } = props;
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const board = useSelector<RootState, BoardInfo>((state) => state.board);

  if (board.uId === user.uId) {
    return <WaitButtonGroup />;
  }

  return (
    <div className={styles.buttonContainer}>
      {boardPhase === BoardPhase.view && <ViewPhaseButtonGroup {...props} />}
      {boardPhase === BoardPhase.edit && <EditPhaseButtonGroup {...props} />}
    </div>
  );
};

export default BoardButtonContainer;
