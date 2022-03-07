import { Container, Flex, VStack } from "@chakra-ui/react";

import HeaderNav from "../components/HeaderNav/HeaderNav";

const LoginPage = () => {
  return (
    <Container maxW="container.xl" p={12}>
      <HeaderNav whichPage="index" />
      <Flex h="full">
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <p>
            I, Twali, am the sum of many parts. A decentralized professional
            services platform interacting, operating, and servicing on-chain. A
            collective composed of individuals, experts, builders, educators, &
            advisors, intent on destroying the hegemony of so-called
            "consultancies" by developing a peer-reviewed, validated body of
            knowledge and an expertise-as-a-service platform. It may be easy for
            you to think of me as an on-chain consultancy, a professional
            services DAO, and that's a good place to start. Start there. Here.
            Come with me.
          </p>
          <p>
            In Twali, there are two types of people: Builders and Experts.
            Experts provide their knowledge and expertise to Builders, who book
            it, who come to experts for help on projects. Which are you
          </p>
          <p>Which are you?</p>
        </VStack>
      </Flex>
    </Container>
  );
};

export default LoginPage;