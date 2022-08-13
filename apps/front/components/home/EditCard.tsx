import { useRouter } from "next/router";
import { BoardInfo } from "opm-models";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import styles from "../../styles/Home.module.scss";

interface EditCardProps extends BoardInfo {}

const EditCard: FunctionComponent<EditCardProps> = ({
  aId,
  uId,
  aTitle,
  aDescription,
  aStatus,
}) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const movePage = (aId: string) => {
    router.push(`/board/${aId}`);
  };

  return (
    <div className={styles.editingCard} onClick={() => movePage(aId)}>
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
