import "../styles/globals.scss";
import type { AppProps } from "next/app";

import useWindowSize from "../hooks/useWindowSize";
import Error from "../components/common/Error";

function MyApp({ Component, pageProps }: AppProps) {
  const [width, height] = useWindowSize();

  return width < 1240 ? (
    <Error
      title="For Crystal-clear proofreading."
      description="Proofor works on only PC Website."
    />
  ) : (
    <Component {...pageProps} />
  );
}

export default MyApp;
