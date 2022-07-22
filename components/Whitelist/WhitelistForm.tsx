import {
  Box,
  Button,
  Fade,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Img,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import background from "../../public/twali-assets/step1_background.png";
export const WhitelistForm = ({
  handleChange,
  step,
  setStep,
  questions,
  userWhitelistObj,
  continueButtonRef,
  downArrowRef,
  upArrowRef,
  formError,
  validateInputs,
  emailError,
  handleStep,
}) => {
  return (
    <Flex flexDir={["column", "column", "row"]}>
      <Flex
        width={["100%", "100%", "50%"]}
        height={"100vh"}
        m={"0 !important"}
        bgImg={`url(${background.src})`}
        justifyContent={"center"}
        backgroundSize={"cover"}
        backgroundPosition={"100% "}
      >
        {questions[step]["description"] === null ? (
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
        ) : (
          <HStack>
            <Fade in={step === 1 || step === 2}>
              <HStack
                maxW={"470px"}
                w={"100%"}
                background={"n6"}
                p={"32px"}
                borderRadius={"16px"}
                alignSelf={"center"}
                boxShadow={"8px 16px 24px 0px #062B2A8F"}
                border={"1px solid #587070"}
                justifyContent={"space-between"}
                height={step === 1 ? "255px" : "365px"}
                transitionProperty={"height"}
                transitionDuration={".75s"}
                overflow={"hidden"}
              >
                {questions[step]["description"]}
              </HStack>
            </Fade>
          </HStack>
        )}
      </Flex>
      <Box
        height={"100vh"}
        width={["100%", "100%", "50%"]}
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
            {step === 0 ? (
              <VStack>
                <HStack alignItems={"flex-end"}>
                  {questions[step]["questions"]
                    .slice(0, 2)
                    .map((question, idx) => {
                      return (
                        <FormControl
                          key={idx}
                          width={"42%"}
                          isInvalid={
                            formError && !userWhitelistObj[question.name]
                          }
                          display={"flex"}
                          flexDir={"column"}
                          height={"170px"}
                          placeContent={"flex-end"}
                        >
                          {idx === 0 ? (
                            <FormLabel mt={16} mb={6} whiteSpace={"nowrap"}>
                              {question["question"]}
                            </FormLabel>
                          ) : null}
                          <Input
                            name={question["name"]}
                            value={userWhitelistObj[question["name"]] || ""}
                            onChange={handleChange}
                            float={"left"}
                            marginLeft={"2.5%"}
                            alignSelf={"flex-end"}
                            borderColor={"zing"}
                            borderRadius={0}
                            borderTop={"white"}
                            borderRight={"white"}
                            borderLeft={"white"}
                            _hover={{
                              borderColor: "zing",
                            }}
                            textAlign={"start"}
                            padding={0}
                            px={"4px !important"}
                            placeholder={question["placeholder"]}
                            transitionProperty={"width"}
                            transitionDuration={".75s"}
                          />
                          <FormErrorMessage
                            pos={"absolute"}
                            bottom={"-24px"}
                            fontSize="xs"
                            fontWeight="400"
                            color="red.500"
                          >
                            {question["name"]} is required
                          </FormErrorMessage>
                        </FormControl>
                      );
                    })}
                </HStack>
                {questions[step]["questions"].slice(2).map((question, idx) => {
                  return (
                    <FormControl
                      key={idx}
                      isInvalid={
                        (formError && !userWhitelistObj[question.name]) ||
                        emailError
                      }
                    >
                      <FormLabel mt={16} mb={6}>
                        {question["question"]}
                      </FormLabel>
                      <Input
                        name={question["name"]}
                        value={userWhitelistObj[question["name"]] || ""}
                        onChange={handleChange}
                        float={"left"}
                        alignSelf={"flex-end"}
                        borderColor={"zing"}
                        borderRadius={0}
                        borderTop={"white"}
                        borderRight={"white"}
                        borderLeft={"white"}
                        _hover={{
                          borderColor: "zing",
                        }}
                        textAlign={"start"}
                        padding={0}
                        px={"4px !important"}
                        placeholder={question["placeholder"]}
                        width={step === 2 ? "55%" : "85%"}
                        transitionProperty={"width"}
                        transitionDuration={".75s"}
                      ></Input>
                      <FormErrorMessage
                        pos={"absolute"}
                        bottom={"-24px"}
                        fontSize="xs"
                        fontWeight="400"
                        color="red.500"
                      >
                        {question["name"] === "email"
                          ? "Valid email is required"
                          : question["name"] + " is required"}
                      </FormErrorMessage>
                    </FormControl>
                  );
                })}{" "}
              </VStack>
            ) : (
              questions[step]["questions"].map((question, idx) => {
                return (
                  <FormControl
                    key={idx}
                    display={"flex"}
                    flexDir={"column"}
                    height={"196px"}
                    isInvalid={formError && !userWhitelistObj[question.name]}
                  >
                    <FormLabel mt={16} mb={6}>
                      {question["question"]}
                    </FormLabel>
                    <Input
                      name={question["name"]}
                      value={userWhitelistObj[question["name"]] || ""}
                      onChange={handleChange}
                      float={"left"}
                      alignSelf={"flex-start"}
                      borderColor={"zing"}
                      borderRadius={0}
                      borderTop={"white"}
                      borderRight={"white"}
                      borderLeft={"white"}
                      _hover={{
                        borderColor: "zing",
                      }}
                      textAlign={"start"}
                      padding={0}
                      px={"4px !important"}
                      placeholder={question["placeholder"]}
                      width={step === 2 ? "55%" : "85%"}
                      transitionProperty={"width"}
                      transitionDuration={".75s"}
                    />
                    <FormErrorMessage
                      fontSize="xs"
                      color="red.500"
                      fontWeight="400"
                    >
                      {question["name"]} is required
                    </FormErrorMessage>
                  </FormControl>
                );
              })
            )}

            <HStack
              alignSelf={"flex-start"}
              marginTop={"32px !important"}
              marginLeft={"0 !important"}
            >
              <Button
                ref={continueButtonRef}
                variant={"unstyled"}
                height={"40px"}
                width={"fit-content"}
                borderRadius={"32px"}
                padding={"16px, 24px, 13px, 24px"}
                bgColor={"zing"}
                color={"inverse"}
                marginLeft={"0px "}
                onClick={() => (formError ? null : handleStep())}
              >
                {step < 2 ? "ok" : "submit"}
              </Button>
              <Text
                //styleName: Label/label14;
                fontFamily={"PP Telegraf"}
                fontSize={"14px"}
                fontWeight={"500"}
                lineHeight={"24px"}
                letterSpacing={"0.02em"}
                textAlign={"left"}
                marginLeft={"24px !important"}
              >
                or press Enter
              </Text>
            </HStack>
          </>
          <HStack
            pos={"absolute"}
            bottom={"32px"}
            alignSelf={"flex-end"}
            alignItems={"flex-end"}
          >
            <Text
              //styleName: Caption/caption16;
              fontFamily={"PP Telegraf"}
              fontSize={"16px"}
              fontWeight={"500"}
              lineHeight={"24px"}
              letterSpacing={"0.04em"}
              textAlign={"left"}
              color={"subtle"}
              textTransform={"uppercase"}
              marginRight={"32px"}
              pos={"relative"}
              top={"6px"}
            >
              step {step + 1} of {questions.length}
            </Text>
            <Button
              ref={upArrowRef}
              variant={"unstyled"}
              width={"48px"}
              height={"48px"}
              borderRadius={"0"}
              border={"1px solid"}
              borderColor={"zing"}
              paddingLeft={"16px !important"}
              onClick={() => step > 0 && setStep(step - 1)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.8399 10.6136C15.0534 10.8263 15.0534 11.1725 14.8399 11.3861C14.6263 11.5996 14.2801 11.5996 14.0674 11.3861L7.9997 5.31845L1.93284 11.3861C1.71932 11.5996 1.37308 11.5996 1.15956 11.3861C0.946814 11.1726 0.946814 10.8263 1.15956 10.6136L7.61381 4.16014C7.82656 3.94662 8.17272 3.94662 8.38632 4.16014L14.8399 10.6136Z"
                  fill="#F9FFF2"
                />
              </svg>
            </Button>
            <Button
              ref={downArrowRef}
              variant={"unstyled"}
              width={"48px"}
              height={"48px"}
              borderRadius={"0"}
              border={"1px solid"}
              borderColor={"zing"}
              margin={"0 !important"}
              paddingLeft={"16px !important"}
              onClick={() => (validateInputs() ? handleStep() : null)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.16014 4.93265C0.94662 4.71991 0.94662 4.37374 1.16014 4.16014C1.37366 3.94662 1.71991 3.94662 1.93265 4.16014L8.0003 10.2278L14.0672 4.16014C14.2807 3.94662 14.6269 3.94662 14.8404 4.16014C15.0532 4.37366 15.0532 4.71991 14.8404 4.93265L8.38619 11.3861C8.17344 11.5996 7.82728 11.5996 7.61368 11.3861L1.16014 4.93265Z"
                  fill="#F9FFF2"
                />
              </svg>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
};
