import { useState } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";

import {
  Heading,
  Button,
  HStack,
  CircularProgress,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UserData } from "../../utils/interfaces";
import { statementOfWerk } from "./statementOfWerk";
import { datesAndPricing } from "./datesAndPricing";

import useUser from "../../context/TwaliContext";

const SOWBuilderSteps = () => {
  const router = useRouter();
  const { setData, ...userState } = useUser();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [userData, setUserData] = useState<UserData>({
    ...userState,
    userName: "",
    userWallet: "",
    uuid: "",
    setData,
  });


  const steps = [
    {
      label: "Statement of Werk",
      content: statementOfWerk({ values: userData }),
    },
    {
      label: "Dates & Pricing",
      content: datesAndPricing({ values: userData }),
    },
    {
      label: "Review",
      content: statementOfWerk({
        values: userData,
      }),
    },
    {
      label: "Submission",
      content: statementOfWerk({
        values: userData,
      }),
    },
  ];

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <>
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
      <Steps activeStep={activeStep}>
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
    </>
  );
};

export default SOWBuilderSteps;
