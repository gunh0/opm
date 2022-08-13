import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import EditingList from "../components/home/editingList";
import HomeBody from "../components/home";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const [isTop, setIsTop] = useState(true);
  const topRef = useRef<HTMLDivElement>(null);

  const handleObserver: IntersectionObserverCallback = ([entry]) => {
    setIsTop(entry.isIntersecting);
  };

  useEffect(() => {
    if (!topRef.current) {
      return;
    }
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "-5px",
    });
    observer.observe(topRef.current);
    return () => {
      observer.disconnect();
    };
  }, [topRef]);
  return (
    <>
      <Head>
        <title>Editing WireFrame</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation isTop={isTop} isHome />
      <div className={styles.homeContainer}>
        <div className={styles.scrollSnap} ref={topRef}>
          <HomeBody />
        </div>
        <div className={styles.scrollSnap}>
          <EditingList />
        </div>
      </div>
    </>
  );
};

export default Home;
