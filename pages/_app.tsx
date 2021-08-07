import { useEffect } from 'react';

import type { AppProps } from 'next/app'
import theme from 'theme';
import { ThemeProvider} from "theme-ui";
import ResponsiveProvider from "tools/responsive";

import 'normalize.css';
import './fonts.css';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(()=>{console.log("hello")},[])
  

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveProvider>
        <Component {...pageProps} />
      </ResponsiveProvider>
    </ThemeProvider>
  )
}
export default MyApp
