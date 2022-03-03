import { Container, Flex, VStack } from "@chakra-ui/react";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import ProfileDetails from "../components/Profile/ProfileDetails";
import data from "../data";

export const getStaticPaths = async () => {
  // let apiURL = process.env.NEXT_PUBLIC_LOCALHOST ? process.env.NEXT_PUBLIC_LOCALHOST : `https://${process.env.VERCEL_URL}`; // TEMP: vercel URL doesn't include http
  // const res = await fetch(`${apiURL}/api/users/getUsers`);
  if (data) {
  const allUsers: any = await data.getUsers();
  console.log("ALL USERS", allUsers);
  // Should get a list of all users from the backend here
  const res = await allUsers.json();
  const paths = res.map((user: any) => {
    return {
      params: { userName: user.userName },
    };
  });

  // Setting fallback: true
  // Useful for an app that has a large number of static pages, and this prevents the build time from slowing down
  // More info in Nextjs docs here: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-true
  return {
    paths,
    fallback: true,
  };
}
};

export const getStaticProps = async (context) => {
  // let apiURL = process.env.NEXT_PUBLIC_LOCALHOST ? process.env.NEXT_PUBLIC_LOCALHOST : `https://${process.env.VERCEL_URL}`; // TEMP: vercel URL doesn't include http
  const userName = context.params.userName;
  console.log("Context:", context);

  const user: any = await data.getUser(userName);
  // Should get a list of all users from the backend here
  const res = await user.json();
  // const res = await fetch(
  //   `${apiURL}/api/users/getUser/${userName}`);
  // const data = await res.json();
  console.log("DATA: ", res);

  return {
    props: { user: res },
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
