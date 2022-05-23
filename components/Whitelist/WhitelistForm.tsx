import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Img,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import background from "../../public/twali-assets/step1_background.png";

export function WhitelistForm({
  handleChange,
  step,
  setStep,
  submitApplication,
  questions,
  value,
}) {
  return (
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
          <>
            <FormControl>
              <FormLabel>{Object.values(questions)[step]}</FormLabel>
              <Input
                name={Object.keys(questions)[step]}
                defaultValue={`${Object.keys(questions)[step]}`}
                value={value}
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
              marginTop={"32px !important"}
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
                  step < 2
                    ? setStep((prevStep) => prevStep + 1)
                    : submitApplication()
                }
              >
                {step < 2 ? "continue" : "submit"}
              </Button>
            </HStack>
          </>
        </VStack>
      </Box>
    </HStack>
  );
}
