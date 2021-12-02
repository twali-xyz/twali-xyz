import { 
    Button,
    Modal,
    ModalHeader,
    ModalOverlay, 
    ModalContent, 
    ModalBody, 
    HStack,
    ModalCloseButton} from '@chakra-ui/react'

export default function WalletsModal(props) {

    return (
      <>
        <Modal onClose={props.onClose} size="sm" isOpen={props.isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader alignSelf="center">Connect wallet</ModalHeader>
            <ModalBody>
              <HStack spacing={10} p={6}>
                <Button className="metamask-btn" onClick={props.selectMetamask}>Metamask</Button>
                <Button onClick={props.selectWalletConnect}>WalletConnect</Button>
              </HStack>
            </ModalBody>
            <ModalCloseButton />
              <Button onClick={props.onClose}>Close</Button>
          </ModalContent>
        </Modal>
      </>
    )
  }