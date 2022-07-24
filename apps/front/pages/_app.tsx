import "../styles/globals.scss";
import type { AppProps } from "next/app";

import useWindowSize from "../hooks/useWindowSize";

function MyApp({ Component, pageProps }: AppProps) {
  const [width, height] = useWindowSize();

  return width < 1240 ? (
    <>
      <h1>1240px 이하는 지원하지 않습니다.</h1>
      <h3>
        width: {width}, height: {height}
      </h3>
    </>
  ) : (
    <Component {...pageProps} />
  );
}

export default MyApp;
