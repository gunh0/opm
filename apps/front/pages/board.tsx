import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { SocketPath, Url } from "../models";
import styles from "../styles/Home.module.scss";

const Board: NextPage = () => {
  const [socketId, setSocketId] = useState<string>();

  useEffect((): any => {
    const socket = io(Url.SOCKET, { transports: ["websocket"] });
    socket.on(SocketPath.CONNECTION, () => {
      setSocketId(socket.id);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>에디터에요!!!</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Socket ID: {socketId}</h1>
        <Link href="/">Back Home</Link>
      </main>
    </div>
  );
};

export default Board;
