import { useState, useRef } from 'react';
import { 
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalContent,
    ModalFooter,
    useDisclosure,
    FormControl,
    FormLabel,
    Text,
    Textarea,
    CircularProgress,
    Input,
   } from '@chakra-ui/react';

import FileUpload from '../../FileUpload/FileUpload';
import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';

import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { DID } from 'dids';
import { IDX } from '@ceramicstudio/idx';
import { TileDocument } from '@ceramicnetwork/stream-tile';

// 3box test nodes with read/write access on ceramic clay testnet
// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

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

const EditProfileModal = (props) => {
    const finalRef = useRef()
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [accType, setAccType] = useState(props.profileData.content.accType);
    const [identity, setIdentity] = useState(props.profileData.content.identity);
    const [fileUploaded, setFileUploaded] = useState();
    const [profileData, setProfileData] = useState(props.profileData);

            // Get user's eth address
        async function connect() {
          const { ethereum } = window;
          let account;
  
          if (!ethereum) {
            console.log("Connect your ethereum wallet!");
            return
          }
      
          await ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
              if (accounts.length !== 0) {
                account = accounts[0];
                console.log("Found an authorized account: ", account);
              } else {
                console.log("No authorized account found!");
              }
            })
          return account;
      }
  
    async function updateProfileInfo() {
      const address = await connect(); // first address in the array
      console.log(address);
  
      if (address) {
        const ceramic = new CeramicClient(endpoint);      
        const threeIdConnect = new ThreeIdConnect();
        const provider = new EthereumAuthProvider(window.ethereum, address);
  
        setIsSubmitted(true);
  
        await threeIdConnect.connect(provider);
    
        const did = new DID({
          provider: threeIdConnect.getDidProvider(),
          resolver: {
            ...ThreeIdResolver.getResolver(ceramic)
          }
        })
        
        ceramic.setDID(did);
        await ceramic.did.authenticate();
    
        const idx = new IDX({ ceramic });
    
        // does not require signing to get user's public data
        const data: BasicProfile = await idx.get(
          'basicProfile',
          `${address}@eip155:1`
        )
        console.log('data: ', data);

        if (fileUploaded) {
          // await idx.merge('basicProfile', { image: '💻' })
          console.log(fileUploaded);
        }
  
        await updateProfileData(ceramic, identity, accType);
  
        console.log("Profile updated!");
        console.log(identity);
        console.log(accType);
  
        if(identity.firstName && identity.lastName && identity.email) {
            setIsSubmitted(false);
            props.handleUpdatedProfile(profileData, false);
            props.onClose();
        } else {
            console.log('No profile, pls create one...');
          }
      }
      
    }
  
    // Updates a stream to store JSON data with ceramic
    const updateProfileData = async(ceramic, identity, accType) => { 
      const profileData = await TileDocument.deterministic(
        ceramic,
        {
          family: 'user-profile-data',
        }
      );
  
      await profileData.update({identity, accType});
  };


  const handleChange = (evt) => {
    console.log(evt);
    console.log(props.profileData);
    setIdentity({
      ...identity,
      [evt.target.name]: evt.target.value
    });
    const newProfileData: ProfileData = { content: {identity: identity, accType: props.profileData.content.accType }};
    console.log(newProfileData);
    setProfileData(newProfileData);
    console.log(profileData);
    console.log(identity);
  }

  const handleFile = (fileUploaded) => {
    setFileUploaded(fileUploaded);
  }
  
    return (
      <>  
        <Modal finalFocusRef={finalRef} isOpen={props.isOpen} onClose={props.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit your profile details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form style={{ alignSelf: "center"}}>
            <FormControl>
            {/* isInvalid={!!errors.file_} */}
            <FormLabel>{'Update profile picture'}</FormLabel>

                <FileUpload
                handleFile={handleFile}
                >
                    <Button>
                    Upload
                    </Button>
                </FileUpload>

                {/* <FormErrorMessage>
                    {errors.file_ && errors?.file_.message}
                </FormErrorMessage> */}
            </FormControl>
                <FormControl p={2} id="name" isRequired>
                    <FormLabel>What do you want us to call you?</FormLabel>
                    <Input required  errorBorderColor='red.300' defaultValue={props.profileData.content.identity.firstName || ''} name="name" onChange={handleChange}/>
                    {/* isInvalid={errors.name} */}
                    {/* value={values.name || ''} */}
                    {/* {errors.firstName && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.firstName}</Text>
                    )} */}
                  </FormControl>
                  <FormControl p={2} id="current-title" isRequired>
                    <FormLabel>What's your current title?</FormLabel>
                    <Input required  errorBorderColor='red.300' defaultValue={props.profileData.content.identity.currCompanyTitle || ''} name="currCompanyTitle" onChange={handleChange}/>
                    {/* isInvalid={errors.name} */}
                    {/* value={values.name || ''} */}
                    {/* {errors.firstName && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.firstName}</Text>
                    )} */}
                  </FormControl>
                  <FormControl p={2} id="currLocation" isRequired>
                    <FormLabel>Where do you call home?</FormLabel>
                    <Input required  errorBorderColor='red.300' defaultValue={props.profileData.content.identity.currLocation || ''} name="currLocation" onChange={handleChange}/>
                    {/* isInvalid={errors.name} */}
                    {/* value={values.name || ''} */}
                    {/* {errors.firstName && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.firstName}</Text>
                    )} */}
                  </FormControl>
                  <FormControl p={2} id="bio">
                    <FormLabel>Bio</FormLabel>
                    <Textarea errorBorderColor='red.300' defaultValue={props.profileData.content.identity.bio || ''} name="bio" onChange={handleChange}/>
                    {/* isInvalid={errors.name} */}
                    {/* value={values.name || ''} */}
                    {/* {errors.firstName && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.firstName}</Text>
                    )} */}
                  </FormControl>
                  <FormControl p={2} id="linkedIn">
                    <FormLabel>LinkedIn URL</FormLabel>
                    <Input name="linkedIn" defaultValue={props.profileData.content.identity.linkedIn || ''} onChange={handleChange}/>
                  </FormControl>
                  <FormControl p={2} id="twitter">
                    <FormLabel>Twitter URL</FormLabel>
                    <Input name="twitter" defaultValue={props.profileData.content.identity.twitter || ''} onChange={handleChange}/>
                  </FormControl>
            </form>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button variant='ghost' onClick={updateProfileInfo}>Save {isSubmitted ? <CircularProgress size="22px" thickness="4px" isIndeterminate color="#3C2E26" /> : null}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  };

  export default EditProfileModal;