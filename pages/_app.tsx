import "../styles/global.css";
import "../styles/datePicker.css";
import { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { UserProvider } from "../components/TwaliContext";
import { twaliTheme } from "../styles/twaliTheme";

library.add(fab, fas);

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
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
    // </>
  );
}

export default App;
