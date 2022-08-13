import { FunctionComponent } from "react";

import { BoardPhase } from "../../pages/board/[id]";
import styles from "../../styles/Board.module.scss";

interface BoardButtonContainerProps {
  isAccept: boolean;
  boardPhase: BoardPhase;
  onEditingButtonClick: () => void;
  onCompletionButtonClick: () => void;
  onAcceptButtonClick: () => void;
  onSaveButtonClick: () => void;
}

const ViewPhaseButtonGroup: FunctionComponent<BoardButtonContainerProps> = ({
  isAccept,
  onEditingButtonClick,
  onCompletionButtonClick,
  onAcceptButtonClick,
}) => {
  return (
    <>
      {isAccept ? (
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
      ) : (
        <>
          <div className={styles.blankButton}></div>
          <div className={styles.acceptButton} onClick={onAcceptButtonClick}>
            Accept
          </div>
        </>
      )}
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

const BoardButtonContainer: FunctionComponent<BoardButtonContainerProps> = (
  props,
) => {
  const { boardPhase } = props;
  return (
    <div className={styles.buttonContainer}>
      {boardPhase === BoardPhase.view && <ViewPhaseButtonGroup {...props} />}
      {boardPhase === BoardPhase.edit && <EditPhaseButtonGroup {...props} />}
    </div>
  );
};

export default BoardButtonContainer;
