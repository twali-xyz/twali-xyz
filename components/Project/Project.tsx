import HeaderNav from "../HeaderNav/HeaderNav";
import { 
  Box,
  Container,
  Button,
  HStack,
  Text,
  CircularProgress,
  VStack,
  Flex
 } from '@chakra-ui/react';
 import { Step, Steps, useSteps } from "chakra-ui-steps";
 import { useRouter } from "next/router";
import ProjectHeader from './ProjectHeader';
import ProjectExpertise from "./ProjectExpertise";
import ProjectDetails from "./ProjectDetails";
import ProjectDescription from "./ProjectDescription";

const Project = (props) => {
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
      <Steps activeStep={props.activeStep}>
        {props.steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>
      <Box
        w="6xl"
        h="1257px"
        // w="xl"
        marginLeft="54px"
        marginTop="4rem"
        marginBottom="4rem"
        borderWidth="1px"
        borderRadius="lg"
        borderColor="#F2F2F2"
        overflow="hidden"
        cursor="pointer"
        alignSelf={"center"}
        // backgroundColor={"n6"}
        // opacity={"90%"}
        // boxShadow={"8px 16px 24px 0px #062B2A8F"}
      >
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
      <ProjectHeader/>
      <HStack>
      <Flex flexDirection="column" width="100%" maxWidth="550px">
        <ProjectExpertise />
        <ProjectDetails/>
      </Flex>
      <div className= "twali-vertical-line"></div>
      <ProjectDescription/>
      </HStack>
      </Box>
      </Box>
      </Box>
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
            </Container>
        </>
    )
}

export default Project;