import {
  Button,
  CircularProgress,
  Container,
  Link,
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
import useUser from "../context/TwaliContext";
import { getUserByWallet, getUserWhitelistStatus, handleWalletConnectOnLogin } from "../utils/walletUtils";


const LoginPage = (props) => {
  const { ...userState } = useUser();
  useEffect(() => {
    setLoaded(!props.loaded);
    checkForWallet();
  }, []);

  const [show, setShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [status, setStatus] = useState<string | JSX.Element>();
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
    console.log(currAccount);

    userState.setData({ ...userState, userWallet: currAccount });
    setIsSubmitted(true);

    try {
      let userData: UserData = await getUserByWallet(currAccount);

      if (userData && userData.userName && userData.userWallet) {
        router.push(`/${userData.userName}`);
        setIsSubmitted(false);
        return;
      }
    } catch (err) {
      console.log("error: ", err);
    }

    try {
      let userWhiteList = await getUserWhitelistStatus(currAccount);
      console.log("DATA: ", userWhiteList["whitelistStatus"]);
      if (
        userWhiteList["whitelistStatus"] === null ||
        userWhiteList["whitelistStatus"] === "" ||
        userWhiteList["whitelistStatus"] === undefined ||
        userWhiteList["whitelistStatus"] === "pending" ||
        userWhiteList["whitelistStatus"] === "rejected"
      ) {
        // if not approved on the whiteList send user to application form,
        // pending page, or rejected page
        router.push(
          `/whitelist/application?status=${userWhiteList["whitelistStatus"]} `,
          "whitelist/application"
        );
        return;
      }
      if (userWhiteList["whitelistStatus"] === "approved") {
        console.log("No profile, pls create one...");
        userState.setData({
          ...userState,
          firstName: userWhiteList["firstName"],
          lastName: userWhiteList["lastName"],
          email: userWhiteList["email"],
          linkedIn: userWhiteList["linkedIn"],
          discord: userWhiteList["discord"],
        });
        router.push("/steps");
        return;
      }
    } catch (err) {
      console.log("error: ", err);
      router.push("/whitelist/application");
      setLoaded(true);

    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      return {
        status: (
          <Button
            disabled={isDisabled}
            marginTop={"96px !important"}
            variant={"primary"}
            size={"lg"}
            onClick={(event: any) =>
              handleWalletConnectOnLogin()
            }
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
        ),
      };
    } else {
      setIsDisabled(true);
      return {
        status: (
          <VStack>
            <Text marginTop={"48px !important"} fontSize={"20px"}>
              {" "}
              🦊{" "}
              <Link target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask in your browser.
              </Link>
            </Text>
            <Button
              disabled={isDisabled}
              marginTop={"24px !important"}
              variant={"primary"}
              size={"lg"}
            >
              Connect Wallet{" "}
            </Button>
          </VStack>
        ),
      };
    }
  };

const checkForWallet = async () => { 
  const { status } = await connectWallet();
  setStatus(status);
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
            />) : 
            <Text>{status}</Text>         
        }
        </VStack>
      </Container>
    </>
  );
};

export default LoginPage;
