import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "styles/theme";
import NavBar from "components/common/NavBar";
import Footer from "components/common/Footer";
import { useRouter } from "next/router";
import 'remixicon/fonts/remixicon.css'
import "styles/globals.css";
import { DefaultSeo } from "next-seo";

import SEO from '../next-seo.config';

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Kathmandu Living Labs</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <NavBar />
        <Component {...pageProps} />
        {router.pathname !== '/our-team/[slug]' && <Footer />}
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
