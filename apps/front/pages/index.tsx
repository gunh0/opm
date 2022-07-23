import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EditingList from "../components/editingList";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Editing WireFrame</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <Header />
      <EditingList />
      <Footer />
    </div>
  );
};

export default Home;
