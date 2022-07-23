import type { NextPage } from "next";
import Head from "next/head";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Editing WireFrame</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div>login</div>
      <Footer />
    </>
  );
};

export default Login;
