import { useState, useEffect } from "react";
import {
    FormControl,
    Input,
    Box,
    FormLabel,
    HStack,
    Img,
    Menu,
    MenuButton,
    Button,
    MenuItem,
    MenuList,
    Select,
    Text,
    VStack,
  } from "@chakra-ui/react";

  import DatePicker from "react-date-picker/dist/entry.nostyle";
  import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
  import { functionalExpertiseList } from "../../utils/functionalExpertiseConstants";
  import { industryExpertiseList } from "../../utils/industryExpertiseConstants";
  import { setEventArray } from "../../utils/setEventArray";
  import { MultiSelect } from "../reusable/MultiSelect";
  import { TokenState } from "../../context/TokenContext";
  import { WerkTokenDropdown } from "./WerkTokenDropdown";

  export const datesAndPricing = ({ values }) => {
    const [dueDate, setDueDate] = useState(new Date());
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    // const [values, setValues] = useState<UserData>();
    const { token } = TokenState();

    const handleChange = (evt) => {
        evt.persist();
    
        // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
        // setEventArray({ evt, setValues, values });
      };

    return (
        <form 
        style={{ alignSelf: "start" }}
        >
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
            >                <VStack alignItems="start" m={0} p={0}>
                <FormControl p={2} id="werk-date-range">
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
                      value={dateRange ? [new Date(dateRange[0]), new Date(dateRange[1])]: undefined}
                    />
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
              <MultiSelect
                name={"functionalExpertise"}
                formLabel={"Superpowers"}
                handleChange={handleChange}
                options={functionalExpertiseList}
                maxSelections={3}
                defaultValues={values?.functionalExpertise || []}
              />

              <MultiSelect
                name={"industryExpertise"}
                formLabel={"Industry expertise"}
                handleChange={handleChange}
                defaultValues={values?.industryExpertise || []}
                options={industryExpertiseList}
                maxSelections={3}
              />
            </Box>
          </Box>
        </Box>
        </HStack>
      </form>
    );
  };
  