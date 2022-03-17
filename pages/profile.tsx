import { Flex, VStack } from "@chakra-ui/react";
import ProfileDetails from "../components/Profile/ProfileDetails";

const ProfilePage = () => {
  return (
    <>
      <Flex h="full">
        <VStack w="full" h="full" spacing={8} alignItems="flex-start">
          <ProfileDetails />
        </VStack>
      </Flex>
    </>
  );
};

export default ProfilePage;
