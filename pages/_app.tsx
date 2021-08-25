import {useEffect} from "react";

import type {AppProps} from "next/app"
import theme from "theme";
import {ThemeProvider} from "theme-ui";
import ResponsiveProvider from "utils/responsive";

import "normalize.css";
import "./fonts.css";

function MyApp({Component, pageProps}: AppProps) {

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveProvider>
        <Component {...pageProps} />
      </ResponsiveProvider>
    </ThemeProvider>
  )
}
export default MyApp
