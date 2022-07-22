import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import Navigation from "../components/Navigation";
import styles from "../styles/Content.module.scss";

const Board: NextPage = () => {
  const movePage = () => {
    document.location.href = "/";
  }

  return (
    <div>
      <Head>
        <title>Content View WireFrame</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={styles.container}>
        <div className={styles.backContainer} onClick={movePage}>Back</div>
        <div className={styles.textContainer}>
          <div className={styles.textBox}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam itaque reprehenderit fugit aut reiciendis nobis explicabo repudiandae tempore odit quos animi, quasi eius quod provident suscipit, voluptatem, magnam asperiores esse? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta neque est distinctio sunt commodi non beatae obcaecati perspiciatis autem voluptas nostrum, pariatur atque consequuntur rerum expedita eveniet omnis, ex asperiores? Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, atque tenetur at eos voluptatibus non laudantium quibusdam harum? Dolore omnis fugiat aliquid laboriosam. Amet officia excepturi voluptate repudiandae ipsam harum?Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam itaque reprehenderit fugit aut reiciendis nobis explicabo repudiandae tempore odit quos animi, quasi eius quod provident suscipit, voluptatem, magnam asperiores esse? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta neque est distinctio sunt commodi non beatae obcaecati perspiciatis autem voluptas nostrum, pariatur atque consequuntur rerum expedita eveniet omnis, ex asperiores? Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, atque tenetur at eos voluptatibus non laudantium quibusdam harum? Dolore omnis fugiat aliquid laboriosam. Amet officia excepturi voluptate repudiandae ipsam harum?
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.button}>Accept</div>
          </div>
        </div>
        <div className={styles.chatContainer}>
          
        </div>
      </main>
    </div>
  );
};

export default Board;
