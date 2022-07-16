import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
import { io } from "socket.io-client";

import styles from "../styles/Home.module.scss";

// https:// -> wss://
const socket = io("http://localhost:8080", { transports: ["websocket"] });

const Home: NextPage = () => {
  const [user, setUser] = useState("");
  const [list, setList] = useState([]);
  const handlePost = (e) => {
    socket.emit("setUser", { post: user });
  };
  socket.on("enter", (data) => {
    setList([...list, data]);
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>에디터에요!!!</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">우피운!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        {/* Material UI components */}
        <Grid container justifyContent="center" spacing={1}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            type="text"
            onChange={(e) => setUser(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePost}
          ></Button>
          {JSON.stringify(list)}
        </Grid>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
