import HeaderNav from "../HeaderNav/HeaderNav";
import { Container, Text, Button, HStack, Heading, Box, Img, Flex } from '@chakra-ui/react';
import { Chip } from '../reusable/Chip';
import { Avatar } from '@chakra-ui/react'
import { functionalExpertiseList } from "../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../utils/industryExpertiseConstants";


const ProjectExpertise = (props) => {
    return (
        <>
        <Container
              maxW="100%"
              p={4}
              marginLeft={20}
              marginTop={"0 !important"}
              backgroundColor={"inverse"}
        >
        
        <Text fontSize="sm" marginTop={12} marginBottom={6}>Industry</Text>
        <Flex
          flexDir={"row"}
          width={"100%"}
          justifyContent={"flex-start"}
          m={0}
          flexFlow={"wrap"}
        >
            <Chip variant="button"
                marginBottom={4}
            >Industry</Chip>
            <Chip variant="button"
                marginBottom={4} marginLeft={4}
            >Industry</Chip>
            <Chip variant="button"
                marginBottom={4} marginLeft={4}
            >Industry</Chip>
        </Flex>
        <Text fontSize="sm" marginTop={6} marginBottom={6}>Expertise</Text>
        <Flex
          flexDir={"row"}
          width={"100%"}
          justifyContent={"flex-start"}
          m={0}
          flexFlow={"wrap"}
        >
            <Chip variant="button"
                marginBottom={4}
            >Expertise</Chip>
            <Chip variant="button"
                marginBottom={4} marginLeft={4}
            >Expertise</Chip>
            <Chip variant="button"
                marginBottom={4} marginLeft={4}
            >Expertise</Chip>
        </Flex>
        </Container>
        </>
    )
}

export default ProjectExpertise;