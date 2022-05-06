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
import Link from "next/link";

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
      {isConnectWalletBtn ? (
        <HStack alignItems="center">
          <Button
            variant={"primary"}
            size={"lg"}
            width={"190px"}
            onClick={() =>
              handleWalletConnect(userPage, setIsSubmitted, setLoaded, router)
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
      ) : (
        userWallet && (
          <>
          <HStack mr={10}>
            <Link href={"admindash"}>
              <Text
              fontSize={"14px"}
              letterSpacing={"2%"}
              textTransform={"uppercase"}
              cursor={"pointer"}
              color={whichPage === "admindash" ? "zing" : "fresh"}
              >
                admindash
              </Text>
            </Link>
          </HStack>
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
                maxW={["80px", "190px"]}
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
        </>
        )
      )}
      </HStack>
    </Flex>
  );
};

export default HeaderNav;
