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
} from "@chakra-ui/react";
import { useBounty } from "../../../context/BountyContext";
import { setEventArray } from "../../../utils/setEventArray";

const ProjectExpertiseModal = (props) => {
  const { editBountyExpertise, setBounty, ...bountyState} = useBounty();
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (evt) => {
    evt.persist();
    console.log('SOW builder handleChange - name: ', evt.target.name);
    console.log('SOW builder handleChange - value: ', evt.target.value);
    let strippedEventName = evt.target.name.substring(
      0,
      evt.target.name.length - 1
    );

    if (
      strippedEventName === "contractExpertise" ||
      strippedEventName === "contractIndustry"
    ) {
      // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
      setEventArray({ evt, setValues: setBounty, values: bountyState });
    } 
    console.log('SOW bounty data: ', bountyState);
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
            <form style={{ alignSelf: "center" }}>
            <MultiSelect
                name={"contractExpertise"}
                formLabel={"Superpowers"}
                handleChange={handleChange}
                options={functionalExpertiseList}
                maxSelections={3}
                defaultValues={bountyState?.contractExpertise || []}
              />

              <MultiSelect
                name={"contractIndustry"}
                formLabel={"Industry expertise"}
                handleChange={handleChange}
                defaultValues={bountyState?.contractIndustry || []}
                options={industryExpertiseList}
                maxSelections={3}
              />
            </form>
          </ModalBody>

          <ModalFooter>
          <Button variant="primary" size={"sm"} onClick={() => {
              setIsSubmitted(true);
              props.onClose();
              setIsSubmitted(false);
              }}>
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
