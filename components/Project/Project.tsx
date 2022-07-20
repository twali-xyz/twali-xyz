import { Box, Container, Button, HStack, Text, Flex, CircularProgress } from "@chakra-ui/react";
import { useEffect, useCallback, useState } from "react";
import { Step, Steps } from "chakra-ui-steps";
import { useRouter } from "next/router";
import ProjectHeader from "./ProjectHeader";
import ProjectExpertise from "./ProjectExpertise";
import ProjectDetails from "./ProjectDetails";
import ProjectDescription from "./ProjectDescription";
import { useBounty } from "../../context/BountyContext";
import { Bounty, Contract } from "../../utils/interfaces";
import { useToken } from "../../context/TokenContext";

const Project = ({
  activeStep,
  steps,
  prevStep,
  nextStep,
  projectData
}) => {
  const { setBounty, ...bountyState } = useBounty();
  const { setTokenAmount, setTokenName } = useToken();
  const [isBusy, setBusy] = useState(true);

  const router = useRouter();
  useEffect(() => {
    console.log('helloooo')
    console.log(projectData);
    if (projectData && projectData[0]) {
      console.log(projectData[0]);
      console.log('currrrr');
      setBounty({
        ...bountyState,
        PK: projectData[0].PK,
        SK: projectData[0].SK,
        applicationDeadline: projectData[0].application_deadline,
        contractOwnerUserName: projectData[0].contractOwner_userName,
        contractCreatedOn: projectData[0].contract_created_on,
        contractID: projectData[0].contract_id,
        contractDescription: projectData[0].contract_description,
        contractDuration: projectData[0].contract_duration,
        contractStartDate: projectData[0].contract_start_date,
        contractEndDate: projectData[0].contract_end_date,
        contractTitle: projectData[0].contract_title,
        tokenName: projectData[0].token_name,
        contractAmount: projectData[0].contract_amount,
        convertedAmount: projectData[0].converted_amount,
        contractIndustry: projectData[0].contract_industry,
        contractExpertise: projectData[0].contract_expertise,
        contractStatus: projectData[0].contract_status,
        attachedFiles: projectData[0].attached_files,
      });
      setTokenAmount(projectData[0].contract_amount);
      setTokenName(projectData[0].token_name);
    }
  }, [projectData]);

  if (!projectData)
  return (
    <Flex height={"100%"} alignItems={"center"}>
      <CircularProgress
        justifySelf={"center"}
        thickness="4px"
        isIndeterminate
        color="#3C2E26"
      />
    </Flex>
  );

  return (
    <>
      <Container
        maxW="100%"
        p={4}
        marginTop={"0 !important"}
        backgroundColor={"inverse"}
        paddingRight={24}
      >
      {activeStep? (
        <HStack
          className="testing-steps"
          maxWidth="720px"
          paddingLeft="52px"
          paddingTop="36px"
        >
          <Steps activeStep={activeStep}>
            {steps?.map(({ label, content }) => (
              <Step label={label} key={label}>
                {content}
              </Step>
            ))}
          </Steps>
        </HStack>
        ): null}
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
              <ProjectHeader />
              <Flex flexDirection="row">
                <Flex flexDirection="column" width="100%" maxWidth="550px">
                  <ProjectExpertise />
                  <ProjectDetails />
                </Flex>
                <div className="twali-vertical-line"></div>
                <ProjectDescription />
              </Flex>
            </Box>
          </Box>
        </Box>
        {activeStep? (
        <HStack width={"100%"} justifyContent={"flex-end"}>
          <Button
            alignSelf="left"
            mr={"24px"}
            onClick={() => {
              activeStep <= 0
                ? router.push("/marketplace")
                : prevStep();
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
              nextStep();
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
        ): null}
      </Container>
    </>
  );
};

export default Project;
