import { Container, Text, HStack, Flex } from '@chakra-ui/react';

const ProjectDetails = (props) => {
    return (
        <>
        <Container
              maxW="100%"
              p={4}
              marginLeft={20}
              marginTop={"0 !important"}
              backgroundColor={"inverse"}
        >
        <Flex
          flexDir={"column"}
          width={"100%"}
          justifyContent={"flex-start"}
          m={0}
          marginTop={12}
        >
            <HStack>
            <Text marginRight={4} fontSize="sm" color="subtle">Duration</Text>
            <Text fontSize="sm" color="primary">29 Days</Text>
            </HStack>
            <HStack marginTop={6}>
            <Text marginRight={4} fontSize="sm" color="subtle">Date Listed</Text>
            <Text fontSize="sm" color="primary">Aug 15, 2022</Text>
            </HStack>
            <HStack marginTop={6}>
            <Text marginRight={4} fontSize="sm" color="subtle">Start by</Text>
            <Text fontSize="sm" color="primary">Nov 1, 2022</Text>
            </HStack>
            <HStack marginTop={6}>
            <Text marginRight={4} fontSize="sm" color="subtle">Finish by</Text>
            <Text fontSize="sm" color="primary">Dec 1, 2022</Text>
            </HStack>
            <HStack marginTop={6}>
            <Text marginRight={4} fontSize="sm" color="subtle">Budget</Text>
            <Text fontSize="sm" color="primary">$20,000</Text>
            </HStack>
        </Flex>
        </Container>
        </>
    )
}

export default ProjectDetails;