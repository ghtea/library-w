import type {AppProps} from "next/app"
import {Provider} from "next-auth/client"
import theme from "theme";
import {ThemeProvider} from "theme-ui";
import {AuthenticationProvider} from "utils/authentication"
import {AuthorizationProvider} from "utils/authorization/provider";
import {queryClient, QueryClientProvider} from "utils/react-query"
import {ResponsiveProvider} from "utils/responsive";

import "normalize.css";
import "./fonts.css";

function MyApp({Component, pageProps}: AppProps) {

  return (
    <Provider session={pageProps.session}>
      <AuthenticationProvider>
        <AuthorizationProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <ResponsiveProvider>
                <Component {...pageProps} />
              </ResponsiveProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </AuthorizationProvider>
      </AuthenticationProvider>
    </Provider>
  )
}

export default MyApp
