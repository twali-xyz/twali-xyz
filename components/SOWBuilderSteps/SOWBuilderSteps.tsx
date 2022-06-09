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
import { UserData } from "../../utils/interfaces";
import { statementOfWerk } from "./statementOfWerk";
import { datesAndPricing } from "./datesAndPricing";
import { submissionOfWerk } from "./submissionOfWerk";
import { setEventArray } from "../../utils/setEventArray";
import { useToken } from "../../context/TokenContext";
import { useBounty } from "../../context/BountyContext";

import useUser from "../../context/TwaliContext";
import { convertDateToUnix } from "../../utils/marketplaceUtils";

const SOWBuilderSteps = (props) => {
  const router = useRouter();
  const { setData, ...userState } = useUser();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const { tokenName, tokenAmount, calculatedUSD } = useToken();
  const { setBounty, ...bountyState} = useBounty();

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

  const handleChange = (evt) => {
    evt.persist();
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
        ["contractDuration"]: convertDateToUnix(dateRange[1]) - convertDateToUnix(dateRange[0])
      });
    }
  };



  const steps = [
    {
      label: "Statement of Werk",
      content: statementOfWerk({ handleChange }),
    },
    {
      label: "Dates & Pricing",
      content: datesAndPricing({ 
        handleChange, 
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
        handleChange
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
      let bounty = {
        ...bountyState,
        token: tokenName,
        contractAmount: tokenAmount,
        convertedAmount: calculatedUSD,
        userWallet: userData.userWallet,
        contractOwnerUserName: userData.userName,
        contractID: uuidv4(),
        contractCreatedOn: 1651968000,
        contractStatus: "live",
        attachedFiles: [],
      }
      submitSOW(bounty);
    } else {
      nextStep()
    }
  }

  return (
    <>
      {activeStep === 2 ? (
        <Project activeStep={activeStep} prevStep={prevStep} nextStep={nextStep} steps={steps}/>
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
