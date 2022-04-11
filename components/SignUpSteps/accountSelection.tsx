import { Text, VStack, Button, Flex, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export function AccountSelection({
  btnActive,
  setBtnActive,
  selectUserAccType,
  isAccTypeSelected,
  setIsAccTypeSelection,
  setAccSelectionComplete,
}) {
  const router = useRouter();
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
        color={"black"}
        justifyContent={"center "}
        backgroundSize={"cover"}
        backgroundPosition={"100% "}
        cursor="pointer"
        onClick={() => {
          setBtnActive(1);
          selectUserAccType("Expert");
        }}
        backgroundImage={
          btnActive == 1 || btnActive == 0
            ? "/twali-assets/step1_background.png"
            : null
        }
        backgroundColor={"#0A1313"}
      >
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
          color={btnActive == 1 || btnActive == 0 ? "#0A1313" : "#C7F83C"}
          backgroundColor={
            btnActive == 1 || btnActive == 0 ? "#C7F83C" : "#0A1313"
          }
        >
          expert
        </Text>
        <Text
          pos={"relative"}
          top={"108px"}
          color={"#F9FFF2"}
          fontFamily={"PP Telegraf Light"}
          fontSize={"16px"}
          lineHeight={"24px"}
        >
          I want to provide my knowledge and expertise{" "}
        </Text>
        <Button
          disabled={!isAccTypeSelected}
          alignSelf="center"
          backgroundColor={"#C7F83C"}
          w="220px"
          h={"40px"}
          color={"#0A1313"}
          pos={"relative"}
          top={"200px"}
          borderRadius={"32px"}
          padding={"16px, 24px, 13px, 24px"}
          onClick={(evt) => {
            setIsAccTypeSelection(false);
            router.push("/steps");
            setAccSelectionComplete(true);
          }}
          visibility={btnActive == 1 ? "unset" : "hidden"}
        >
          Continue
        </Button>
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
        }}
        backgroundImage={
          btnActive == 2 ? "/twali-assets/step1_background.png" : null
        }
        backgroundColor={"#0A1313"}
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
          color={btnActive == 2 ? "#0A1313" : "#C7F83C"}
          backgroundColor={btnActive == 2 ? "#C7F83C" : "#0A1313"}
        >
          client
        </Text>
        <Text
          pos={"relative"}
          top={"108px"}
          color={"#F9FFF2"}
          fontFamily={"PP Telegraf Light"}
          fontSize={"16px"}
          lineHeight={"24px"}
        >
          I want to build a project
        </Text>

        <Link
          _hover={{ textDecoration: "none" }}
          textDecoration={"none"}
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:degen@twali.xyz?subject=Twali client application"
          onClick={() => {
            router.push("/");
          }}
        >
          <Button
            disabled={!isAccTypeSelected}
            alignSelf="center"
            backgroundColor={"#C7F83C"}
            color={"#0A1313"}
            w="220px"
            h={"40px"}
            pos={"relative"}
            top={"200px"}
            borderRadius={"32px"}
            padding={"16px, 24px, 13px, 24px"}
            visibility={btnActive == 2 ? "unset" : "hidden"}
          >
            Continue
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
}
