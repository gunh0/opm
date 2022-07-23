import type { NextPage } from "next";
import React from "react";

import styles from "../styles/Home.module.scss";

const EditingList: NextPage = () => {
  const viewList = [
    {
      key: 1,
      title: 'contents title',
      description: 'contents description',
      isMine: true,
    },
    {
      key: 2,
      title: 'contents title',
      description: 'contents descriptioncontents descriptioncontents descriptioncontents description',
      isMine: false,
    },
    {
      key: 3,
      title: 'contents title',
      description: 'contents description',
      isMine: false,
    },
    {
      key: 4,
      title: 'contents title',
      description: 'contents description',
      isMine: false,
    },
    {
      key: 5,
      title: 'contents title',
      description: 'contents description',
      isMine: true,
    },
    {
      key: 6,
      title: 'contents title',
      description: 'contents descriptioncontents descriptioncontents descriptioncontents description',
      isMine: false,
    },
    {
      key: 7,
      title: 'contents title',
      description: 'contents description',
      isMine: false,
    },
    {
      key: 8,
      title: 'contents title',
      description: 'contents description',
      isMine: false,
    },
  ]

  const movePage = () => {
    document.location.href = "/content";
  }

  return (
    <main className={styles.editingList}>
      <div className={styles.editingListTitle}>Contents wating for editing.</div>
      <div onClick={movePage}>
        {viewList.map((el) => (
          <div key={el.key} className={styles.editingCard}>
            {el.isMine && <div className={styles.editingCardIsMineText}>my request</div>}
            <div className={styles.editingCardTitle}>{el.title}</div>
            <div className={styles.editingCardDescription}>{el.description}</div>
          </div>
        ))}
      </div>
      <div className={styles.loadingText}>Now loading ...</div>
    </main>
  );
};

export default EditingList;
