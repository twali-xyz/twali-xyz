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

import CeramicClient from "@ceramicnetwork/http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";

import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { DID } from "dids";
import { IDX } from "@ceramicstudio/idx";
import { TileDocument } from "@ceramicnetwork/stream-tile";

// 3box test nodes with read/write access on ceramic clay testnet
// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

export interface ProfileData {
  content: {
    identity: Identity;
    accType: string;
  };
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
  uuid: string;
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

const EditExperienceModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accType, setAccType] = useState(props.profileData.content.accType);
  const [identity, setIdentity] = useState(props.profileData.content.identity);
  const [profileData, setProfileData] = useState(props.profileData);
  const [values, setValues] = useState({
    displayName: props.profileData.content.identity.displayName,
    email: props.profileData.content.identity.email,
  });
  const [errors, setErrors] = useState({
    displayName: null,
    email: null,
  });

  async function updateExperiences() {
    setErrors(validate(values));
    const address = await connect(); // first address in the array

    if (address) {
      const ceramic = new CeramicClient(endpoint);
      const threeIdConnect = new ThreeIdConnect();
      const provider = new EthereumAuthProvider(window.ethereum, address);

      setIsSubmitted(true);

      await threeIdConnect.connect(provider);

      const did = new DID({
        provider: threeIdConnect.getDidProvider(),
        resolver: {
          ...ThreeIdResolver.getResolver(ceramic),
        },
      });

      ceramic.setDID(did);
      await ceramic.did.authenticate();

      const idx = new IDX({ ceramic });

      // does not require signing to get user's public data
      const data: BasicProfile = await idx.get(
        "basicProfile",
        `${address}@eip155:1`
      );
      console.log("data: ", data);

      await updateProfileData(ceramic, identity, accType);

      console.log("Profile updated!");
      console.log(identity);

      if (identity.firstName && identity.lastName && identity.email) {
        setIsSubmitted(false);
        props.handleUpdatedExperiences(profileData, false);
        props.onClose();
      } else {
        console.log("No profile, pls create one...");
      }
    }
  }

  // Updates a stream to store JSON data with ceramic
  const updateProfileData = async (ceramic, identity, accType) => {
    const profileData = await TileDocument.deterministic(ceramic, {
      family: "user-profile-data",
    });

    await profileData.update({ identity, accType });
  };

  const validate = (values) => {
    let errors: any = {};

    if (!values.displayName) {
      errors.displayName = "Display name is required";
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
    setIdentity({
      ...identity,
      [evt.target.name]: evt.target.value,
    });
    const newProfileData: ProfileData = {
      content: {
        identity: identity,
        accType: props.profileData.content.accType,
      },
    };
    setProfileData(newProfileData);
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
                <FormLabel>Display name</FormLabel>
                <Input
                  required
                  isInvalid={
                    errors.displayName &&
                    (!props.profileData.content.identity.displayName ||
                      !values.displayName)
                  }
                  errorBorderColor="red.300"
                  placeholder="Display name"
                  name="displayName"
                  defaultValue={
                    props.profileData.content.identity.displayName || ""
                  }
                  onChange={handleChange}
                />
                {errors.displayName &&
                  (!props.profileData.content.identity.displayName ||
                    !values.displayName) && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.displayName}
                    </Text>
                  )}
              </FormControl>
              <FormControl p={2} id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  required
                  isInvalid={
                    errors.email &&
                    props.profileData.content.identity.email === values.email
                  }
                  errorBorderColor="red.300"
                  placeholder="Email"
                  name="email"
                  defaultValue={props.profileData.content.identity.email || ""}
                  onChange={handleChange}
                />
                {errors.email &&
                  props.profileData.content.identity.email !== values.email && (
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
                    props.profileData.content.identity.funcExpertise
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
                    props.profileData.content.identity.industryExpertise
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
