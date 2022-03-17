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
  Select,
  Textarea,
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
import { BasicProfile, ProfileData } from "../../../utils/interfaces";
import { listOfCountries } from "../../../utils/profileUtils";

// 3box test nodes with read/write access on ceramic clay testnet
// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

const EditExperienceModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profileData, setProfileData] = useState(props.profileData);

  const [accType, setAccType] = useState(props.profileData.content.accType);
  const [identity, setIdentity] = useState(props.profileData.content.identity);
  const [values, setValues] = useState({
    firstName: props.profileData.content.identity.firstName,
    lastName: props.profileData.content.identity.lastName,
    currTitle: props.profileData.content.identity.currTitle,
    currLocation: props.profileData.content.identity.currLocation,
    bio: props.profileData.content.identity.bio,
    linkedIn: props.profileData.content.identity.linkedIn,
    twitter: props.profileData.content.identity.twitter,
    displayName: props.profileData.content.identity.displayName,
    email: props.profileData.content.identity.email,
  });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    currTitle: null,
    bio: null,
    linkedIn: null,
    twitter: null,
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
  console.log(props);

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
              {/* <FormControl p={2}>
                isInvalid={!!errors.file_}
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
              {/* </FormControl> */}
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
                  defaultValue={identity.firstName || ""}
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
                  defaultValue={identity.lastName || ""}
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
                  defaultValue={identity.currTitle || ""}
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
                <Select
                  defaultValue={identity.currLocation || ""}
                  placeholder="Select current location"
                  name="currLocation"
                  onChange={handleChange}
                >
                  {listOfCountries()}
                </Select>
              </FormControl>
              <FormControl p={2} id="bio">
                <FormLabel>Bio</FormLabel>
                <Textarea
                  isInvalid={errors.bio}
                  errorBorderColor="red.300"
                  defaultValue={identity.bio || ""}
                  name="bio"
                  maxLength={280}
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
                  defaultValue={identity.linkedIn || ""}
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
                  defaultValue={identity.twitter || ""}
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
