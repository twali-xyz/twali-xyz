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
  CircularProgress,
} from "@chakra-ui/react";
import { connect } from "../../../utils/walletUtils";

import { MultiSelect } from "../Components/MultiSelect";
import { functionalExpertiseList } from "../../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../../utils/industryExpertiseConstants";
import { setEventArray } from "../helpers/setEventArray";
import { UserData } from "../../../utils/interfaces";
import FileUpload from "../../FileUpload/FileUpload";

const EditExperienceModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileUploaded, setFileUploaded] = useState();
  const [profileData, setProfileData] = useState(props.profileData);
  const [values, setValues] = useState({
    funcExpertise: props.profileData.funcExpertise,
    industryExpertise: props.profileData.industryExpertise,
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
    industryExpertise: null,
    funcExpertise: null,
  });

  async function updateExperiences() {
    setErrors(validate(values));
    const address = await connect(); // first address in the array

    if (address) {
      setIsSubmitted(true);

      if (fileUploaded) {
        console.log(fileUploaded);
      }

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
    const strippedEventName = evt.target.name.substring(
      0,
      evt.target.name.length - 1
    );
    if (
      strippedEventName === "funcExpertise" ||
      strippedEventName === "industryExpertise"
    ) {
      // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
      setEventArray({ evt, setValues, values, userData, setUserData });
    } else {
      setValues((values) => ({
        ...values,
        [evt.target.name]: evt.target.value,
      }));
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
              <MultiSelect
                formLabel={"So...what would you say you do?"}
                name={"funcExpertise"}
                handleChange={handleChange}
                options={functionalExpertiseList}
                defaultValues={
                  values.funcExpertise || props.profileData.funcExpertise
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
                  props.profileData.industryExpertise
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
