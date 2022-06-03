import { useState } from "react";
import { Step, Steps } from "chakra-ui-steps";
import Project from "../Project/Project";
import { v4 as uuidv4 } from 'uuid';

import {
  Heading,
  Button,
  HStack,
  CircularProgress,
  Container, 
  VStack,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Bounty, UserData } from "../../utils/interfaces";
import { statementOfWerk } from "./statementOfWerk";
import { datesAndPricing } from "./datesAndPricing";
import { submissionOfWerk } from "./submissionOfWerk";
import { setEventArray } from "../../utils/setEventArray";
import { TokenState } from "../../context/TokenContext";

import useUser from "../../context/TwaliContext";
import { getUserByWallet } from "../../data";

const SOWBuilderSteps = (props) => {
  const router = useRouter();
  const { setData, ...userState } = useUser();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const { token, tokenAmount, calculatedUSD } = TokenState();

  let activeStep = props.activeStep;
  let nextStep = props.nextStep;
  let prevStep = props.prevStep;

  const [userData, setUserData] = useState<UserData>({
    ...userState,
    // userName: "",
    // userWallet: "",
    // uuid: "",
    setData,
  });

  const [bountyData, setBountyData] = useState<Bounty>({
    userWallet: userData.userWallet,
    contractID: uuidv4(),
    contractCreatedOn: 1651968000,
    contractOwnerUserName: userData.userName,
    contractTitle: '',
    contractDescription: '',
    contractStartDate: 0,
    contractEndDate: 0,
    contractDuration: 0,
    tokenName: '',
    contractAmount: 0,
    convertedAmount: 0,
    applicationDeadline: 0,
    contractIndustry: [''],
    contractExpertise: [''],
    contractStatus: "live",
    attachedFiles: [],
  });

  const handleChange = (evt) => {
    evt.persist();
    console.log('SOW builder handleChange - name: ', evt.target.name);
    console.log('SOW builder handleChange - value: ', evt.target.value);
    let strippedEventName = evt.target.name.substring(
      0,
      evt.target.name.length - 1
    );

    if (
      strippedEventName === "contractExpertise" ||
      strippedEventName === "contractIndustry"
    ) {
      // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
      setEventArray({ evt, setValues: setBountyData, values: bountyData });
    } else {
      const value = evt.target.value;
      setBountyData({
        ...bountyData,
        [evt.target.name]: value,
      });
      setIsDisabled(false);
    }
    console.log('SOW bounty data: ', bountyData);
  };

  const handleDates = (dateRange, dueDate) => {
    console.log('SOW builder handleDates - name: ', dateRange);
    console.log('SOW builder handleDates - name: ', dueDate);
    if (dateRange && dueDate) {
      setBountyData({
        ...bountyData,
        ["contractStartDate"]: convertDateToUnix(dateRange[0]),
        ["contractEndDate"]: convertDateToUnix(dateRange[1]),
        ["applicationDeadline"]: convertDateToUnix(dueDate),
        ["contractDuration"]: convertDateToUnix(dateRange[1]) - convertDateToUnix(dateRange[0])
      });
      console.log('SOW bounty data handled date: ', bountyData);
    }
  };

  const convertDateToUnix = (myDate) => {
    return Math.floor(myDate.getTime() / 1000)
  };

  const steps = [
    {
      label: "Statement of Werk",
      content: statementOfWerk({ handleChange, bountyData }),
    },
    {
      label: "Dates & Pricing",
      content: datesAndPricing({ 
        handleChange, 
        bountyData, 
        dueDate, 
        setDueDate, 
        dateRange, 
        setDateRange
       }),
    },
    {
      label: "Review",
    },
    {
      label: "Submission",
      content: submissionOfWerk({
        handleChange, bountyData
      }),
    },
  ];

  const submitSOW = async (bounty) => {
    await fetch("/api/marketplace/submitBounty", {
      method: "POST",
      body: JSON.stringify({ bounty }),
    });
    console.log("BOUNTY CREATED BRUH", bounty);
  };

  const handleSubmit = () => {
    if (activeStep === 1) {
      handleDates(dateRange, dueDate);
      nextStep();
    } else if (activeStep === 3) {
      console.log('submitting!');
      // let bounty = {
      //   userWallet: userData.userWallet,
      //   contractID: uuidv4(),
      //   contractCreatedOn: 1651968000,
      //   contractOwnerUserName: userData.userName,
      //   contractTitle: bountyData.contractTitle,
      //   contractDescription: bountyData.contractDescription,
      //   contractStartDate:  bountyData.contractStartDate,
      //   contractEndDate: bountyData.contractEndDate,
      //   contractDuration: bountyData.contractDuration,
      //   tokenName: token,
      //   contractAmount: tokenAmount,
      //   convertedAmount: calculatedUSD,
      //   applicationDeadline: bountyData.applicationDeadline,
      //   contractIndustry: bountyData.contractIndustry,
      //   contractExpertise: bountyData.contractExpertise,
      //   contractStatus: "live",
      //   attachedFiles: [],
      // }
      console.log('real bounty', bountyData);
      submitSOW(bountyData);
      getUserByWallet(userData.userWallet)
    } else {
      nextStep()
    }
  }

  return (
    <>
      {activeStep === 2 ? (
        <Project bounty={bountyData} activeStep={activeStep} prevStep={prevStep} nextStep={nextStep} steps={steps}/>
      ): (
        <>
        <Container
          maxW="container.xl"
          pb="inherit"
          px={0}
          m="inherit"
        >
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
            activeStep <= 0 ? router.push("/marketplace") : prevStep();
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
          disabled={isDisabled}
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
            { activeStep === 1 ? 'preview': activeStep === 3 ? 'submit': 'continue'}
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
      )
      }
    </>
  );
};

export default SOWBuilderSteps;
