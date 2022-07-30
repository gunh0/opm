import type { NextPage } from "next";
import { board } from "opm-dump";

import styles from "../../styles/Home.module.scss";

const EditingList: NextPage = () => {
  const movePage = (index: number) => {
    document.location.href = `/board/${index}`;
  };

  return (
    <div className={styles.editingList}>
      <div className={styles.editingListTitle}>
        Contents waiting for editing.
      </div>
      <div className={styles.editingListContainer}>
        {board.homeList.map((el, index) => (
          <div
            key={el.key}
            className={styles.editingCard}
            onClick={() => movePage(index)}
          >
            <div className={styles.editingCardTitleContainer}>
              <div className={styles.editingCardTitle}>{el.title}</div>
              {el.isMine && (
                <div className={styles.editingCardIsMineText}>my request</div>
              )}
              {el.complete && (
                <div className={styles.editingCardCompleteText}>complete</div>
              )}
            </div>
            <div className={styles.editingCardDescription}>
              {el.description}
            </div>
          </div>
        ))}
        <div className={styles.loadingText}>Now loading ...</div>
      </div>
    </div>
  );
};

export default EditingList;
