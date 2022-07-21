import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { UserData } from "../utils/interfaces";
import { Permission } from "./PermissionTypes";
import { Box, Text, HStack } from "@chakra-ui/react";

const cache = {};

/**
 *  walletUtils.tsx contains util methods for wallet connection
 */

export async function connect() {
  const { ethereum } = window;
  let account;

  if (!ethereum) {
    console.log("Connect your ethereum wallet!");
    return;
  }

  await ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
    if (accounts.length !== 0) {
      account = accounts[0];
      console.log("Found an authorized account: ", account);
    } else {
      console.log("No authorized account found!");
    }
  });
  return account;
}

export const handleWalletConnectOnLogin = async (
  setIsSubmitted,
  setLoaded,
  router
) => {
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
    router.push("/login");
    setLoaded(true);
  }
};

export const handleWalletConnect = async (
  userPage,
  setIsSubmitted,
  setLoaded,
  router,
  setUserData
) => {
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

    if (userData && userData.userName && userData.userWallet) {
      if (router.query?.view == "public" && userPage && userPage.userName) {
        await router.push(`/${userPage.userName}`);
        router.reload(); // reloads the profile page after changing the shallow route
      } else if (
        router.query?.view == "public" &&
        userData &&
        userData.userName
      ) {
        await router.push(`/${userData.userName}`);
        router.reload(); // reloads the profile page after changing the shallow route
      } else {
        setUserData(userData); // sets the userData for the page loaded (handled in the HeaderNav.tsx file)
      }

      setIsSubmitted(false);
    } else {
      console.log("No profile, pls create one...");
      router.push("/steps");
    }
  } catch (err) {
    console.log("error: ", err);
    router.push("/login");
    setLoaded(true);
  }
};

export const getUserByWallet = async (userWallet) => {
  console.log("user wallet utils hello", userWallet);
  let lowerCaseWallet = userWallet.toLowerCase();
  const res = await fetch(`/api/users/wallet/${lowerCaseWallet}`);

  const data: any = await res.json();

  console.log("RETRIEVE USER BY WALLET YO");
  return data;
};

export const getUserWhitelistStatus = async (userWallet) => {
  let lowerCaseWallet = userWallet.toLowerCase();
  const res = await fetch(`/api/users/whitelist/${lowerCaseWallet}`);
  console.log(res.json);
  const data: any = await res.json();
  return data;
};

// Function that simulates fetching a permission from remote server
export const fetchPagePermission =
  (loggedInUserAddress) =>
  async (permission: Permission): Promise<boolean> => {
    let user = {
      userWallet: null,
      permissions: ["none"],
    };
    // permissions: ["view"] for restricted
    // ["none"] to keep out non-members
    if (loggedInUserAddress) {
      let userData;

      if (!Object.keys(cache).includes(loggedInUserAddress)) {
        let lowerCaseWallet = loggedInUserAddress.toLowerCase();
        const res = await fetch(`/api/users/wallet/${lowerCaseWallet}`);
        const data: any = await res.json();
        userData = data;
        cache[loggedInUserAddress] = userData;
      } else {
        userData = cache[loggedInUserAddress];
      }

      if (userData && userData.userWallet === loggedInUserAddress) {
        user = {
          userWallet: loggedInUserAddress,
          permissions: ["edit"],
        };
      }
    }

    console.log(user);
    return user.permissions.includes(permission);
  };

export const pageDisconnectedFallback = () => {
  return (
    <HStack
      marginTop="48px"
      alignSelf="center"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Box
        height="313px"
        w="744px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        backgroundColor={"n6"}
        opacity={"90%"}
        boxShadow={"8px 16px 24px 0px #062B2A8F"}
      >
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            <Text
              marginTop="46px"
              fontFamily={"GrandSlang"}
              fontWeight="400"
              fontSize="48px"
              lineHeight={"64px"}
              letterSpacing={"wide"}
              pos={"relative"}
              top={"5px"}
            >
              Uh oh, you're logged out
            </Text>
            <Text
              marginTop="46px"
              fontStyle="normal"
              fontFamily="PP Telegraf Light"
              fontSize="18px"
              lineHeight={"28px"}
              fontWeight="400"
              letterSpacing="0.02em"
              // visibility={errors.currTitle ? "visible" : "hidden"}
            >
              Connect your wallet and login to Twali!
            </Text>
          </Box>
        </Box>
      </Box>
    </HStack>
  );
};
