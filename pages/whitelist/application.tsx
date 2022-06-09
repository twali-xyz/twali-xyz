import { ApplicationStatus } from "./../../components/Whitelist/ApplicationStatus";
import { WhitelistForm } from "./../../components/Whitelist/WhitelistForm";
import { Box, Fade, Flex, Link, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import useUser from "../../context/TwaliContext";
import { useRouter } from "next/router";

const whitelist = () => {
  const { userWallet } = useUser();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [step, setStep] = useState(0);
  const [whiteListStatus, setWhiteListStatus] = useState(""); // "", pending, approved, rejected

  useEffect(() => {
    let status;
    if (!userWallet) {
      // fetch userWallet
      // fetch whiteListStatus. not having a userWallet means the page
      // was accessed using a different method than the login button.
    } else {
      status = router.query["status"];
    }
    setWhiteListStatus(String(status));
  }, [router.query]);

  const questions = [
    [
      {
        name: "name",
        placeholder: "type your name here...",
        question: "1. Hi, I'm Twali, nice to meet you. What's your name?",
        descriptionHeader: null,
        description: null,
      },
      {
        name: "email",
        placeholder: "email@xyz.com",
        question: "2. What's your email?",
        descriptionHeader: null,
        description: null,
      },
      {
        name: "linkedIn",
        placeholder: "https://www.linkedin.com/in/twalixyz/",
        question: "3. What's your linkedIn?",
        descriptionHeader: null,
        description: null,
      },
    ],
    {
      name: "discord",
      placeholder: "XYZ#1234",
      question: "4. What's your discord?",
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
    },
    {
      name: "referredBy",
      placeholder: "type name here please...",
      question: "5.  Who referred you? Full names only here, please!",
      descriptionHeader: "What is the linkedIn profile used for?",
      description: (
        <Flex
          width={"100%"}
          height={"100%"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          flexDir={"column"}
        >
          <Text mb={"32px"}>help (?)</Text>
          <Fade in={step === 2}>
            <Text fontSize={"16px"} fontWeight={"500"} mb={"8px"}>
              Referrals at Twali
            </Text>
            <Flex flexDir={"column"} height={"210px"} justify={"space-around"}>
              <Text fontSize={"16px"} fontWeight={"300"} color={"subtle"}>
                Were you directed to us by someone in our community? Drop their
                name below so we can say thanks!
              </Text>
              <Text fontSize={"16px"} fontWeight={"300"} color={"subtle"}>
                No need to add here if you saw a tweet!
              </Text>
              <Text fontSize={"16px"} fontWeight={"300"} color={"subtle"}>
                If not, just say "N/A"
              </Text>
            </Flex>
          </Fade>
        </Flex>
      ),
    },
  ];

  function handleChange(event) {
    console.log(event.target.name);

    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "linkedIn":
        setLinkedIn(event.target.value);
        break;
      case "discord":
        setDiscord(event.target.value);
        break;
      case "referredBy":
        setReferredBy(event.target.value);
        break;
      default:
        break;
    }
  }
  function submitApplication() {

    // validate inputs
    // if inputs are missing, return user to step of first missing input
    if (validateInputs()) {
      alert(
        `NAME: ${name} 
      \n EMAIL: ${email} 
      \n LINKEDIN: ${linkedIn}
      \n DISCORD: ${discord}
      \n REFERREDBY: ${referredBy}`
      );
    }
  }

  function validateInputs() {
    if (name === "" || email === "" || linkedIn === "") {
      setStep(0);
      return false;
    }
    if (discord === "") {
      setStep(1);
      return false;
    }
    if (referredBy === "") {
      setStep(2);
      return false;
    }
    return true;
  }


  function handleEnterPressed(event) {
    if (event.key === "Enter" && step < 2) {
      setStep((prevStep) => prevStep + 1);
    }
    if (event.key === "Enter" && step >= 2) {
      submitApplication();
    }
  }
  return (
    <>
      <HeaderNav whichPage="whitelist" step={0} userWallet={userWallet} />
      <Box onKeyPress={handleEnterPressed}>
        {whiteListStatus === null ||
        whiteListStatus === "" ||
        whiteListStatus === "undefined" ? (
          <WhitelistForm
            questions={questions}
            handleChange={handleChange}
            step={step}
            setStep={setStep}
            submitApplication={submitApplication}
            value={eval(questions[step]["name"])}
            values={Object.values(questions[0]).map((item, idx) => {
              return eval(item["name"]);
            })}
          />
        ) : (
          <ApplicationStatus whiteListStatus={whiteListStatus} />
        )}
      </Box>
    </>
  );
};

export default whitelist;
