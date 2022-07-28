import type { NextPage } from "next";

import styles from "../styles/Home.module.scss";

const viewList = [
  {
    key: 1,
    title: "contents title",
    description: "contents description",
    isMine: true,
    complete: false,
  },
  {
    key: 2,
    title: "contents title",
    description:
      "contents descriptioncontents descriptioncontents descriptioncontents description",
    isMine: false,
    complete: true,
  },
  {
    key: 3,
    title: "contents title",
    description: "contents description",
    isMine: false,
    complete: false,
  },
  {
    key: 4,
    title: "contents title",
    description: "contents description",
    isMine: false,
    complete: false,
  },
  {
    key: 5,
    title: "contents title",
    description: "contents description",
    isMine: true,
    complete: false,
  },
  {
    key: 6,
    title: "contents title",
    description:
      "contents descriptioncontents descriptioncontents descriptioncontents description",
    isMine: false,
    complete: false,
  },
  {
    key: 7,
    title: "contents title",
    description: "contents description",
    isMine: false,
    complete: false,
  },
  {
    key: 8,
    title: "contents title",
    description: "contents description",
    isMine: false,
    complete: false,
  },
];

const EditingList: NextPage = () => {
  const movePage = () => {
    document.location.href = "/content";
  };

  return (
    <main className={styles.editingList}>
      <div className={styles.editingListTitle}>
        Contents waiting for editing.
      </div>
      <div className={styles.editingListContainer}>
        {viewList.map((el) => (
          <div key={el.key} className={styles.editingCard} onClick={movePage}>
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
      </div>
      <div className={styles.loadingText}>Now loading ...</div>
    </main>
  );
};

export default EditingList;
