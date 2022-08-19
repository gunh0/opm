import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BoardApiPath, BoardInfo, UserInfo } from "opm-models";
import { useSelector } from "react-redux";

import styles from "../../styles/Profile.module.scss";
import { RootState } from "../../store";
import { Api } from "../../helpers/api";
import Loading from "../common/Loading";

import ArticleCard from "./common/ArticleCard";

const WorksMenu: NextPage = () => {
  const router = useRouter();
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [workList, setWorkList] = useState<BoardInfo[]>([]);

  useEffect(() => {
    const apiCall = async () => {
      const param = { uId: user.uId };
      const res = await Api.post(BoardApiPath.editingListByUser, param);
      if (!res.ok) {
        console.error("something wrong...");
        return;
      }
      const { data } = await res.json();
      setWorkList(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 150);
    };
    apiCall();
  }, [user]);

  if (isLoading) {
    return (
      <>
        <div className={styles.title}>Proofread contents.</div>
        <div className={styles.editingListContainer}>
          <Loading />
        </div>
      </>
    );
  }

  const handleArticleClick = (aId: string) => {
    router.push(`/board/${aId}`);
  };

  return (
    <>
      <div className={styles.title}>Proofread contents.</div>
      {workList && workList.length === 0 ? (
        <div className={styles.nullText}>You never accepted a request.</div>
      ) : (
        <div className={styles.editingListContainer}>
          {workList.map((el) => (
            <ArticleCard
              key={el.aId}
              onArticleClick={handleArticleClick}
              {...el}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default WorksMenu;
