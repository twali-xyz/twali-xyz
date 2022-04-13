import { useState, useRef, useEffect } from "react";
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
import { listOfCountries } from "../../../utils/profileUtils";
import useUser from "../../../context/TwaliContext";
import { UserData } from "../../../utils/interfaces";

const EditProfileModal = (props) => {
  const finalRef = useRef();
  const { editProfile, ...userState } = useUser();
  const [values, setValues] = useState<UserData>();
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!props.isOpen) return;
    setValues({
      ...userState,
      editProfile: editProfile,
      firstName: userState.firstName,
      lastName: userState.lastName,
      currTitle: userState.currTitle,
      currLocation: userState.currLocation,
      bio: userState.bio,
      linkedIn: userState.linkedIn,
      twitter: userState.twitter,
      userName: userState.userName,
      email: userState.email,
    });
  }, [props.isOpen]);

  async function updateExperiences() {
    setErrors(validate(values));
    const address = await connect(); // first address in the array

    if (address) {
      setIsSubmitted(true);

      // Update user data with the new changes
      if (
        userState.userWallet &&
        values.userName &&
        values.firstName &&
        values.lastName &&
        values.currTitle
      ) {
        let experienceAttributes = {
          userName: values.userName,
          firstName: values.firstName,
          lastName: values.lastName,
          currTitle: values.currTitle,
          currLocation: values.currLocation ? values.currLocation : null,
          bio: values.bio ? values.bio : null,
          linkedIn: values.linkedIn ? values.linkedIn : null,
          twitter: values.twitter ? values.twitter : null,
          email: values.email ? values.email : null,
        };

        updateUserProfile(userState.userWallet, experienceAttributes);
        editProfile(experienceAttributes);
        props.onClose();
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

    return errors;
  };
  const handleChange = (evt) => {
    evt.persist();
    const value = evt.target.value;
    setValues({
      ...values,
      [evt.target.name]: value,
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
        <ModalContent
          backgroundColor={"n6"}
          boxShadow={"8px 16px 24px 0px #062B2A8F"}
          border={"1px solid rgba(88, 112, 112, 1)"}
          fontFamily={"PP Telegraf Light"}
        >
          <ModalHeader mt={"20px"}>Update your profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form style={{ alignSelf: "center" }}>
              {/* <FormControl p={2} id="display-name" isRequired>
 fontFamily={"PP Telegraf"}                <Input
                  required
                  isInvalid={
                    errors.userName &&
                    (!userState.userName || !values.userName)
                  }
                  errorBorderColor="red.300"
                  placeholder="Display name"
                  name="userName"
                  defaultValue={userData.userName || ""}
                  onChange={handleChange}
                />
                {errors.userName &&
                  (!userState.userName || !values.userName) && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.userName}
                    </Text>
                  )}
              </FormControl> */}

              <FormControl p={2} id="first-name" isRequired>
                <FormLabel
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  fontFamily={"PP Telegraf"}
                >
                  First name
                </FormLabel>
                <Input
                  required
                  isInvalid={
                    errors.firstName &&
                    (!userState.firstName || !values.firstName)
                  }
                  errorBorderColor="red.300"
                  placeholder="First name"
                  name="firstName"
                  defaultValue={userState.firstName || ""}
                  onChange={handleChange}
                />
                {errors.firstName &&
                  (!userState.firstName || !values.firstName) && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.firstName}
                    </Text>
                  )}
              </FormControl>
              <FormControl p={2} id="last-name" isRequired>
                <FormLabel
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  fontFamily={"PP Telegraf"}
                >
                  Last name
                </FormLabel>
                <Input
                  required
                  isInvalid={
                    errors.lastName && (!userState.lastName || !values.lastName)
                  }
                  errorBorderColor="red.300"
                  placeholder="Last name"
                  name="lastName"
                  defaultValue={userState.lastName || ""}
                  onChange={handleChange}
                />
                {errors.lastName && (!userState.lastName || !values.lastName) && (
                  <Text fontSize="xs" fontWeight="400" color="red.500">
                    {errors.lastName}
                  </Text>
                )}
              </FormControl>
              <FormControl p={2} id="current-company-title" isRequired>
                <FormLabel
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  fontFamily={"PP Telegraf"}
                >
                  Current title
                </FormLabel>
                <Input
                  isInvalid={errors.currTitle}
                  errorBorderColor="red.300"
                  defaultValue={userState.currTitle || ""}
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
                <FormLabel
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  fontFamily={"PP Telegraf"}
                >
                  Email
                </FormLabel>
                <Input
                  required
                  isInvalid={errors.email && userState.email === values.email}
                  errorBorderColor="red.300"
                  placeholder="Email"
                  name="email"
                  defaultValue={userState.email || ""}
                  onChange={handleChange}
                />
                {errors.email && userState.email !== values.email && (
                  <Text fontSize="xs" fontWeight="400" color="red.500">
                    {errors.email}
                  </Text>
                )}
              </FormControl>

              <FormControl p={2} id="currLocation" isRequired>
                <FormLabel
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  fontFamily={"PP Telegraf"}
                >
                  Where do you call home?
                </FormLabel>
                <Select
                  defaultValue={userState.currLocation || ""}
                  placeholder="Select current location"
                  name="currLocation"
                  onChange={handleChange}
                >
                  {listOfCountries()}
                </Select>
              </FormControl>
              <FormControl p={2} id="bio">
                <FormLabel
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  fontFamily={"PP Telegraf"}
                >
                  Bio
                </FormLabel>
                <Textarea
                  isInvalid={errors.bio}
                  errorBorderColor="red.300"
                  defaultValue={userState.bio || ""}
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
                <FormLabel
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  fontFamily={"PP Telegraf"}
                >
                  LinkedIn URL
                </FormLabel>
                <Input
                  isInvalid={errors.linkedIn}
                  errorBorderColor="red.300"
                  name="linkedIn"
                  defaultValue={userState.linkedIn || ""}
                  onChange={handleChange}
                />
                {errors.linkedIn && (
                  <Text fontSize="xs" fontWeight="400" color="red.500">
                    {errors.linkedIn}
                  </Text>
                )}
              </FormControl>
              <FormControl p={2} id="twitter">
                <FormLabel
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  fontFamily={"PP Telegraf"}
                >
                  Twitter URL
                </FormLabel>
                <Input
                  isInvalid={errors.twitter}
                  errorBorderColor="red.300"
                  name="twitter"
                  defaultValue={userState.twitter || ""}
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
            <Button variant="primary" size={"sm"} onClick={updateExperiences}>
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
