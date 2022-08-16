import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { BoardApiPath, BoardInfo, UserInfo } from "opm-models";
import { useSelector } from "react-redux";

import styles from "../../styles/Profile.module.scss";
import { Api } from "../../helpers/api";
import { RootState } from "../../store";

const MyRequestMenu: NextPage = () => {
  const router = useRouter();
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const [requestList, setRequestList] = useState<BoardInfo[]>([]);

  const handleArticleClick = (aId: string) => {
    router.push(`/board/${aId}`);
  };

  useEffect(() => {
    const apiCall = async () => {
      const param = { uId: user.uId };
      const res = await Api.post(BoardApiPath.listByUser, param);
      if (!res.ok) {
        console.error("Something wrong...");
        return;
      }
      const { data } = await res.json();
      setRequestList(data);
    };
    apiCall();
  }, [user]);

  return (
    <div>
      <div className={styles.title}>Posted by you.</div>
      {requestList.length === 0 ? (
        <div className={styles.nullText}>You never posted a request.</div>
      ) : (
        <div className={styles.editingListContainer}>
          {requestList.map((el) => (
            <div key={el.aId} className={styles.listContainer}>
              <div
                className={styles.editingCard}
                onClick={() => handleArticleClick(el.aId)}
              >
                <div className={styles.editingCardTitleContainer}>
                  <div className={styles.editingCardTitle}>{el.aTitle}</div>
                  {el.aStatus === "COMPLETE" && (
                    <div className={styles.editingCardCompleteText}>
                      complete
                    </div>
                  )}
                </div>
                <div className={styles.editingCardDescription}>
                  {el.aDescription}
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
