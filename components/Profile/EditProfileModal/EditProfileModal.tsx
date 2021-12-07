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
    Input,
   } from '@chakra-ui/react';

import FileUpload from '../../FileUpload/FileUpload';

const EditProfileModal = (props) => {
    const finalRef = useRef()
  
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
                    <Input required  errorBorderColor='red.300' placeholder="Name" name="name" onChange={() => console.log('change')}/>
                    {/* isInvalid={errors.name} */}
                    {/* value={values.name || ''} */}
                    {/* {errors.firstName && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.firstName}</Text>
                    )} */}
                  </FormControl>
                  <FormControl p={2} id="current-title" isRequired>
                    <FormLabel>What's your current title?</FormLabel>
                    <Input required  errorBorderColor='red.300' placeholder="Current title" name="currTitle" onChange={() => console.log('change')}/>
                    {/* isInvalid={errors.name} */}
                    {/* value={values.name || ''} */}
                    {/* {errors.firstName && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.firstName}</Text>
                    )} */}
                  </FormControl>
                  <FormControl p={2} id="currLocation" isRequired>
                    <FormLabel>Where do you call home?</FormLabel>
                    <Input required  errorBorderColor='red.300' placeholder="Home" name="currLocation" onChange={() => console.log('change')}/>
                    {/* isInvalid={errors.name} */}
                    {/* value={values.name || ''} */}
                    {/* {errors.firstName && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.firstName}</Text>
                    )} */}
                  </FormControl>
                  <FormControl p={2} id="bio">
                    <FormLabel>Bio</FormLabel>
                    <Textarea errorBorderColor='red.300' name="bio" onChange={() => console.log('change')}/>
                    {/* isInvalid={errors.name} */}
                    {/* value={values.name || ''} */}
                    {/* {errors.firstName && (
                      <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.firstName}</Text>
                    )} */}
                  </FormControl>
                  <FormControl p={2} id="linkedIn">
                    <FormLabel>LinkedIn URL</FormLabel>
                    <Input name="linkedIn" onChange={() => console.log('change')}/>
                  </FormControl>
                  <FormControl p={2} id="twitter">
                    <FormLabel>Twitter URL</FormLabel>
                    <Input name="twitter" onChange={() => console.log('change')}/>
                  </FormControl>
            </form>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button variant='ghost'>Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  };

  export default EditProfileModal;