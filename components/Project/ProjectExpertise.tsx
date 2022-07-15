import {
  Container,
  Text,
  Button,
  HStack,
  Img,
  Flex,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Chip } from "../reusable/Chip";
import ProjectExpertiseModal from "./ProjectExpertiseModal/ProjectExpertiseModal";
import { useState } from "react";
import { UserData } from "../../utils/interfaces";
import useUser from "../../context/TwaliContext";
import { useBounty } from "../../context/BountyContext";

const ProjectExpertise = (props) => {
  const {
    isOpen: isProjectExpertiseModalOpen,
    onOpen: onProjectExpertiseModalOpen,
    onClose: onProjectExpertiseModalClose,
  } = useDisclosure();
  const { ...userState } = useUser();
  const [userData, setUserData] = useState<UserData>({
    ...userState,
    // userName: "",
    // userWallet: "",
    // uuid: "",
  });
  const { setBounty, ...bountyState } = useBounty();

  function handleRemove(e, type) {
    if (!e.target.value) return;
    // without this an error is thrown when the svg within the chip button is clicked
    if (type === "expertise") {
      bountyState.contractExpertise.splice(
        bountyState.contractExpertise.indexOf(e.target.value),
        1
      );
    } else if (type === "industry") {
      bountyState.contractIndustry.splice(
        bountyState.contractIndustry.indexOf(e.target.value),
        1
      );
    }
    setBounty(bountyState);

    console.log(bountyState.contractExpertise, bountyState.contractIndustry);
  }
  return (
    <>
      <Container
        maxW="500px"
        p={4}
        marginLeft="2rem"
        marginTop={"0 !important"}
        backgroundColor={"inverse"}
      >
        <HStack alignSelf="flex-end" flexDirection="row-reverse">
          <Button
            onClick={onProjectExpertiseModalOpen}
            alignSelf="flex-end"
            variant="ghost"
            aria-label="Update project title"
            margin={"0px"}
            mx={"0px"}
            pos={"relative"}
            width={"fit-content"}
            borderRadius={"md"}
          >
            <Img
              width={"20px"}
              height={"20px"}
              src={"twali-assets/editicon.png"}
            />
          </Button>
          <ProjectExpertiseModal
            isOpen={isProjectExpertiseModalOpen}
            onClose={onProjectExpertiseModalClose}
          />
        </HStack>
        <VStack paddingRight={12} paddingTop={4}>
          <Text
            alignSelf="flex-start"
            fontSize="sm"
            marginTop={6}
            marginBottom={6}
          >
            Expertise
          </Text>
          <Flex
            flexDir={"row"}
            width={"100%"}
            justifyContent={"flex-start"}
            m={0}
            flexFlow={"wrap"}
          >
            {bountyState?.contractExpertise?.map((expertise, idx) => {
              if (expertise !== "") {
                return (
                  <Chip variant="gradient" marginBottom={4} mr={4}>
                    {expertise}
                  </Chip>
                );
              }
            })}
          </Flex>
          <Text
            alignSelf="flex-start"
            fontSize="sm"
            marginTop={12}
            marginBottom={6}
          >
            Industry
          </Text>
          <Flex
            flexDir={"row"}
            width={"100%"}
            justifyContent={"flex-start"}
            m={0}
            flexFlow={"wrap"}
          >
            {bountyState?.contractIndustry?.map((industry, idx) => {
              if (industry !== "") {
                return (
                  <Chip variant="gradient" marginBottom={4} mr={4}>
                    {industry}
                  </Chip>
                );
              }
            })}
          </Flex>
        </VStack>
      </Container>
    </>
  );
};

export default ProjectExpertise;
