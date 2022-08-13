import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Url, ApiPath } from "opm-models";
import { useRouter } from "next/router";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import styles from "../styles/Login.module.scss";

const Register: NextPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agreePP, setAgreePP] = useState<boolean>(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.currentTarget.value);
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastName(e.currentTarget.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);
  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreePP(e.target.checked);
  };

  // 회원가입
  const handleSignUpClick = () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill out everything.");
      return;
    }
    if (!agreePP) {
      alert("Please click the agreement.");
      return;
    }
    const matchedEmailRegExpList = email.match(/@/g);
    if (email.startsWith("@") || matchedEmailRegExpList?.length !== 1) {
      alert("Invalid email address");
      return;
    }

    const data = {
      ufirstName: firstName,
      ulastName: lastName,
      uEmail: email,
      uPassword: password,
    };
    fetch(`${Url.SERVER}${ApiPath.signup}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // 분기 처리가 필요함.
        if (response.ok) {
          router.push("/login");
          return;
        }
      })
      .catch((e) => {
        console.error(e);
        alert("Error occured");
      });
  };

  return (
    <>
      <Head>
        <title>Join the Community</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className={styles.mainContainer}>
        <div>
          <Image
            src="/184-660.png"
            width={184}
            height={660}
            alt="img2"
            className={styles.img2}
          />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.title}>Join the Community.</div>
          <div className={styles.description}>
            Let&apos;s get you all set up so you can vertify your personal
            account.
          </div>
          <div className={styles.registerContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.subTitle}>First name</div>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
                className={styles.sign}
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.subTitle}>Last name</div>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleLastNameChange}
                className={styles.sign}
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.subtitleContainer}>
                <div className={styles.subTitle}>E-mail</div>
                <div className={styles.guideText}>
                  this address will be your ID
                </div>
              </div>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className={styles.sign}
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.subtitleContainer}>
                <div className={styles.subTitle}>Password</div>
                <div className={styles.guideText}>
                  should be longer than 8 words
                </div>
              </div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className={styles.sign}
              />
            </div>
          </div>
          <div className={styles.signupContainer}>
            <label className={styles.agree}>
              <input
                type="checkbox"
                name="agree"
                className={styles.checkbox}
                onChange={handleAgreementChange}
              />
              I agree to all the Term, Privacy Policy and Fees.
            </label>
            <div className={styles.loginBtn} onClick={handleSignUpClick}>
              Sign Up
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
