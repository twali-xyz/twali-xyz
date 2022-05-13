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
  Img,
  Textarea,
  Heading,
  VStack,
} from "@chakra-ui/react";

const ProjectDescriptionModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        <ModalHeader mt={"20px"}>Statement of Werk</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form style={{ alignSelf: "center" }}>
              <FormControl p={2} id="project-title" isRequired>
                <FormLabel
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  fontFamily={"PP Telegraf"}
                >
                  Statement of Werk
                </FormLabel>
                <Textarea
                px={2}
                fontSize="16px"
                borderColor={"n3"}
                height={"250px"}
                borderRadius={"4px"}
                marginBottom={"4px"}
                // isInvalid={errors.currTitle}
                errorBorderColor="red.300"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "subtle" }}
                // value={values?.currTitle || ""}
                required
                placeholder="Max Word Limit"
                name="currTitle"
                // onChange={handleChange}
              />
                {/* {errors.firstName &&
                  (!userState.firstName || !values.firstName) && (
                    <Text fontSize="xs" fontWeight="400" color="red.500">
                      {errors.firstName}
                    </Text>
                  )} */}
              </FormControl>
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

export default ProjectDescriptionModal;
