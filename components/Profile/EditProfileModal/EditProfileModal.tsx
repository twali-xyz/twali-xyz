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

const EditProfileModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileUploaded, setFileUploaded] = useState();
  const [profileData, setProfileData] = useState(props.profileData);
  const [values, setValues] = useState({
    firstName: props.profileData.firstName,
    lastName: props.profileData.lastName,
    currTitle: props.profileData.currTitle,
    bio: props.profileData.bio,
    linkedIn: props.profileData.linkedIn,
    twitter: props.profileData.twitter,
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
      setIsSubmitted(true);

      if (fileUploaded) {
        console.log(fileUploaded);
      }

      // TODO: Need to run a update profile call here
      if (profileData.userWallet && profileData.userName && profileData.firstName && profileData.lastName && profileData.currTitle) {
        let userData = await getUser(profileData.userName);
        
        // Unmarshalling company data from dynamodb and saving it to the current userData state
        const formattedData = await convertFromDB(userData.companyInfo);
        userData.companyInfo = formattedData;

        let experienceAttributes = {
          userName: profileData.userName,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          currTitle: profileData.currTitle,
          bio: profileData.bio ? profileData.bio: null,
          linkedIn: profileData.linkedIn ? profileData.linkedIn: null,
          twitter: profileData.twitter ? profileData.twitter: null,
        };
        userData.userName = profileData.userName;
        userData.firstName = profileData.firstName;
        userData.lastName = profileData.lastName;
        userData.currTitle = profileData.currTitle;
        userData.bio = profileData.bio ? profileData.bio: null;
        userData.linkedIn = profileData.linkedIn ? profileData.linkedIn: null;
        userData.twitter = profileData.twitter ? profileData.twitter: null;
        console.log(profileData);
        updateUserProfile(profileData.userWallet, experienceAttributes);
        // setProfileData({ ...userData });

        props.handleUpdatedProfile(userData);
        props.onClose();
        setIsSubmitted(false);
      } else {
        console.log("No profile, pls create one...");
      }
    }
  }

  const updateUserProfile = async (userWallet, attributes) => {
    let userData = { userWallet, attributes}
    await fetch(`/api/users/updateUser?updateUser=profile`, {
      method: "PUT",
      body: JSON.stringify({ userData }),
    });
    console.log("USER profile UPDATED BRUH");
  };

  const getUser = async (userName) => {
    const res = await fetch(
      `/api/users/${userName}`
    );

    const data: any = await res.json();

    console.log("RETRIEVE USER BY username YO");
    return data;
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
                    (!props.profileData.firstName ||
                      !values.firstName)
                  }
                  errorBorderColor="red.300"
                  placeholder="First name"
                  name="firstName"
                  defaultValue={
                    props.profileData.firstName || ""
                  }
                  onChange={handleChange}
                />
                {errors.firstName &&
                  (!props.profileData.firstName ||
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
                    (!props.profileData.lastName ||
                      !values.lastName)
                  }
                  errorBorderColor="red.300"
                  placeholder="Last name"
                  name="lastName"
                  defaultValue={
                    props.profileData.lastName || ""
                  }
                  onChange={handleChange}
                />
                {errors.lastName &&
                  (!props.profileData.lastName ||
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
                    (!props.profileData.currTitle ||
                      !values.currTitle)
                  }
                  required
                  errorBorderColor="red.300"
                  defaultValue={
                    props.profileData.currTitle || ""
                  }
                  name="currTitle"
                  onChange={handleChange}
                />
                {errors.currTitle &&
                  (!props.profileData.currTitle ||
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
                    props.profileData.currLocation || ""
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
                  defaultValue={props.profileData.bio || ""}
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
                    props.profileData.linkedIn || ""
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
                    props.profileData.twitter || ""
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
