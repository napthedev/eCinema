import "../styles/globals.css";
import "nprogress/nprogress.css";
import "swiper/css";
import "swiper/css/navigation";

import Router, { useRouter } from "next/router";

import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import NProgress from "nprogress";
import Navbar from "../components/Navbar";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});
Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="https://ik.imagekit.io/nap/eCinema/Video_Logo__1__I2y-1zWj18k.png" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Navbar />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
    </>
  );
}
export default MyApp;
