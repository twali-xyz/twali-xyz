import { useEffect, useState } from "react";
import { Step, Steps } from "chakra-ui-steps";
import Project from "../Project/Project";

import {
  Heading,
  Button,
  HStack,
  CircularProgress,
  Container,
  VStack,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { UserData } from "../../utils/interfaces";
import { statementOfWerk } from "./statementOfWerk";
import { datesAndPricing } from "./datesAndPricing";
import { submissionOfWerk } from "./submissionOfWerk";
import { setEventArray } from "../../utils/setEventArray";
import { useToken } from "../../context/TokenContext";
import { useBounty } from "../../context/BountyContext";
import { ABI } from "../../utils/twaliContractABI";
import useUser from "../../context/TwaliContext";
import { convertDateToUnix } from "../../utils/marketplaceUtils";
import { useContractWrite, useProvider, useWaitForTransaction } from "wagmi";

const SOWBuilderSteps = (props) => {
  const S3BaseURI =
    "https://twali-contracts-bucket.s3.localhost.localstack.cloud:4566/twali-contracts-bucket/";
  const router = useRouter();
  const { setData, ...userState } = useUser();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [formError, setFormError] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    ...userState,
    // userName: "",
    // userWallet: "",
    // uuid: "",
    setData,
  });
  const { tokenName, tokenAmount, calculatedUSD } = useToken();
  const { setBounty, editBountyURI, ...bountyState } = useBounty();

  const toast = useToast();
  // contract factory to create clone contracts
  //   MetaData: String ,
  // PaymentAmount(In WEI): uint256 ,
  // startDate (unix): unit256 ,
  // endDate(unix): unit256
  const provider = useProvider();
  const {
    data: contractData,
    isError,
    isLoading,
    write,
  } = useContractWrite({
    addressOrName: "0xD31766Bba01E3cAA21D8eb2Db8830C78940Feb26",
    contractInterface: ABI,
    signerOrProvider: provider,
    functionName: "createTwaliClone",
    args: [
      `${S3BaseURI}${userData.userWallet}/${bountyState.contractID}.json`,
      bountyState.contractAmount,
      bountyState.contractStartDate,
      bountyState.contractEndDate,
    ],
  });


  useEffect(() => {
    if (!contractData) return;
    setData({
      ...userState,
      txHash: contractData.hash,
    });
  }, [contractData?.hash]);
  let activeStep = props.activeStep;
  let nextStep = props.nextStep;
  let prevStep = props.prevStep;

  const handleChange = (evt) => {
    setFormError(false);
    try {
      evt.persist();
    } catch (error) {}

    let strippedEventName = evt.target.name.substring(
      0,
      evt.target.name.length - 1
    );

    if (
      strippedEventName === "contractExpertise" ||
      strippedEventName === "contractIndustry"
    ) {
      // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
      setEventArray({ evt, setValues: setBounty, values: bountyState });
    } else {
      const value = evt.target.value;
      setBounty({
        ...bountyState,
        [evt.target.name]: value,
      });
      setIsDisabled(false);
    }
  };

  const handleDates = (dateRange, dueDate) => {
    if (dateRange && dueDate) {
      setBounty({
        ...bountyState,
        ["contractStartDate"]: convertDateToUnix(dateRange[0]),
        ["contractEndDate"]: convertDateToUnix(dateRange[1]),
        ["applicationDeadline"]: convertDateToUnix(dueDate),
        ["contractDuration"]:
          convertDateToUnix(dateRange[1]) - convertDateToUnix(dateRange[0]),
        // while dates are being set also set the contractOwnerUserName
        ["contractOwnerUserName"]: userState.userName,
        ["userWallet"]: userState.userWallet,
        ["tokenName"]: tokenName,
        ["contractAmount"]: Number(tokenAmount),
        ["convertedAmount"]: calculatedUSD,
        ["contractURI"]: `${S3BaseURI}${userData.userWallet}/${bountyState.contractID}.json`,
      });
    }
  };

  const steps = [
    {
      label: "Statement of Werk",
      content: statementOfWerk({ handleChange, formError }),
    },
    {
      label: "Dates & Pricing",
      content: datesAndPricing({
        handleChange,
        dueDate,
        setDueDate,
        dateRange,
        setDateRange,
        formError,
      }),
    },
    {
      label: "Review",
    },
    {
      label: "Submission",
      content: submissionOfWerk({
        handleChange,
      }),
    },
  ];

  const uploadSOWToDynamoDB = async (bounty) => {
    let res = await fetch("/api/marketplace/submitBounty", {
      method: "POST",
      body: JSON.stringify({ bounty }),
    });

    return res;
  };

  const updateSOWToLiveStatus = async (bounty) => {
    let res = await fetch("/api/marketplace/submitBounty", {
      method: "POST",
      body: JSON.stringify({ bounty }),
    });
    return res;
  };

  const handleSubmit = () => {
    if (!formValidation(bountyState)) return;
    if (activeStep === 1) {
      handleDates(dateRange, dueDate);
      nextStep();
    } else if (activeStep === 2) {
      let bounty = {
        ...bountyState,
        tokenName: tokenName,
        contractAmount: Number(tokenAmount),
        convertedAmount: calculatedUSD,
        userWallet: userData.userWallet,
        contractOwnerUserName: userData.userName,
        contractID: bountyState.contractID,
        contractCreatedOn: Date.now(),
        contractStatus: "draft",
        attachedFiles: bountyState.attachedFiles,
      };
      checkSubmissionValidity(bounty);
      nextStep();
    } else if (activeStep === 3) {
      write();
    } else if (formValidation(bountyState)) {
      nextStep();
    }
  };

  // Informs the user if the bounty is submitted or not
  // Error checks for main required fields
  const checkSubmissionValidity = async (bounty) => {
    // if (userData.userName && userData.userName !== '') {
    // setErrors(validate(userData));
    try {
      await uploadSOWToDynamoDB(bounty); // POST CONTRACT TO DYNAMODB

      // Displays a toast alert to inform the user - contract created
      // else if (activeStep <= 0 && !errors.userName && !errors.firstName && !errors.lastName && !errors.email) {
      //   setIsDisabled(false);
      //   nextStep();
      // } else if (activeStep == 1 && !errors.businessType && !errors.businessName) {
      //   setIsDisabled(false);
      //   nextStep();
      // } else if (activeStep > 1 && !errors.currTitle) {
      //   setIsDisabled(false);
      //   updateAccType();
      // } else {
      //   setIsDisabled(true);
      // }
    } catch (err) {
      console.log("Bounty wasn't submitted...");
    }
    // }
  };

  const formValidation = (bountyState) => {
    if (activeStep === 0) {
      if (!bountyState.contractTitle || !bountyState.contractDescription) {
        setFormError(true);
        return 0;
      }
    } else if (activeStep === 1) {
      if (
        !bountyState.contractStartDate ||
        !bountyState.contractEndDate ||
        !bountyState.applicationDeadline ||
        tokenName === "Token" ||
        !tokenAmount ||
        tokenAmount == 0 ||
        !bountyState.contractExpertise ||
        !bountyState.contractIndustry ||
        !bountyState.contractExpertise.filter((item) => item !== "").length ||
        !bountyState.contractIndustry.filter((item) => item !== "").length
      ) {
        setFormError(true);
        return 0;
      }
    }
    return 1;
  };
  return (
    <>
      {activeStep === 2 ? (
        <Project
          activeStep={activeStep}
          prevStep={prevStep}
          nextStep={handleSubmit}
          steps={steps}
          handleChange={handleChange}
          formError={formError}
        />
      ) : (
        <>
          <Container maxW="container.xl" pb="inherit" px={0} m="inherit">
            <Flex h="full">
              <VStack w="full" h="full" spacing={8} alignItems="flex-start">
                <Heading
                  fontSize={"72px"}
                  lineHeight={"88px"}
                  marginTop={"24px"}
                  marginBottom={"-8px"}
                  alignSelf="flex-start"
                  fontFamily={"Scope Light"}
                  fontWeight={"400"}
                >
                  Build your werk.
                </Heading>
                <Steps activeStep={activeStep} width="720px">
                  {steps.map(({ label, content }) => (
                    <Step label={label} key={label}>
                      {content}
                    </Step>
                  ))}
                </Steps>
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
                      go back
                    </Text>
                  </Button>
                  <Button
                    disabled={false}
                    pos={"relative"}
                    alignSelf="center"
                    variant={"primary"}
                    size={"lg"}
                    onClick={handleSubmit}
                  >
                    <Text
                      display={"flex"}
                      width={"100%"}
                      height={"100%"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {activeStep === 1
                        ? "preview"
                        : activeStep === 3
                        ? "submit"
                        : "continue"}
                    </Text>

                    {isSubmitted ? (
                      <CircularProgress
                        size="22px"
                        thickness="4px"
                        isIndeterminate
                        color="#3C2E26"
                      />
                    ) : null}
                  </Button>{" "}
                </HStack>
              </VStack>
            </Flex>
          </Container>
        </>
      )}
    </>
  );
};

export default SOWBuilderSteps;
