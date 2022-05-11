import { Container, Text, HStack, Flex, Heading, VStack } from '@chakra-ui/react';

const ProjectDescription = (props) => {
    return (
        <>
        <Container
              maxW="100%"
              p={4}
              paddingLeft="2.4rem"
              marginLeft={20}
              marginTop={"0 !important"}
              backgroundColor={"inverse"}
        >
            <VStack spacing={6} marginTop={0}>
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
                  <Text fontWeight="light" fontSize="sm">Give him a friend, we forget the trees get lonely too. Clouds are free. They just float around the sky all day and have fun. In your world you have total and absolute power. Only God can make a tree - but you can paint one. Let's give him a friend too. Everybody needs a friend. I really recommend you use odorless thinner or your spouse is gonna run you right out into the yard and you'll be working by yourself.</Text> 
                  <Text fontWeight="light" fontSize="sm">Almost everything is going to happen for you automatically - you don't have to spend any time working or worrying. Little trees and bushes grow however makes them happy. Isn't that fantastic? Remember how free clouds are. They just lay around in the sky all day long. I guess that would be considered a UFO. A big cotton ball in the sky. Let's put some happy trees and bushes back in here.</Text>
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