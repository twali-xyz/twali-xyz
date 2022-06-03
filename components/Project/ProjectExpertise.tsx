import { Container, Text, Button, HStack, Img, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { Chip } from '../reusable/Chip';
import ProjectExpertiseModal from "./ProjectExpertiseModal/ProjectExpertiseModal";

const ProjectExpertise = (props) => {
    const {
        isOpen: isProjectExpertiseModalOpen,
        onOpen: onProjectExpertiseModalOpen,
        onClose: onProjectExpertiseModalClose,
      } = useDisclosure();

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
          <ProjectExpertiseModal isOpen={isProjectExpertiseModalOpen} onClose={onProjectExpertiseModalClose}/>
          </HStack>
            <VStack paddingRight={12} paddingTop={4}>
        <Text alignSelf="flex-start" fontSize="sm" marginTop={12} marginBottom={6}>Industry</Text>
        <Flex
          flexDir={"row"}
          width={"100%"}
          justifyContent={"flex-start"}
          m={0}
          flexFlow={"wrap"}
        >
          {props?.bounty?.contractIndustry?.map((industry, idx) => {
            if (idx == 0) {
              return (
                <Chip variant="button"
                marginBottom={4}
            >{industry}</Chip>
              )} else {
              return (
                <Chip variant="button"
                marginBottom={4} marginLeft={4}
            >{industry}</Chip>
              )}
          })}
        </Flex>
        <Text alignSelf="flex-start" fontSize="sm" marginTop={6} marginBottom={6}>Expertise</Text>
        <Flex
          flexDir={"row"}
          width={"100%"}
          justifyContent={"flex-start"}
          m={0}
          flexFlow={"wrap"}
        >
        {props?.bounty?.contractExpertise?.map((expertise, idx) => {
            if (idx == 0) {
              return (
                <Chip variant="button"
                marginBottom={4}
            >{expertise}</Chip>
              )} else {
              return (
                <Chip variant="button"
                marginBottom={4} marginLeft={4}
            >{expertise}</Chip>
              )}
          })}
        </Flex>
        </VStack>
        </Container>
        </>
    )
}

export default ProjectExpertise;