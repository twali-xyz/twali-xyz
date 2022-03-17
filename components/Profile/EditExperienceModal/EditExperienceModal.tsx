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
import { setEventArray } from "../helpers/setEventArray";
import { listOfCountries } from "../../../utils/profileUtils";
import { UserData } from "../../../utils/interfaces";

const EditExperienceModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profileData, setProfileData] = useState(props.profileData);

  const [accType, setAccType] = useState(props.profileData.accType);
  const [identity, setIdentity] = useState(props.profileData);
  const [values, setValues] = useState({
    firstName: props.profileData.firstName,
    lastName: props.profileData.lastName,
    currTitle: props.profileData.currTitle,
    currLocation: props.profileData.currLocation,
    bio: props.profileData.bio,
    linkedIn: props.profileData.linkedIn,
    twitter: props.profileData.twitter,
    userName: props.profileData.userName,
    email: props.profileData.email,
  });
  const [userData, setUserData] = useState<UserData>({
    userName: "",
    userWallet: "",
    accType: "",
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    twitter: "",
    linkedIn: "",
    website: "",
    businessName: "",
    businessType: "",
    businessLocation: "",
    currTitle: "",
    currLocation: "",
    funcExpertise: [],
    industryExpertise: [],
    companyInfo: [],
  });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    currTitle: null,
    bio: null,
    linkedIn: null,
    twitter: null,
    userName: null,
    email: null,
  });

  async function updateExperiences() {
    setErrors(validate(values));
    const address = await connect(); // first address in the array

    if (address) {
      setIsSubmitted(true);

      // TODO: Need to run a update profile call here
      if (profileData.firstName && profileData.lastName && profileData.email) {
        setIsSubmitted(false);
        props.handleUpdatedExperiences(profileData, false);
        props.onClose();
      } else {
        console.log("No profile, pls create one...");
      }
    }
  }

  const validate = (values) => {
    let errors: any = {};

    if (!values.userName) {
      errors.userName = "User name is required";
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
    const value = evt.target.value;
    const strippedEventName = evt.target.name.substring(
      0,
      evt.target.name.length - 1
    );
    if (
      strippedEventName === "funcExpertise" ||
      strippedEventName === "industryExpertise"
    ) {
      // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
      setEventArray({ evt, values, setValues, userData, setUserData });
    } else {
      setProfileData((values) => ({
        ...values,
        [evt.target.name]: value,
      }));
      setUserData({
        ...userData,
        [evt.target.name]: value,
      });
    }
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
                <FormLabel>User name</FormLabel>
                <Input
                  required
                  isInvalid={
                    errors.userName &&
                    (!props.profileData.userName || !values.userName)
                  }
                  errorBorderColor="red.300"
                  placeholder="Display name"
                  name="userName"
                  defaultValue={values.userName || ""}
                  onChange={handleChange}
                />
                {errors.userName &&
                  (!props.profileData.userName || !values.userName) && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.userName}
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
                    (!props.profileData.firstName || !values.firstName)
                  }
                  errorBorderColor="red.300"
                  placeholder="First name"
                  name="firstName"
                  defaultValue={identity.firstName || ""}
                  onChange={handleChange}
                />
                {errors.firstName &&
                  (!props.profileData.firstName || !values.firstName) && (
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
                    (!props.profileData.lastName || !values.lastName)
                  }
                  errorBorderColor="red.300"
                  placeholder="Last name"
                  name="lastName"
                  defaultValue={identity.lastName || ""}
                  onChange={handleChange}
                />
                {errors.lastName &&
                  (!props.profileData.lastName || !values.lastName) && (
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
                    errors.email && props.profileData.email === values.email
                  }
                  errorBorderColor="red.300"
                  placeholder="Email"
                  name="email"
                  defaultValue={values.email || ""}
                  onChange={handleChange}
                />
                {errors.email && props.profileData.email !== values.email && (
                  <Text fontSize="xs" fontWeight="400" color="red.500">
                    {errors.email}
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
