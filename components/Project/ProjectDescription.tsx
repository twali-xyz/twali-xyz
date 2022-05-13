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
              p={4}
              paddingLeft="2.4rem"
              marginLeft={20}
              marginTop={"0 !important"}
              backgroundColor={"inverse"}
        >
            <VStack spacing={6} marginTop={0} alignItems="unset">
              <HStack alignSelf="flex-end">
              <Button
            onClick={onProjectDescModalOpen}
            alignSelf="flex-end"
            variant="ghost"
            aria-label="Update project title"
            margin={"0px"}
            mx={"0px"}
            pos={"relative"}
            top={"-45px !important"}
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
          <ProjectDescriptionModal isOpen={isProjectDescModalOpen} onClose={onProjectDescModalClose}/>
              </HStack>
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
                  <Text whiteSpace="pre-wrap" fontWeight="light" fontSize="sm">Give him a friend, we forget the trees get lonely too. Clouds are free. They just float around the sky all day and have fun. In your world you have total and absolute power. Only God can make a tree - but you can paint one. Let's give him a friend too. Everybody needs a friend. I really recommend you use odorless thinner or your spouse is gonna run you right out into the yard and you'll be working by yourself.</Text> 
                  <Text whiteSpace="pre-wrap" fontWeight="light" fontSize="sm">Almost everything is going to happen for you automatically - you don't have to spend any time working or worrying. Little trees and bushes grow however makes them happy. Isn't that fantastic? Remember how free clouds are. They just lay around in the sky all day long. I guess that would be considered a UFO. A big cotton ball in the sky. Let's put some happy trees and bushes back in here.</Text>
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