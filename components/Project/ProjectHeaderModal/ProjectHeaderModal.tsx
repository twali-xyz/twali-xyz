import { useRef, useState } from "react";
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
  FormLabel,
  FormControl,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useBounty } from "../../../context/BountyContext";

const ProjectHeaderModal = (props) => {
  const { editBountyHeader, ...bountyState } = useBounty();
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contractTitle, setContractTitle] = useState(bountyState.contractTitle);
  const [formError, setFormError] = useState(false);
  const handleChange = (evt) => {
    setContractTitle(evt.target.value);
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
          <ModalHeader mt={"20px"}>Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form style={{ alignSelf: "center" }}>
              <FormControl
                p={2}
                id="project-title"
                isRequired
                isInvalid={formError && !contractTitle}
              >
                <FormLabel
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  fontFamily={"PP Telegraf"}
                >
                  Project Title
                </FormLabel>
                <Input
                  required
                  //   isInvalid={
                  //     errors.firstName &&
                  //     (!userState.firstName || !values.firstName)
                  //   }
                  errorBorderColor="red.300"
                  placeholder="Title"
                  name="contractTitle"
                  defaultValue={bountyState?.contractTitle || ""}
                  onChange={handleChange}
                />
                {/* {errors.firstName &&
                  (!userState.firstName || !values.firstName) && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.firstName}
                    </Text>
                  )} */}
                <FormErrorMessage
                  fontSize="xs"
                  fontWeight="400"
                  color="red.500"
                >
                  Title is required
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="primary"
              size={"sm"}
              onClick={() => {
                if (!contractTitle) {
                  setFormError(true);
                  return;
                }
                setIsSubmitted(true);
                editBountyHeader(contractTitle);
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

export default ProjectHeaderModal;
