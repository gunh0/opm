import type { NextPage } from "next";
import styles from "../../styles/Profile.module.scss";

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
];

const MyRequestMenu: NextPage = () => {
  const movePage = () => {
    document.location.href = "/content";
  };

  return (
    <div>
      <div className={styles.title}>Posted by you.</div>
      <div className={styles.editingListContainer}>
        {viewList.map((el) => (
          <div className={styles.listContainer}>
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
            <div className={styles.rightBtn}>Delete</div>
          </div>
        ))}
      </div>
      <div className={styles.loadingText}>Now loading ...</div>
    </div>
  );
};

export default MyRequestMenu;
