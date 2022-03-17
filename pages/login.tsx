import {
  Button,
  CircularProgress,
  Container,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react";
import background from "../public/twali-assets/backgroundscreen.png";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import { handleConnect } from "../components/Profile/helpers/handleConnect";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LoginPage = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accType, setAccType] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [profileData, setProfileData] = useState();
  const router = useRouter();

  useEffect(() => {
    setLoaded(!props.loaded);
  }, []);

  const handleWalletConnect = handleConnect(
    setIsSubmitted,
    setName,
    setEmail,
    setAccType,
    router,
    setLoaded,
    setProfileData
  );
  return (
    <>
      <Container
        width="100%"
        height="1024px"
        minH={"100vh"}
        maxW={"100%"}
        pos={"relative"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgImg={`url(${background.src})`}
      >
        <HeaderNav whichPage="index" />
        <VStack
          width="100%"
          minH={"100vh"}
          maxW={"100%"}
          pos={"absolute"}
          right={"1.9%"}
          bottom={"4.5%"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text
            alignSelf={"center"}
            fontFamily={"Scope Light"}
            fontSize={"16px"}
            lineHeight={"24px"}
            letterSpacing={"wide"}
          >
            Welcome to
          </Text>
          <Img
            src="twali-assets/twali_rainbow.png"
            width={"300px"}
            height={"64.38px"}
            marginTop={"49px !important"}
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
            <Button
              marginTop={"89px !important"}
              width={"207px"}
              height={"52px"}
              color={"#062B2A"}
              backgroundColor={"#C7F83C"}
              onClick={handleWalletConnect}
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
          )}
        </VStack>
      </Container>
    </>
  );
};

export default LoginPage;
