import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { UserApiPath } from "opm-models";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import styles from "../styles/Login.module.scss";
import { login } from "../store/slice/user";
import { Api } from "../helpers/api";
import AdImage from "../components/common/AdImage";

const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidEmail(true);
    setEmail(e.currentTarget.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidPassword(true);
    setPassword(e.currentTarget.value);
  };

  const handleSignInClick = async () => {
    if (!email) {
      setValidEmail(false);
      return;
    }
    if (!password) {
      setValidPassword(false);
      return;
    }
    const data = {
      email,
      password,
    };
    const res = await Api.post(UserApiPath.signin, data);
    if (!res.ok) {
      setValidEmail(false);
      setValidPassword(false);
      alert("INVALID USER");
      return;
    }
    const jsonData = await res.json();
    dispatch(login(jsonData));
    router.push("/");
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
        <div className={styles.imageContainer}>
          <iframe
            className={styles.img1}
            src="https://www.youtube.com/embed/A33AdB4u8GQ?autoplay=1&mute=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          ></iframe>
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
