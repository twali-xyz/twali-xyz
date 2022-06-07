import { 
  Box,
  Container,
  Button,
  HStack,
  Text,
  Flex
 } from '@chakra-ui/react';
 import { Step, Steps } from "chakra-ui-steps";
 import { useRouter } from "next/router";
import ProjectHeader from './ProjectHeader';
import ProjectExpertise from "./ProjectExpertise";
import ProjectDetails from "./ProjectDetails";
import ProjectDescription from "./ProjectDescription";
import { useBounty } from "../../context/BountyContext";

const Project = (props) => {
  const { setBounty, ...bountyState} = useBounty();

  console.log('PROJECT', bountyState)
  const router = useRouter();
    return (
        <>
            <Container
              maxW="100%"
              p={4}
              marginTop={"0 !important"}
              backgroundColor={"inverse"}
              paddingRight={24}
            >
      <HStack className="testing-steps" maxWidth="720px" paddingLeft="52px" paddingTop="36px">
        <Steps activeStep={props.activeStep}>
          {props.steps.map(({ label, content }) => (
            <Step label={label} key={label}>
              {content}
            </Step>
          ))}
        </Steps>
      </HStack>
      <Box
        w="6xl"
        h="1257px"
        marginLeft="54px"
        marginTop="4rem"
        marginBottom="4rem"
        borderWidth="1px"
        borderRadius="lg"
        borderColor="#C7F83C"
        overflow="hidden"
        cursor="pointer"
        alignSelf={"center"}
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
      <Flex flexDirection="row">
      <Flex flexDirection="column" width="100%" maxWidth="550px">
        <ProjectExpertise/>
        <ProjectDetails />
      </Flex>
      <div className= "twali-vertical-line"></div>
      <ProjectDescription />
      </Flex>
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