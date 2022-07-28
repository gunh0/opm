import type { NextPage } from "next";
import React, { useState } from "react";
import styles from "../../styles/Profile.module.scss";

const ProfileMenu: NextPage = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("placeholder");
  const [LastName, setLastName] = useState<string>("placeholder");
  const [email, setEmail] = useState<string>("placeholder");
  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.currentTarget.value);
  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.currentTarget.value);

  const edit = () => {
    setIsEdit(!isEdit);
    if (isEdit == true) {
      // 수정 함수
      alert("Edited!");
    }
  };

  return (
    <div>
      <div className={styles.title}>Account information.</div>
      <div className={styles.accountContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.subTitle}>E-mail</div>
          <input type="text" name="email" value={email} disabled={true} className={styles.sign} />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.subTitle}>First name</div>
          <input type="text" name="firstName" value={firstName} onChange={onChangeFirstName} disabled={!isEdit} className={styles.sign} />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.subTitle}>Last name</div>
          <input type="text" name="LastName" value={LastName} onChange={onChangeLastName} disabled={!isEdit} className={styles.sign} />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <div className={`${styles.editBtn} ${isEdit === true ? styles.saveBtn : styles.editBtn}`} onClick={edit}>{isEdit === true ? "Save" : "Edit"}</div>
      </div>
    </div>
  );
};

export default ProfileMenu;
