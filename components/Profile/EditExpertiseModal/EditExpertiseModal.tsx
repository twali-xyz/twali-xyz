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
  CircularProgress,
} from "@chakra-ui/react";
import { connect } from "../../../utils/walletUtils";

import { MultiSelect } from "../Components/MultiSelect";
import { functionalExpertiseList } from "../../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../../utils/industryExpertiseConstants";
import { setEventArray } from "../helpers/setEventArray";
import useUser from "../../TwaliContext";

const EditExpertiseModal = (props) => {
  const finalRef = useRef();

  const { editExpertise, ...userState } = useUser();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState({
    functionalExpertise: userState.functionalExpertise,
    industryExpertise: userState.industryExpertise,
  });

  const [errors, setErrors] = useState({
    industryExpertise: null,
    functionalExpertise: null,
  });

  useEffect(() => {
    setValues({
      functionalExpertise: userState.functionalExpertise,
      industryExpertise: userState.industryExpertise,
    });
  }, []);

  async function updateExperiences() {
    setErrors(validate(values));
    const address = await connect(); // first address in the array

    if (address) {
      setIsSubmitted(true);

      // Update user data with the new changes
      if (
        userState.userWallet &&
        userState.userName &&
        values.functionalExpertise &&
        values.industryExpertise
      ) {
        let expertiseAttributes = {
          userName: userState.userName,
          functionalExpertise: values.functionalExpertise,
          industryExpertise: values.industryExpertise,
        };

        updateUserExpertise(userState.userWallet, expertiseAttributes);
        props.onClose();
        setValues({
          ...userState,
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
    editExpertise(values.functionalExpertise, values.industryExpertise);
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

    // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
    setEventArray({ evt, setValues, values });
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
          backgroundColor={"#041A19"}
          fontFamily={"PP Telegraf Light"}
        >
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
                defaultValues={values.functionalExpertise || []}
              />

              <MultiSelect
                name={"industryExpertise"}
                formLabel={"Industry expertise"}
                handleChange={handleChange}
                defaultValues={values.industryExpertise || []}
                options={industryExpertiseList}
                maxSelections={3}
              />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              backgroundColor={"#C7F83C"}
              color={"#0A1313"}
              fontFamily={"PP Telegraf Bold"}
              fontWeight={"700"}
              onClick={updateExperiences}
            >
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
