import { Box, Container, Flex, VStack, HStack, Text } from "@chakra-ui/react";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import LottieAnimation from "../components/Landing/LottieAnimation";
import bodyAnimation from "../animations/twali-lottie-desktop.json";
import handAnimation from "../animations/twali-hand-2.json";
const IndexPage = () => {
  return (
    <Container maxW="container.xl" p={12} backgroundColor="#062B2A">
      <HeaderNav whichPage="index" />
      <Flex h="full">
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <HStack>
            <Text
              fontSize={"64px"}
              lineHeight={"104px"}
              letterSpacing={"-1%"}
              fontWeight={"400"}
            >
              Hey
            </Text>
            <Text
              fontSize={"64px"}
              lineHeight={"104px"}
              letterSpacing={"-1%"}
              fontWeight={"400"}
            >
              smartypants
            </Text>
            <LottieAnimation animation={handAnimation} />
          </HStack>
          <Box>
            <LottieAnimation animation={bodyAnimation} />
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
};

export default IndexPage;
