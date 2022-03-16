import { useState, useRef } from "react";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import { connect } from "../../../utils/walletUtils";
import { convertFromDB } from '../../../utils/profileUtils';

export interface UserData {
  userName: string;
  userWallet: string;
  accType: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  twitter?: string;
  linkedIn?: string;
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

export interface CompanyInfo {
  companyName: string;
  companyTitle: string;
  companyImg: any;
  companyStart: Date;
  companyEnd: Date;
  companyFunc: string;
  companyIndustry: string;
}

const EditExperienceModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profileData, setProfileData] = useState(props.profileData);
  const [values, setValues] = useState({
    userName: props.profileData.userName,
    email: props.profileData.email,
  });
  const [errors, setErrors] = useState({
    userName: null,
    email: null,
  });

  async function updateExperiences() {
    setErrors(validate(values));
    const address = await connect(); // first address in the array

    if (address) {
      setIsSubmitted(true);

      // TODO: Need to run a update profile call here
      if (profileData.userWallet && profileData.userName && profileData.email && profileData.funcExpertise && profileData.industryExpertise) {
        let userData = await getUser(profileData.userName);

        // Unmarshalling company data from dynamodb and saving it to the current userData state
        const formattedData = convertFromDB(userData.companyInfo);
        userData.companyInfo = formattedData;

        let experienceAttributes = {
          userName: profileData.userName,
          email: profileData.email,
          funcExpertise: profileData.funcExpertise,
          industryExpertise: profileData.industryExpertise
        };
        userData.email = profileData.email;
        userData.funcExpertise = profileData.funcExpertise;
        userData.industryExpertise = profileData.industryExpertise;
        
        console.log(profileData);
        updateUserExperience(profileData.userWallet, experienceAttributes);
        console.log('Experience userData:', userData);
        props.handleUpdatedExperiences(userData);
        props.onClose();
        setIsSubmitted(false);
      } else {
        console.log("No profile, pls create one...");
      }
    }
  }

  const updateUserExperience = async (userWallet, attributes) => {
    let userData = { userWallet, attributes}
    await fetch(`/api/users/updateUser?updateUser=experience`, {
      method: "PUT",
      body: JSON.stringify({ userData }),
    });
    console.log("USER Experience UPDATED BRUH");
  };

  const getUser = async (userName) => {
    const res = await fetch(
      `/api/users/${userName}`
    );

    const data: any = await res.json();

    console.log("RETRIEVE USER BY username YO");
    return data;
  };


  const validate = (values) => {
    let errors: any = {};

    if (!values.userName) {
      errors.userName = "User name is required";
    }

    var emailPattern = /(.+)@(.+){1,}\.(.+){1,}/;

    if (!values.email) {
      errors.email = "Email address is required";
    }

    if (values.email && !emailPattern.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (values.funcExpertise === "") {
      errors.funcExpertise = "Functional expertise is required";
    }

    if (values.industryExpertise === "") {
      errors.industryExpertise = "Industry expertise is required";
    }

    return errors;
  };

  const handleChange = (evt) => {
    evt.persist();
    setValues((values) => ({ ...values, [evt.target.name]: evt.target.value }));
    setErrors(validate(values));
    setProfileData({
      ...profileData,
      [evt.target.name]: evt.target.value
    });
  };

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your background expertise</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form style={{ alignSelf: "center" }}>
              <FormControl p={2} id="display-name" isRequired>
                <FormLabel>User name</FormLabel>
                <Input
                  required
                  isInvalid={
                    errors.userName &&
                    (!props.profileData.userName ||
                      !values.userName)
                  }
                  errorBorderColor="red.300"
                  placeholder="User name"
                  name="userName"
                  defaultValue={
                    props.profileData.userName || ""
                  }
                  onChange={handleChange}
                />
                {errors.userName &&
                  (!props.profileData.userName ||
                    !values.userName) && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.userName}
                    </Text>
                  )}
              </FormControl>
              <FormControl p={2} id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  required
                  isInvalid={
                    errors.email &&
                    props.profileData.email === values.email
                  }
                  errorBorderColor="red.300"
                  placeholder="Email"
                  name="email"
                  defaultValue={props.profileData.email || ""}
                  onChange={handleChange}
                />
                {errors.email &&
                  props.profileData.email !== values.email && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.email}
                    </Text>
                  )}
              </FormControl>
              <FormControl p={2} id="functional-expertise" isRequired>
                <FormLabel>So...what would you say you do?</FormLabel>
                <Select
                  required
                  defaultValue={
                    props.profileData.funcExpertise
                  }
                  errorBorderColor="red.300"
                  placeholder="Select functional expertise"
                  name="funcExpertise"
                  onChange={handleChange}
                >
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
                {/* {errors.funcExpertise && (
                          <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.funcExpertise}</Text>
                        )} */}
              </FormControl>
              <FormControl p={2} id="industry-expertise" isRequired>
                <FormLabel>Where would you say you work?</FormLabel>
                <Select
                  required
                  defaultValue={
                    props.profileData.industryExpertise
                  }
                  placeholder="Select industry expertise"
                  name="industryExpertise"
                  onChange={handleChange}
                >
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
                {/* {errors.industryExpertise && (
                          <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.industryExpertise}</Text>
                        )} */}
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={updateExperiences}>
              Save{" "}
              {isSubmitted ? (
                <CircularProgress
                  size="22px"
                  thickness="4px"
                  isIndeterminate
                  color="#3C2E26"
                />
              ) : null}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditExperienceModal;
