import HeaderNav from "../HeaderNav/HeaderNav";
import { 
  Container,
  Button,
  HStack,
  Text,
  CircularProgress
 } from '@chakra-ui/react';
 import { useRouter } from "next/router";
import ProjectHeader from './ProjectHeader';

const ProjectDetails = (props) => {
  const router = useRouter();
    return (
        <>
            <HeaderNav
              whichPage="profile"
            //   isConnectWalletBtn={isConnectWalletBtn}
            //   userPage={userState}
            //   userWallet={loggedInUserAddress}
            />
            <Container
              maxW="100%"
              p={4}
              marginTop={"0 !important"}
              backgroundColor={"inverse"}
              paddingRight={24}
            >
        <HStack width={"100%"} justifyContent={"flex-end"}>
        <Button
          alignSelf="left"
          mr={"24px"}
          onClick={() => {
            props.activeStep <= 0 ? router.push("/marketplace") : props.prevStep();
          }}
          pos={"relative"}
          alignItems={"center"}
          justifyContent={"center"}
          variant={"secondary"}
          size={"lg"}
        >
          <Text
            display={"flex"}
            width={"100%"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            back to edit
          </Text>
        </Button>
        <Button
          // disabled={isDisabled}
          pos={"relative"}
          alignSelf="center"
          variant={"primary"}
          size={"lg"}
          onClick={() => {
            props.nextStep();
          }}
        >
          <Text
            display={"flex"}
            width={"100%"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            continue
          </Text>

          {/* {isSubmitted ? (
            <CircularProgress
              size="22px"
              thickness="4px"
              isIndeterminate
              color="#3C2E26"
            />
          ) : null} */}
        </Button>{" "}
      </HStack>
      <ProjectHeader/>
            </Container>
        </>
    )
}

export default ProjectDetails;