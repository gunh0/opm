import { useRouter } from "next/router";
import { BoardInfo } from "opm-models";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { setBoard } from "../../store/slice/board";
import styles from "../../styles/Home.module.scss";

interface EditCardProps extends BoardInfo {}

const EditCard: FunctionComponent<EditCardProps> = (props) => {
  const { aId, aTitle, uId, aStatus, aDescription } = props;

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleEditCardClick = () => {
    dispatch(setBoard(props));
    router.push(`/board/${aId}`);
  };

  return (
    <div className={styles.editingCard} onClick={handleEditCardClick}>
      <div className={styles.editingCardTitleContainer}>
        <div className={styles.editingCardTitle}>{aTitle}</div>
        {user.uId === uId && (
          <div className={styles.editingCardIsMineText}>my request</div>
        )}
        {aStatus === "COMPLETE" && (
          <div className={styles.editingCardCompleteText}>complete</div>
        )}
      </div>
      <div className={styles.editingCardDescription}>{aDescription}</div>
    </div>
  );
};

export default EditCard;
