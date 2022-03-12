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
import { MultiSelect } from "../Components/MultiSelect";
import { functionalExpertiseList } from "../../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../../utils/industryExpertiseConstants";
import { setEventArray } from "../helpers/setEventArray";

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
  functionalExpertise: any[];
  industryExpertise: any[];

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

const EditExperienceModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profileData, setProfileData] = useState(props.profileData);

  const [accType, setAccType] = useState(props.profileData.content.accType);
  const [identity, setIdentity] = useState(props.profileData.content.identity);
  const [values, setValues] = useState({
    displayName: props.profileData.content.identity.displayName,
    email: props.profileData.content.identity.email,
    functionalExpertise: props.profileData.content.identity.functionalExpertise,
    industryExpertise: props.profileData.content.identity.industryExpertise,
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

      await updateProfileData(ceramic, identity, accType);

      console.log("Profile updated!");

      if (identity.firstName && identity.lastName && identity.email) {
        setIsSubmitted(false);
        props.setProfileData(newProfileData);
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

    if (values.functionalExpertise === "") {
      errors.functionalExpertise = "Functional expertise is required";
    }

    if (values.industryExpertise === "") {
      errors.industryExpertise = "Industry expertise is required";
    }

    return errors;
  };
  let newProfileData: ProfileData;
  const handleChange = (evt) => {
    evt.persist();
    const strippedEventName = evt.target.name.substring(
      0,
      evt.target.name.length - 1
    );
    if (
      strippedEventName === "functionalExpertise" ||
      strippedEventName === "industryExpertise"
    ) {
      // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
      setEventArray({ evt, setValues, values, setIdentity, identity });
    } else {
      setValues((values) => ({
        ...values,
        [evt.target.name]: evt.target.value,
      }));
      setIdentity({
        ...identity,
        [evt.target.name]: evt.target.value,
      });
    }
    newProfileData = {
      content: {
        identity: identity,
        accType: props.profileData.content.accType,
      },
    };
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
                  defaultValue={values.displayName || ""}
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
                  defaultValue={values.email || ""}
                  onChange={handleChange}
                />
                {errors.email &&
                  props.profileData.content.identity.email !== values.email && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.email}
                    </Text>
                  )}
              </FormControl>
              <MultiSelect
                formLabel={"So...what would you say you do?"}
                name={"functionalExpertise"}
                handleChange={handleChange}
                options={functionalExpertiseList}
                defaultValues={
                  values.functionalExpertise ||
                  props.profileData.content.identity.functionalExpertise
                }
                maxSelections={3}
              />
              <MultiSelect
                formLabel={"Where would you say you work?"}
                name={"industryExpertise"}
                handleChange={handleChange}
                options={industryExpertiseList}
                defaultValues={
                  values.industryExpertise ||
                  props.profileData.content.identity.industryExpertise
                }
                maxSelections={3}
              />
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
