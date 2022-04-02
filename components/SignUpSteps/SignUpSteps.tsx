import { AccountSelection } from "./accountSelection";
import { useState } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { connect } from "../../utils/walletUtils";
import background from "../../public/twali-assets/backgroundscreen.png";
import {
  Heading,
  Button,
  HStack,
  CircularProgress,
  Container,
  Flex,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setEventArray } from "../Profile/helpers/setEventArray";
import { UserData } from "../../utils/interfaces";
import { userProfileStep } from "./userProfileStep";
import { merchantProfileStep } from "./merchantProfileStep";
import { professionalProfileStep } from "./professionalProfileStep";
import HeaderNav from "../HeaderNav/HeaderNav";
import useUser from "../TwaliContext";

const SignUpSteps = () => {
  const router = useRouter();
  const { setData, ...userState } = useUser();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAccTypeSelection, setIsAccTypeSelection] = useState(true);
  const [isAccTypeSelected, setIsAccTypeSelected] = useState(false);
  const [errors, setErrors] = useState({});
  const [accType, setAccType] = useState("");
  const [btnActive, setBtnActive] = useState(0);

  const [userData, setUserData] = useState<UserData>({
    ...userState,
    userName: "",
    userWallet: "",
    uuid: "",
    setData,
  });

  const validate = (values) => {
    let errors: any = {};

    if (!values.firstName) {
      errors.firstName = "First name is required";
    }

    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!values.userName) {
      errors.userName = "User name is required";
    }

    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.businessName) {
      errors.businessName = "Business name is required";
    }

    if (!values.businessType) {
      errors.businessType = "Business type is required";
    }

    if (!values.currTitle) {
      errors.currTitle = "Current title is required";
    }
    return errors;
  };

  const handleChange = (evt) => {
    evt.persist();

    let strippedEventName = evt.target.name.substring(
      0,
      evt.target.name.length - 1
    );

    if (
      strippedEventName === "functionalExpertise" ||
      strippedEventName === "industryExpertise"
    ) {
      // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
      setEventArray({ evt, setValues: setUserData, values: userData });
    } else {
      const value = evt.target.value;
      setUserData({
        ...userData,
        [evt.target.name]: value,
      });
    }
  };

  const steps = [
    {
      label: "User Profile",
      content: userProfileStep({ handleChange, values: userData, errors }),
    },
    {
      label: "Merchant Profile",
      content: merchantProfileStep({ handleChange, values: userData, errors }),
    },
    {
      label: "Professional Profile",
      content: professionalProfileStep({
        handleChange,
        values: userData,
        errors,
      }),
    },
  ];
  // const checkUserName = async (userName) => {
  //   userData.userName = userName;

  //   let available = await fetch(`/api/users/checkUserName`, {
  //   method: "POST",
  //   body: JSON.stringify(userData.userName)
  //     }).then((res)=> res.json());
  //   if (available == true){
  //     throw new Error("Select new username")
  //   }
  // }
  const createNewUser = async (address) => {
    userData.userWallet = address;
    // check if user doesnt already exsist with current address
    userData.accType = accType;

    await fetch("/api/users/createUser", {
      method: "POST",
      body: JSON.stringify({ userData }),
    });
    console.log("NEW USER CREATED BRUH");
    // For now for test case the userName is pushed as query param into a user 'page'
    router.push(`/${userData.userName}`);
  };

  async function updateAccType() {
    const address = await connect(); // first address in the array

    if (address) {
      setIsSubmitted(true);
      await createNewUser(address); // creating user in DynamoDB
      if (userData.userName && userData.userWallet) {
        router.push(`/${userData.userName}`); // coming from dynamodb
        setIsSubmitted(false);
      } else {
        setIsSubmitted(false);
        console.log("No profile, pls create one...");
      }
    }
  }

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const selectUserAccType = (accType: string) => {
    setAccType(accType);
    setIsAccTypeSelected(true);
  };
  const [accSelectionComplete, setAccSelectionComplete] = useState(false);
  // Either displaying the account type selection
  // Or the steps component based on user selection
  return (
    <>
      <Container
        width="100%"
        minHeight="100vh"
        maxW={"100%"}
        pos={"relative"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgImg={`url(${background.src})`}
        px={0}
      >
        <HeaderNav whichPage="steps" step={accSelectionComplete} />
        <Container
          maxW="container.xl"
          pb={!accSelectionComplete ? "inherit" : 8}
          px={0}
          m={accSelectionComplete ? "inherit" : 0}
        >
          <Flex h="full">
            <VStack w="full" h="full" spacing={8} alignItems="flex-start">
              {isAccTypeSelection ? (
                <AccountSelection
                  btnActive={btnActive}
                  setBtnActive={setBtnActive}
                  selectUserAccType={selectUserAccType}
                  isAccTypeSelected={isAccTypeSelected}
                  setIsAccTypeSelection={setIsAccTypeSelection}
                  setAccSelectionComplete={setAccSelectionComplete}
                />
              ) : (
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
                    Set up my Twali
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
                      w="160px"
                      alignSelf="left"
                      mr={"24px"}
                      onClick={() => {
                        activeStep <= 0 ? router.push("/login") : prevStep();
                      }}
                      backgroundColor={"transparent"}
                      border={"1px solid #98B2B2"}
                      height={"40px"}
                      pos={"relative"}
                      fontSize={"14px"}
                      fontFamily={"PP Telegraf Bold"}
                      letterSpacing={"0.06em;"}
                      borderRadius={"32px"}
                      alignItems={"center"}
                      textTransform={"uppercase"}
                      justifyContent={"center"}
                      variant="link"
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
                      w="160px"
                      height={"40px"}
                      pos={"relative"}
                      fontSize={"14px"}
                      fontFamily={"PP Telegraf Bold"}
                      letterSpacing={"0.06em;"}
                      alignSelf="center"
                      color={"#0A1313"}
                      borderRadius={"32px"}
                      textTransform={"uppercase"}
                      backgroundColor={"#C7F83C"}
                      onClick={() => {
                        if (activeStep > 1) {
                          updateAccType();
                        } else {
                          nextStep();
                        }
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
              )}
            </VStack>
          </Flex>
        </Container>
      </Container>
    </>
  );
};

export default SignUpSteps;
