import { Flex, VStack } from "@chakra-ui/react";

import Profile from "../components/Profile/Profile";

const ProfilePage = () => {
  return (
    <>
      <Flex h="full">
        <VStack w="full" h="full" spacing={8} alignItems="flex-start">
          <Profile />
        </VStack>
      </Flex>
    </>
  );
};

export default ProfilePage;
