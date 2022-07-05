import { useState, useRef, useEffect } from "react";
import {
  Button,
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
import { functionalExpertiseList } from "../../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../../utils/industryExpertiseConstants";
import { setEventArray } from "../../../utils/setEventArray";
import useUser from "../../../context/TwaliContext";
import { UserData } from "../../../utils/interfaces";
import { MultiSelect } from "../../reusable/MultiSelect";

const EditExpertiseModal = (props) => {
  const finalRef = useRef();

  const { editExpertise, ...userState } = useUser();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState<UserData>();

  const [errors, setErrors] = useState({
    industryExpertise: null,
    functionalExpertise: null,
  });

  useEffect(() => {
    if (props.isOpen) return;
    setValues({
      ...userState,
      functionalExpertise: userState.functionalExpertise,
      industryExpertise: userState.industryExpertise,
      editExpertise,
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
        editExpertise(values.functionalExpertise, values.industryExpertise);
        props.onClose();
        setValues({
          ...userState,
          functionalExpertise: values.functionalExpertise,
          industryExpertise: values.industryExpertise,
          editExpertise,
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
          backgroundColor={"n6"}
          boxShadow={"8px 16px 24px 0px #062B2A8F"}
          border={"1px solid rgba(88, 112, 112, 1)"}
          fontFamily={"PP Telegraf Light"}
        >
          <ModalHeader mt={"20px"}>
            Update your background expertise
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form style={{ alignSelf: "center" }}>
              <MultiSelect
                name={"functionalExpertise"}
                formLabel={"Superpowers"}
                onChange={handleChange}
                options={functionalExpertiseList}
                maxSelections={3}
                defaultValues={values?.functionalExpertise || []}
              />

              <MultiSelect
                name={"industryExpertise"}
                formLabel={"Industry expertise"}
                onChange={handleChange}
                defaultValues={values?.industryExpertise || []}
                options={industryExpertiseList}
                maxSelections={3}
              />
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

export default EditExpertiseModal;
