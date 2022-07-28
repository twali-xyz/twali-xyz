import { Flex, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useUser from "../../context/TwaliContext";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Project from "../../components/Project/Project";
import TokenProvider from "../../context/TokenContext";
import BountyProvider from "../../context/BountyContext";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { UserData } from "../../utils/interfaces";
import UserPermissionsProvider from "../../components/UserPermissionsProvider/UserPermissionsProvider";
import UserPermissionsRestricted from "../../components/UserPermissionsProvider/UserPermissionsRestricted";
import {
  fetchPagePermission,
  pageDisconnectedFallback,
} from "../../utils/walletUtils";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const ProjectPage = () => {
  const router = useRouter();
  const currentProject = router.query;
  const { setData, ...userState } = useUser();
  const [userData, setUserData] = useState<UserData>();
  console.log(currentProject)
  const { data, error } = useSWR(
    `/api/marketplace/contracts?contract_id=${currentProject.projectID}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      // revalidateOnReconnect: false, // personally, I didn't need this one
  }

  );

  let projectData;
    if (currentProject && currentProject.projectID) {
      console.log('fetch resylt', data);
      console.log(error);
      projectData = data;
    }

  useEffect(() => {
    userData && setData(JSON.parse(JSON.stringify(userData)));
  }, [userData]);

  return (
    <>
      <TokenProvider>
      <BountyProvider>
      <UserPermissionsProvider
        fetchPermission={fetchPagePermission(
          userState.userWallet ? userState.userWallet : null
        )}
      >
      <Flex
            flexDir={"row"}
            pos={"absolute"}
            top={0}
            width="100%"
            zIndex={-1}
          >
        <VStack
              height={"100vh"}
              width={"100%"}>
          <HeaderNav
          userPage={userState}
          whichPage="profile"
          userWallet={userState.userWallet}
          isConnectWalletBtn={!userState.userWallet}
          setUserData={setUserData}
        />
        <UserPermissionsRestricted
          to="edit"
          key={`${currentProject.projectID}--project-page-usr-permission`}
          fallback={pageDisconnectedFallback()}
        >
        <Project projectData={projectData} userData={userData} isProjectPage={true}/>
        </UserPermissionsRestricted>
        </VStack>
      </Flex>
      </UserPermissionsProvider>
      </BountyProvider>
      </TokenProvider>
    </>
  );
};

export default ProjectPage;
