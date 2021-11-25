import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Flex, Heading, FormControl, Input, Box, Button, FormLabel, Select, HStack } from "@chakra-ui/react"
import router from 'next/router';

// User Profile Step
// - Wallet address (auto import) (display on top)
// - First Name, Last Name
// - Display Name
// - Email
// - Twitter username
// - LinkedIn username
// - Website

// Merchant Profile Step
// - Business Legal Name (for merchant payment purposes). Can be either Expert or Consultant
// - Business type (for merchant payment purposes)
// - Business location (for merchant payment purposes)

// Step 3 - Professional Profile
// - Current Company Title
// - Current Location
// - Dropdown: functional_expertise
// - Dropdown: industry_expertise

const userProfileStep = (
  <form style={{ alignSelf: "center"}}>
    <Box h="100%" w="xl" borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer">
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated>
                  <HStack spacing={2}>
                    <FormControl p={2} id="first-name" isRequired>
                      <FormLabel>First name</FormLabel>
                      <Input placeholder="First name" />
                    </FormControl>
                    <FormControl p={2} id="last-name" isRequired>
                      <FormLabel>Last name</FormLabel>
                      <Input placeholder="Last name" />
                    </FormControl>
                  </HStack>
                  <FormControl p={2} id="display-name" isRequired>
                    <FormLabel>Display name</FormLabel>
                    <Input placeholder="Display name" />
                  </FormControl>
                  <FormControl p={2} id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Email" />
                  </FormControl>
                  <HStack spacing={2}>
                    <FormControl p={2} id="twitter" isRequired>
                      <FormLabel>Twitter username</FormLabel>
                      <Input placeholder="Twitter username" />
                    </FormControl>
                    <FormControl p={2} id="linkedin" isRequired>
                      <FormLabel>LinkedIn username</FormLabel>
                      <Input placeholder="LinkedIn username" />
                    </FormControl>
                  </HStack>
                  <FormControl p={2} pb={8} id="website" isRequired>
                    <FormLabel>Website</FormLabel>
                    <Input placeholder="Website" />
                  </FormControl>
          </Box>
      </Box>
    </Box>
  </form>
);

const merchantProfileStep = (
  <form style={{ alignSelf: "center"}}>
    <Box h="100%" w="xl" borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer">
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated>
                    <FormControl p={4} id="business-name" isRequired>
                      <FormLabel>Business legal name</FormLabel>
                      <Input placeholder="Business legal name" />
                    </FormControl>
                    <FormControl p={4} id="business-type" isRequired>
                      <FormLabel>Business type</FormLabel>
                      <Select placeholder="Select business type">
                        <option>Sole proprietorship</option>
                        <option>Partnership</option>
                        <option>Corporation</option>
                      </Select>
                  </FormControl>
                  <FormControl p={4} id="business-location" isRequired>
                      <FormLabel>Business location</FormLabel>
                      <Select placeholder="Select business location">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>India</option>
                      </Select>
                  </FormControl>
          </Box>
      </Box>
    </Box>
  </form>
);

const professionalProfileStep = (
  <form style={{ alignSelf: "center"}}>
    <Box h="100%" w="xl" borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer">
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated>
                    <FormControl p={4} id="current-company-title" isRequired>
                      <FormLabel>Current company title</FormLabel>
                      <Input placeholder="Current company title" />
                    </FormControl>
                    <FormControl p={4} id="current-location">
                      <FormLabel>Current location</FormLabel>
                      <Select placeholder="Select current location">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>India</option>
                      </Select>
                  </FormControl>
                  <FormControl p={4} id="functional-expertise" isRequired>
                      <FormLabel>Functional expertise</FormLabel>
                      <Select placeholder="Select functional expertise">
                        <option>Marketing</option>
                        <option>Accounting</option>
                        <option>Software Development</option>
                        <option>Creative</option>
                      </Select>
                  </FormControl>
                  <FormControl p={4} id="industry-expertise" isRequired>
                      <FormLabel>Industry expertise</FormLabel>
                      <Select placeholder="Select industry expertise">
                        <option>VC</option>
                        <option>Financial Services</option>
                        <option>Healthcare</option>
                      </Select>
                  </FormControl>
          </Box>
      </Box>
    </Box>
  </form>
);

const steps = [
  { label: 'User Profile', content: userProfileStep },
  { label: 'Merchant Profile', content: merchantProfileStep },
  { label: 'Professional Profile', content: professionalProfileStep },
];

const SignUpSteps = () => {
    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
      initialStep: 0,
    });
  
    return (
      <>
      <Heading alignSelf="center">Setting up your user profile</Heading>
      <Steps activeStep={activeStep} colorScheme="teal">
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {console.log(activeStep)}
            {activeStep < 0 ? router.push('/') :
            <Button pl={264} alignSelf="left" onClick={() => {
                prevStep();
              }} colorScheme="gray" variant="link">
              Back
            </Button>}
            {content}
          </Step>
        ))}
      </Steps>
      <Button w="md" alignSelf="center" onClick={() => {
          nextStep();
        }} colorScheme="teal">
        Continue
        </Button>
      </>
    );
  };

  export default SignUpSteps;