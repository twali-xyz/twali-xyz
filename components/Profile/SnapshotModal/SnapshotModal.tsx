import { useRef } from 'react';
import { 
    Modal,
    ModalOverlay,
    ModalCloseButton,
    ModalBody,
    ModalContent,
    Img,
    Heading,
    VStack,
   } from '@chakra-ui/react';

   export interface ProfileData {
    content: {
      identity: Identity;
      accType: string;
    }
  
  }
  
  export interface Identity {
    firstName: string;
    lastName: string;
    email: string;
    displayName: string;
    bio: string;
    twitterUsrName?: string;
    linkedInUsrName?: string;
    website?: string;
    businessName: string;
    businessType: string;
    businessLocation: string;
    currCompanyTitle: string;
    currLocation?: string;
    funcExpertise: string;
    industryExpertise: string;
  }

   export interface BasicProfile {
    name: string;
  }

const SnapshotModal = (props) => {
    const finalRef = useRef();
    return (
      <>  
        <Modal finalFocusRef={finalRef} isOpen={props.isOpen} onClose={props.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody alignSelf='center'>
                <VStack spacing={6} padding={10}>
                {props.snapshotData ? (
                    <>
                    <Heading>{props.snapshotData.spaceID}</Heading>
                    <Img
                    key={props.snapshotData.spaceID}
                    borderRadius='full'
                    width="150px"
                    src={props.snapshotData.avatar}
                    alt='fox stock img'
                />
                    <div>you have {props.snapshotData.walletVotes} vote(s) at {props.snapshotData.spaceID}!</div>
                    <div>{props.snapshotData.walletVotes}/{props.snapshotData.totalVotes}</div>
                    </>

                ): null}
            </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  };

  export default SnapshotModal;