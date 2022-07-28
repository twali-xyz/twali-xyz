import {
  Button,
  Img,
  Container,
  Text,
  HStack,
  Flex,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import ProjectDetailsModal from "./ProjectDetailsModal/ProjectDetailsModal";
import { useToken } from "../../context/TokenContext";
import { useBounty } from "../../context/BountyContext";

const ProjectDetails = (props) => {
  const { tokenName, tokenAmount } = useToken();
  const { setBounty, ...bountyState } = useBounty();

  const formatDateToMonthDayYear = (originalDate) => {
    let dateOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date(originalDate * 1000).toLocaleDateString(
      "us-en",
      dateOptions
    );
  };

  const {
    isOpen: isProjectDetailsModalOpen,
    onOpen: onProjectDetailsModalOpen,
    onClose: onProjectDetailsModalClose,
  } = useDisclosure();

  console.log('Project Expertise: ', bountyState.contractAmount);


  return (
    <>
      <Container
        maxW="540px"
        p={4}
        marginLeft="3rem"
        //   marginLeft={20}
        marginTop={"0 !important"}
        backgroundColor={"inverse"}
      >
        <VStack paddingRight={12}>
          <Flex
            flexDir={"column"}
            width={"100%"}
            justifyContent={"flex-start"}
            m={0}
            marginTop={12}
            backgroundColor="#041A19"
            maxWidth="486px"
            paddingLeft="2rem"
            paddingRight="2rem"
            paddingBottom="2rem"
            paddingTop="1rem"
            marginLeft="-34px"
            borderRadius="16px"
          >
            <HStack alignSelf="flex-end" flexDirection="row-reverse">
              <Button
                onClick={onProjectDetailsModalOpen}
                alignSelf="flex-end"
                variant="ghost"
                aria-label="Update project title"
                margin={"0px"}
                mx={"0px"}
                pos={"relative"}
                left={"16px"}
                width={"fit-content"}
                borderRadius={"md"}
              >
                <Img
                  width={"20px"}
                  height={"20px"}
                  src={"twali-assets/editicon.png"}
                />
              </Button>
              <ProjectDetailsModal
                isOpen={isProjectDetailsModalOpen}
                onClose={onProjectDetailsModalClose}
              />
            </HStack>
            <HStack paddingTop="20px" paddingBottom="20px">
              <Text marginRight={4} fontSize="sm" color="subtle">
                Duration
              </Text>
              <Text fontSize="sm" color="primary">
                {Math.ceil(
                  new Date(
                    Number(bountyState?.contractDuration) * 1000
                  ).getTime() /
                    (1000 * 3600 * 24)
                )}{" "}
                days
              </Text>
            </HStack>
            <HStack marginTop={6} paddingBottom="20px">
              <Text marginRight={4} fontSize="sm" color="subtle">
                Date Listed
              </Text>
              <Text fontSize="sm" color="primary">
                {formatDateToMonthDayYear(bountyState?.contractCreatedOn)}
              </Text>
            </HStack>
            <HStack marginTop={6} paddingBottom="20px">
              <Text marginRight={4} fontSize="sm" color="subtle">
                Start by
              </Text>
              <Text fontSize="sm" color="primary">
                {formatDateToMonthDayYear(bountyState?.contractStartDate)}
              </Text>
            </HStack>
            <HStack marginTop={6} paddingBottom="20px">
              <Text marginRight={4} fontSize="sm" color="subtle">
                Finish by
              </Text>
              <Text fontSize="sm" color="primary">
                {formatDateToMonthDayYear(bountyState?.contractEndDate)}
              </Text>
            </HStack>
            <HStack marginTop={6} paddingBottom="20px">
              <Text marginRight={4} fontSize="sm" color="subtle">
                Budget
              </Text>
              <Text fontSize="sm" color="primary">
                {tokenAmount} {tokenName}
              </Text>
            </HStack>
          </Flex>
        </VStack>
      </Container>
    </>
  );
};

export default ProjectDetails;
