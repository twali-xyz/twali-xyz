import { AccountSelection } from "./accountSelection";
import { useEffect, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setEventArray } from "../../utils/setEventArray";
import { UserData } from "../../utils/interfaces";
import { userProfileStep } from "./userProfileStep";
import { merchantProfileStep } from "./merchantProfileStep";
import { professionalProfileStep } from "./professionalProfileStep";
import HeaderNav from "../HeaderNav/HeaderNav";
import useUser from "../../context/TwaliContext";

const SignUpSteps = () => {
  const router = useRouter();
  const { setData, ...userState } = useUser();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAccTypeSelection, setIsAccTypeSelection] = useState(true);
  const [isAccTypeSelected, setIsAccTypeSelected] = useState(false);
  const [errors, setErrors] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    businessName: "", 
    businessType: "",
    currTitle: "",
  });
  const [accType, setAccType] = useState("");
  const [btnActive, setBtnActive] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const toast = useToast()

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
    } else if (/\s/.test(values.userName)){
        errors.userName = "User name can't contain spaces"
    }
      
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.businessName && values.businessType !== "I'm not incorporated!") {
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
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setErrors(validate(userData));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [userData, 500]);

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

  const checkUserName = async (userName) => {
    userData.userName = userName;

    let isTaken = await fetch(`/api/users/checkIsValid?isValid=userName`, {
    method: "POST",
    body: JSON.stringify(userData.userName)
      }).then((res)=> res.json());
    return isTaken;
  }

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

  // Checks user input for a unique username
  // Error checks for main required fields
  const checkUserProfileStepValidity = () => {
    if (userData.userName && userData.userName !== '') {
      setErrors(validate(userData));
      let isValid = checkUserName(userData.userName); // checks if the user name already exists in DB

      // Displays a toast alert to inform the user - need a unique user name
      isValid.then(valid => { 
        if (valid) {
          setIsDisabled(true);
          toast({
            title: 'User name taken',
            description: "Oops! User name is taken. Pick another one!",
            status: 'error',
            variant: 'subtle',
            duration: 5000,
            isClosable: true,
          })
        } 
        else if (activeStep <= 0 && !errors.userName && !errors.firstName && !errors.lastName && !errors.email) {
          setIsDisabled(false);
          nextStep();
        } else if (activeStep == 1 && !errors.businessType && !errors.businessName) {
          setIsDisabled(false);
          nextStep();
        } else if (activeStep > 1 && !errors.currTitle) {
          setIsDisabled(false);
          updateAccType();
        } else {
          setIsDisabled(true);
        }    
      });
    }
  };

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
                      alignSelf="left"
                      mr={"24px"}
                      onClick={() => {
                        activeStep <= 0 ? router.push("/login") : prevStep();
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
                        checkUserProfileStepValidity()
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
