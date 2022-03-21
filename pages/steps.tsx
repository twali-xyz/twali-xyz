import HeaderNav from "../components/HeaderNav/HeaderNav";
import { Container, Flex, VStack } from "@chakra-ui/react";
import SignUpSteps from "../components/SignUpSteps/SignUpSteps";
import background from "../public/twali-assets/backgroundscreen.png";

const Steps = () => {
  return (
    <>
      <Container
        width="100%"
        minHeight="100vh"
        maxW={"100%"}
        pos={"relative"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgImg={`url(${background.src})`}
      >
        <HeaderNav whichPage="steps" />
        <Container maxW="container.xl" pb={6} px={0}>
          <Flex h="full">
            <VStack w="full" h="full" spacing={8} alignItems="flex-start">
              <SignUpSteps />
            </VStack>
          </Flex>
        </Container>
      </Container>
    </>
  );
};

export default Steps;
