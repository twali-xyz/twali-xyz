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
  HStack,
  Text,
  Img,
  VStack,
} from "@chakra-ui/react";

import DatePicker from "react-date-picker/dist/entry.nostyle";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import { WerkTokenDropdown } from '../../SOWBuilderSteps/WerkTokenDropdown';
import { useBounty } from "../../../context/BountyContext";
import { convertDateToUnix } from "../../../utils/marketplaceUtils";

const ProjectDetailsModal = (props) => {
  const finalRef = useRef();
  const { editBountyDetails, ...bountyState} = useBounty();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dueDate, setDueDate] = useState(new Date(bountyState?.applicationDeadline*1000));
  const [dateRange, setDateRange] = useState([new Date(bountyState?.contractStartDate*1000), new Date(bountyState?.contractEndDate*1000)]);
  
  const handleDates = (dateRange, dueDate) => {
    console.log('SOW builder handleDates - name: ', dateRange);
    console.log('SOW builder handleDates - name: ', dueDate);
    if (dateRange && dueDate) {
      editBountyDetails(
        convertDateToUnix(dateRange[0]),
        convertDateToUnix(dateRange[1]),
        convertDateToUnix(dateRange[1]) - convertDateToUnix(dateRange[0]),
        convertDateToUnix(dueDate),
      );
      console.log('SOW bounty data handled date: ', bountyState);
    }
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
        <ModalHeader mt={"20px"}>Dates & Pricing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                <FormControl p={2} id="werk-date-range">
                <VStack alignItems="start" m={0} p={0}>
                        <FormLabel
                        fontSize={"16px"}
                        lineHeight={"24px"}
                        fontWeight={"400"}
                        fontFamily={"PP Telegraf"}
                        >
                        <HStack spacing={8} paddingLeft={0}>
                        <Text>Dates</Text>
                        {/* <Text>End Date</Text> */}
                        </HStack>
                        </FormLabel>                    
                    <DateRangePicker
                    //   onChange={setStartDate}
                    //   className={ dateRange[0] && dateRange[1] ? 'date-range' : ''}
                      calendarIcon={<Img
                        // borderRadius="full"
                        // backgroundColor="transparent"
                        // width="16px"
                        src="/twali-assets/calendar.svg"
                        alt="calendar"
                        />}
                      onChange={setDateRange}
                      selectRange={true}
                      // defaultValue={bountyState?.contractStartDate && bountyState?.contractEndDate ? [new Date(bountyState?.contractStartDate * 1000),new Date(bountyState?.contractEndDate * 1000)]: ''}
                      value={dateRange ? [new Date(dateRange[0]), new Date(dateRange[1])]: undefined}
                    />
                </VStack>
                    {/* {errors.companyStart && !companyData.companyStart && (
                      <Text fontSize="xs" fontWeight="400" color="red.500">
                        {errors.companyStart}
                      </Text>
                    )} */}
                    </FormControl>

                    <FormControl p={2} id="werk-due-date">
                    <FormLabel
                        fontSize={"16px"}
                        lineHeight={"24px"}
                        fontWeight={"400"}
                        fontFamily={"PP Telegraf"}
                        >
                        Due Date
                        </FormLabel>
                        <DatePicker
                            calendarIcon={<Img
                              // borderRadius="full"
                              // backgroundColor="transparent"
                              // width="16px"
                              src="/twali-assets/calendar.svg"
                              alt="calendar"
                              />}
                            onChange={setDueDate}
                            value={dueDate ? new Date(dueDate): undefined}
                        />
                    </FormControl>
                    <WerkTokenDropdown/>
          </ModalBody>

          <ModalFooter>
          <Button variant="primary" size={"sm"} onClick={() => {
              setIsSubmitted(true);
              handleDates(dateRange, dueDate);
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

export default ProjectDetailsModal;
