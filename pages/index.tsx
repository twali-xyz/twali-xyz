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
import { LottieAnimation } from "../components/reusable/LottieAnimation";
import bodyAnimation from "../animations/twali-lottie-desktop.json";
import ScrollingHeader from "../components/Landing/ScrollingHeader";

const IndexPage = () => {
  return (
    <>
      <Container
        p={0}
        margin={"auto"}
        maxWidth={"100%"}
        width={"100%"}
        backgroundColor="cave"
      >
        <ScrollingHeader
          borderTop={"none"}
          borderBottom={"2px solid #F9FFF260"}
        />
        <Flex
          h="full"
          paddingX={["4%", "5%", "7%"]}
          w={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <VStack
            w="full"
            h="full"
            py={[4, 6, 8, 10, 12]}
            alignItems="flex-start"
          >
            <HStack
              margin={0}
              alignItems={"baseline"}
              marginTop={["26px", "34px", "43px"]}
              pos={"relative"}
              top={["5px", "0px"]}
            >
              <Text
                margin={0}
                padding={0}
                color={"fresh"}
                fontSize={["18px", "28px", "32px", "48px", "64px"]}
                fontWeight={"400"}
                paddingRight={["1px", "2px", "4px", "6px", "10px"]}
                fontFamily={"Scope Light"}
              >
                Hey
              </Text>
              <Text
                margin={0}
                padding={0}
                color={"fresh"}
                fontSize={["18px", "28px", "32px", "48px", "64px"]}
                fontWeight={"400"}
                paddingRight={"10px"}
                fontFamily={"GrandSlang"}
                fontStyle={"italic"}
              >
                smartypants
              </Text>
              <LottieAnimation
                alignSelf={"center"}
                height={["36px", "48px", "65px"]}
                width={["36px", "48px", "65.36px"]}
                options={{ animationData: handAnimation }}
              />
            </HStack>
            <HStack alignItems={"baseline"}>
              <Img
                alt="twali-logo"
                src="twali-logo.svg"
                height={["18px", "30px", "40px", "50px"]}
                paddingRight={["10px", "16.5px", "25px", "35px"]}
              />
              <Text
                margin={0}
                padding={0}
                color={"fresh"}
                fontSize={["18px", "28px", "32px", "48px", "64px"]}
                fontWeight={"400"}
                fontFamily={"Scope Light"}
                whiteSpace={"nowrap"}
              >
                is the community for
              </Text>
            </HStack>
            <HStack display={"flex"} alignItems={"baseline"}>
              <Text
                margin={0}
                padding={0}
                color={"fresh"}
                fontSize={["18px", "28px", "32px", "48px", "64px"]}
                fontWeight={"400"}
                fontFamily={"Scope Light"}
              >
                web3
              </Text>
              <Img
                src="twali-knowledge.svg"
                alt="twali knowledge symbol"
                pos={"relative"}
                height={["42px", "52px"]}
                top={["-5px", "-3px", "4px"]}
                left={["4px", "5px"]}
                width={"36.4px"}
                marginX={[
                  "5px !important",
                  "12.5px !important",
                  "20px !important",
                  "25px !important",
                ]}
                alignSelf={"center"}
              />
              <Text
                margin={0}
                padding={0}
                color={"fresh"}
                fontSize={["18px", "28px", "32px", "48px", "64px"]}
                fontWeight={"400"}
                fontFamily={"Scope Light"}
              >
                knowledge
              </Text>
              <Text
                margin={0}
                padding={0}
                left={["0px", "8px", "14px", "16px"]}
                pos={"relative"}
                color={"fresh"}
                fontSize={["18px", "28px", "32px", "48px", "64px"]}
                fontWeight={"400"}
                fontFamily={"GrandSlang"}
              >
                freelancers.
              </Text>
            </HStack>
            <VStack width={"100%"}>
              <HStack
                width={"100%"}
                alignSelf={"start"}
                alignItems={"baseline"}
                marginTop={["25px", "50px", "75px"]}
              >
                <Text
                  display={"flex"}
                  fontSize={["18px", "28px", "32px", "48px", "64px"]}
                  lineHeight={["22px", "32px", "48px", "64px", "80px"]}
                  alignItems={"center"}
                  letterSpacing={"0.06em"}
                  fontFamily={"Scope Light"}
                >
                  Are you an{" "}
                  <Img
                    src="twali-expert.svg"
                    alt="twali expert symbol"
                    mx={["8px", "12px", "16px", "20px"]}
                    top={["2px", "3px", "4px"]}
                    width={["48px", "64px"]}
                    height={["36px", "48px"]}
                    pos={"relative"}
                  />{" "}
                </Text>
                <Text
                  display={"flex"}
                  fontSize={["18px", "28px", "32px", "48px", "64px"]}
                  lineHeight={["22px", "32px", "48px", "64px", "80px"]}
                  marginLeft={"0 !important"}
                  alignItems={"center"}
                  letterSpacing={"0.06em"}
                  fontFamily={"GrandSlang"}
                  fontStyle={"italic"}
                >
                  expert
                </Text>
                <Text
                  display={"flex"}
                  fontSize={["18px", "28px", "32px", "48px", "64px"]}
                  lineHeight={["22px", "32px", "48px", "64px", "80px"]}
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
                className={"body-animation"}
                top={["-5px", "-2.5px", "0px", "2.5px", "5px"]}
                pos={"relative"}
                width={"100%"}
                height={"auto"}
                minWidth={"100% !important"}
                options={{ animationData: bodyAnimation }}
              />
            </VStack>
            <Flex
              alignItems={["flex-start", "flex-start", "center"]}
              flexDir={["column", "column", "row"]}
              justifyContent={"space-between"}
            >
              <HStack
                display={"flex"}
                alignItems={"baseline"}
                marginTop={"15px !important"}
              >
                <Text
                  fontSize={["18px", "28px", "32px", "48px", "64px"]}
                  lineHeight={["22px", "32px", "48px", "64px", "80px"]}
                  fontFamily={"GrandSlang"}
                  fontStyle={"italic"}
                  letterSpacing={"0.06em"}
                  marginRight={["0px", "5px", "10px", "15px"]}
                >
                  . . . literally
                </Text>
                <Text
                  fontSize={["18px", "28px", "32px", "48px", "64px"]}
                  lineHeight={["22px", "32px", "48px", "64px", "80px"]}
                  letterSpacing={"0.06em"}
                  fontFamily={"Scope Light"}
                >
                  anything?
                </Text>
              </HStack>
              <Button
                width={["167px", "207px"]}
                height={["48px", "52px"]}
                color={"cave"}
                variant={"primary"}
                fontSize={["18px", "24px"]}
                borderRadius={"52px"}
                padding={"8px 24px 4px"}
                marginLeft={[
                  "5px !important",
                  "10px !important",
                  "20px !important",
                  "40px !important",
                ]}
                marginTop={["15px", "25px", "0"]}
                boxShadow={"0px 4px 4px 0px #00000040"}
              >
                <Link
                  href="https://airtable.com/shrjjPJnyesvqcSeB"
                  isExternal
                  _hover={{ textDecor: "none" }}
                  _focus={{ textDecor: "none" }}
                >
                  apply here
                </Link>
              </Button>
            </Flex>
            <HStack>
              <Text
                color={"fresh"}
                fontSize={["16px", "20px", "18px", "28px", "32px"]}
                fontWeight={"400"}
                marginTop={["25px", "45px", "95px"]}
                lineHeight={"40px"}
                marginBottom={["25px", "45px", "95px"]}
                letterSpacing={"0.03em"}
                fontFamily={"PP telegraf Medium"}
              >
                Need expertise? Email{" "}
                <Link
                  color={"slime"}
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
