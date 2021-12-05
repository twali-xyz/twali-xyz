import { useState, useEffect } from 'react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Heading, FormControl, Input, Box, Button, FormLabel, Select, HStack, CircularProgress, Text } from "@chakra-ui/react"
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

const userProfileStep = ({ handleChange, values, errors }) => {
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
                    <Input required isInvalid={errors.firstName} errorBorderColor='red.300' placeholder="First name" name="firstName" value={values.firstName || ''} onChange={handleChange}/>
                    {errors.firstName && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.firstName}</Text>
                    )}
                  </FormControl>
                  <FormControl p={2} id="last-name" isRequired>
                    <FormLabel>Last name</FormLabel>
                    <Input required isInvalid={errors.lastName} errorBorderColor='red.300' placeholder="Last name" name="lastName" value={values.lastName || ''} onChange={handleChange}/>
                    {errors.lastName && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.lastName}</Text>
                    )}
                  </FormControl>
                </HStack>
                <FormControl p={2} id="display-name" isRequired>
                  <FormLabel>Display name</FormLabel>
                  <Input required isInvalid={errors.displayName} errorBorderColor='red.300' placeholder="Display name" name="displayName" value={values.displayName || ''} onChange={handleChange}/>
                  {errors.displayName && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.displayName}</Text>
                    )}
                </FormControl>
                <FormControl p={2} id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input required isInvalid={errors.email} errorBorderColor='red.300' placeholder="Email" name="email" value={values.email || ''} onChange={handleChange}/>
                  {errors.email && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.email}</Text>
                    )}
                </FormControl>
                <HStack spacing={2}>
                  <FormControl p={2} id="twitter">
                    <FormLabel>Twitter username</FormLabel>
                    <Input placeholder="Twitter username" name="twitterUsrName" onChange={handleChange}/>
                  </FormControl>
                  <FormControl p={2} id="linkedin">
                    <FormLabel>LinkedIn username</FormLabel>
                    <Input placeholder="LinkedIn username" name="linkedInUsrName" onChange={handleChange}/>
                  </FormControl>
                </HStack>
                <FormControl p={2} pb={8} id="website">
                  <FormLabel>Website</FormLabel>
                  <Input placeholder="Website" name="website" onChange={handleChange}/>
                </FormControl>
        </Box>
    </Box>
  </Box>
</form>)
}

const merchantProfileStep = ({ handleChange, values, errors }) => {
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
                        <Input required isInvalid={errors.businessName} errorBorderColor='red.300' value={values.businessName || ''} placeholder="Business legal name" name="businessName" onChange={handleChange}/>
                        {errors.businessName && (
                          <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.businessName}</Text>
                        )}
                      </FormControl>
                      <FormControl p={4} id="business-type" isRequired>
                        <FormLabel>Business type</FormLabel>
                        <Select placeholder="Select business type" name="businessType" onChange={handleChange}>
                          <option>Sole proprietorship</option>
                          <option>Partnership</option>
                          <option>Corporation</option>
                        </Select>
                        {/* {errors.businessType && (
                          <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.businessType}</Text>
                        )} */}
                    </FormControl>
                    <FormControl p={4} id="business-location" isRequired>
                        <FormLabel>Business location</FormLabel>
                        <Select placeholder="Select business location" name="businessLocation" onChange={handleChange}>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>India</option>
                        </Select>
                        {/* {errors.businessLocation && (
                          <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.businessType}</Text>
                        )} */}
                    </FormControl>
            </Box>
        </Box>
      </Box>
    </form>
)};
  

const professionalProfileStep = ({ handleChange, values, errors }) => {
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
                        <Input isInvalid={errors.currCompanyTitle} errorBorderColor='red.300' value={values.currCompanyTitle || ''} required placeholder="Current company title" name="currCompanyTitle" onChange={handleChange}/>
                        {errors.currCompanyTitle && (
                          <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.currCompanyTitle}</Text>
                        )}
                      </FormControl>
                      <FormControl p={4} id="current-location">
                        <FormLabel>Current location</FormLabel>
                        <Select placeholder="Select current location" name="currLocation" onChange={handleChange}>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>India</option>
                        </Select>
                    </FormControl>
                    <FormControl p={4} id="functional-expertise" isRequired>
                        <FormLabel>Functional expertise</FormLabel>
                        <Select placeholder="Select functional expertise" name="funcExpertise" onChange={handleChange}>
                          <option>Marketing</option>
                          <option>Accounting</option>
                          <option>Software Development</option>
                          <option>Creative</option>
                        </Select>
                        {/* {errors.funcExpertise && (
                          <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.funcExpertise}</Text>
                        )} */}
                    </FormControl>
                    <FormControl p={4} id="industry-expertise" isRequired>
                        <FormLabel>Industry expertise</FormLabel>
                        <Select placeholder="Select industry expertise" name="industryExpertise" onChange={handleChange}>
                          <option>VC</option>
                          <option>Financial Services</option>
                          <option>Healthcare</option>
                        </Select>
                        {/* {errors.industryExpertise && (
                          <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.industryExpertise}</Text>
                        )} */}
                    </FormControl>
            </Box>
        </Box>
      </Box>
    </form>
)};

const SignUpSteps = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [isContinueDisabled, setIsContinueDisabled] = useState(false);
  const [isAccTypeSelection, setIsAccTypeSelection] = useState(true);
  const [isAccTypeSelected, setIsAccTypeSelected] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [accType, setAccType] = useState('');
  const [btnActive, setBtnActive] = useState(0);
  const [identity, setIdentity] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const validate = (values) => {
    let errors: any = {};
    console.log(values);
    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }

    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!values.displayName) {
      errors.displayName = 'Display name is required';
    }
  
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!values.businessName) {
      errors.businessName = 'Business name is required';
    }

    if (!values.businessType) {
      errors.businessType = 'Business type is required';
    }

    // if (!values.businessLocation) {
    //   errors.businessType = 'Business location is required';
    // }

    if (!values.currCompanyTitle) {
      errors.currCompanyTitle = 'Current company is required';
    }

    // if (!values.funcExpertise) {
    //   errors.funcExpertise = 'Functional expertise is required';
    // }

    // if (!values.industryExpertise) {
    //   errors.industryExpertise = 'Industry expertise is required';
    // }
  
    return errors;
  };

  const handleChange = (evt) => {
    evt.persist();
    setValues(values => ({ ...values, [evt.target.name]: evt.target.value }));
    setErrors(validate(values));
    console.log(errors);
    const value = evt.target.value;
    setIdentity({
      ...identity,
      [evt.target.name]: value
    });
    console.log(values);
    console.log(identity);
  }

  const handleSubmit = () => {
    setErrors(validate(values));
    console.log(errors);
  }

  // useEffect(() => {
  //   if (Object.keys(errors).length === 0) {
  //     console.log("CONTINUE FORTH");
  //     // handleSubmit();
  //     // setIsContinueDisabled(false);
  //   }
  // }, [errors]);

  const steps = [
    { label: 'User Profile', content: userProfileStep({ handleChange, values, errors })},
    { label: 'Merchant Profile', content: merchantProfileStep({ handleChange, values, errors })},
    { label: 'Professional Profile', content: professionalProfileStep({ handleChange, values, errors })},
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
                // setIsContinueDisabled(true);
              }} colorScheme="gray" variant="link">
              Back
            </Button>}
            {content}
          </Step>
        ))}
      </Steps>
      <Button w="md" alignSelf="center" onClick={() => {
          // setIsContinueDisabled(true);
          if (activeStep > 2) {
            updateAccType();
          } else {
            nextStep();
          }
        }} colorScheme="teal">
        Continue {isSubmitted ? <CircularProgress size="22px" thickness="4px" isIndeterminate color="#3C2E26" /> : null}
        </Button> </>)}
      </>
    );
  };

  export default SignUpSteps;

  