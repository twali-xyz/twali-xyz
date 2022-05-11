import HeaderNav from "../HeaderNav/HeaderNav";
import { Container, Text, Button, HStack, Heading, Box, Img } from '@chakra-ui/react';
import { Chip } from '../reusable/Chip';
import { Avatar } from '@chakra-ui/react'


const ProjectHeader = (props) => {
    return (
        <>
        <Container
              maxW="100%"
              p={4}
              marginLeft={20}
              paddingBottom="2rem"
              marginTop={"0 !important"}
              backgroundColor={"inverse"}
        >
        <HStack marginTop={9}>
        <Chip variant="created">Listed 24d ago</Chip>
        <Chip variant="status">Status</Chip>
        <Chip variant="type">Solo Project</Chip>
        <Chip variant="bounty">30,000 MATIC</Chip>
        </HStack>
        <Heading
            color="zing"
                    fontSize={"72px"}
                    lineHeight={"88px"}
                    marginTop={"24px"}
                    marginBottom={"-8px"}
                    alignSelf="flex-start"
                    fontFamily={"Scope Light"}
                    fontWeight={"400"}
                  >
                    Project Title
                  </Heading>

          <HStack marginTop={9} spacing={4}>
          <Box width={8} height={8} background="gradient2" borderRadius="4px">
          {/* <Img
              src="step1_background.png"
            /> */}
          </Box>
          <Text fontSize="sm">Created by Nick Cooke</Text>
        </HStack>
        </Container>
        <hr className="twali-horizontal-line"/>
        </>
    )
}

export default ProjectHeader;