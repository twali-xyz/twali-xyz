import { Container, Flex, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import ProfileDetails from "../components/Profile/ProfileDetails";
import useSWR from "swr";
import LoginPage from "./login";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const ProfilePage = () => {
  const router = useRouter();
  const currentUserName = router.query;
  let userData;
  if (currentUserName.userName !== "undefined") {
    const { data, error } = useSWR(
      `/api/users/${currentUserName.userName}`,
      fetcher
    );
    userData = data;
  }

  // if (error) return <div>failed to load</div>
  if (!userData) return <LoginPage loaded={!userData} />;
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
