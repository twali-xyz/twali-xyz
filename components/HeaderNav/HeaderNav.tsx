import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Flex,
  HStack,
  Text,
  Img,
  toast,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { handleWalletConnect } from "../../utils/walletUtils";
import Link from "next/link";
import { useEnsName, useWaitForTransaction } from "wagmi";
import useUser from "../../context/TwaliContext";
import { useBounty } from "../../context/BountyContext";
import { useToken } from "../../context/TokenContext";


const HeaderNav = (props) => {
  const whichPage = props.whichPage;
  const isConnectWalletBtn = props.isConnectWalletBtn;
  const setUserData = props.setUserData;
  const userPage = props.userPage;
  const userWallet = props.userWallet;
  const { ...userState } = useUser();
  const { ...bountyState } = useBounty();
  const { tokenName, tokenAmount, calculatedUSD } = useToken();
  const toast = useToast();

  const {
    data: ensData,
    isError: ensError,
    isLoading: ensLoading,
  } = useEnsName({
    address: userWallet,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const {
    data: txData,
    isError: isTxError,
    isLoading: txIsLoading,
  } = useWaitForTransaction({
    hash: userState.txHash,
    async onSettled(contractData, error) {
      if (contractData && !error) {
        toast({
          title: "Your bounty was submitted!",
          description: `${bountyState.contractTitle} is up on the marketplace.`,
          status: "success",
          variant: "subtle",
          duration: 6000,
          isClosable: true,
        });
        let bounty = {
          ...bountyState,
          token: tokenName,
          contractAmount: tokenAmount,
          convertedAmount: calculatedUSD,
          userWallet: userState.userWallet,
          contractOwnerUserName: userState.userName,
          contractID: bountyState.contractID,
          contractCreatedOn: Date.now(),
          contractStatus: "live",
          attachedFiles: bountyState.attachedFiles,
        };
        let URI;

        const isValid = submitSOWToS3(bounty);
        if (isValid) {
          isValid.then(async (valid) => {
            if (valid.status === 200) {
              URI = await valid.json();
              await updateSOWToLiveStatus({
                ...bounty,
                contractURI: URI,
              });
            }
          });
        }
        bountyState.setBounty({});
      }

      if (error) {
        toast({
          title: "Your bounty was not created due to an error!",
          description: `${error}`,
          status: "error",
          variant: "subtle",
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });

  const submitSOWToS3 = async (bounty) => {
    // post the SOW object to an S3 bucket
    let res = await fetch("/api/users/postSOW", {
      method: "POST",
      body: JSON.stringify({ bounty }),
    });
    return res;
  };

  const updateSOWToLiveStatus = async (bounty) => {
    let res = await fetch("/api/marketplace/submitBounty", {
      method: "POST",
      body: JSON.stringify({ bounty }),
    });
    return res;
  };

  return (
    <Flex
      height={"80px"}
      p={4}
      px={[2, 8]}
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      pos={props.step == 0 ? "absolute" : "relative"}
      backgroundColor={whichPage === "profile" ? "inverse" : "transparent"}
    >
      <Img
        width={["120px", "144px"]}
        height={"auto"}
        src="/twali-assets/navbar_logo.png"
      />
      <HStack>
        {isConnectWalletBtn && !userWallet ? (
          <>
            <HStack alignItems="center">
              <Button
                variant={"primary"}
                size={"lg"}
                width={"190px"}
                onClick={() =>
                  handleWalletConnect(
                    userPage,
                    setIsSubmitted,
                    setLoaded,
                    router,
                    setUserData
                  )
                }
              >
                {isSubmitted ? (
                  <CircularProgress
                    size="22px"
                    thickness="4px"
                    isIndeterminate
                    color="#3C2E26"
                  />
                ) : (
                  <Text>Connect Wallet</Text>
                )}
              </Button>
            </HStack>
          </>
        ) : (
          userWallet && (
            <>
              <HStack mr={10}>
                <Link href={"/marketplace"}>
                  <Text
                    fontSize={"14px"}
                    letterSpacing={"2%"}
                    textTransform={"uppercase"}
                    cursor={"pointer"}
                    color={whichPage === "marketplace" ? "zing" : "fresh"}
                  >
                    marketplace
                  </Text>
                </Link>
              </HStack>
              <HStack
                alignItems="center"
                justify={"space-between"}
                justifySelf={"flex-end"}
                maxW="400px"
                width={"fit-content"}
                height={"32px"}
              >
                <Flex
                  px={2}
                  mr={"0 !important"}
                  width={"100%"}
                  height={"100%"}
                  maxW={"160px"}
                  border={"1px solid"}
                  borderColor={"fresh"}
                  alignItems={"center"}
                  justifyItems={"center"}
                  borderRadius={32}
                >
                  <Text
                    color={"fresh"}
                    maxW={["80px", "190px"]}
                    fontSize={"14px"}
                    margin={"auto"}
                    alignSelf={"center"}
                    fontWeight={"700"}
                    letterSpacing={"0.06em"}
                    textTransform={"uppercase"}
                    padding="4px 8px"
                    noOfLines={1}
                  >
                    {txIsLoading ? "tx pending" : ensData || userWallet}
                  </Text>
                </Flex>
              </HStack>
            </>
          )
        )}
      </HStack>
    </Flex>
  );
};

export default HeaderNav;
