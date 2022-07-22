import { Referral } from "./../reusable/Referral";
import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Flex,
  HStack,
  Text,
  Img,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { handleWalletConnect } from "../../utils/walletUtils";
import Link from "next/link";
import useUser from "../../context/TwaliContext";

const HeaderNav = (props) => {
  const whichPage = props.whichPage;
  const isConnectWalletBtn = props.isConnectWalletBtn;
  const setUserData = props.setUserData;
  const userPage = props.userPage;
  const { userName } = useUser();
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
        {whichPage !== "whitelist" &&
          whichPage !== "steps" &&
          whichPage !== "index" && (
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
          )}
        {isConnectWalletBtn ? (
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
              <HStack
                alignItems="center"
                justify={"space-between"}
                justifySelf={"flex-end"}
                maxW="400px"
                width={"fit-content"}
                height={"32px"}
              >
                <Text
                  border={"1px solid"}
                  borderColor={"fresh"}
                  alignItems={"center"}
                  justifyItems={"center"}
                  borderRadius={32}
                  color={"fresh"}
                  fontSize={"14px"}
                  fontWeight={"700"}
                  letterSpacing={"0.06em"}
                  padding="4px 16px"
                >
                  {`${userWallet.substring(0, 5)}...${userWallet.substring(
                    userWallet.length - 4
                  )}`.toLowerCase()}
                </Text>

                <Menu>
                  <MenuButton
                    marginLeft={"16px !important"}
                    height={"36px"}
                    width={"36px"}
                    as={Avatar}
                    aria-label="Options"
                    icon={<Avatar size={"sm"} src={""} />}
                    variant="outline"
                  />
                  <MenuList bg={"n6"} boxShadow={"8px 16px 24px 0px #062B2A8F"}>
                    <Link href={`/${userName}`}>
                      <MenuItem
                        color={"fresh"}
                        fontFamily={"PP Telegraf Light"}
                        textTransform={"capitalize"}
                      >
                        profile
                      </MenuItem>
                    </Link>
                    <Link href={"/"}>
                      <MenuItem
                        color={"fresh"}
                        fontFamily={"PP Telegraf Light"}
                        textTransform={"capitalize"}
                      >
                        dashboard
                      </MenuItem>
                    </Link>
                    <Link href={"/"}>
                      <MenuItem
                        color={"fresh"}
                        fontFamily={"PP Telegraf Light"}
                        textTransform={"capitalize"}
                      >
                        account settings
                      </MenuItem>
                    </Link>
                    <Referral userWallet={userWallet}>
                      <MenuItem
                        color={"fresh"}
                        fontFamily={"PP Telegraf Light"}
                        textTransform={"capitalize"}
                      >
                        {"refer a friend"}
                      </MenuItem>
                    </Referral>
                    <Link href={"/"}>
                      <MenuItem
                        color={"fresh"}
                        fontFamily={"PP Telegraf Light"}
                        textTransform={"capitalize"}
                      >
                        logout
                      </MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              </HStack>
            </>
          )
        )}
      </HStack>
    </Flex>
  );
};

export default HeaderNav;
