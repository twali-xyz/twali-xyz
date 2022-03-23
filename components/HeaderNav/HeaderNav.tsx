import React, { useState } from "react";
import { Button, CircularProgress, Flex, HStack, Text, Img } from "@chakra-ui/react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useRouter } from "next/router";
import { UserData } from "../../utils/interfaces";

const HeaderNav = (props) => {
  const whichPage = props.whichPage;
  const isConnectWalletBtn = props.isConnectWalletBtn;
  const userPage = props.userPage;
  const userWallet = props.userWallet;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const getUserByWallet = async (userWallet) => {
    let lowerCaseWallet = userWallet.toLowerCase();
    const res = await fetch(`/api/users/wallet/${lowerCaseWallet}`);

    const data: any = await res.json();

    console.log("RETRIEVE USER BY WALLET YO");
    return data;
  };
  const handleWalletConnect = async () => {
    try {
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
    web3Modal.clearCachedProvider();
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const currAccount = accounts[0];

    setIsSubmitted(true);
      let userData: UserData = await getUserByWallet(currAccount);
      console.log(userData);
      if (userData && userData.userName && userData.userWallet) {
        if (router.query?.view == 'public' && userPage && userPage.userName) {
          await router.push(`/${userPage.userName}`);
          router.reload(); // reloads the profile page after changing the shallow route
        } else if (router.query?.view == 'public' && userData && userData.userName) {
          await router.push(`/${userData.userName}`);
          router.reload(); // reloads the profile page after changing the shallow route
        } else {
          router.reload(); // reloads the profile page upon login
        }
        
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

  return (
    <Flex
      height={"80px"}
      p={4}
      px={8}
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      pos={props.step == 0 ? "absolute" : "relative"}
      backgroundColor={whichPage === "profile" ? "#0A1313" : "transparent"}
    >
      <Img
        width={"144px"}
        height={"auto"}
        src="/twali-assets/navbar_logo.png"
      />
      <HStack alignItems="center" w="180px" height={"32px"}>
          { whichPage === "profile" && isConnectWalletBtn ? (
             <Button
             paddingLeft={4}
             paddingRight={4}
             width={180}
             height={"52px"}
             color={"#062B2A"}
             backgroundColor={"#C7F83C"}
             onClick={handleWalletConnect}
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
          ): userWallet && (
            <Flex
            ml="2"
            mt="1"
            width={"100%"}
            height={"100%"}
            border={"1px solid #F9FFF2"}
            alignItems={"center"}
            justifyItems={"center"}
            borderRadius={32}
          >
            <Text
              color="white"
              fontSize={"14px"}
              margin={"auto"}
              alignSelf={"center"}
              fontWeight={"700"}
              letterSpacing={"0.06em"}
              textTransform={"uppercase"}
              isTruncated
            >
              {userWallet}
            </Text>
          </Flex>
        )}
      </HStack>
    </Flex>
  );
};

export default HeaderNav;
