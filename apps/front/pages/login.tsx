import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import styles from "../styles/Login.module.scss";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);

  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className={styles.container}>
        <div>
          <div className={styles.img1}></div>
        </div>
        <div>
          <div className={styles.title}>Sign In.</div>
          <div className={styles.accountContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.subtitleContainer}>
                <div className={styles.subTitle}>E-mail</div>
                {/* TODO: 오류 조건식 */}
                {true && (
                  <div className={styles.errorText}>
                    please check your address
                  </div>
                )}
              </div>
              <input
                type="text"
                name="email"
                value={email}
                onChange={onChangeEmail}
                className={styles.sign}
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.subtitleContainer}>
                <div className={styles.subTitle}>Password</div>
                {/* TODO: 오류 조건식 */}
                {true && (
                  <div className={styles.errorText}>
                    please check your password
                  </div>
                )}
              </div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                className={styles.sign}
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.loginBtn}>Sign In</div>
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
