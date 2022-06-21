import { Container, VStack } from "@chakra-ui/react";
import background from "../public/twali-assets/backgroundscreen.png";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { UserData } from "../utils/interfaces";
import { getUserByWallet } from "../utils/walletUtils";
import { AccountSelection } from "../components/SignUpSteps/accountSelection";

const LoginPage = (props) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

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

    setIsSubmitted(true);
    try {
      let userData: UserData = await getUserByWallet(currAccount);

      if (userData && userData.userName && userData.userWallet) {
        router.push(`/${userData.userName}`);
        setIsSubmitted(false);
      } else if (referredBy) {
        console.log("No profile, pls create one...");
        router.push(`/steps?referred_by?${referredBy}`);
      } else {
        console.log("No profile, pls create one...");
        router.push(`/steps`);
      }
    } catch (err) {
      console.log("error: ", err);
      if (referredBy) {
        console.log("No profile, pls create one...");
        router.push(`/steps?referred_by?${referredBy}`);
      } else {
        console.log("No profile, pls create one...");
        router.push(`/steps`);
      }
      setLoaded(true);
    }
  };
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
        </VStack>
      </Container>
    </>
  );
};

export default LoginPage;
