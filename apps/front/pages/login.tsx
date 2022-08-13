import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Url, UserApiPath } from "opm-models";
import { useRouter } from "next/router";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import styles from "../styles/Login.module.scss";

const Login: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);

  // 로그인
  const handleSignInClick = () => {
    if (!email || !password) {
      alert("Please fill out everything.");
      return;
    }

    const data = {
      email,
      password,
    };

    fetch(`${Url.SERVER}${UserApiPath.signin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          router.push("/");
          window.localStorage.setItem("user", email);
          return;
        }
        if (response.status == 404) {
          // 회원정보 없음
          setValidEmail(false);
        } else {
          if (response.status == 400) {
            // 잘못된 비밀번호
            setValidPassword(false);
          }
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
        <title>Sign in</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className={styles.mainContainer}>
        <div>
          <Image
            src="/620-660.png"
            width={620}
            height={660}
            alt="img1"
            className={styles.img1}
          />
        </div>
        <div>
          <div className={styles.title}>Sign In.</div>
          <div className={styles.accountContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.subtitleContainer}>
                <div className={styles.subTitle}>E-mail</div>
                {!validEmail && (
                  <div className={styles.errorText}>
                    please check your address
                  </div>
                )}
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
                {!validPassword && (
                  <div className={styles.errorText}>
                    please check your password
                  </div>
                )}
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
          <div className={styles.loginButtonContainer}>
            <div className={styles.loginBtn} onClick={handleSignInClick}>
              Sign In
            </div>
            <Link href="/register">
              <div className={styles.signupBtn}>Join our Community</div>
            </Link>
            <div className={styles.logoutBtn}>Forgot your password?</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
