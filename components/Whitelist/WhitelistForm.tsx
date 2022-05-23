import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
export const WhiteListForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [step, setStep] = useState(0);
  const questions = {
    name: "1. Hi, I'm Twali, nice to meet you. What's your name?",
    email: "2. What's your email?",
    linkedIn: "3.  What’s your Linkedin URL?",
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
    <VStack
      height={"100%"}
      justify={"center"}
      alignItems={"center"}
      padding={"5%"}
    >
      <FormControl>
        <FormLabel>{Object.values(questions)[step]}</FormLabel>
        <Input
          name={Object.keys(questions)[step]}
          defaultValue={`${Object.keys(questions)[step]}`}
          value={eval(`${Object.keys(questions)[step]}`)}
          onChange={handleChange}
          width={"85%"}
          float={"right"}
          marginRight={"10.5%"}
          alignSelf={"flex-end"}
          borderColor={"zing"}
          borderRadius={0}
          borderTop={"white"}
          borderRight={"white"}
          borderLeft={"white"}
          _hover={{
            borderColor: "zing",
          }}
        ></Input>
      </FormControl>
      <HStack
        alignSelf={"flex-end"}
        marginTop={"16px !important"}
        marginRight={"10.5% !important"}
      >
        <Button
          variant={"secondary"}
          onClick={() => step > 0 && setStep((prevStep) => prevStep - 1)}
        >
          go back
        </Button>
        <Button
          variant={"primary"}
          onClick={() =>
            step < 2 ? setStep((prevStep) => prevStep + 1) : submitApplication()
          }
        >
          {step < 2 ? "continue" : "submit"}
        </Button>
      </HStack>
    </VStack>
  );
};
