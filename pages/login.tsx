import {
  Button,
  CircularProgress,
  Container,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

import background from "../public/twali-assets/backgroundscreen.png";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { UserData } from "../utils/interfaces";

import { getUserByWallet, getUserWhitelistStatus } from "../utils/walletUtils";
import { AccountSelection } from "../components/SignUpSteps/accountSelection";
import useUser from "../context/TwaliContext";

const LoginPage = (props) => {
  const router = useRouter();
  const [accType, setAccType] = useState("");
  const [btnActive, setBtnActive] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAccTypeSelection, setIsAccTypeSelection] = useState(true);
  const [isAccTypeSelected, setIsAccTypeSelected] = useState(false);
  const [accSelectionComplete, setAccSelectionComplete] = useState(false);
  const selectUserAccType = (accType: string) => {
    setAccType(accType);
    setIsAccTypeSelected(true);
  };
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [loaded, setLoaded] = useState(false);
  const { ...userState } = useUser();
  const [referredBy, setReferredBy] = useState<string | string[]>();
  console.log("ROUTER: ", router.query["referred_by"]);
  useEffect(() => {
    setLoaded(!props.loaded);
    setReferredBy(router.query["referred_by"]);
  }, [router.query]);

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
    userState.setData({ ...userState, userWallet: currAccount });
    setIsSubmitted(true);

    try {
      let userWhiteList = await getUserWhitelistStatus(currAccount);
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
          referredBy: userWhiteList?.referredBy
            ? userWhiteList["referredBy"]
            : "",
        });
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
      }
      router.push("/steps");
      return;
    } catch (err) {
      console.log("error: ", err);
      if (referredBy) {
        router.push(`/whitelist/application?referred_by=${referredBy}`);
      } else {
        router.push("/whitelist/application");
        setLoaded(true);
      }
    }

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
  };

  return (
    <>
      <title>twali.xyz - login</title>
      <Container
        width="100%"
        height="100%"
        minH={"100vh"}
        maxW={"100%"}
        pos={"relative"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgImg={`url(${background.src})`}
      >
        <VStack
          width="100%"
          maxW={"100%"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <AccountSelection
            btnActive={btnActive}
            referredBy={referredBy}
            setBtnActive={setBtnActive}
            selectUserAccType={selectUserAccType}
            isAccTypeSelected={isAccTypeSelected}
            onConnectWallet={handleWalletConnectOnLogin}
            setIsAccTypeSelection={setIsAccTypeSelection}
            setAccSelectionComplete={setAccSelectionComplete}
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
            <Text>{status}</Text>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default LoginPage;
