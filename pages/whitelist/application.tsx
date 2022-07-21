import { ApplicationStatus } from "./../../components/Whitelist/ApplicationStatus";
import { WhitelistForm } from "./../../components/Whitelist/WhitelistForm";
import { Box, Flex, Link, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useReducer, useState } from "react";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import useUser from "../../context/TwaliContext";
import { useRouter } from "next/router";
import whitelistReducer, { initialState } from "../../context/WhitelistReducer";
import { pageDisconnectedFallback } from "../../utils/walletUtils";
import { useWhitelistStatus } from "../../hooks/useWhitelistStatus";

const whitelist = () => {
  const toast = useToast();
  const router = useRouter();
  const { setData, userWallet } = useUser();
  const [step, setStep] = useState(0);
  const [formError, setFormError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userWhitelistObj, setUserWhitelistObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    discord: "",
    linkedIn: "",
    referredBy: "",
  });

  const {
    data: fetchedStatus,
    isLoading,
    isError,
  } = useWhitelistStatus(userWallet);
  const [whiteListStatus, setWhiteListStatus] = useState(""); // "", pending, approved, rejected
  const [state, dispatch] = useReducer(whitelistReducer, initialState);
  const [isSubmitted, setIsSubmitted] = useState("");
  // referrence for "go"/"submit" button to check if it is focused
  // needed to prevent advancing two steps instead of one if user if focusing on the button while using enter to advance
  const continueButtonRef = React.useRef(null);
  const upArrowRef = React.useRef(null);
  const downArrowRef = React.useRef(null);
  useEffect(() => {
    let status;
    let referrer;

    status = router.query["status"];
    referrer = router.query["referred_by"];

    setWhiteListStatus(String(status));
    setUserWhitelistObj({
      ...userWhitelistObj,
      referredBy: referrer,
    });
  }, [router.query]);

  useEffect(() => {
    if (fetchedStatus?.whitelistStatus === "approved") {
      router.push("/login");
    }
  }, [fetchedStatus]);

  const questions = [
    {
      descriptionHeader: null,
      description: null,
      questions: [
        {
          name: "firstName",
          placeholder: "first name name here...",
          question:
            "1. Hi, I'm Twali, nice to meet you. What's your full name?",
        },
        {
          name: "lastName",
          placeholder: "last name here",
          question: "What's your last name?",
        },
        {
          name: "email",
          placeholder: "email@xyz.com",
          question: "2. What's your email?",
        },
      ],
    },
    {
      descriptionHeader: "",
      description: (
        <Flex
          width={"100%"}
          height={"100%"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          flexDir={"column"}
        >
          <Text mb={"32px"}>help (?)</Text>
          <Text fontSize={"16px"} fontWeight={"500"} mb={"8px"}>
            Why we need your LinkedIn?
          </Text>
          <Text fontSize={"16px"} fontWeight={"300"} color={"subtle"}>
            We know it's trad, but this is the best way to understand who you
            are and what you've done. Don't worry -- we're building the future
            of work, which we hope will be a LinkedIn-free place.
          </Text>
        </Flex>
      ),
      questions: [
        {
          name: "linkedIn",
          placeholder: "https://www.linkedin.com/in/twalixyz/",
          question: "3. What's your linkedIn?",
        },
      ],
    },
    {
      descriptionHeader: "",
      description: (
        <Flex
          width={"100%"}
          height={"100%"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          flexDir={"column"}
        >
          <Text mb={"32px"}>help (?)</Text>
          <Text fontSize={"16px"} fontWeight={"500"} mb={"8px"}>
            Why we need Discord?
          </Text>
          <Text fontSize={"16px"} fontWeight={"300"} color={"subtle"}>
            A short description about why Twali uses discord + importance of
            community
          </Text>
          <Text fontSize={"16px"} fontWeight={"500"} mb={"8px"} mt={"32px"}>
            Find your discord username
          </Text>
          <Text fontSize={"16px"} fontWeight={"300"} color={"subtle"}>
            Click on your name at the bottom left of your Discord desktop app
            and it will copy automatically. Don't have Discord? Download here:
          </Text>
          <Link color={"aqua"} href={"https://discord.com/downloadvbw2"}>
            Discord download
          </Link>
        </Flex>
      ),
      questions: [
        {
          name: "discord",
          placeholder: "XYZ#1234",
          question: "4. What's your discord?",
        },
      ],
    },
  ];

  function handleChange(event) {
    setFormError(false);
    setEmailError(false);
    setUserWhitelistObj({
      ...userWhitelistObj,
      [event.target.name]: event.target.value,
    });
  }

  function addUser(newState) {
    dispatch({
      type: "ADD_USER",
      payload: { ...newState },
    });
  }

  function submitApplication() {
    // validate inputs
    // if inputs are missing, return user to step of first missing input
    if (validateInputs()) {
      addUser({
        userWallet: userWallet.toLocaleLowerCase(),
        whitelistStatus: "pending",
        applied_on: Date.now(),
        ...userWhitelistObj,
      });
    } else if (!state.userWallet) {
      toast({
        title: "Invalid",
        description: "Please login to submit your application.",
        status: "error",
        variant: "subtle",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid",
        description: "Oops! Please fill out all required fields!",
        status: "error",
        variant: "subtle",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (!state.userWallet) return;

    const addUserToWhitelist = async (payload) => {
      await fetch(`/api/admin/addUser`, {
        method: "PUT",
        body: JSON.stringify({ payload }),
      });
      setWhiteListStatus("submitted");
    };
    addUserToWhitelist(state);
  }, [state]);

  function validateInputs() {
    if (
      (userWhitelistObj.firstName === "" ||
        userWhitelistObj.lastName === "" ||
        userWhitelistObj.email === "") &&
      step === 0
    ) {
      setFormError(true);

      return false;
    }
    if (
      !userWhitelistObj.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) &&
      step === 0
    ) {
      setEmailError(true);
      return false;
    }
    if (userWhitelistObj.linkedIn === "" && step === 1) {
      setFormError(true);
      return false;
    }
    if (userWhitelistObj.discord === "" && step === 2) {
      setFormError(true);
      return false;
    }
    return true;
  }

  const handleStep = () => {
    if (validateInputs()) {
      if (step < 2) {
        setStep(step + 1);
      } else {
        submitApplication();
      }
    }
  };

  function handleEnterPressed(event) {
    if (event.key !== "Enter") return;

    if (validateInputs()) {
      if (
        document.activeElement === continueButtonRef.current ||
        document.activeElement === upArrowRef.current ||
        document.activeElement === downArrowRef.current
      )
        return;
      if (event.key === "Enter") {
        handleStep();
      }
    }
  }
  return (
    <>
      <HeaderNav
        whichPage="whitelist"
        userWallet={userWallet}
        step={userWallet ? 0 : 1}
        setUserData={setData}
        isConnectWalletBtn={!userWallet}
      />

      {userWallet ? (
        <Box onKeyPress={formError ? null : handleEnterPressed}>
          {!fetchedStatus &&
          !isLoading &&
          !fetchedStatus?.whitelistStatus &&
          questions[step] ? (
            <WhitelistForm
              questions={questions}
              handleChange={handleChange}
              step={step}
              setStep={setStep}
              formError={formError}
              userWhitelistObj={userWhitelistObj}
              continueButtonRef={continueButtonRef}
              upArrowRef={upArrowRef}
              downArrowRef={downArrowRef}
              validateInputs={validateInputs}
              emailError={emailError}
              handleStep={handleStep}
            />
          ) : (
            !isLoading &&
            !isError && (
              <>
                <ApplicationStatus
                  whiteListStatus={
                    fetchedStatus?.whitelistStatus || whiteListStatus
                  }
                />
              </>
            )
          )}
        </Box>
      ) : (
        pageDisconnectedFallback()
      )}
    </>
  );
};

export default whitelist;
