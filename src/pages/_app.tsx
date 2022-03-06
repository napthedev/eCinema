import "../styles/globals.css";
import "nprogress/nprogress.css";
import "swiper/css";
import "swiper/css/navigation";

import type { AppProps } from "next/app";
import Footer from "../components/Layout/Footer";
import Head from "next/head";
import NProgress from "nprogress";
import Navbar from "../components/Layout/Navbar";
import Router from "next/router";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});
Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
export default MyApp;
