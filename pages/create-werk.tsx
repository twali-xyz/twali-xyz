
import { Container, Flex, VStack } from "@chakra-ui/react";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import SOWBuilderSteps from "../components/SOWBuilderSteps/SOWBuilderSteps";
import background from "../public/twali-assets/backgroundscreen.png";

const WerkSteps = () => {
  return (
      <Container
        width="100%"
        minHeight="100vh"
        maxW={"100%"}
        pos={"relative"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgImg={`url(${background.src})`}
        px={0}
      >
        <HeaderNav whichPage="werk"/>
        <Container
          maxW="container.xl"
          pb="inherit"
          px={0}
          m="inherit"
        >
        <Flex h="full">
            <VStack w="full" h="full" spacing={8} alignItems="flex-start">
                <SOWBuilderSteps/>
            </VStack>
        </Flex>
        </Container>
      </Container>
  );
};

export default WerkSteps;
