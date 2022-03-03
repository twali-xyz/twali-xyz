import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  HStack,
  Button,
  CircularProgress,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

import CeramicClient from "@ceramicnetwork/http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { TileDocument } from "@ceramicnetwork/stream-tile";

import WalletConnectProvider from "@walletconnect/web3-provider";

import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { DID } from "dids";
import { IDX } from "@ceramicstudio/idx";

// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

export interface ProfileData {
  content: {
    identity: Identity;
    accType: string;
  };
}

export interface Identity {
  firstName: string;
  lastName: string;
  userWallet: string;
  email: string;
  userName: string;
  bio: string;
  twitter?: string;
  linkedIn?: string;
  website?: string;
  businessName: string;
  businessType: string;
  businessLocation: string;
  currTitle: string;
  currLocation?: string;
  funcExpertise: string;
  industryExpertise: string;
  companyInfo?: CompanyInfo[];
  uuid: string;
}

export interface BasicProfile {
  name: string;
}
export interface Profile {
  identity: Identity;
  name: string;
  accType: string;
}

export interface UserData {
  userName: string;
  userWallet: string;
  accType: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  twitter?: string;
  linkedIn?: string;
  website?: string;
  businessName: string;
  businessType: string;
  businessLocation: string;
  currTitle: string;
  currLocation?: string;
  funcExpertise: string;
  industryExpertise: string;
  companyInfo?: CompanyInfo[];
}

export interface CompanyInfo {
  companyName: string;
  companyTitle: string;
  companyImg: any;
  companyStart: Date;
  companyEnd: Date;
  companyFunc: string;
  companyIndustry: string;
}

const HamburgerItem = ({ children, isLast, to = "/" }) => {
  return (
    <Button
      variant="ghost"
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
    >
      <Link href={to}>{children}</Link>
    </Button>
  );
};

const HeaderNav = (props) => {
  const whichPage = props.whichPage;
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const getUserByWallet = async (userWallet) => {
    let lowerCaseWallet = userWallet.toLowerCase();
    let apiURL = process.env.NEXT_PUBLIC_LOCALHOST ? process.env.NEXT_PUBLIC_LOCALHOST : `https://${process.env.NEXT_PUBLIC_URL}`; // TEMP: vercel URL doesn't include http
    const res = await fetch(
      `${apiURL}/api/users/wallet/${lowerCaseWallet}`
    );

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
    console.log(provider);
    const web3 = new Web3(provider);
    console.log(web3);
    const accounts = await web3.eth.getAccounts();
    const currAccount = accounts[0];
    const ceramic = new CeramicClient(endpoint);
    const idx = new IDX({ ceramic });
    setIsSubmitted(true);
    try {
      const threeIdConnect = new ThreeIdConnect();
      const ethProvider = new EthereumAuthProvider(
        window.ethereum,
        currAccount
      );
      await threeIdConnect.connect(ethProvider);

      const did = new DID({
        provider: threeIdConnect.getDidProvider(),
        resolver: {
          ...ThreeIdResolver.getResolver(ceramic),
        },
      });

      ceramic.setDID(did);
      await ceramic.did.authenticate();

      // does not require signing to get user's public data
      const data: BasicProfile = await idx.get(
        "basicProfile",
        `${currAccount}@eip155:1`
      );

      const profileData: ProfileData = await TileDocument.deterministic(
        ceramic,
        { family: "user-profile-data" },
        { anchor: false, publish: false }
      );

      let identity = profileData.content.identity;
      let userData: UserData = await getUserByWallet(currAccount);
      console.log(userData);
      if (
        identity.userName &&
        identity.userWallet &&
        userData &&
        userData.userName &&
        userData.userWallet
      ) {
        setIsSubmitted(false);
        // router.push("/profile");
        router.push(`/${userData.userName}`);
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

  if (whichPage === "index") {
    return (
      <Flex
        h={10}
        mb={8}
        p={10}
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
      >
        <HStack spacing={10} alignItems="flex-start">
          <Heading w="300px">Twali 👁‍🗨</Heading>
        </HStack>
        <Box
          display={{ base: "block", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Button
            mb={{ base: 8, sm: 0 }}
            mr={{ base: 0, sm: 8 }}
            display="block"
            onClick={handleWalletConnect}
            colorScheme="teal"
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
        </Box>
      </Flex>
    );
  } else if (whichPage === "sign-up" || whichPage === "steps") {
    return (
      <Flex
        h={10}
        mb={8}
        p={10}
        as="nav"
        align="left"
        justify="space-between"
        wrap="wrap"
        w="100%"
      >
        <HStack alignItems="flex-start">
          <Heading as="h4" size="md" w="300px">
            Twali 👁‍🗨
          </Heading>
        </HStack>
        <HStack alignItems="flex-end">
          <Box ml="2" mt="1" w="150px" backgroundColor="teal" borderRadius={16}>
            <Text pl={6} color="white" size="xs">
              0xP0...Z0p4
            </Text>
          </Box>
        </HStack>
      </Flex>
    );
  } else {
    return (
      <Flex
        h={10}
        mb={8}
        p={10}
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
      >
        <HStack spacing={10} alignItems="flex-start">
          <Heading w="300px">Twali 👁‍🗨</Heading>
        </HStack>

        <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
          {show ? <CloseIcon /> : <HamburgerIcon />}
        </Box>

        <Box
          display={{ base: show ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Flex
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
            pt={[4, 4, 0, 0]}
          >
            <HamburgerItem isLast={false} to="/directory">
              Directory
            </HamburgerItem>
            <HamburgerItem isLast={false} to="/profile">
              Profile
            </HamburgerItem>
          </Flex>
        </Box>
      </Flex>
    );
  }
};

export default HeaderNav;
