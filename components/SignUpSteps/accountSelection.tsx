import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Text,
  VStack,
  Button,
  Flex,
  Link,
  FormControl,
  FormLabel,
  Input,
  Box,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useUser from "../../context/TwaliContext";

export function AccountSelection({
  btnActive,
  setBtnActive,
  selectUserAccType,
  isAccTypeSelected,
  setIsAccTypeSelection,
  setAccSelectionComplete,
  onConnectWallet,
}) {
  const { setData, ...userState } = useUser();
  const [viewPassword, setViewPassword] = useState(false);
  const [signIn, setSignIn] = useState(false);
  return (
    <Flex
      m={0}
      maxW={"100%"}
      width={"100%"}
      height={"100%"}
      flexDir={["column", "column", "row"]}
      alignItems={"center"}
      minWidth={"100vw"}
      minHeight={"100vh"}
    >
      <VStack
        m={0}
        p={0}
        width={["100%", "100%", "50%"]}
        minH={["90vh", "75vh", "100vh"]}
        height={"100%"}
        color={"inverse"}
        justifyContent={"center "}
        backgroundSize={"cover"}
        backgroundPosition={"100% "}
        cursor="pointer"
        onClick={() => {
          if (signIn) return;
          setBtnActive(1);
          selectUserAccType("Expert");
          setData({ ...userState, accType: "expert" });
        }}
        backgroundImage={
          btnActive == 1 || btnActive == 0
            ? "/twali-assets/step1_background.png"
            : null
        }
        backgroundColor={"inverse"}
      >
        {signIn === false ? (
          <>
            <Text
              pos={"relative"}
              top={"100px"}
              fontSize={"72px"}
              padding={"2px"}
              px={0}
              fontWeight={"400"}
              lineHeight={"88px"}
              letterSpacing={"0.04em"}
              fontFamily={"Scope Light"}
              color={btnActive == 1 || btnActive == 0 ? "inverse" : "zing"}
              backgroundColor={
                btnActive == 1 || btnActive == 0 ? "zing" : "inverse"
              }
            >
              expert
            </Text>
            <Text
              pos={"relative"}
              top={"108px"}
              color={"fresh"}
              fontFamily={"PP Telegraf Light"}
              fontSize={"16px"}
              lineHeight={"24px"}
            >
              I want to provide my knowledge and expertise{" "}
            </Text>
            <Button
              disabled={!isAccTypeSelected}
              alignSelf="center"
              pos={"relative"}
              top={"200px"}
              variant={"primary"}
              size={"lg"}
              padding={"16px, 24px, 13px, 24px !important"}
              onClick={(evt) => {
                onConnectWallet();
                setIsAccTypeSelection(false);
                setAccSelectionComplete(true);
              }}
              visibility={btnActive == 1 ? "unset" : "hidden"}
            >
              Connect Wallet
            </Button>
          </>
        ) : (
          <Flex flexDir={"column"}>
            <IconButton
              onClick={() => setSignIn(false)}
              pos={"absolute"}
              top={"35px"}
              left={"35px"}
              color={"zing"}
              width={"35px"}
              height={"35px"}
              variant={"unstyled"}
              aria-label="Back button"
              icon={<ArrowBackIcon />}
            />
            <FormControl width={"280px"} mb={4}>
              <FormLabel mb={2} color={"fresh"}>
                email
              </FormLabel>
              <Input placeholder="email@example.com" color={"fresh"} />
            </FormControl>
            <FormControl width={"280px"} mb={2}>
              <FormLabel mb={2} color={"fresh"}>
                password
              </FormLabel>
              <Input
                color={"fresh"}
                type={!viewPassword ? "password" : "text"}
              />
            </FormControl>
            <HStack justifyContent={"space-between"} width={"100%"}>
              <Link
                visibility={btnActive == 2 ? "unset" : "hidden"}
                fontSize={"14px"}
                color={"aqua"}
              >
                or sign-up
              </Link>
              <IconButton
                alignSelf={"flex-end"}
                height={"25px"}
                width={"25px"}
                color={"zing"}
                variant={"unstyled"}
                onClick={() => setViewPassword(!viewPassword)}
                aria-label="view-password"
                icon={<ViewIcon />}
              />
            </HStack>
            <Button mt={8} variant={"primary"}>
              continue
            </Button>
          </Flex>
        )}
      </VStack>

      <VStack
        m={0}
        p={0}
        width={["100%", "100%", "50%"]}
        minH={["90vh", "75vh", "100vh"]}
        height={"100%"}
        justifyContent={"center "}
        backgroundSize={"cover"}
        backgroundPosition={"100% "}
        cursor="pointer"
        onClick={() => {
          setBtnActive(2);
          selectUserAccType("Client");
          setData({ ...userState, accType: "client" });
        }}
        backgroundImage={
          btnActive == 2 ? "/twali-assets/step1_background.png" : null
        }
        backgroundColor={"inverse"}
      >
        <Text
          pos={"relative"}
          top={"100px"}
          fontFamily={"Scope Light"}
          padding={"2px"}
          px={0}
          fontWeight={"400"}
          fontSize={"72px"}
          lineHeight={"88px"}
          letterSpacing={"0.04em"}
          color={btnActive == 2 ? "inverse" : "zing"}
          backgroundColor={btnActive == 2 ? "zing" : "inverse"}
        >
          client
        </Text>
        <Text
          pos={"relative"}
          top={"108px"}
          color={"fresh"}
          fontFamily={"PP Telegraf Light"}
          fontSize={"16px"}
          lineHeight={"24px"}
        >
          I want to build a project
        </Text>
        <VStack pos={"relative"} top={"200px"}>
          <Button
            disabled={!isAccTypeSelected}
            alignSelf="center"
            variant={"primary"}
            size={"lg"}
            onClick={() => setSignIn(true)}
            padding={"16px, 24px, 13px, 24px !important"}
            visibility={btnActive == 2 ? "unset" : "hidden"}
          >
            Sign-In
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
}
