import { useState, useRef } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
  Text,
  CircularProgress,
  Input,
} from "@chakra-ui/react";
import { connect } from "../../../utils/walletUtils";
import FileUpload from "../../FileUpload/FileUpload";
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

const EditProfileModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accType, setAccType] = useState(props.profileData.content.accType);
  const [identity, setIdentity] = useState(props.profileData.content.identity);
  const [fileUploaded, setFileUploaded] = useState();
  const [profileData, setProfileData] = useState(props.profileData);
  const [values, setValues] = useState({
    firstName: props.profileData.content.identity.firstName,
    lastName: props.profileData.content.identity.lastName,
    currTitle: props.profileData.content.identity.currTitle,
    bio: props.profileData.content.identity.bio,
    linkedIn: props.profileData.content.identity.linkedIn,
    twitter: props.profileData.content.identity.twitter,
  });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    currTitle: null,
    bio: null,
    linkedIn: null,
    twitter: null,
  });

  async function updateProfileInfo() {
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

      if (fileUploaded) {
        // await idx.merge('basicProfile', { image: '💻' })
        console.log(fileUploaded);
      }

      await updateProfileData(ceramic, identity, accType);

      console.log("Profile updated!");
      console.log(identity);

      if (identity.firstName && identity.lastName && identity.email) {
        setIsSubmitted(false);
        props.handleUpdatedProfile(profileData, false);
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

  const handleFile = (fileUploaded) => {
    setFileUploaded(fileUploaded);
  };

  const validate = (values) => {
    let errors: any = {};

    if (!values.firstName) {
      errors.firstName = "First name is required";
    }

    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!values.currTitle) {
      errors.currTitle = "Current title is required";
    }

    if (values.bio && values.bio.length > 280) {
      errors.bio = "Bio is too long. It should be less than 280 characters.";
    }

    var urlPattern =
      /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

    if (values.linkedIn && !urlPattern.test(values.linkedIn)) {
      errors.linkedIn = "Please enter a valid URL";
    }

    if (values.twitter && !urlPattern.test(values.twitter)) {
      errors.twitter = "Please enter a valid URL";
    }

    return errors;
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
          <ModalHeader>Edit your profile details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form style={{ alignSelf: "center" }}>
              <FormControl p={2}>
                {/* isInvalid={!!errors.file_} */}
                <FormLabel>{"Update profile picture"}</FormLabel>

                {/* <FileUpload
                handleFile={handleFile}
                >
                    <Button>
                    Upload
                    </Button>
                </FileUpload> */}

                {/* <FormErrorMessage>
                    {errors.file_ && errors?.file_.message}
                </FormErrorMessage> */}
              </FormControl>
              <FormControl p={2} id="first-name" isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  required
                  isInvalid={
                    errors.firstName &&
                    (!props.profileData.content.identity.firstName ||
                      !values.firstName)
                  }
                  errorBorderColor="red.300"
                  placeholder="First name"
                  name="firstName"
                  defaultValue={
                    props.profileData.content.identity.firstName || ""
                  }
                  onChange={handleChange}
                />
                {errors.firstName &&
                  (!props.profileData.content.identity.firstName ||
                    !values.firstName) && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.firstName}
                    </Text>
                  )}
              </FormControl>
              <FormControl p={2} id="last-name" isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  required
                  isInvalid={
                    errors.lastName &&
                    (!props.profileData.content.identity.lastName ||
                      !values.lastName)
                  }
                  errorBorderColor="red.300"
                  placeholder="Last name"
                  name="lastName"
                  defaultValue={
                    props.profileData.content.identity.lastName || ""
                  }
                  onChange={handleChange}
                />
                {errors.lastName &&
                  (!props.profileData.content.identity.lastName ||
                    !values.lastName) && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.lastName}
                    </Text>
                  )}
              </FormControl>
              <FormControl p={2} id="current-title" isRequired>
                <FormLabel>What's your current title?</FormLabel>
                <Input
                  isInvalid={
                    errors.currTitle &&
                    (!props.profileData.content.identity.currTitle ||
                      !values.currTitle)
                  }
                  required
                  errorBorderColor="red.300"
                  defaultValue={
                    props.profileData.content.identity.currTitle || ""
                  }
                  name="currTitle"
                  onChange={handleChange}
                />
                {errors.currTitle &&
                  (!props.profileData.content.identity.currTitle ||
                    !values.currTitle) && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.currTitle}
                    </Text>
                  )}
              </FormControl>
              <FormControl p={2} id="currLocation" isRequired>
                <FormLabel>Where do you call home?</FormLabel>
                <Input
                  defaultValue={
                    props.profileData.content.identity.currLocation || ""
                  }
                  name="currLocation"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl p={2} id="bio">
                <FormLabel>Bio</FormLabel>
                <Textarea
                  isInvalid={errors.bio}
                  errorBorderColor="red.300"
                  defaultValue={props.profileData.content.identity.bio || ""}
                  name="bio"
                  onChange={handleChange}
                />
                {errors.bio && (
                  <Text fontSize="xs" fontWeight="400" color="red.500">
                    {errors.bio}
                  </Text>
                )}
              </FormControl>
              <FormControl p={2} id="linkedIn">
                <FormLabel>LinkedIn URL</FormLabel>
                <Input
                  isInvalid={errors.linkedIn}
                  errorBorderColor="red.300"
                  name="linkedIn"
                  defaultValue={
                    props.profileData.content.identity.linkedIn || ""
                  }
                  onChange={handleChange}
                />
                {errors.linkedIn && (
                  <Text fontSize="xs" fontWeight="400" color="red.500">
                    {errors.linkedIn}
                  </Text>
                )}
              </FormControl>
              <FormControl p={2} id="twitter">
                <FormLabel>Twitter URL</FormLabel>
                <Input
                  isInvalid={errors.twitter}
                  errorBorderColor="red.300"
                  name="twitter"
                  defaultValue={
                    props.profileData.content.identity.twitter || ""
                  }
                  onChange={handleChange}
                />
                {errors.twitter && (
                  <Text fontSize="xs" fontWeight="400" color="red.500">
                    {errors.twitter}
                  </Text>
                )}
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={updateProfileInfo}>
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

export default EditProfileModal;
