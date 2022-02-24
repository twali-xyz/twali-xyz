import {
  Box,
  Container,
  Flex,
  VStack,
  HStack,
  Text,
  Img,
  Button,
  Link,
} from "@chakra-ui/react";
import handAnimation from "../animations/twali-hand-2.json";
import LottieAnimation from "../components/Landing/LottieAnimation";
import bodyAnimation from "../animations/twali-lottie-desktop.json";
import ScrollingHeader from "../components/Landing/ScrollingHeader";
const IndexPage = () => {
  return (
    <>
      <Container minWidth={"full"} p={0} margin={0} backgroundColor="#062B2A">
        <ScrollingHeader
          borderTop={"none"}
          borderBottom={"2px solid #F9FFF260"}
        />
        <Flex h="full" margin={"auto"} w={1186}>
          <VStack w="full" h="full" p={10} alignItems="flex-start">
            <HStack margin={0} marginTop={"43px"}>
              <Text
                margin={0}
                padding={0}
                color={"#F9FFF2"}
                fontSize={"64px"}
                fontWeight={"400"}
                paddingRight={"10px"}
              >
                Hey
              </Text>
              <Text
                margin={0}
                padding={0}
                color={"#F9FFF2"}
                fontSize={"64px"}
                fontWeight={"400"}
                fontStyle={"italic"}
                paddingRight={"10px"}
              >
                smartypants
              </Text>
              <LottieAnimation
                height={"65px"}
                width={"65.36px"}
                animation={handAnimation}
              />
            </HStack>
            <HStack margin={"0 !important"}>
              <Img
                src="twali-logo.svg"
                alt="twali-logo"
                height={"47.4px"}
                paddingRight={"25px"}
              />
              <Text
                margin={0}
                padding={0}
                color={"#F9FFF2"}
                fontSize={"64px"}
                fontWeight={"400"}
                experimental_spaceY={"1000px"}
              >
                is the community for
              </Text>
            </HStack>
            <HStack margin={"0 !important"}>
              <Text
                margin={0}
                padding={0}
                color={"#F9FFF2"}
                fontSize={"64px"}
                fontWeight={"400"}
              >
                web3
              </Text>
              <Img src="twali-knowledge.svg" width={"30.4px"} height={"48px"} />
              <Text
                margin={0}
                padding={0}
                color={"#F9FFF2"}
                fontSize={"64px"}
                fontWeight={"400"}
              >
                knowledge freelancers
              </Text>
            </HStack>
            <VStack>
              <HStack alignSelf={"start"} marginTop={"70px"}>
                <Text
                  display={"flex"}
                  fontSize={"64px"}
                  lineHeight={"80px"}
                  alignItems={"center"}
                >
                  Are you an{" "}
                  <Img
                    mx={"18px"}
                    width={"64px"}
                    height={"48px"}
                    alt="twali expert"
                    src="twali-expert.svg"
                  />{" "}
                  expert in-
                </Text>
              </HStack>
              <LottieAnimation
                height={"496px"}
                margin={"0 !important"}
                animation={bodyAnimation}
              />
            </VStack>
            <HStack
              display={"flex"}
              alignItems={"center"}
              margin={"0 !important"}
            >
              <Text
                fontSize={"64px"}
                lineHeight={"80px"}
                fontStyle={"italic"}
                letterSpacing={"0.06em"}
              >
                ...literally
              </Text>
              <Text
                fontSize={"64px"}
                lineHeight={"80px"}
                letterSpacing={"0.06em"}
              >
                anything?
              </Text>
              <Button
                width={"207px"}
                height={"52px"}
                color={"#062B2A"}
                fontSize={"24px"}
                borderRadius={"52px"}
                padding={"8px 24px 4px"}
                textTransform={"uppercase"}
                backgroundColor={"#C7F83C"}
                marginLeft={"40px !important"}
                boxShadow={"0px 4px 4px 0px #00000040"}
              >
                apply here
              </Button>
            </HStack>
            <HStack>
              <Text
                color={"#F9FFF2"}
                fontSize={"32px"}
                fontWeight={"400"}
                marginTop={"95px"}
                lineHeight={"40px"}
                marginBottom={"80px"}
                letterSpacing={"0.03em"}
              >
                Need expertise? Email{" "}
                <Link
                  color={"#58F27A"}
                  fontWeight={"400"}
                  letterSpacing={"0.03em"}
                  href="mailto:degen@twail.xyz"
                >
                  degen@twail.xyz
                </Link>
              </Text>
            </HStack>
          </VStack>
        </Flex>
        <ScrollingHeader
          borderBottom={"none"}
          borderTop={"2px solid #F9FFF2"}
        />
      </Container>
    </>
  );
};

export default IndexPage;
