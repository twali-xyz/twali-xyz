import "../styles/global.css";
import "../styles/datePicker.css";
import { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { mode } from "@chakra-ui/theme-tools";
import { customSteps } from "../styles/customStepsTheme";

library.add(fab, fas);

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,

  styles: {
    color: {
      textPrimary: "#F9FFF2",
      textSubtle: "#98B2B2",
      textBold: "#C7F83C",
    },
    backgroundColor: {
      actionBold: "#C7F83C",
    },
    global: (props) => ({
      body: {
        bg: mode("white", "rgb(30, 30, 30)")(props),
        color: mode("rgb(0, 0, 0)", "rgb(255, 255, 255)")(props),
      },
    }),
  },

  components: {
    Steps: customSteps,
  },
});

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
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    // </>
  );
}

export default App;
