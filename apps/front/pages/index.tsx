import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>에디터에요!!!</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href={"/board"}>GOTO board</Link>
    </div>
  );
};

export default Home;
