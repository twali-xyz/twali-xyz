import { MultiSelect } from "../Profile/Components/MultiSelect";
import { useState } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { connect } from "../../utils/walletUtils";
import { listOfCountries } from "../../utils/profileUtils";

import {
  Heading,
  FormControl,
  Input,
  Box,
  Button,
  FormLabel,
  Select,
  HStack,
  VStack,
  CircularProgress,
  Text,
  FormHelperText,
  Tooltip,
  Img,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { functionalExpertiseList } from "../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../utils/industryExpertiseConstants";
import { setEventArray } from "../Profile/helpers/setEventArray";
import { UserData } from "../../utils/interfaces";

const userProfileStep = ({ handleChange, values, errors }) => {
  return (
    <form style={{ alignSelf: "center" }}>
      <Box
        h="100%"
        w="xl"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
      >
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <HStack spacing={2}>
              <FormControl p={2} id="first-name" isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  required
                  isInvalid={errors.firstName}
                  errorBorderColor="red.300"
                  placeholder="First name"
                  name="firstName"
                  value={values.firstName || ""}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <Text fontSize="xs" fontWeight="400" color="red.500">
                    {errors.firstName}
                  </Text>
                )}
              </FormControl>
              <FormControl p={2} id="last-name" isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  required
                  isInvalid={errors.lastName}
                  errorBorderColor="red.300"
                  placeholder="Last name"
                  name="lastName"
                  value={values.lastName || ""}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <Text fontSize="xs" fontWeight="400" color="red.500">
                    {errors.lastName}
                  </Text>
                )}
              </FormControl>
            </HStack>
            <FormControl p={2} id="display-name" isRequired>
              <FormLabel>User name</FormLabel>
              <Input
                required
                isInvalid={errors.userName}
                errorBorderColor="red.300"
                placeholder="User name"
                name="userName"
                value={values.userName || ""}
                onChange={handleChange}
              />
              {errors.userName && (
                <Text fontSize="xs" fontWeight="400" color="red.500">
                  {errors.userName}
                </Text>
              )}
            </FormControl>
            <FormControl p={2} id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                required
                isInvalid={errors.email}
                errorBorderColor="red.300"
                placeholder="Email"
                name="email"
                value={values.email || ""}
                onChange={handleChange}
              />
              {errors.email && (
                <Text fontSize="xs" fontWeight="400" color="red.500">
                  {errors.email}
                </Text>
              )}
            </FormControl>
            <HStack spacing={2}>
              <FormControl p={2} id="twitter">
                <FormLabel>Twitter URL</FormLabel>
                <Input
                  placeholder="Twitter url"
                  name="twitter"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl p={2} id="linkedin">
                <FormLabel>LinkedIn URL</FormLabel>
                <Input
                  placeholder="LinkedIn url"
                  name="linkedIn"
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>
            <FormControl p={2} pb={8} id="website">
              <Box display="flex" justifyContent="space-between">
                <FormLabel>Website</FormLabel>
                <Tooltip
                  placement="auto-start"
                  hasArrow
                  label="Add a personal or business website here"
                >
                  <Box pos="relative">
                    <FontAwesomeIcon icon={"info-circle"} />
                  </Box>
                </Tooltip>
              </Box>
              <Input
                placeholder="Website"
                name="website"
                onChange={handleChange}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

const merchantProfileStep = ({ handleChange, values, errors }) => {
  return (
    <form style={{ alignSelf: "center" }}>
      <Box
        h="100%"
        w="xl"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
      >
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <FormControl p={4} id="business-name" isRequired>
              <HStack display="flex" justifyContent="space-between">
                <FormLabel>Business legal name</FormLabel>
                <Tooltip
                  placement="auto-start"
                  hasArrow
                  label="If you are a sole proprietor, partnership, or single-member LLC, your 'Business Name' may be registered as your personal name or your business’s DBA.
                  If you are an LLC, corporation, or non-profit, Twali requires that the 'Business Name' be in the company’s legal business name or DBA"
                >
                  <Box pos="relative">
                    <FontAwesomeIcon icon={"info-circle"} />
                  </Box>
                </Tooltip>
              </HStack>
              <Input
                required
                isInvalid={errors.businessName}
                errorBorderColor="red.300"
                value={values.businessName || ""}
                placeholder="Business legal name"
                name="businessName"
                onChange={handleChange}
              />
              {errors.businessName && (
                <Text fontSize="xs" fontWeight="400" color="red.500">
                  {errors.businessName}
                </Text>
              )}
              <FormHelperText>
                If you don't have a business name, please use your legal name
              </FormHelperText>
            </FormControl>
            <FormControl p={4} id="business-type" isRequired>
              <HStack justifyContent="space-between">
                <FormLabel>Business type</FormLabel>
                <Link
                  href="https://www.sba.gov/business-guide/launch-your-business/choose-business-structure"
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <Tooltip
                    placement="auto-start"
                    hasArrow
                    label="Click to learn more "
                  >
                    <Box pos="relative">
                      <FontAwesomeIcon icon={"info-circle"} />
                    </Box>
                  </Tooltip>
                </Link>
              </HStack>
              <Select
                placeholder="Select business type"
                name="businessType"
                onChange={handleChange}
              >
                <option>Sole proprietorship</option>
                <option>Partnership</option>
                <option>Corporation</option>
                <option>Single-member LLC</option>
                <option>LLC</option>
                <option>Non-profit</option>
              </Select>
              {/* {errors.businessType && (
                          <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.businessType}</Text>
                        )} */}
            </FormControl>
            <FormControl p={4} id="business-location" isRequired>
              <FormLabel>Business location</FormLabel>
              <Select
                placeholder="Select business location"
                name="businessLocation"
                onChange={handleChange}
              >
                {listOfCountries()}
              </Select>
              {/* {errors.businessLocation && (
                          <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.businessType}</Text>
                        )} */}
            </FormControl>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

const professionalProfileStep = ({ handleChange, values, errors }) => {
  return (
    <form style={{ alignSelf: "center" }}>
      <Box
        h="100%"
        w="xl"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
      >
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <FormControl p={4} id="current-company-title" isRequired>
              <FormLabel>Current title</FormLabel>
              <Input
                isInvalid={errors.currTitle}
                errorBorderColor="red.300"
                value={values.currTitle || ""}
                required
                placeholder="Current title"
                name="currTitle"
                onChange={handleChange}
              />
              {errors.currTitle && (
                <Text fontSize="xs" fontWeight="400" color="red.500">
                  {errors.currTitle}
                </Text>
              )}
            </FormControl>
            <FormControl p={4} id="current-location">
              <FormLabel>Current location</FormLabel>
              <Select
                placeholder="Select current location"
                name="currLocation"
                onChange={handleChange}
              >
                {listOfCountries()}
              </Select>
            </FormControl>
            <MultiSelect
              name={"functionalExpertise"}
              formLabel={"Functional expertise"}
              handleChange={handleChange}
              defaultValues={[]}
              options={functionalExpertiseList}
              maxSelections={3}
            />
            <MultiSelect
              name={"industryExpertise"}
              formLabel={"Industry expertise"}
              handleChange={handleChange}
              defaultValues={[]}
              options={industryExpertiseList}
              maxSelections={3}
            />
          </Box>
        </Box>
      </Box>
    </form>
  );
};

const SignUpSteps = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAccTypeSelection, setIsAccTypeSelection] = useState(true);
  const [isAccTypeSelected, setIsAccTypeSelected] = useState(false);
  const [values, setValues] = useState({
    functExpertise: [],
    industryExpertise: [],
  });
  const [errors, setErrors] = useState({});
  const [accType, setAccType] = useState("");
  const [btnActive, setBtnActive] = useState(0);

  const [userData, setUserData] = useState<UserData>({
    userName: "",
    userWallet: "",
    accType: "",
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    twitter: "",
    linkedIn: "",
    website: "",
    businessName: "",
    businessType: "",
    businessLocation: "",
    currTitle: "",
    currLocation: "",
    functionalExpertise: [],
    industryExpertise: [],
    companyInfo: [],
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

    // if (!values.businessLocation) {
    //   errors.businessType = 'Business location is required';
    // }

    if (!values.currTitle) {
      errors.currTitle = "Current title is required";
    }

    // if (!values.functionalExpertise) {
    //   errors.functionalExpertise = 'Functional expertise is required';
    // }

    // if (!values.industryExpertise) {
    //   errors.industryExpertise = 'Industry expertise is required';
    // }

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
      setEventArray({ evt, setValues, values, userData, setUserData });
    } else {
      setValues((values) => ({
        ...values,
        [evt.target.name]: evt.target.value,
      }));
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
      content: userProfileStep({ handleChange, values, errors }),
    },
    {
      label: "Merchant Profile",
      content: merchantProfileStep({ handleChange, values, errors }),
    },
    {
      label: "Professional Profile",
      content: professionalProfileStep({ handleChange, values, errors }),
    },
  ];

  const createNewUser = async (address) => {
    console.log(userData);
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

  // Either displaying the account type selection
  // Or the steps component based on user selection
  return (
    <>
      {isAccTypeSelection ? (
        <>
          <Button
            size="sm"
            pl={40}
            onClick={() => router.push("/login")}
            colorScheme="gray"
            variant="link"
          >
            Back
          </Button>
          <Heading alignSelf="center">Sign Up</Heading>

          <VStack alignSelf="center" spacing={8}>
            <Text
              alignSelf="center"
              color="rgb(255, 255, 255)"
              fontWeight="semibold"
              fontSize="sm"
              p={0}
              m={0}
            >
              How would you like to use Twali?
            </Text>
            <HStack>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                w="sm"
                h="200px"
                borderWidth="1px"
                borderRadius="lg"
                borderColor={btnActive == 1 ? "gray.200" : "gray.500"}
                overflow="hidden"
                cursor="pointer"
                onClick={() => {
                  setBtnActive(1);
                  selectUserAccType("Expert");
                }}
              >
                <Box p="4">
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    As an expert 🔑
                  </Box>

                  <Box>
                    <Box as="span" color="gray.500" fontSize="sm">
                      I want to provide my knowledge and expertise
                    </Box>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  w="100%"
                  padding="1rem"
                >
                  <Box
                    w="2rem"
                    h="2rem"
                    backgroundColor="white"
                    borderRadius="50%"
                    position="relative"
                  >
                    {btnActive == 1 ? (
                      <Img
                        backgroundColor="rgb(222, 222, 222)"
                        w="2rem"
                        borderRadius="50%"
                        style={{ cursor: "pointer" }}
                        alignSelf="center"
                        src="check-mark.png"
                        alt="check mark"
                      />
                    ) : (
                      <Box
                        w="2rem"
                        h="2rem"
                        backgroundColor="gray.200"
                        borderRadius="50%"
                        boxShadow="inset 0 0px 5px 0 rgba(0,0,0,.8)"
                      ></Box>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                w="sm"
                h="200px"
                borderWidth="1px"
                borderRadius="lg"
                borderColor={btnActive == 2 ? "gray.200" : "gray.500"}
                overflow="hidden"
                cursor="pointer"
                onClick={() => {
                  setBtnActive(2);
                  selectUserAccType("Builder");
                }}
              >
                <Box p="4">
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    As a builder 🛠
                  </Box>

                  <Box>
                    <Box as="span" color="gray.500" fontSize="sm">
                      I want to build a project
                    </Box>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  w="100%"
                  padding="1rem"
                >
                  {btnActive == 2 ? (
                    <Img
                      backgroundColor="rgb(222, 222, 222)"
                      w="2rem"
                      borderRadius="50%"
                      style={{ cursor: "pointer" }}
                      alignSelf="center"
                      src="check-mark.png"
                      alt="check mark"
                    />
                  ) : (
                    <Box
                      w="2rem"
                      h="2rem"
                      backgroundColor="gray.200"
                      borderRadius="50%"
                      boxShadow="inset 0 0px 5px 0 rgba(0,0,0,.8)"
                    ></Box>
                  )}
                </Box>
              </Box>
            </HStack>
          </VStack>
          <Button
            disabled={!isAccTypeSelected}
            alignSelf="center"
            w="xl"
            onClick={(evt) => {
              setIsAccTypeSelection(false);
            }}
            colorScheme="teal"
          >
            Continue
          </Button>
        </>
      ) : (
        <>
          <Heading alignSelf="center">Setting up your user profile</Heading>
          <Steps activeStep={activeStep} colorScheme="teal">
            {steps.map(({ label, content }) => (
              <Step label={label} key={label}>
                {activeStep < 0 ? (
                  router.push("/login")
                ) : (
                  <Button
                    pl={264}
                    alignSelf="left"
                    onClick={() => {
                      prevStep();
                    }}
                    colorScheme="gray"
                    variant="link"
                  >
                    Back
                  </Button>
                )}
                {content}
              </Step>
            ))}
          </Steps>
          <Button
            w="md"
            alignSelf="center"
            onClick={() => {
              if (activeStep > 2) {
                updateAccType();
              } else {
                nextStep();
              }
            }}
            colorScheme="teal"
          >
            Continue{" "}
            {isSubmitted ? (
              <CircularProgress
                size="22px"
                thickness="4px"
                isIndeterminate
                color="#3C2E26"
              />
            ) : null}
          </Button>{" "}
        </>
      )}
    </>
  );
};

export default SignUpSteps;
