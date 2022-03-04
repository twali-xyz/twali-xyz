import { Container, Flex, VStack } from "@chakra-ui/react";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import ProfileDetails from "../components/Profile/ProfileDetails";
import data from "../data";
import {getUser} from './api/users/getUser/[userName]';

// export const getStaticPaths = async () => {
//   const res: any = await data.getUsers();
//   console.log("ALL USERS", res);

//   // Should get a list of all users from the backend here
//   const allUsers = await res.json();

//   if (!res.ok) {
//     // If there is a server error, you might want to
//     // throw an error instead of returning so that the cache is not updated
//     // until the next successful request.
//     throw new Error(`Failed to fetch data, received status ${res.status}`)
//   }

//   const paths = allUsers.map((user: any) => {
//     return {
//       params: { userName: user.userName },
//     };
//   });
//   // Setting fallback: true
//   // Useful for an app that has a large number of static pages, and this prevents the build time from slowing down
//   // More info in Nextjs docs here: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-true
//   return {
//     paths,
//     fallback: 'blocking',
//   };
// };

// This gets called on every request
// export async function getServerSideProps(context) {
//   const userName = context.params.userName;
//   console.log("Context:", context);

//   const user: any = await getUser(userName);
//   // Should get a list of all users from the backend here
//   // const res = await user.json();
//   // console.log("DATA: ", res);

//   // if (!res.ok) {
//   //   // If there is a server error, you might want to
//   //   // throw an error instead of returning so that the cache is not updated
//   //   // until the next successful request.
//   //   throw new Error(`Failed to fetch data, received status ${res.status}`)
//   // }

  
//   // Pass data to the page via props
//   return { props: { user: user } }
// }


// export const getStaticProps = async (context) => {
//   const userName = context.params.userName;
//   console.log("Context:", context);

//   const user: any = await data.getUser(userName);
//   // Should get a list of all users from the backend here
//   const res = await user.json();
//   console.log("DATA: ", res);

//   if (!res.ok) {
//     // If there is a server error, you might want to
//     // throw an error instead of returning so that the cache is not updated
//     // until the next successful request.
//     throw new Error(`Failed to fetch data, received status ${res.status}`)
//   }

//   return {
//     props: { user: res },
//     revalidate: 10,
//   };
// };

const ProfilePage = async ({user}) => {

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


ProfilePage.getInitialProps = async(context) => {
  // console.log('hi', context);
  let user = context.query.userName;
  if(user) {
    return {
      user: await data.getUser(user)
    };
  } else {
    const response = await fetch(`/api/users/getUser?=${user}`);
    return { user: await response.json()};
  }
}

export default ProfilePage;
