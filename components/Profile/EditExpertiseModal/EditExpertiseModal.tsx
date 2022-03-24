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

const EditExpertiseModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState<UserData>(props.userData);
  const [values, setValues] = useState({
    functionalExpertise: props.userData.functionalExpertise,
    industryExpertise: props.userData.industryExpertise,
  });

  const [errors, setErrors] = useState({
    industryExpertise: null,
    functionalExpertise: null,
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
        values.functionalExpertise &&
        values.industryExpertise
      ) {
        let expertiseAttributes = {
          userName: userData.userName,
          functionalExpertise: values.functionalExpertise,
          industryExpertise: values.industryExpertise,
        };

        updateUserExpertise(userData.userWallet, expertiseAttributes);
        props.handleUpdatedExperiences(userData, false);
        props.onClose();
        window.location.reload();
        setValues({
          ...userData,
          functionalExpertise: values.functionalExpertise,
          industryExpertise: values.industryExpertise,
        });
        setUserData({
          ...userData,
          functionalExpertise: values.functionalExpertise,
          industryExpertise: values.industryExpertise,
        });

        setIsSubmitted(false);
      } else {
        console.log("No profile, pls create one...");
      }
    }
  }

  const updateUserExpertise = async (userWallet, attributes) => {
    let userData = { userWallet, attributes };
    await fetch(`/api/users/updateUser?updateUser=expertise`, {
      method: "PUT",
      body: JSON.stringify({ userData }),
    });
    console.log("USER expertise UPDATED BRUH");
  };

  const validate = (values) => {
    let errors: any = {};

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
    const strippedEventName = evt.target.name.substring(
      0,
      evt.target.name.length - 1
    );
    if (
      strippedEventName === "functionalExpertise" ||
      strippedEventName === "industryExpertise"
    ) {
      // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
      setEventArray({ evt, setValues, values, userData, setUserData });
    } else {
      setValues((values) => ({
        ...values,
        [evt.target.name]: evt.target.value,
      }));
      setUserData({
        ...userData,
        functionalExpertise: values.functionalExpertise,
        industryExpertise: values.industryExpertise,
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
              <MultiSelect
                name={"functionalExpertise"}
                formLabel={"Superpowers"}
                handleChange={handleChange}
                options={functionalExpertiseList}
                maxSelections={3}
                defaultValues={
                  values.functionalExpertise ||
                  props.userData.functionalExpertise ||
                  []
                }
              />

              <MultiSelect
                name={"industryExpertise"}
                formLabel={"Industry expertise"}
                handleChange={handleChange}
                defaultValues={
                  values.industryExpertise ||
                  props.userData.industryExpertise ||
                  []
                }
                options={industryExpertiseList}
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

export default EditExpertiseModal;
