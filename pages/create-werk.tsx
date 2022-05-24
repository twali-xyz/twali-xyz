
import { Container, Flex, VStack } from "@chakra-ui/react";
import SOWBuilderSteps from "../components/SOWBuilderSteps/SOWBuilderSteps";
import { useRouter } from "next/router";
import useSWR from "swr";
import LoginPage from "./login";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const WerkSteps = () => {
  // const router = useRouter();
  // const currentUserName = router.query;
  // let userData;
  // if (currentUserName.userName !== "undefined") {
  //   const { data, error } = useSWR(
  //     `/api/users/${currentUserName.userName}`,
  //     fetcher
  //   );
  //   userData = data;
  //   }
  //   // if (error) return <div>failed to load</div>
  // if (!userData) return <LoginPage loaded={!userData} />;
  return (
      // <Container
      //   width="100%"
      //   minHeight="100vh"
      //   maxW={"100%"}
      //   pos={"relative"}
      //   bgSize={"cover"}
      //   bgPosition={"center"}
      //   bgImg={`url(${background.src})`}
      //   px={0}
      // >
      //   <HeaderNav whichPage="werk"/>
      //   <Container
      //     maxW="container.xl"
      //     pb="inherit"
      //     px={0}
      //     m="inherit"
      //   >
      //   <Flex h="full">
      //       <VStack w="full" h="full" spacing={8} alignItems="flex-start">
                <SOWBuilderSteps />
      //       </VStack>
      //   </Flex>
      //   </Container>
      // </Container>
  );
};

export default WerkSteps;
