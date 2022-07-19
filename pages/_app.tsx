import "../styles/global.css";
import "../styles/datePicker.css";
import "../styles/dateRangePicker.css";
import { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { UserProvider } from "../context/TwaliContext";
import TokenContext from "../context/TokenContext";
import { twaliTheme } from "../styles/twaliTheme";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const alchemyId = process.env.ALCHEMY_ID;

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId }),
  publicProvider(),
]);

// Set up client
const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
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
