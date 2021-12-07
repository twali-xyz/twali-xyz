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
    Select,
    Text,
    Textarea,
    Input,
   } from '@chakra-ui/react';

const EditExperienceModal = (props) => {
    const finalRef = useRef()
  
    return (
      <>  
        <Modal finalFocusRef={finalRef} isOpen={props.isOpen} onClose={props.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update your background expertise</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form style={{ alignSelf: "center"}}>
                <FormControl p={4} id="functional-expertise">
                        <FormLabel>So...what would you say you do?</FormLabel>
                        <Select placeholder="Select functional expertise" name="funcExpertise" onChange={() => console.log('changed')}>
                          <option>Marketing</option>
                          <option>Accounting</option>
                          <option>Software Development</option>
                          <option>Creative</option>
                        </Select>
                        {/* {errors.funcExpertise && (
                          <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.funcExpertise}</Text>
                        )} */}
                    </FormControl>
                    <FormControl p={4} id="industry-expertise">
                        <FormLabel>Where would you say you work?</FormLabel>
                        <Select placeholder="Select industry expertise" name="industryExpertise" onChange={() => console.log('changed')}>
                          <option>VC</option>
                          <option>Financial Services</option>
                          <option>Healthcare</option>
                        </Select>
                        {/* {errors.industryExpertise && (
                          <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.industryExpertise}</Text>
                        )} */}
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

  export default EditExperienceModal;