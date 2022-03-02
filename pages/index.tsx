import {
  Img,
  Flex,
  Link,
  Text,
  Button,
  HStack,
  VStack,
  Container,
} from "@chakra-ui/react";
import handAnimation from "../animations/twali-hand-2.json";
import LottieAnimation from "../components/Landing/LottieAnimation";
import bodyAnimation from "../animations/twali-lottie-desktop.json";
import ScrollingHeader from "../components/Landing/ScrollingHeader";
import HeaderNav from "../components/HeaderNav/HeaderNav";

const IndexPage = () => {
  return (
    <>
      <Container
        p={0}
        margin={"auto"}
        maxWidth={"100%"}
        minWidth={"1440px"}
        backgroundColor="#062B2A"
      >
        <HeaderNav whichPage="index" />
        <ScrollingHeader
          borderTop={"none"}
          borderBottom={"2px solid #F9FFF260"}
        />
        <Flex h="full" margin={"auto"} w={1186}>
          <VStack w="full" h="full" py={12} alignItems="flex-start">
            <HStack margin={0} marginTop={"43px"}>
              <Text
                margin={0}
                padding={0}
                color={"#F9FFF2"}
                fontSize={"64px"}
                fontWeight={"400"}
                paddingRight={"10px"}
                fontFamily={"Scope Light"}
              >
                Hey
              </Text>
              <Text
                margin={0}
                padding={0}
                color={"#F9FFF2"}
                fontSize={"64px"}
                fontWeight={"400"}
                paddingRight={"10px"}
                fontFamily={"GrandSlang Italic"}
              >
                smartypants
              </Text>
              <LottieAnimation
                height={"65px"}
                width={"65.36px"}
                animation={handAnimation}
              />
            </HStack>
            <HStack>
              <Img
                alt="twali-logo"
                src="twali-logo.svg"
                height={"50px"}
                paddingRight={"35px"}
              />
              <Text
                margin={0}
                padding={0}
                color={"#F9FFF2"}
                fontSize={"64px"}
                fontWeight={"400"}
                fontFamily={"Scope Light"}
              >
                is the community for
              </Text>
            </HStack>
            <HStack display={"flex"} alignItems={"center"}>
              <Text
                margin={0}
                padding={0}
                color={"#F9FFF2"}
                fontSize={"64px"}
                fontWeight={"400"}
                fontFamily={"Scope Light"}
              >
                web3
              </Text>
              <Img
                src="twali-knowledge.svg"
                alt="twali knowledge symbol"
                top={"5px"}
                left={"5px"}
                height={"52px"}
                pos={"relative"}
                width={"30.4px"}
                marginX={"25px !important"}
              />
              <Text
                margin={0}
                padding={0}
                color={"#F9FFF2"}
                fontSize={"64px"}
                fontWeight={"400"}
                fontFamily={"Scope Light"}
              >
                knowledge
              </Text>
              <Text
                margin={0}
                padding={0}
                top={"8px"}
                left={"16px"}
                pos={"relative"}
                color={"#F9FFF2"}
                fontSize={"64px"}
                fontWeight={"400"}
                fontFamily={"GrandSlang"}
              >
                freelancers.
              </Text>
            </HStack>
            <VStack>
              <HStack alignSelf={"start"} marginTop={"70px"}>
                <Text
                  display={"flex"}
                  fontSize={"64px"}
                  lineHeight={"80px"}
                  alignItems={"center"}
                  letterSpacing={"0.06em"}
                  fontFamily={"Scope Light"}
                >
                  Are you an{" "}
                  <Img
                    src="twali-expert.svg"
                    alt="twali expert symbol"
                    mx={"16px"}
                    top={"4px"}
                    width={"64px"}
                    height={"48px"}
                    pos={"relative"}
                  />{" "}
                </Text>
                <Text
                  display={"flex"}
                  fontSize={"64px"}
                  lineHeight={"80px"}
                  alignItems={"center"}
                  letterSpacing={"0.06em"}
                  fontFamily={"GrandSlang Italic"}
                >
                  expert
                </Text>
                <Text
                  display={"flex"}
                  fontSize={"64px"}
                  lineHeight={"80px"}
                  alignItems={"center"}
                  letterSpacing={"0.06em"}
                  fontFamily={"Scope Light"}
                  marginLeft={"12px !important"}
                >
                  {" "}
                  in-
                </Text>
              </HStack>
              <LottieAnimation
                top={"-30px"}
                pos={"relative"}
                width={"1250px"}
                height={"596px"}
                animation={bodyAnimation}
              />
            </VStack>
            <HStack
              display={"flex"}
              alignItems={"center"}
              marginTop={"-50px !important"}
            >
              <Text
                fontSize={"64px"}
                lineHeight={"80px"}
                fontFamily={"GrandSlang Italic"}
                letterSpacing={"0.06em"}
              >
                . . . literally
              </Text>
              <Text
                fontSize={"64px"}
                lineHeight={"80px"}
                letterSpacing={"0.06em"}
                fontFamily={"Scope Light"}
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
                letterSpacing={"0.06em"}
                textTransform={"uppercase"}
                backgroundColor={"#C7F83C"}
                marginLeft={"40px !important"}
                fontFamily={"PP Telegraf Bold"}
                boxShadow={"0px 4px 4px 0px #00000040"}
              >
                <Link href="https://airtable.com/shrjjPJnyesvqcSeB" isExternal>
                  apply here
                </Link>
              </Button>
            </HStack>
            <HStack>
              <Text
                color={"#F9FFF2"}
                fontSize={"32px"}
                fontWeight={"400"}
                marginTop={"110px"}
                lineHeight={"40px"}
                marginBottom={"95px"}
                letterSpacing={"0.03em"}
                fontFamily={"PP telegraf Light"}
              >
                Need expertise? Email{" "}
                <Link
                  color={"#58F27A"}
                  fontWeight={"400"}
                  letterSpacing={"0.03em"}
                  href="mailto:degen@twali.xyz"
                >
                  degen@twali.xyz
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
