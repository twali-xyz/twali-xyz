import { Container, Flex, VStack } from "@chakra-ui/react";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import ProfileDetails from "../components/Profile/ProfileDetails";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/users/getUsers");

  // Should get a list of all users from the backend here
  const data = await res.json();
  const paths = data.map((user: any) => {
    return {
      params: { userName: user.userName },
    }
  });

  // Setting fallback: true
  // Useful for an app that has a large number of static pages, and this prevents the build time from slowing down
  // More info in Nextjs docs here: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-true
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const userName = context.params.userName;
  console.log("Context:", context);

  const res = await fetch(`http://localhost:3000/api/users/getUser/${userName}`);
  const data = await res.json();
  console.log("DATA: ", data);

  return {
    props: { user: data },
  };
};

const ProfilePage = ({ user }) => {
  return (
    <Container maxW="container.xl" p={12}>
      <HeaderNav whichPage="profile" />
      <Flex h="full">
        <VStack w="full" h="full" spacing={8} alignItems="flex-start">
          <ProfileDetails user={user} />
        </VStack>
      </Flex>
    </Container>
  );
};

export default ProfilePage;
