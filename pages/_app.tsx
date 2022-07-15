import "../styles/global.css";
import "../styles/datePicker.css";
import "../styles/dateRangePicker.css";
import { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "../context/TwaliContext";
import { twaliTheme } from "../styles/twaliTheme";
import {
  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
} from "wagmi";
import { getDefaultProvider } from "ethers";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import TokenProvider from "../context/TokenContext";
import BountyProvider from "../context/BountyContext";
const alchemyId = process.env.ALCHEMY_ID;

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId }),
  publicProvider(),
]);
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "twali-xyz",
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
    <WagmiConfig client={client}>
      <UserProvider>
        <TokenProvider>
          <BountyProvider>
            <ChakraProvider theme={twaliTheme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </BountyProvider>
        </TokenProvider>
      </UserProvider>
    </WagmiConfig>
    // </>
  );
}

export default App;
