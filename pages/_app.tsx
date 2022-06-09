import "../styles/global.css";
import "../styles/datePicker.css";
import "../styles/dateRangePicker.css";
import { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { UserProvider } from "../context/TwaliContext";
import TokenContext from '../context/TokenContext';
import BountyProvider from "../context/BountyContext";
import { twaliTheme } from "../styles/twaliTheme";

function App({ Component, pageProps }: AppProps) {
  return (
    // <>
    //   {/* Global Site Tag (gtag.js) - Google Analytics */}
    // <Script
    // strategy="afterInteractive"
    // src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
    // />
    // <Script
    // id="gtag-init"
    // strategy="afterInteractive"
    // dangerouslySetInnerHTML={{
    //   __html:`
    //   window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // gtag('js', new Date());
    // gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
    //   `,
    // }}
    // />
    <UserProvider>
      <ChakraProvider theme={twaliTheme}>
      <TokenContext>
        <BountyProvider>
        <Component {...pageProps} />
        </BountyProvider>
      </TokenContext>
      </ChakraProvider>
    </UserProvider>
    // </>
  );
}

export default App;
