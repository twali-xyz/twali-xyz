import { Flex, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ProfileDetails from "../components/Profile/ProfileDetails";
import useSWR from "swr";
import LoadingPage from "./loading";
import useFetchUser from "../hooks/useFetchUser";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const ProfilePage = () => {
  const router = useRouter();
  const currentUserName = router.query;
  let userData;
  if (currentUserName.userName !== "undefined") {
    const { user, isLoading, isError } = useFetchUser(currentUserName.userName);
    userData = user;
  }

  // if (error) return <div>failed to load</div>
  if (!userData) return <LoadingPage loaded={!userData} />;
  return (
    <>
      <title>twali.xyz - {userData.userName}</title>
      <Flex h="full">
        <VStack w="full" h="full" spacing={8} alignItems="flex-start">
          <ProfileDetails user={userData} />
        </VStack>
      </Flex>
    </>
  );
};

export default ProfilePage;
