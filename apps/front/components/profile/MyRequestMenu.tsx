import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { BoardApiPath } from "opm-models";

import styles from "../../styles/Profile.module.scss";
import { Api } from "../../helpers/api";

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
  const router = useRouter();
  const [isPostEmpty, setIsPostEmpty] = useState(false);
  const movePage = () => {
    router.push("/content");
  };

  useEffect(() => {
    const apiCall = async () => {
      // TODO: 내 리스트 가져오기
      // await Api.post(BoardApiPath.listByUser)
    };
  }, []);

  return (
    <div>
      <div className={styles.title}>Posted by you.</div>
      {isPostEmpty ? (
        <div className={styles.nullText}>You never posted a request.</div>
      ) : (
        <div className={styles.editingListContainer}>
          {viewList.map((el) => (
            <div key={el.key} className={styles.listContainer}>
              <div className={styles.editingCard} onClick={movePage}>
                <div className={styles.editingCardTitleContainer}>
                  <div className={styles.editingCardTitle}>{el.title}</div>
                  {el.isMine && (
                    <div className={styles.editingCardIsMineText}>
                      my request
                    </div>
                  )}
                  {el.complete && (
                    <div className={styles.editingCardCompleteText}>
                      complete
                    </div>
                  )}
                </div>
                <div className={styles.editingCardDescription}>
                  {el.description}
                </div>
              </div>
              <div className={styles.rightBtn}>
                <Image
                  src="/svg/delete.svg"
                  width={16}
                  height={18}
                  alt="delete"
                  title="delete"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequestMenu;
