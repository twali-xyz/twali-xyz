import "../styles/global.css";
import "../styles/datePicker.css";
import "../styles/dateRangePicker.css";
import { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { UserProvider } from "../context/TwaliContext";
import TokenContext from "../context/TokenContext";
import { twaliTheme } from "../styles/twaliTheme";
import { WagmiConfig, createClient } from "wagmi";

function App({ Component, pageProps }: AppProps) {
  const client = createClient();

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
      <WagmiConfig client={client}>
        <ChakraProvider theme={twaliTheme}>
          <TokenContext>
            <Component {...pageProps} />
          </TokenContext>
        </ChakraProvider>
      </WagmiConfig>
    </UserProvider>
    // </>
  );
}

export default App;
