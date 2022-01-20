import { useRef, useState, useEffect } from 'react';
import { 
    Box,
    Modal,
    ModalOverlay,
    ModalCloseButton,
    ModalBody,
    ModalContent,
    Button,
    ModalHeader,
    ModalFooter,
    FormControl,
    FormLabel,
    Textarea,
    Text,
    CircularProgress,
    Input,
    Select,
    Img,
   } from '@chakra-ui/react';
   import useSWR from 'swr';
   import { connect } from '../../../utils/walletUtils';

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

   export interface ProfileData {
    content: {
      identity: Identity;
      accType: string;
    }
  
  }
  
  export interface Identity {
    firstName: string;
    lastName: string;
    email: string;
    displayName: string;
    bio: string;
    twitterUsrName?: string;
    linkedInUsrName?: string;
    website?: string;
    businessName: string;
    businessType: string;
    businessLocation: string;
    currTitle: string;
    currLocation?: string;
    funcExpertise: string;
    industryExpertise: string;
    companyInfo?: CompanyInfo[];
  }
  
  export interface BasicProfile {
    name: string;
  }
  export interface Profile {
      identity: Identity;
      name: string;
      accType: string;
  }

  export interface CompanyInfo {
    companyName: string;
    companyTitle: string;
    companyImg: any;
    companyStart: Date;
    companyEnd: Date;
    companyFunc: string;
    companyIndustry: string;
}

const CompanyModal = (props) => {
    const finalRef = useRef();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyInfo, setCompanyInfo] = useState();
    const [shouldFetch, setShouldFetch] = useState(false);
    const [accType, setAccType] = useState(props.profileData.content.accType);
    const [identity, setIdentity] = useState(props.profileData.content.identity);
    const [profileData, setProfileData] = useState(props.profileData);
    const [values, setValues] = useState({
      displayName: props.profileData.content.identity.displayName,
      email: props.profileData.content.identity.email,
  });

    
  async function updateCompanyInfo() {
    const address = await connect(); // first address in the array
    console.log(address);

    if (address) {
      setShouldFetch(true);
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
  
      // does not require signing to get user's public data
      const data: BasicProfile = await idx.get(
        'basicProfile',
        `${address}@eip155:1`
      )
      console.log('data: ', data);
      identity.companyInfo[props.currCompany] = {
        companyName: companyName
      }

      await updateProfileData(ceramic, identity, accType);

      console.log("Profile updated!");
      console.log(identity);
      console.log(accType);

      if (companyInfo) {
        console.log(companyInfo);
      }

      if(identity.firstName && identity.lastName && identity.email) {
          setIsSubmitted(false);
          props.handleUpdatedCompanyInfo(profileData, false);
          props.onClose();
      } else {
          console.log('No profile, pls create one...');
        }
    }
    
  }

  // Updates a stream to store JSON data with ceramic
  const updateProfileData = async(ceramic, identity, accType) => { 
    const profileData = await TileDocument.deterministic(
      ceramic,
      {
        family: 'user-profile-data',
      }
    );

    await profileData.update({identity, accType});
};

const handleCompanyData = (companyData) => {
  console.log(companyData);
  setCompanyInfo(companyData);
}

    const handleChange = (evt) => {
      evt.persist();
      setValues(values => ({ ...values, [evt.target.name]: evt.target.value }));
      // setErrors(validate(values));
      setIdentity({
        ...identity,
        [evt.target.name]: evt.target.value
      });
      const newProfileData: ProfileData = { content: {identity: identity, accType: props.profileData.content.accType }};
      setProfileData(newProfileData);
      setShouldFetch(false);
      setCompanyName(evt.target.value);
    }

    return (
      <>  
        <Modal finalFocusRef={finalRef} isOpen={props.isOpen} onClose={props.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update your work experience</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form style={{ alignSelf: "center"}}>
            {/* <FormControl p={2}>
            Company Logo
            </FormControl> */}
                {shouldFetch && <CompanyInfoData companyName={companyName}/>}
                <FormControl p={2} id="company-name">
                    <FormLabel>Company name</FormLabel>
                    <Input errorBorderColor='red.300' placeholder="Company name" name="companyName" onChange={handleChange}/>
                    {/* 
                    isInvalid={errors.firstName && (!props.profileData.content.identity.firstName || !values.firstName)}
                    {errors.firstName && (!props.profileData.content.identity.firstName || !values.firstName) && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.firstName}</Text>
                    )} */}
                  </FormControl>
                  <FormControl p={2} id="company-title">
                    <FormLabel>Job title</FormLabel>
                    <Input errorBorderColor='red.300' placeholder="Job title" name="companyTitle"/>
                    {/* 
                    isInvalid={errors.lastName && (!props.profileData.content.identity.lastName || !values.lastName)} 
                    {errors.lastName && (!props.profileData.content.identity.lastName || !values.lastName) && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.lastName}</Text>
                    )} */}
                  </FormControl>
                  <FormControl p={2} id="company-start">
                    <FormLabel>What was your start date?</FormLabel>
                    <Input errorBorderColor='red.300' name="companyStart"/>
                    {/* 
                    isInvalid={errors.currTitle && (!props.profileData.content.identity.currTitle || !values.currTitle)}
                    {errors.currTitle && (!props.profileData.content.identity.currTitle || !values.currTitle) && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.currTitle}</Text>
                    )} */}
                  </FormControl>
                  <FormControl p={2} id="company-end">
                    <FormLabel>What was your end date?</FormLabel>
                    <Input name="companyEnd"/>
                  </FormControl>
                  <FormControl p={2} id="company-func">
                    <FormLabel>Functional expertise</FormLabel>
                    <Select errorBorderColor='red.300' placeholder="Select functional expertise" name="funcExpertise">
                          <option>Accounting</option>
                          <option>Creative</option>
                          <option>Audit</option>
                          <option>Board & Advisory</option>
                          <option>Corporate Development</option>
                          <option>Comp & Benefits</option>
                          <option>Compliance</option>
                          <option>Management Consulting</option>
                          <option>Data & Analytics</option>
                          <option>Product Design</option>
                          <option>Digital</option>
                          <option>Engineering</option>
                          <option>Entrepreneurship</option>
                          <option>Finance</option>
                          <option>General Management</option>
                          <option>Human Resources</option>
                          <option>IT Infrastructure</option>
                          <option>Innovation</option>
                          <option>Investor</option>
                          <option>Legal</option>
                          <option>Marketing</option>
                          <option>Media & Comms</option>
                          <option>Merchandising</option>
                          <option>Security</option>
                          <option>Operations</option>
                          <option>Portfolio Operations</option>
                          <option>Procurement</option>
                          <option>Product Management</option>
                          <option>Investor Relations</option>
                          <option>Regulatory</option>
                          <option>Research</option>
                          <option>Risk</option>
                          <option>Strategy</option>
                          <option>Technology</option>
                          <option>Transformation</option>
                          <option>Sales & Customer</option>
                          <option>Data Science</option>
                          <option>Talent Acquisition</option>
                          <option>Tax</option>
                          <option>Cybersecurity</option>
                          <option>Investment Banking</option>
                          <option>Supply Chain</option>
                        </Select>
                  </FormControl>
                  <FormControl p={2} id="company-industry">
                    <FormLabel>Industry</FormLabel>
                    <Select placeholder="Select industry expertise" name="industryExpertise">
                          <option>Accounting</option>
                          <option>Angel Investment</option>
                          <option>Asset Management</option>
                          <option>Auto Insurance</option>
                          <option>Banking</option>
                          <option>Bitcoin</option>
                          <option>Commercial Insurance</option>
                          <option>Commercial Lending</option>
                          <option>Credit</option>
                          <option>Credit Bureau</option>
                          <option>Credit Cards</option>
                          <option>Crowdfunding</option>
                          <option>Cryptocurrency</option>
                          <option>Debit Cards</option>
                          <option>Debt Collections</option>
                          <option>Finance</option>
                          <option>Financial Exchanges</option>
                          <option>Financial Services</option>
                          <option>FinTech</option>
                          <option>Fraud Detection</option>
                          <option>Funding Platform</option>
                          <option>Gift Card</option>
                          <option>Health Insurance</option>
                          <option>Hedge Funds</option>
                          <option>Impact Investing</option>
                          <option>Incubators</option>
                          <option>Insurance</option>
                          <option>InsurTech</option>
                          <option>Leasing</option>
                          <option>Lending</option>
                          <option>Life Insurance</option>
                          <option>Micro Lending</option>
                          <option>Mobile Payments</option>
                          <option>Payments</option>
                          <option>Personal Finance</option>
                          <option>Prediction Markets</option>
                          <option>Property Insurance</option>
                          <option>Real Estate Investment</option>
                          <option>Stock Exchanges</option>
                          <option>Trading Platform</option>
                          <option>Transaction Processing</option>
                          <option>Venture Capital</option>
                          <option>Virtual Currency</option>
                          <option>Wealth Management</option>
                        </Select>
                  </FormControl>
            </form>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button onClick={() => {
                updateCompanyInfo();
                }} variant='ghost'>Save {isSubmitted ? <CircularProgress size="22px" thickness="4px" isIndeterminate color="#3C2E26" /> : null}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  };

 function CompanyInfoData(props) {
    console.log('PARAMS', props);
    const fetcher = (companyDomain: string,...args: Parameters<typeof fetch>) => fetch(companyDomain).then(response => response.json());
    let paramsObj = {params: props.companyName};
    let searchParams = new URLSearchParams(paramsObj);
    console.log(searchParams);
  
    // Create a stable key for SWR
    searchParams.sort();
    const qs = searchParams.toString();

    console.log(qs);
  
    const { data, error } = useSWR(`/api/cors?${qs}`, fetcher);
    console.log('DATA: ', data);
    
    // Save this data to ceramic
    // In the modal - if ceramic has data about the first company, then show it in there, if not empty
    // On saving the modal, the user will see an image of the company logo on their profile
    // On hovering on the saved profile - they can click edit to pop up the modal again
    // On page load, if ceramic has data, then the logo should appear + edit button on hover
    
    return (
      <>
        { data && data.message && data.message.logo ? (
          <Box w="full" borderRadius='lg' overflow='hidden' p={4}>
            <Img
                height="30px"
                src={data.message.logo}
                alt={data.message.domain}
            />
        </Box>
        ) : null}
      </>
    )
  }


  export default CompanyModal;