import {
  Button,
  CircularProgress,
  Container,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react";
import background from "../public/twali-assets/backgroundscreen.png";
import HeaderNav from "../components/HeaderNav/HeaderNav";
// import { handleConnect } from "../components/Profile/helpers/handleConnect";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { UserData } from "../utils/interfaces";
import { getUserByWallet } from '../utils/walletUtils';

const LoginPage = (props) => {
  useEffect(() => {
    setLoaded(!props.loaded);
  }, []);

  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const handleWalletConnectOnLogin = async () => {
    const web3Modal = new Web3Modal({
      disableInjectedProvider: false,
      network: "rinkeby",
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              1: "https://eth-rinkeby.alchemyapi.io/v2/QtLM8rW9nB6DobDu8KQx-7fYMS2rBlky",
            },
          },
        },
      },
    });
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const currAccount = accounts[0];

    setIsSubmitted(true);
    try {
      let userData: UserData = await getUserByWallet(currAccount);

      if (userData && userData.userName && userData.userWallet) {
        router.push(`/${userData.userName}`);
        setIsSubmitted(false);
      } else {
        console.log("No profile, pls create one...");
        router.push("/steps");
      }
    } catch (err) {
      console.log("error: ", err);
      router.push("/steps");
      setLoaded(true);
    }
  };

  // const handleWalletConnect = handleConnect(
  //   setIsSubmitted,
  //   setName,
  //   setEmail,
  //   setAccType,
  //   router,
  //   setLoaded,
  //   setProfileData
  // );
  return (
    <>
      <Container
        width="100%"
        height="1024px"
        minH={"100vh"}
        maxW={"100%"}
        pos={"relative"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgImg={`url(${background.src})`}
      >
        <HeaderNav whichPage="index" />
        <VStack
          width="100%"
          minH={"100vh"}
          maxW={"100%"}
          pos={"absolute"}
          right={"1.9%"}
          bottom={"4.5%"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text
            alignSelf={"center"}
            fontFamily={"Scope Light"}
            fontSize={"16px"}
            lineHeight={"24px"}
            letterSpacing={"wide"}
          >
            welcome to
          </Text>
          <Img
            src="twali-assets/twali_rainbow.png"
            width={"300px"}
            height={"64.38px"}
            marginTop={"49px !important"}
          />
          {!loaded ? (
            <CircularProgress
              marginTop={"109px !important"}
              size="32px"
              thickness="4px"
              isIndeterminate
              color="#3C2E26"
            />
          ) : (
            <Button
              marginTop={"89px !important"}
              width={"207px"}
              height={"52px"}
              color={"#062B2A"}
              backgroundColor={"#C7F83C"}
              onClick={handleWalletConnectOnLogin}
            >
              Connect Wallet{" "}
              {isSubmitted ? (
                <CircularProgress
                  size="22px"
                  thickness="4px"
                  isIndeterminate
                  color="#3C2E26"
                />
              ) : null}
            </Button>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default LoginPage;
