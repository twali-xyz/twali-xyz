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

import { UserData } from "../../../utils/interfaces";
import useUser from "../../../context/TwaliContext";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import { WerkTokenDropdown } from "../../SOWBuilderSteps/WerkTokenDropdown";
import useFetchUser from "../../../hooks/useFetchUser";

const ProjectDetailsModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setData } = useUser();
  const { user: userState } = useFetchUser(props.userName);
  const [userData, setUserData] = useState<UserData>({
    ...userState,
    userName: "",
    userWallet: "",
    uuid: "",
    setData,
  });
  const [dueDate, setDueDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  const handleChange = (evt) => {
    evt.persist();

    // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
    // setEventArray({ evt, setValues, values });
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
                  calendarIcon={
                    <Img
                      // borderRadius="full"
                      // backgroundColor="transparent"
                      // width="16px"
                      src="/twali-assets/calendar.svg"
                      alt="calendar"
                    />
                  }
                  onChange={setDateRange}
                  selectRange={true}
                  value={
                    dateRange
                      ? [new Date(dateRange[0]), new Date(dateRange[1])]
                      : undefined
                  }
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
                calendarIcon={
                  <Img
                    // borderRadius="full"
                    // backgroundColor="transparent"
                    // width="16px"
                    src="/twali-assets/calendar.svg"
                    alt="calendar"
                  />
                }
                onChange={setDueDate}
                value={dueDate ? new Date(dueDate) : undefined}
              />
            </FormControl>
            <WerkTokenDropdown />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="primary"
              size={"sm"}
              onClick={() => console.log("project sow modal save")}
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

export default ProjectDetailsModal;
