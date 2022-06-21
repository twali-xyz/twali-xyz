import { Container, Text, Button, HStack, Img, Flex, Heading, VStack, useDisclosure, List, ListItem } from '@chakra-ui/react';
import ProjectDescriptionModal from './ProjectDescriptionModal/ProjectDescriptionModal';
import { useBounty } from "../../context/BountyContext";
import { truncate } from "../../utils/marketplaceUtils";

const ProjectDescription = (props) => {
  const {
    isOpen: isProjectDescModalOpen,
    onOpen: onProjectDescModalOpen,
    onClose: onProjectDescModalClose,
  } = useDisclosure();
  const { setBounty, ...bountyState} = useBounty();

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
          <ProjectDescriptionModal isOpen={isProjectDescModalOpen} onClose={onProjectDescModalClose} />
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
                  <Text whiteSpace="pre-wrap" fontWeight="light" fontSize="sm">{bountyState?.contractDescription}</Text> 
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
                    { bountyState?.attachedFiles ? (
                    <List alignSelf="flex-start">
                  {bountyState?.attachedFiles?.map((file, idx) => {
                      return (
                      <HStack>
                      <ListItem 
                      fontSize='16px' 
                      color="aqua"
                      fontFamily="PP Telegraf"
                      fontStyle="normal"
                      fontWeight="300"
                      lineHeight="24px"
                      letterSpacing="0.02em"
                      >
                        {truncate(file)}
                        </ListItem>
                        </HStack>
                      )
                  })}
                  </List>
                ): null
                }
                  </VStack>
                  </VStack>
        </Container>
        </>
    )
}

export default ProjectDescription;