import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import BoardContent from "../../components/board/BoardContent";
import ChatView from "../../components/chat/ChatView";
import Navigation from "../../components/common/Navigation";
import styles from "../../styles/Board.module.scss";

const boardText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam itaque
      reprehenderit fugit aut reiciendis nobis explicabo repudiandae tempore
      odit quos animi, quasi eius quod provident suscipit, voluptatem, magnam
      asperiores esse? Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Dicta neque est distinctio sunt commodi non beatae obcaecati perspiciatis
      autem voluptas nostrum, pariatur atque consequuntur rerum expedita eveniet
      omnis, ex asperiores? Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Consequatur, atque tenetur at eos voluptatibus non laudantium
      quibusdam harum? Dolore omnis fugiat aliquid laboriosam. Amet officia
      excepturi voluptate repudiandae ipsam harum?Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Ullam itaque reprehenderit fugit aut
      reiciendis nobis explicabo repudiandae tempore odit quos animi, quasi eius
      quod provident suscipit, voluptatem, magnam asperiores esse? Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Dicta neque est distinctio
      sunt commodi non beatae obcaecati perspiciatis autem voluptas nostrum,
      pariatur atque consequuntur rerum expedita eveniet omnis, ex asperiores?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
      atque tenetur at eos voluptatibus non laudantium quibusdam harum? Dolore
      omnis fugiat aliquid laboriosam. Amet officia excepturi voluptate
      repudiandae ipsam harum?`;

const Board: NextPage = () => {
  const router = useRouter();

  const [isAccept, setIsAccept] = useState(false);
  const handleAcceptButton = () => {
    setIsAccept(true);
  };
  const movePage = () => {
    document.location.href = "/";
  };

  const handleEditingButton = () => {};

  const handleCompletionButton = () => {};

  return (
    <div>
      <Head>
        <title>Content View WireFrame</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={styles.container}>
        <div className={styles.backContainer} onClick={movePage}>
          <Image src="/backbutton.png" alt="logo" width={56} height={56} />
        </div>
        <div className={styles.textContainer}>
          <BoardContent text={boardText} />
          <div className={styles.buttonContainer}>
            {isAccept ? (
              <>
                <div
                  className={styles.editingButton}
                  onClick={handleEditingButton}
                >
                  Editing
                </div>
                <div
                  className={styles.completionButton}
                  onClick={handleCompletionButton}
                >
                  Completion
                </div>
              </>
            ) : (
              <>
                <div className={styles.blankButton}></div>
                <div
                  className={styles.acceptButton}
                  onClick={handleAcceptButton}
                >
                  Accept
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.chatContainer}>{isAccept && <ChatView />}</div>
      </main>
    </div>
  );
};

export default Board;
