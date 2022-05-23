import { Box, Button, HStack, Img, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { WhiteListForm } from "../../components/Whitelist/WhitelistForm";
import background from "../../public/twali-assets/step1_background.png";

export default function whitelist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [step, setStep] = useState(0);
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
        <HStack>
          <Box
            width={"50%"}
            height={"100vh"}
            m={"0 !important"}
            bgImg={`url(${background.src})`}
            justifyContent={"center"}
            backgroundSize={"cover"}
            backgroundPosition={"100% "}
          >
            <VStack height={"100%"} justify={"center"} alignItems={"center"}>
              <Text
                w={"full"}
                fontSize="40px"
                fontWeight="400"
                display={"flex"}
                color={"fresh"}
                justifyContent={"center"}
                alignItems={"center"}
                fontFamily={"GrandSlang"}
              >
                welcome to
              </Text>
              <Img
                width={"334.14px"}
                height={"72px"}
                alt="twali-logo"
                src="/twali-logo.svg"
              />
            </VStack>
          </Box>
          <Box
            height={"100vh"}
            width={"50%"}
            m={"0 !important"}
            background={"inverse"}
          >
            <VStack
              height={"100%"}
              justify={"center"}
              alignItems={"center"}
              padding={"5%"}
            >
              <WhiteListForm
                questions={questions}
                step={step}
                handleChange={handleChange}
                value={eval(`${Object.keys(questions)[step]}`)}
              />

              <HStack
                alignSelf={"flex-end"}
                marginTop={"16px !important"}
                marginRight={"10.5% !important"}
              >
                <Button
                  variant={"secondary"}
                  onClick={() =>
                    step > 0 && setStep((prevStep) => prevStep - 1)
                  }
                >
                  go back
                </Button>
                <Button
                  variant={"primary"}
                  onClick={() =>
                    step < 2
                      ? setStep((prevStep) => prevStep + 1)
                      : submitApplication()
                  }
                >
                  {step < 2 ? "continue" : "submit"}
                </Button>
              </HStack>
            </VStack>
          </Box>
        </HStack>
      </Box>
    </>
  );
}
