import { Container, Flex, VStack } from "@chakra-ui/react";

import HeaderNav from "../components/HeaderNav/HeaderNav";
import Profile from "../components/Profile/Profile";
import TwaliProvider from "../components/TwaliProvider/TwaliProvider";

const ProfilePage = () => {
  return (
    <TwaliProvider>
      <Container maxW="container.xl" p={12}>
        <HeaderNav whichPage="profile" />
        <Flex h="full">
          <VStack w="full" h="full" spacing={8} alignItems="flex-start">
            <Profile />
          </VStack>
        </Flex>
      </Container>
    </TwaliProvider>
  );
};

export default ProfilePage;
