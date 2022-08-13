import { useRouter } from "next/router";
import { BoardInfo } from "opm-models";
import { FunctionComponent } from "react";

import styles from "../../styles/Home.module.scss";

interface EditCardProps extends BoardInfo {}

const EditCard: FunctionComponent<EditCardProps> = ({
  aId,
  uId,
  eId,
  aTitle,
  aDescription,
  aContent,
  aCategory,
  aCreateDate,
  aEditDate,
  aHit,
  aEditList,
  aStatus,
}) => {
  const router = useRouter();
  const movePage = (aId: string) => {
    router.push(`/board/${aId}`);
  };

  return (
    <div className={styles.editingCard} onClick={() => movePage(aId)}>
      <div className={styles.editingCardTitleContainer}>
        <div className={styles.editingCardTitle}>{aTitle}</div>
        {/* {isMine && (
          <div className={styles.editingCardIsMineText}>my request</div>
        )}
        {complete && (
          )}  */}
        <div className={styles.editingCardCompleteText}>complete</div>
      </div>
      <div className={styles.editingCardDescription}>{aDescription}</div>
    </div>
  );
};

export default EditCard;
