import HeaderNav from "../HeaderNav/HeaderNav";
import { Container, Text, Button, HStack, Heading, Box, Img, useDisclosure } from '@chakra-ui/react';
import { Chip } from '../reusable/Chip';
import { Avatar } from '@chakra-ui/react'
// import UserPermissionsRestricted from "../UserPermissionsProvider/UserPermissionsRestricted";
import ProjectHeaderModal from "./ProjectHeaderModal/ProjectHeaderModal";
import { TokenState } from "../../context/TokenContext";

const ProjectHeader = (props) => {
  const { token, tokenAmount } = TokenState();
  const {
    isOpen: isProjectHeaderModalOpen,
    onOpen: onProjectHeaderModalOpen,
    onClose: onProjectHeaderModalClose,
  } = useDisclosure();

    return (
        <>
        <Container
              maxW="100%"
              p={4}
              marginLeft="2rem"
              paddingBottom="2rem"
              marginTop={"0 !important"}
              backgroundColor={"inverse"}
        >
        <HStack marginTop={9}>
        <Chip variant="created">Listed{" "}
            {Math.ceil(
              (new Date(Date.now()).getTime() -
                new Date(Number(props.bounty.contractCreatedOn) * 1000).getTime()) /
                (1000 * 3600 * 24)
            )}
            d ago</Chip>
        <Chip variant="status">{props.bounty.contractStatus}</Chip>
        <Chip variant="type">{new Date(props.bounty.contractStartDate * 1000).toLocaleDateString("us-en")}</Chip>
        <Chip variant="bounty">{tokenAmount} {token}</Chip>
        <Button
            onClick={onProjectHeaderModalOpen}
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
          <ProjectHeaderModal isOpen={isProjectHeaderModalOpen} onClose={onProjectHeaderModalClose}/>
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
                    {props.bounty.contractTitle}
                  </Heading>

          <HStack marginTop={9} spacing={4}>
          <Box width={8} height={8} background="gradient2" borderRadius="4px">
          {/* <Img
              src="step1_background.png"
            /> */}
          </Box>
          <Text fontSize="sm">Created by {props.bounty.contractOwnerUserName}</Text>
          {/* <UserPermissionsRestricted to="edit" key={`--edit-project-header-permission`}> */}
                    {/* </UserPermissionsRestricted> */}
        </HStack>
        </Container>
        <hr className="twali-horizontal-line"/>
        </>
    )
}

export default ProjectHeader;