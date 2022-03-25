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

const EditProfileModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState<UserData>(props.userData);
  const [values, setValues] = useState({
    firstName: props.userData.firstName,
    lastName: props.userData.lastName,
    currTitle: props.userData.currTitle,
    currLocation: props.userData.currLocation,
    bio: props.userData.bio,
    linkedIn: props.userData.linkedIn,
    twitter: props.userData.twitter,
    userName: props.userData.userName,
    email: props.userData.email,
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

      // Update user data with the new changes
      if (
        userData.userWallet &&
        userData.userName &&
        userData.firstName &&
        userData.lastName &&
        userData.currTitle
      ) {
        let experienceAttributes = {
          userName: userData.userName,
          firstName: userData.firstName,
          lastName: userData.lastName,
          currTitle: userData.currTitle,
          currLocation: userData.currLocation ? userData.currLocation : null,
          bio: userData.bio ? userData.bio : null,
          linkedIn: userData.linkedIn ? userData.linkedIn : null,
          twitter: userData.twitter ? userData.twitter : null,
          email: userData.email ? userData.email : null,
        };

        updateUserProfile(userData.userWallet, experienceAttributes);
        props.handleUpdatedExperiences(userData, false);
        props.onClose();
        window.location.reload();
        setIsSubmitted(false);
      } else {
        console.log("No profile, pls create one...");
      }
    }
  }

  const updateUserProfile = async (userWallet, attributes) => {
    let userData = { userWallet, attributes };
    await fetch(`/api/users/updateUser?updateUser=profile`, {
      method: "PUT",
      body: JSON.stringify({ userData }),
    });
    console.log("USER profile UPDATED BRUH");
  };

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

    if (values.functionalExpertise === "") {
      errors.functionalExpertise = "Functional expertise is required";
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
      strippedEventName === "functionalExpertise" ||
      strippedEventName === "industryExpertise"
    ) {
      // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
      setEventArray({ evt, values, setValues, userData, setUserData });
    } else {
      setUserData({
        ...userData,
        [evt.target.name]: value,
      });
    }
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
              {/* <FormControl p={2} id="display-name" isRequired>
                <FormLabel>User name</FormLabel>
                <Input
                  required
                  isInvalid={
                    errors.userName &&
                    (!props.userData.userName || !values.userName)
                  }
                  errorBorderColor="red.300"
                  placeholder="Display name"
                  name="userName"
                  defaultValue={userData.userName || ""}
                  onChange={handleChange}
                />
                {errors.userName &&
                  (!props.userData.userName || !values.userName) && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.userName}
                    </Text>
                  )}
              </FormControl> */}

              <FormControl p={2} id="first-name" isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  required
                  isInvalid={
                    errors.firstName &&
                    (!props.userData.firstName || !values.firstName)
                  }
                  errorBorderColor="red.300"
                  placeholder="First name"
                  name="firstName"
                  defaultValue={userData.firstName || ""}
                  onChange={handleChange}
                />
                {errors.firstName &&
                  (!props.userData.firstName || !values.firstName) && (
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
                    (!props.userData.lastName || !values.lastName)
                  }
                  errorBorderColor="red.300"
                  placeholder="Last name"
                  name="lastName"
                  defaultValue={userData.lastName || ""}
                  onChange={handleChange}
                />
                {errors.lastName &&
                  (!props.userData.lastName || !values.lastName) && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.lastName}
                    </Text>
                  )}
              </FormControl>
              <FormControl p={2} id="current-company-title" isRequired>
                <FormLabel>Current title</FormLabel>
                <Input
                  isInvalid={errors.currTitle}
                  errorBorderColor="red.300"
                  defaultValue={values.currTitle || ""}
                  required
                  placeholder="Current title"
                  name="currTitle"
                  onChange={handleChange}
                />
                {errors.currTitle && (
                  <Text fontSize="xs" fontWeight="400" color="red.500">
                    {errors.currTitle}
                  </Text>
                )}
              </FormControl>
              <FormControl p={2} id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  required
                  isInvalid={
                    errors.email && props.userData.email === values.email
                  }
                  errorBorderColor="red.300"
                  placeholder="Email"
                  name="email"
                  defaultValue={userData.email || ""}
                  onChange={handleChange}
                />
                {errors.email && props.userData.email !== values.email && (
                  <Text fontSize="xs" fontWeight="400" color="red.500">
                    {errors.email}
                  </Text>
                )}
              </FormControl>

              <FormControl p={2} id="currLocation" isRequired>
                <FormLabel>Where do you call home?</FormLabel>
                <Select
                  defaultValue={userData.currLocation || ""}
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
                  defaultValue={userData.bio || ""}
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
                  defaultValue={userData.linkedIn || ""}
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
                  defaultValue={userData.twitter || ""}
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

export default EditProfileModal;
