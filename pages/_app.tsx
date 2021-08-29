import {useEffect} from "react";

import type {AppProps} from "next/app"
import theme from "theme";
import {ThemeProvider} from "theme-ui";
import {AuthProvider} from "utils/firebase/auth";
import {queryClient, QueryClientProvider} from "utils/react-query"
import ResponsiveProvider from "utils/responsive";

import "normalize.css";
import "./fonts.css";

function MyApp({Component, pageProps}: AppProps) {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ResponsiveProvider>
            <Component {...pageProps} />
          </ResponsiveProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default MyApp
