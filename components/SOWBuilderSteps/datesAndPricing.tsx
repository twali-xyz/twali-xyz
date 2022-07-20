import {
  FormControl,
  Box,
  FormLabel,
  HStack,
  Img,
  Text,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";

import DatePicker from "react-date-picker/dist/entry.nostyle";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import { functionalExpertiseList } from "../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../utils/industryExpertiseConstants";
import { MultiSelect } from "../reusable/MultiSelect";
import { WerkTokenDropdown } from "./WerkTokenDropdown";
import { useBounty } from "../../context/BountyContext";
import { useEffect } from "react";
import { useToken } from "../../context/TokenContext";


export const datesAndPricing = ({
  handleChange,
  dueDate,
  setDueDate,
  dateRange,
  setDateRange,
  formError,
}) => {
  const { setBounty, ...bountyState } = useBounty();
  const { tokenName, tokenAmount } = useToken();

  return (
    <form style={{ alignSelf: "start" }}>
      <HStack spacing={24}>
        <Box
          maxWidth={"496px"}
          //   h="100%"
          height="450px"
          w="xl"
          borderWidth="1px"
          borderRadius="lg"
          //   overflow="hidden"
          cursor="pointer"
          backgroundColor={"n6"}
          opacity={"90%"}
          boxShadow={"8px 16px 24px 0px #062B2A8F"}
        >
          <Box p="4">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              //   isTruncated
            >
              {" "}
              <VStack alignItems="start" m={0} p={0}>
                <FormControl
                  p={2}
                  id="werk-date-range"
                  height={"100px"}
                  isRequired
                  isInvalid={
                    formError &&
                    (!bountyState.contractStartDate ||
                      !bountyState.contractEndDate)
                  }
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
                      setBounty({
                        ...bountyState,
                        contractStartDate: start || 0,
                        contractEndDate: end || 0,
                      });
                    }}
                    name="dateRange"
                    selectRange={true}
                    value={
                      dateRange
                        ? [new Date(dateRange[0]), new Date(dateRange[1])]
                        : undefined
                    }
                  />
                  <FormErrorMessage
                    fontSize="xs"
                    fontWeight="400"
                    color="red.500"
                  >
                    Start date and end date are required
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  p={2}
                  id="werk-due-date"
                  height={"100px"}
                  isRequired
                  isInvalid={formError && !bountyState.applicationDeadline}
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
                    onChange={(date) => {
                      setDueDate(date);
                      let newDate = 0;
                      if (date) {
                        newDate = date;
                      }
                      setBounty({
                        ...bountyState,
                        applicationDeadline: newDate,
                      });
                    }}
                    value={dueDate ? new Date(dueDate) : undefined}
                  />
                  <FormErrorMessage
                    fontSize="xs"
                    fontWeight="400"
                    color="red.500"
                  >
                    Application date is required
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    formError &&
                    (!tokenName ||
                      !tokenAmount ||
                      tokenAmount == 0 ||
                      tokenName === "Token")
                  }
                >
                  <WerkTokenDropdown />
                  <FormErrorMessage
                    fontSize="xs"
                    fontWeight="400"
                    color="red.500"
                  >
                    Please select a token and/or amount
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </Box>
          </Box>
        </Box>
        {/* </form>
      <form 
      style={{ alignSelf: "start" }}
      > */}
        <Box
          maxWidth={"496px"}
          h="450px"
          w="xl"
          borderWidth="1px"
          borderRadius="lg"
          //   overflow="hidden"
          cursor="pointer"
          backgroundColor={"n6"}
          opacity={"90%"}
          boxShadow={"8px 16px 24px 0px #062B2A8F"}
        >
          <Box p="4">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              //   isTruncated
            >
              <FormControl
                isInvalid={
                  formError &&
                  (!bountyState.contractExpertise ||
                    !bountyState.contractIndustry ||
                    !bountyState.contractExpertise.filter((item) => item !== "")
                      .length ||
                    !bountyState.contractIndustry.filter((item) => item !== "")
                      .length)
                }
              >
                <MultiSelect
                  name={"contractExpertise"}
                  formLabel={"Superpowers"}
                  handleChange={handleChange}
                  options={functionalExpertiseList}
                  maxSelections={3}
                  defaultValues={bountyState?.contractExpertise || []}
                />

                <MultiSelect
                  name={"contractIndustry"}
                  formLabel={"Industry expertise"}
                  handleChange={handleChange}
                  defaultValues={bountyState?.contractIndustry || []}
                  options={industryExpertiseList}
                  maxSelections={3}
                />
                <FormErrorMessage
                  fontSize="xs"
                  fontWeight="400"
                  color="red.500"
                >
                  Please select at least 1 expertise and 1 industry
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </HStack>
    </form>
  );
};
