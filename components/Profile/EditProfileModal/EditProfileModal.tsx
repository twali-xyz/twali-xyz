import { useState, useRef, useContext } from "react";
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
  Select,
} from "@chakra-ui/react";
import { connect } from "../../../utils/walletUtils";
import FileUpload from "../../FileUpload/FileUpload";
import CeramicClient from "@ceramicnetwork/http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";

import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { DID } from "dids";
import { IDX } from "@ceramicstudio/idx";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import {
  BasicProfile,
  ProfileData,
  TwaliContext,
} from "../../TwaliProvider/TwaliProvider";
import { listOfCountries } from "../../../utils/profileUtils";

// 3box test nodes with read/write access on ceramic clay testnet
// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

const EditProfileModal = (props) => {
  const { identity, setIdentity } = useContext(TwaliContext);
  const finalRef = useRef();
  const [fileUploaded, setFileUploaded] = useState();
  const [profileData, setProfileData] = useState(props.profileData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accType, setAccType] = useState(profileData.content.accType);
  const [values, setValues] = useState({
    firstName: profileData.content.identity.firstName,
    lastName: profileData.content.identity.lastName,
    currTitle: profileData.content.identity.currTitle,
    bio: profileData.content.identity.bio,
    linkedIn: profileData.content.identity.linkedIn,
    twitter: profileData.content.identity.twitter,
  });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    currTitle: null,
    bio: null,
    linkedIn: null,
    twitter: null,
    logo: null,
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

      if (fileUploaded) {
        // await idx.merge('basicProfile', { image: '💻' })
        console.log(fileUploaded);
      }

      await updateProfileData(ceramic, identity, accType);

      console.log("Profile updated!");

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
        accType: profileData.content.accType,
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
                    (!profileData.content.identity.firstName ||
                      !values.firstName)
                  }
                  errorBorderColor="red.300"
                  placeholder="First name"
                  name="firstName"
                  defaultValue={profileData.content.identity.firstName || ""}
                  onChange={handleChange}
                />
                {errors.firstName &&
                  (!profileData.content.identity.firstName ||
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
                    (!profileData.content.identity.lastName || !values.lastName)
                  }
                  errorBorderColor="red.300"
                  placeholder="Last name"
                  name="lastName"
                  defaultValue={profileData.content.identity.lastName || ""}
                  onChange={handleChange}
                />
                {errors.lastName &&
                  (!profileData.content.identity.lastName ||
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
                    (!profileData.content.identity.currTitle ||
                      !values.currTitle)
                  }
                  required
                  errorBorderColor="red.300"
                  defaultValue={profileData.content.identity.currTitle || ""}
                  name="currTitle"
                  onChange={handleChange}
                />
                {errors.currTitle &&
                  (!profileData.content.identity.currTitle ||
                    !values.currTitle) && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.currTitle}
                    </Text>
                  )}
              </FormControl>
              <FormControl p={2} id="currLocation" isRequired>
                <FormLabel>Where do you call home?</FormLabel>

                <Select
                  defaultValue={
                    props.profileData.content.identity.currLocation
                      ? props.profileData.content.identity.currLocation
                      : ""
                  }
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
                  maxLength={280}
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
                  defaultValue={profileData.content.identity.linkedIn || ""}
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
                  defaultValue={profileData.content.identity.twitter || ""}
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
