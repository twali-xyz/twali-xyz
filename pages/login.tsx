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
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { UserData } from "../utils/interfaces";
import { getUserByWallet } from "../utils/walletUtils";
import useUser from "../context/TwaliContext";

const LoginPage = (props) => {
  const { ...userState } = useUser();
  useEffect(() => {
    setLoaded(!props.loaded);
  }, []);

  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [loaded, setLoaded] = useState(false);
  const [whiteListedStatus, setWhiteListedStatus] = useState(""); // use ""/rejected/pending/approved here to test different UX/UI paths

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
    console.log(currAccount);

    userState.setData({ ...userState, userWallet: currAccount });
    setIsSubmitted(true);

    try {
      // TODO
      //
      // check if user is on whiteList
      //
      // const userWhiteListStatus = await getUserWhiteListStatus;
      // setWhiteListed(userWhiteListStatus);
      //

      if (
        whiteListedStatus === null ||
        whiteListedStatus === "" ||
        whiteListedStatus === "pending" ||
        whiteListedStatus === "rejected"
      ) {
        // if not approved on the whiteList send user to application form,
        // pending page, or rejected page
        router.push(
          `/whitelist/application?status=${whiteListedStatus} `,
          "whitelist/application"
        );
      }
      // if user is on whiteList, check if profile has been created
      else {
        let userData: UserData = await getUserByWallet(currAccount);

        if (userData && userData.userName && userData.userWallet) {
          router.push(`/${userData.userName}`);
          setIsSubmitted(false);
        } else {
          console.log("No profile, pls create one...");
          router.push("/steps");
        }
      }
    } catch (err) {
      console.log("error: ", err);
      router.push("/steps");
      setLoaded(true);
    }
  };

  return (
    <>
      <title>twali.xyz - login</title>
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
            fontFamily={"GrandSlang"}
            fontSize={"40px"}
            lineHeight={"56px"}
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
              marginTop={"96px !important"}
              variant={"primary"}
              size={"lg"}
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
