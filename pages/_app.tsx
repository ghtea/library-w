import {ModalPortal} from "components/molecules/ModalPortal"
import type {AppProps} from "next/app"
import {Provider} from "next-auth/client"
import theme from "theme";
import {ThemeProvider} from "theme-ui";
import {AuthenticationProvider} from "utils/authentication"
import {AuthorizationProvider} from "utils/authorization/provider";
import {ModalProvider} from "utils/modal"
import {queryClient, QueryClientProvider} from "utils/react-query"
import {ResponsiveProvider} from "utils/responsive";
import {RouterProvider} from "utils/router";

import "normalize.css";
import "./fonts.css";

function MyApp({Component, pageProps}: AppProps) {

  return (
    <RouterProvider>
      <Provider session={pageProps.session}>
        <AuthenticationProvider>
          <AuthorizationProvider>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>
                <ResponsiveProvider>
                  <ModalProvider>
                    <Component {...pageProps} />
                    <ModalPortal></ModalPortal>
                  </ModalProvider>
                </ResponsiveProvider>
              </ThemeProvider>
            </QueryClientProvider>
          </AuthorizationProvider>
        </AuthenticationProvider>
      </Provider>
    </RouterProvider>
  )
}

export default MyApp
