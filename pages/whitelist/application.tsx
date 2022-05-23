import { ApplicationStatus } from "./../../components/Whitelist/ApplicationStatus";
import { WhitelistForm } from "./../../components/Whitelist/WhitelistForm";
import { Box, Flex, Img, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import useUser from "../../context/TwaliContext";

export default function whitelist() {
  const { ...userState } = useUser();
  console.log(userState);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [step, setStep] = useState(0);
  const [whiteListStatus, setWhiteListStatus] = useState(null); // null, pending, approved, rejected

  const questions = {
    name: "1. Hi, I'm Twali, nice to meet you. What's your name?",
    email: "2. What's your email?",
    linkedIn: "3.  What's your Linkedin URL?",
  };

  function handleChange(event) {
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
      default:
        break;
    }
  }
  function submitApplication() {
    alert(`Name: ${name} \n Email: ${email} \n LinkedIn: ${linkedIn}`);
  }
  return (
    <>
      <HeaderNav whichPage="steps" step={0} />
      <Box>
        {whiteListStatus === null || whiteListStatus === "" ? (
          <WhitelistForm
            questions={questions}
            handleChange={handleChange}
            step={step}
            setStep={setStep}
            submitApplication={submitApplication}
            value={eval(Object.keys(questions)[step])}
          />
        ) : (
          <ApplicationStatus whiteListStatus={whiteListStatus} />
        )}
      </Box>
    </>
  );
}
