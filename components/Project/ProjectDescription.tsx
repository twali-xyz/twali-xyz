import { Container, Text, Button, HStack, Img, Flex, Heading, VStack, useDisclosure } from '@chakra-ui/react';
import ProjectDescriptionModal from './ProjectDescriptionModal/ProjectDescriptionModal';

const ProjectDescription = (props) => {
  const {
    isOpen: isProjectDescModalOpen,
    onOpen: onProjectDescModalOpen,
    onClose: onProjectDescModalClose,
  } = useDisclosure();

    return (
        <>
        <Container
              maxW="800px"
              // p={4}
              paddingRight="1.8rem"
              paddingTop={4}
              paddingBottom={4}
              paddingLeft="1.4rem"
              marginLeft={10}
              marginTop={"0 !important"}
              backgroundColor={"inverse"}
        >
            <HStack alignSelf="flex-end" flexDirection="row-reverse">
              <Button
            onClick={onProjectDescModalOpen}
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
          <ProjectDescriptionModal isOpen={isProjectDescModalOpen} onClose={onProjectDescModalClose} bounty={props.bounty}/>
              </HStack>
            <VStack spacing={6} marginTop={0} alignItems="unset">
                <Heading
            color="zing"
                    fontSize={"36px"}
                    lineHeight={"88px"}
                    alignSelf="flex-start"
                    fontFamily={"GrandSlang"}
                    fontWeight={"400"}
                  >
                    Description
                  </Heading>
                  <Text whiteSpace="pre-wrap" fontWeight="light" fontSize="sm">{props.bounty.contractDescription}</Text> 
                  <Heading
            color="zing"
                    fontSize={"36px"}
                    lineHeight={"88px"}
                    // marginTop={"24px"}
                    // marginBottom={"-8px"}
                    alignSelf="flex-start"
                    fontFamily={"GrandSlang"}
                    fontWeight={"400"}
                  >
                    Werk Files
                  </Heading>
                  <VStack alignSelf="flex-start">
                  <Text fontWeight="light" fontSize="sm" color="aqua" textDecoration="underline" cursor="pointer">file_final_version_02-2022.pdf</Text>
                  <Text fontWeight="light" fontSize="sm" color="aqua" textDecoration="underline" cursor="pointer">file_final_version_02-2022.pdf</Text>
                  <Text fontWeight="light" fontSize="sm" color="aqua" textDecoration="underline" cursor="pointer">file_final_version_02-2022.pdf</Text>
                  </VStack>
                  </VStack>
        </Container>
        </>
    )
}

export default ProjectDescription;