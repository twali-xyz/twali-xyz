import { Container, Flex, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import ProfileDetails from "../components/Profile/ProfileDetails";
import data from "../data";
// import {getUser} from './api/users/getUser/[userName]';
import useSWR from 'swr'

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())
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

const ProfilePage = () => {
  const router = useRouter()
  const currentUserName = router.query
  console.log(currentUserName);
  const { data, error } = useSWR(`/api/users/${currentUserName.userName}`, fetcher);
  
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <Container maxW="container.xl" p={12}>
      <HeaderNav whichPage="profile" />
      <Flex h="full">
        <VStack w="full" h="full" spacing={8} alignItems="flex-start">
          <ProfileDetails user={data} />
        </VStack>
      </Flex>
    </Container>
  );
}


// ProfilePage.getInitialProps = async(context) => {
//   console.log('hi', context);

//   let user = context.query.userName;
//   console.log(user);
  
//   const response = await fetch(`http://localhost:8000/api/users/${user}`);
//   return { user: await response.json()};
// }

export default ProfilePage;
