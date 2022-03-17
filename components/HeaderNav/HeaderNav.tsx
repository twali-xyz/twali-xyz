import React, { useState } from "react";
import { Flex, HStack, Text, Img } from "@chakra-ui/react";

import Link from "next/link";
import { useRouter } from "next/router";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { UserData } from "../../pages/user";
const HeaderNav = (props) => {
  const whichPage = props.whichPage;
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);

  const [isSubmitted, setIsSubmitted] = React.useState(false);
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

    setIsSubmitted(true);
    try {
      let userData: UserData = await getUserByWallet(currAccount);
      console.log(userData);

      if (userData && userData.user_name && userData.user_wallet) {
        router.push(`/${userData.user_name}`);
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
      backgroundColor={whichPage === "profile" ? "#0A1313" : "transparent"}
    >
      <Img
        width={"144px"}
        height={"auto"}
        src="/twali-assets/navbar_logo.png"
      />
      <HStack alignItems="center" w="130px" height={"32px"}>
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
          >
            0xb794f...
          </Text>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default HeaderNav;
