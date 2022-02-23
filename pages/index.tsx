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
import LottieAnimation from "../components/Landing/LottieAnimation";
import bodyAnimation from "../animations/twali-lottie-desktop.json";
import handAnimation from "../animations/twali-hand-2.json";
import ScrollingHeader from "../components/Landing/ScrollingHeader";
const IndexPage = () => {
  return (
    <>
      <Container minWidth={"full"} p={0} margin={0} backgroundColor="#062B2A">
        <ScrollingHeader
          borderBottom={"2px solid #F9FFF2"}
          borderTop={"none"}
        />
        <Flex h="full" margin={"auto"} w={1186}>
          <VStack w="full" h="full" p={10} alignItems="flex-start">
            <HStack margin={0} marginTop={"43px"}>
              <Text
                fontSize={"64px"}
                lineHeight={"104px"}
                fontWeight={"400"}
                color={"#F9FFF2"}
                margin={0}
                padding={0}
              >
                Hey
              </Text>
              <Text
                fontSize={"64px"}
                lineHeight={"104px"}
                fontWeight={"400"}
                color={"#F9FFF2"}
                margin={0}
                padding={0}
                fontStyle={"italic"}
              >
                smartypants
              </Text>
              <LottieAnimation
                width={"65.36px"}
                height={"56px"}
                animation={handAnimation}
              />
            </HStack>
            <HStack margin={0}>
              <Img src="twali-logo.svg" alt="twali-logo" height={"47.4px"} />
              <Text
                fontSize={"64px"}
                lineHeight={"104px"}
                fontWeight={"400"}
                color={"#F9FFF2"}
                margin={0}
                padding={0}
              >
                is the community for
              </Text>
            </HStack>
            <HStack margin={0}>
              <Text
                fontSize={"64px"}
                lineHeight={"104px"}
                fontWeight={"400"}
                color={"#F9FFF2"}
                margin={0}
                padding={0}
              >
                web3
              </Text>
              <Img src="twali-knowledge.svg" width={"30.4px"} height={"48px"} />
              <Text
                fontSize={"64px"}
                lineHeight={"104px"}
                fontWeight={"400"}
                color={"#F9FFF2"}
                margin={0}
                padding={0}
              >
                knowledge freelancers
              </Text>
            </HStack>
            <VStack>
              <HStack alignSelf={"start"} marginTop={"80px"}>
                <Text
                  display={"flex"}
                  alignItems={"center"}
                  fontSize={"64px"}
                  lineHeight={"80px"}
                >
                  Are you an{" "}
                  <Img
                    src="twali-expert.svg"
                    alt="twali expert"
                    width={"64px"}
                    height={"48px"}
                    mx={"18px"}
                  />{" "}
                  expert in-
                </Text>
              </HStack>
              <LottieAnimation height={"496px"} animation={bodyAnimation} />
            </VStack>
            <HStack display={"flex"} alignItems={"center"}>
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
                height={"52px"}
                width={"207px"}
                color={"#062B2A"}
                padding={"8px 24px 4px"}
                fontSize={"24px"}
                borderRadius={"52px"}
                boxShadow={"0px 4px 4px 0px #00000040"}
                backgroundColor={"#C7F83C"}
                textTransform={"uppercase"}
              >
                apply here
              </Button>
            </HStack>
            <HStack>
              <Text
                marginTop={"120px"}
                color={"#F9FFF2"}
                fontSize={"32px"}
                lineHeight={"40px"}
                fontWeight={"400"}
                letterSpacing={"0.03em"}
              >
                Need expertise? Email{" "}
                <Link
                  href="mailto:degen@twail.xyz"
                  color={"#58F27A"}
                  fontWeight={"400"}
                  letterSpacing={"0.03em"}
                >
                  degen@twail.xyz
                </Link>
              </Text>
            </HStack>
          </VStack>
        </Flex>
        <ScrollingHeader
          borderTop={"2px solid #F9FFF2"}
          borderBottom={"none"}
        />
      </Container>
    </>
  );
};

export default IndexPage;
