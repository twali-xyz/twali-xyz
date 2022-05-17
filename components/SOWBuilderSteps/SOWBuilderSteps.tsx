import { useState, useEffect } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import Project from "../Project/Project";
import background from "../../public/twali-assets/backgroundscreen.png";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
// import UserPermissionsProvider from "../UserPermissionsProvider/UserPermissionsProvider";
// import { fetchPermission } from "../../utils/profileUtils";
// import { connect } from "../../utils/walletUtils";
// import { getUserByWallet } from "../../utils/walletUtils";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3 from "web3";
// import Web3Modal from "web3modal";

import {
  Heading,
  Button,
  HStack,
  CircularProgress,
  Container, 
  VStack,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UserData } from "../../utils/interfaces";
import { statementOfWerk } from "./statementOfWerk";
import { datesAndPricing } from "./datesAndPricing";
import { submissionOfWerk } from "./submissionOfWerk";


import useUser from "../../context/TwaliContext";

const SOWBuilderSteps = () => {
  const router = useRouter();
  const { setData, ...userState } = useUser();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isConnectWalletBtn, setIsConnectWalletBtn] = useState(false);
  const [loggedInUserAddress, setLoggedInUserAddress] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [userData, setUserData] = useState<UserData>({
    ...userState,
    userName: "",
    userWallet: "",
    uuid: "",
    setData,
  });

  // const handleWalletConnectOnLogin = async () => {
  //   const web3Modal = new Web3Modal({
  //     disableInjectedProvider: false,
  //     network: "rinkeby",
  //     cacheProvider: false,
  //     providerOptions: {
  //       walletconnect: {
  //         package: WalletConnectProvider,
  //         options: {
  //           rpc: {
  //             1: "https://eth-rinkeby.alchemyapi.io/v2/QtLM8rW9nB6DobDu8KQx-7fYMS2rBlky",
  //           },
  //         },
  //       },
  //     },
  //   });
  //   const provider = await web3Modal.connect();
  //   const web3 = new Web3(provider);
  //   const accounts = await web3.eth.getAccounts();
  //   const currAccount = accounts[0];

  //   // setIsSubmitted(true);
  //   try {
  //     let userData: UserData = await getUserByWallet(currAccount);

  //     if (userData && userData.userName && userData.userWallet) {
  //       // router.push(`/${userData.userName}`);
  //       // setIsSubmitted(false);
  //       setData(userData);
  //     } else {
  //       console.log("No profile, pls create one...");
  //       router.push("/steps");
  //     }
  //   } catch (err) {
  //     console.log("error: ", err);
  //     router.push("/steps");
  //     setLoaded(true);
  //   }
  // };

  // useEffect(() => {
  //   userData && setData(JSON.parse(JSON.stringify(userData)));
  // }, [userData]);

  // useEffect(() => {
  //   async function readProfile() {
  //     try {
  //       if (router.query?.view != "public") {
  //         // does not require signing to get user's public data
  //         const address = await connect(); // first address in the array
  //         console.log('ADDRESS', address);
  //         console.log(userState);
        
  //         // if (error) return <div>failed to load</div>
  //         // if (!userData) return <LoginPage loaded={!userData} />;
  //         if (address) {
            
  //           setLoggedInUserAddress(address);
  //         }
  //       } else {
  //         setIsConnectWalletBtn(true);
  //       }
  //       // does not require signing to get user's public data
  //       // if (user && user.userWallet) {
  //       //   setUserData(user);
  //       //   setLoaded(true);
  //       // }
  //     } catch (err) {
  //       console.log("error: ", err);
  //       setLoaded(false);
  //     }
  //   }
  //   readProfile();
  // }, []);


  const steps = [
    {
      label: "Statement of Werk",
      content: statementOfWerk({ values: userData }),
    },
    {
      label: "Dates & Pricing",
      content: datesAndPricing({ values: userData }),
    },
    {
      label: "Review",
      // content: statementOfWerk({
      //   values: userData,
      // }),
    },
    {
      label: "Submission",
      content: submissionOfWerk({
        values: userData,
      }),
    },
  ];

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <>
                {/* <Button
              marginTop={"96px !important"}
              variant={"primary"}
              size={"lg"}
              onClick={handleWalletConnectOnLogin}
            >
              Connect Wallet{" "} */}
              {/* {isSubmitted ? (
                <CircularProgress
                  size="22px"
                  thickness="4px"
                  isIndeterminate
                  color="#3C2E26"
                />
              ) : null} */}
            {/* </Button> */}
    {/* <UserPermissionsProvider
      fetchPermission={fetchPermission(
      userState.userName,
      loggedInUserAddress ? loggedInUserAddress : null
    )}> */}
      {activeStep === 2 ? (
        <Project activeStep={activeStep} prevStep={prevStep} nextStep={nextStep} steps={steps}/>
      ): (
        <>
      <Container
        width="100%"
        minHeight="100vh"
        maxW={"100%"}
        pos={"relative"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgImg={`url(${background.src})`}
        px={0}
      >
        <HeaderNav whichPage="werk"/>
        <Container
          maxW="container.xl"
          pb="inherit"
          px={0}
          m="inherit"
        >
        <Flex h="full">
            <VStack w="full" h="full" spacing={8} alignItems="flex-start">
      <Heading
        fontSize={"72px"}
        lineHeight={"88px"}
        marginTop={"24px"}
        marginBottom={"-8px"}
        alignSelf="flex-start"
        fontFamily={"Scope Light"}
        fontWeight={"400"}
      >
        Build your werk.
      </Heading>
      <Steps activeStep={activeStep} width="720px">
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>
      <HStack width={"100%"} justifyContent={"flex-end"}>
        <Button
          alignSelf="left"
          mr={"24px"}
          onClick={() => {
            activeStep <= 0 ? router.push("/marketplace") : prevStep();
          }}
          pos={"relative"}
          alignItems={"center"}
          justifyContent={"center"}
          variant={"secondary"}
          size={"lg"}
        >
          <Text
            display={"flex"}
            width={"100%"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            go back
          </Text>
        </Button>
        <Button
          disabled={isDisabled}
          pos={"relative"}
          alignSelf="center"
          variant={"primary"}
          size={"lg"}
          onClick={() => {
            nextStep();
          }}
        >
          <Text
            display={"flex"}
            width={"100%"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            { activeStep === 1 ? 'preview': activeStep === 3 ? 'submit': 'continue'}
          </Text>

          {isSubmitted ? (
            <CircularProgress
              size="22px"
              thickness="4px"
              isIndeterminate
              color="#3C2E26"
            />
          ) : null}
        </Button>{" "}
      </HStack>
      </VStack>
        </Flex>
        </Container>
      </Container>
      </>
      )
      }
      {/* </UserPermissionsProvider> */}
    </>
  );
};

export default SOWBuilderSteps;
