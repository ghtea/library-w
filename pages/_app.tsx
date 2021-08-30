import {useEffect} from "react";

import type {AppProps} from "next/app"
import {Provider} from "next-auth/client"
import theme from "theme";
import {ThemeProvider} from "theme-ui";
import {AuthenticationProvider} from "utils/authentication"
import {queryClient, QueryClientProvider} from "utils/react-query"
import {ResponsiveProvider} from "utils/responsive";

import "normalize.css";
import "./fonts.css";

function MyApp({Component, pageProps}: AppProps) {

  return (
    <Provider session={pageProps.session}>
      <AuthenticationProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <ResponsiveProvider>
              <Component {...pageProps} />
            </ResponsiveProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </AuthenticationProvider>
    </Provider>
  )
}

export default MyApp
