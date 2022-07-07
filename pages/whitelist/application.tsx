import { ApplicationStatus } from "./../../components/Whitelist/ApplicationStatus";
import { WhitelistForm } from "./../../components/Whitelist/WhitelistForm";
import { Box, Flex, Link, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useReducer, useState } from "react";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import useUser from "../../context/TwaliContext";
import { useRouter } from "next/router";
import whitelistReducer, { initialState } from "../../context/WhitelistReducer";

const whitelist = () => {
  const toast = useToast();
  const router = useRouter();
  const { userWallet } = useUser();
  const [step, setStep] = useState(0);
  const [userWhitelistObj, setUserWhitelistObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    discord: "",
    linkedIn: "",
    referredBy: "",
  });

  const [whiteListStatus, setWhiteListStatus] = useState(""); // "", pending, approved, rejected
  const [state, dispatch] = useReducer(whitelistReducer, initialState);

  // referrence for "go"/"submit" button to check if it is focused
  // needed to prevent advancing two steps instead of one if user if focusing on the button while using enter to advance
  const continueButtonRef = React.useRef(null);
  const upArrowRef = React.useRef(null);
  const downArrowRef = React.useRef(null);
  useEffect(() => {
    let status;
    let referrer;
    if (!userWallet) {
      // fetch userWallet
      // fetch whiteListStatus. not having a userWallet means the page
      // was accessed using a different method than the login button.
    } else {
      status = router.query["status"];
      referrer = router.query["referred_by"];
    }
    setWhiteListStatus(String(status));
    setUserWhitelistObj({
      ...userWhitelistObj,
      referredBy: referrer,
    });
  }, [router.query]);

  const questions = [
    {
      descriptionHeader: null,
      description: null,
      questions: [
        {
          name: "firstName",
          placeholder: "type your first name here...",
          question:
            "1. Hi, I'm Twali, nice to meet you. What's your first name?",
        },
        {
          name: "lastName",
          placeholder: "last name here",
          question: "2. What's your last name?",
        },
        {
          name: "email",
          placeholder: "email@xyz.com",
          question: "3. What's your email?",
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
          name: "linkedIn",
          placeholder: "https://www.linkedin.com/in/twalixyz/",
          question: "3. What's your linkedIn?",
        },
        {
          name: "discord",
          placeholder: "XYZ#1234",
          question: "4. What's your discord?",
        },
      ],
    },
  ];

  function handleChange(event) {
    console.log(event.target.name);

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

      console.log("USER ADDED UP TO WHITELIST");
      setWhiteListStatus("submitted");
    };
    addUserToWhitelist(state);
  }, [state]);

  function validateInputs() {
    if (
      userWhitelistObj.firstName === "" ||
      userWhitelistObj.lastName === "" ||
      userWhitelistObj.email === ""
    ) {
      setStep(0);
      return false;
    }
    if (userWhitelistObj.discord === "" || userWhitelistObj.linkedIn === "") {
      setStep(1);
      return false;
    }

    return true;
  }

  function handleEnterPressed(event) {
    if (
      document.activeElement === continueButtonRef.current ||
      document.activeElement === upArrowRef.current ||
      document.activeElement === downArrowRef.current
    )
      return;
    if (event.key === "Enter" && step < 1) {
      setStep((prevStep) => prevStep + 1);
    }
    if (event.key === "Enter" && step >= 1) {
      submitApplication();
    }
  }
  return (
    <>
      <HeaderNav whichPage="whitelist" step={0} userWallet={userWallet} />
      <Box onKeyPress={handleEnterPressed}>
        {(whiteListStatus === null ||
          whiteListStatus === "" ||
          whiteListStatus === "undefined") &&
        questions[step] ? (
          <WhitelistForm
            questions={questions}
            handleChange={handleChange}
            step={step}
            setStep={setStep}
            userWhitelistObj={userWhitelistObj}
            submitApplication={submitApplication}
            continueButtonRef={continueButtonRef}
            upArrowRef={upArrowRef}
            downArrowRef={downArrowRef}
          />
        ) : (
          <ApplicationStatus whiteListStatus={whiteListStatus} />
        )}
      </Box>
    </>
  );
};

export default whitelist;
