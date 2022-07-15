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
  FormErrorMessage,
} from "@chakra-ui/react";

import DatePicker from "react-date-picker/dist/entry.nostyle";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import { WerkTokenDropdown } from "../../SOWBuilderSteps/WerkTokenDropdown";
import { useBounty } from "../../../context/BountyContext";
import { convertDateToUnix } from "../../../utils/marketplaceUtils";
import { useToken } from "../../../context/TokenContext";

const ProjectDetailsModal = (props) => {
  const finalRef = useRef();
  const { editBountyDetails, setBounty, ...bountyState } = useBounty();
  const { tokenName, tokenAmount, calculatedUSD } = useToken();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [dueDate, setDueDate] = useState(
    new Date(bountyState?.applicationDeadline * 1000)
  );
  const [dateRange, setDateRange] = useState([
    new Date(bountyState?.contractStartDate * 1000),
    new Date(bountyState?.contractEndDate * 1000),
  ]);

  const handleDates = (dateRange, dueDate) => {
    if (dateRange && dueDate) {
      editBountyDetails(
        convertDateToUnix(dateRange[0]),
        convertDateToUnix(dateRange[1]),
        convertDateToUnix(dateRange[1]) - convertDateToUnix(dateRange[0]),
        convertDateToUnix(dueDate)
      );
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
            <FormControl
              p={2}
              id="werk-date-range"
              height={"108px"}
              isRequired
              isInvalid={formError && !dateRange}
            >
              <FormLabel
                fontSize={"16px"}
                lineHeight={"24px"}
                fontWeight={"400"}
                fontFamily={"PP Telegraf"}
              >
                Start Date - End Date
                {/* <Text>End Date</Text> */}
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
                onChange={(range) => {
                  setDateRange(range);
                  let start;
                  let end;
                  if (range) {
                    start = new Date(range[0]);
                    end = new Date(range[1]);
                  }
                }}
                name="dateRange"
                selectRange={true}
                value={
                  dateRange
                    ? [new Date(dateRange[0]), new Date(dateRange[1])]
                    : undefined
                }
              />
              <FormErrorMessage fontSize="xs" fontWeight="400" color="red.500">
                Start date and end date are required
              </FormErrorMessage>
            </FormControl>

            <FormControl
              p={2}
              id="werk-due-date"
              height={"108px"}
              isRequired
              isInvalid={formError && !dueDate}
            >
              <FormLabel
                fontSize={"16px"}
                lineHeight={"24px"}
                fontWeight={"400"}
                fontFamily={"PP Telegraf"}
              >
                Application Deadline
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
              <FormErrorMessage fontSize="xs" fontWeight="400" color="red.500">
                Application deadline is required
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formError && (tokenName === "Token" || !tokenAmount)}
            >
              <WerkTokenDropdown />
              <FormErrorMessage fontSize="xs" fontWeight="400" color="red.500">
                Token and amount are required {tokenName}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="primary"
              size={"sm"}
              onClick={() => {
                if (
                  !dueDate ||
                  !dateRange ||
                  tokenName === "Token" ||
                  !tokenAmount
                ) {
                  setFormError(true);
                  return;
                }
                setIsSubmitted(true);
                handleDates(dateRange, dueDate);
                props.onClose();
                setIsSubmitted(false);
                setBounty({
                  ...bountyState,
                  contractStartDate: convertDateToUnix(dateRange[0]),
                  contractEndDate: convertDateToUnix(dateRange[1]),
                  applicationDeadline: convertDateToUnix(dueDate),
                  contractAmount: Number(tokenAmount),
                  convertedAmount: calculatedUSD,
                  tokenName: tokenName.toUpperCase(),
                });
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

export default ProjectDetailsModal;
