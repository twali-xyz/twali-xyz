import { Flex, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import Project from "../../components/Project/Project";
import TokenProvider from "../../context/TokenContext";
import BountyProvider from "../../context/BountyContext";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const ProjectPage = () => {
  const router = useRouter();
  const currentProject = router.query;
  console.log(currentProject)

  let projectData;
  if (currentProject?.projectID) {
    const { data, error } = useSWR(
      `/api/marketplace/contracts?contract_id=${currentProject.projectID}`,
      fetcher
    );
    console.log('fetch resylt', data);
    console.log(error);
    projectData = data;
  }

  return (
    <>
      <TokenProvider>
      <BountyProvider>
      <Flex h="full">
        <VStack w="full" h="full" spacing={8} alignItems="flex-start">
            <Project projectData={projectData}/>
        </VStack>
      </Flex>
      </BountyProvider>
      </TokenProvider>
    </>
  );
};

export default ProjectPage;
