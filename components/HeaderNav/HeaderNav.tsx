import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Flex,
  HStack,
  Text,
  Img,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { handleWalletConnect } from "../../utils/walletUtils";

const HeaderNav = (props) => {
  const whichPage = props.whichPage;
  const isConnectWalletBtn = props.isConnectWalletBtn;
  const userPage = props.userPage;
  const userWallet = props.userWallet;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

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
      backgroundColor={whichPage === "profile" ? "inverse" : "transparent"}
    >
      <Img
        width={"144px"}
        height={"auto"}
        src="/twali-assets/navbar_logo.png"
      />
      {isConnectWalletBtn ? (
        <HStack alignItems="center" w="180px" height={"32px"}>
          <Button
            paddingLeft={4}
            paddingRight={4}
            width={180}
            height={"52px"}
            color={"cave"}
            backgroundColor={"zing"}
            onClick={() =>
              handleWalletConnect(userPage, setIsSubmitted, setLoaded, router)
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
        </HStack>
      ) : (
        userWallet && (
          <HStack alignItems="center" w="130px" height={"32px"}>
            <Flex
              ml="2"
              mt="1"
              pl={2}
              width={"100%"}
              height={"100%"}
              border={"1px solid"}
              borderColor={"fresh"}
              alignItems={"center"}
              justifyItems={"center"}
              borderRadius={32}
            >
              <Text
                color={"fresh"}
                maxW={"75px"}
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
          </HStack>
        )
      )}
    </Flex>
  );
};

export default HeaderNav;
