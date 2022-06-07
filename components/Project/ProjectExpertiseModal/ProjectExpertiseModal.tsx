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

const ProjectExpertiseModal = (props) => {
  const { setBounty, ...bountyState} = useBounty();
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (evt) => {
    console.log(evt);
  }

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
            <Button variant="primary" size={"sm"} onClick={() => console.log('project sow modal save')}>
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
