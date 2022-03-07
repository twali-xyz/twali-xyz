import "../styles/global.css";
import { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";

import { mode } from "@chakra-ui/theme-tools";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import { library } from "@fortawesome/fontawesome-svg-core";
import TwaliProvider from "../components/TwaliProvider/TwaliProvider";

library.add(fab, fas);

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "rgb(30, 30, 30)")(props),
        color: mode("rgb(0, 0, 0)", "rgb(255, 255, 255)")(props),
      },
    }),
  },
  components: {
    Steps,
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <TwaliProvider>
        <Component {...pageProps} />
      </TwaliProvider>
    </ChakraProvider>
  );
}

export default App;
