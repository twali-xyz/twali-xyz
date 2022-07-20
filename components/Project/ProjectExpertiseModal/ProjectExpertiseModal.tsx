import { useRef, useState } from "react";
import { MultiSelect } from "../../reusable/MultiSelect";
import { functionalExpertiseList } from "../../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../../utils/industryExpertiseConstants";
import {
  Button,
  CircularProgress,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useBounty } from "../../../context/BountyContext";
import { setEventArray } from "../../../utils/setEventArray";

const ProjectExpertiseModal = (props) => {
  const { editBountyExpertise, setBounty, ...bountyState } = useBounty();
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [tempValues, setTempValues] = useState({
    contractExpertise: bountyState.contractExpertise,
    contractIndustry: bountyState.contractIndustry,
  });

  const handleChange = (evt) => {
    evt.persist();
    let strippedEventName = evt.target.name.substring(
      0,
      evt.target.name.length - 1
    );

    if (
      strippedEventName === "contractExpertise" ||
      strippedEventName === "contractIndustry"
    ) {
      // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
      setEventArray({
        evt,
        setValues: setTempValues,
        values: tempValues,
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
        <ModalContent
          backgroundColor={"n6"}
          boxShadow={"8px 16px 24px 0px #062B2A8F"}
          border={"1px solid rgba(88, 112, 112, 1)"}
          fontFamily={"PP Telegraf Light"}
        >
          <ModalHeader mt={"20px"}>Expertise</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              style={{ alignSelf: "center" }}
              isInvalid={
                formError &&
                (!tempValues.contractExpertise.filter((item) => item !== "")
                  .length ||
                  !tempValues.contractIndustry.filter((item) => item !== "")
                    .length)
              }
            >
              <MultiSelect
                name={"contractExpertise"}
                formLabel={"Superpowers"}
                handleChange={handleChange}
                options={functionalExpertiseList}
                maxSelections={3}
                defaultValues={tempValues?.contractExpertise || []}
              />

              <MultiSelect
                name={"contractIndustry"}
                formLabel={"Industry expertise"}
                handleChange={handleChange}
                defaultValues={tempValues?.contractIndustry || []}
                options={industryExpertiseList}
                maxSelections={3}
              />
              <FormErrorMessage fontSize="xs" fontWeight="400" color="red.500">
                Please select at least 1 expertise and 1 industry
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="primary"
              size={"sm"}
              onClick={() => {
                if (
                  !tempValues.contractExpertise.filter((item) => item !== "")
                    .length ||
                  !tempValues.contractIndustry.filter((item) => item !== "")
                    .length
                ) {
                  setFormError(true);
                  return;
                }
                setIsSubmitted(true);
                setBounty({
                  ...bountyState,
                  contractExpertise: tempValues.contractExpertise,
                  contractIndustry: tempValues.contractIndustry,
                });
                props.onClose();
                setIsSubmitted(false);
              }}
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

export default ProjectExpertiseModal;
