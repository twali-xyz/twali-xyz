import { useState } from 'react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Heading, FormControl, Input, Box, Button, FormLabel, Select, HStack, CircularProgress } from "@chakra-ui/react"
import router from 'next/router';

import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';

import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { DID } from 'dids';
import { IDX } from '@ceramicstudio/idx';
import { TileDocument } from '@ceramicnetwork/stream-tile';

// 3box test nodes with read/write access on ceramic clay testnet
// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

const userProfileStep = ({ handleChange }) => {
  return (<form style={{ alignSelf: "center"}}>
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
                    <Input placeholder="First name" name="firstName" onChange={(event) => handleChange(event)}/>
                  </FormControl>
                  <FormControl p={2} id="last-name" isRequired>
                    <FormLabel>Last name</FormLabel>
                    <Input placeholder="Last name" name="lastName" onChange={(event) => handleChange(event)}/>
                  </FormControl>
                </HStack>
                <FormControl p={2} id="display-name" isRequired>
                  <FormLabel>Display name</FormLabel>
                  <Input placeholder="Display name" name="displayName" onChange={(event) => handleChange(event)}/>
                </FormControl>
                <FormControl p={2} id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder="Email" name="email" onChange={(event) => handleChange(event)}/>
                </FormControl>
                <HStack spacing={2}>
                  <FormControl p={2} id="twitter" isRequired>
                    <FormLabel>Twitter username</FormLabel>
                    <Input placeholder="Twitter username" name="twitterUsrName" onChange={(event) => handleChange(event)}/>
                  </FormControl>
                  <FormControl p={2} id="linkedin" isRequired>
                    <FormLabel>LinkedIn username</FormLabel>
                    <Input placeholder="LinkedIn username" name="linkedInUsrName" onChange={(event) => handleChange(event)}/>
                  </FormControl>
                </HStack>
                <FormControl p={2} pb={8} id="website" isRequired>
                  <FormLabel>Website</FormLabel>
                  <Input placeholder="Website" name="website" onChange={(event) => handleChange(event)}/>
                </FormControl>
        </Box>
    </Box>
  </Box>
</form>)
}

const merchantProfileStep = ({ handleChange }) => {
  return (
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
                        <Input placeholder="Business legal name" name="businessName" onChange={(event) => handleChange(event)}/>
                      </FormControl>
                      <FormControl p={4} id="business-type" isRequired>
                        <FormLabel>Business type</FormLabel>
                        <Select placeholder="Select business type" name="businessType" onChange={(event) => handleChange(event)}>
                          <option>Sole proprietorship</option>
                          <option>Partnership</option>
                          <option>Corporation</option>
                        </Select>
                    </FormControl>
                    <FormControl p={4} id="business-location" isRequired>
                        <FormLabel>Business location</FormLabel>
                        <Select placeholder="Select business location" name="businessLocation" onChange={(event) => handleChange(event)}>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>India</option>
                        </Select>
                    </FormControl>
            </Box>
        </Box>
      </Box>
    </form>
)};
  

const professionalProfileStep = ({ handleChange }) => {
  return (
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
                        <Input placeholder="Current company title" name="currCompanyTitle" onChange={(event) => handleChange(event)}/>
                      </FormControl>
                      <FormControl p={4} id="current-location">
                        <FormLabel>Current location</FormLabel>
                        <Select placeholder="Select current location" name="currLocation" onChange={(event) => handleChange(event)}>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>India</option>
                        </Select>
                    </FormControl>
                    <FormControl p={4} id="functional-expertise" isRequired>
                        <FormLabel>Functional expertise</FormLabel>
                        <Select placeholder="Select functional expertise" name="funcExpertise" onChange={(event) => handleChange(event)}>
                          <option>Marketing</option>
                          <option>Accounting</option>
                          <option>Software Development</option>
                          <option>Creative</option>
                        </Select>
                    </FormControl>
                    <FormControl p={4} id="industry-expertise" isRequired>
                        <FormLabel>Industry expertise</FormLabel>
                        <Select placeholder="Select industry expertise" name="industryExpertise" onChange={(event) => handleChange(event)}>
                          <option>VC</option>
                          <option>Financial Services</option>
                          <option>Healthcare</option>
                        </Select>
                    </FormControl>
            </Box>
        </Box>
      </Box>
    </form>
)};

const SignUpSteps = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAccTypeSelection, setIsAccTypeSelection] = useState(true);
  const [isAccTypeSelected, setIsAccTypeSelected] = useState(false);
  const [accType, setAccType] = useState('');
  const [btnActive, setBtnActive] = useState(0);
  const [identity, setIdentity] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const handleChange = (evt) => {
    const value = evt.target.value;
    setIdentity({
      ...identity,
      [evt.target.name]: value
    });

    console.log(identity);
  }

  const steps = [
    { label: 'User Profile', content: userProfileStep({ handleChange })},
    { label: 'Merchant Profile', content: merchantProfileStep({ handleChange })},
    { label: 'Professional Profile', content: professionalProfileStep({ handleChange })},
  ];

    // Get user's eth address
    async function connect() {
        const { ethereum } = window;
        let account;

        if (!ethereum) {
          console.log("Connect your ethereum wallet!");
          return
        }
    
        await ethereum.request({ method: 'eth_requestAccounts' })
          .then(accounts => {
            if (accounts.length !== 0) {
              account = accounts[0];
              console.log("Found an authorized account: ", account);
            } else {
              console.log("No authorized account found!");
            }
          })
        return account;
    }

  async function updateAccType() {
    const address = await connect(); // first address in the array
    console.log(address);

    if (address) {
      const ceramic = new CeramicClient(endpoint);      
      const threeIdConnect = new ThreeIdConnect();
      const provider = new EthereumAuthProvider(window.ethereum, address);
  
      setIsSubmitted(true);
  
      await threeIdConnect.connect(provider);
  
      const did = new DID({
        provider: threeIdConnect.getDidProvider(),
        resolver: {
          ...ThreeIdResolver.getResolver(ceramic)
        }
      })
      
      ceramic.setDID(did);
      await ceramic.did.authenticate();
  
      const idx = new IDX({ ceramic });
  
      await idx.set('basicProfile', {
        name: identity.firstName + " " + identity.lastName,
      })

      await createProfileData(ceramic, identity, accType);

      console.log("Profile updated!");
      console.log(identity);
      console.log(accType);

      if(identity.firstName && identity.lastName && identity.email) {
          setIsSubmitted(false);
          router.push('/profile');
      } else {
          console.log('No profile, pls create one...');
        }
    }

  }

  // Creates a stream to store JSON data with ceramic
  const createProfileData = async(ceramic, identity, accType) => { 
    const profileData = await TileDocument.deterministic(
      ceramic,
      {
        family: 'user-profile-data',
      }
    );

    await profileData.update({identity, accType});
};

    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
      initialStep: 0,
    });

    const selectUserAccType = (accType: string) => {
      setAccType(accType);
      setIsAccTypeSelected(true);
    }
    
    // Either displaying the account type selection
    // Or the steps component based on user selection
    return (
      <>
             {isAccTypeSelection ? (<>
           <Heading alignSelf="center">Sign Up</Heading>
           <Box
                    alignSelf="center"
                    color="gray.500"
                    fontWeight="semibold"
                    fontSize="sm"
                    p={0}
                    m={0}
                  >How would you like to use Twali?
            </Box>
            <Button size="sm" pl={40} onClick={() => router.push('/')} colorScheme="gray" variant="link">
                Back
            </Button>
            <HStack alignSelf="center" spacing={8}>
            <Box w="sm" h="200px" borderWidth="1px" borderRadius="lg" borderColor={ btnActive == 1 ? "gray.500" : "gray.200" } overflow="hidden" cursor="pointer" onClick={() => {
              setBtnActive(1);
              selectUserAccType('Expert');
              }}>
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
            </Box>
            <Box w="sm" h="200px" borderWidth="1px" borderRadius="lg" borderColor={ btnActive == 2 ? "gray.500" : "gray.200" } overflow="hidden" cursor="pointer" onClick={() => {
              setBtnActive(2);
              selectUserAccType('Builder');
          }}>
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
            </Box>
            </HStack>
            <Button disabled={!isAccTypeSelected} alignSelf="center" w="xl" onClick={(evt) => {
              setIsAccTypeSelection(false);
              }} colorScheme="teal">
                Continue
            </Button>
        </>): (<>
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
          if (activeStep > 2) {
            updateAccType();
          }
        }} colorScheme="teal">
        Continue {isSubmitted ? <CircularProgress size="22px" thickness="4px" isIndeterminate color="#3C2E26" /> : null}
        </Button> </>)}
      </>
    );
  };

  export default SignUpSteps;

  