import { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  Img,
  Heading,
  VStack,
} from "@chakra-ui/react";

const BadgesModal = (props) => {
  let badge = props.badge;

  const finalRef = useRef();
  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody alignSelf="center">
            <VStack spacing={6} padding={10}>
              {badge && badge.type == 'snapshot' ? (
                <>
                <Heading>{badge.spaceID}</Heading>
                <Img
                  key={badge.spaceID}
                  borderRadius="full"
                  width="150px"
                  src={badge.avatar}
                  alt="fox stock img"
                />
                <div>
                  you have {badge.walletVotes} vote(s) at{" "}
                  {badge.spaceID}!
                </div>
                <div>
                  {badge.walletVotes}/
                  {badge.totalVotes}
                </div>
              </>
              ): badge && badge.type == 'poap' ? (
                <>
                <Heading>{badge.event.name}</Heading>
                <Img
                  key={badge.tokenId}
                  borderRadius="full"
                  width="150px"
                  src={badge.event.image_url}
                  alt="fox stock img"
                />
                <div>
                  you collected this POAP on {badge.event.start_date}!
                </div>
              </>
              ): null}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BadgesModal;
