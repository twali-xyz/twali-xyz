import { MultiSelect } from "../Profile/Components/MultiSelect";
import { listOfCountries } from "../../utils/profileUtils";
import {
  FormControl,
  Input,
  Box,
  FormLabel,
  Select,
  Text,
} from "@chakra-ui/react";
import { functionalExpertiseList } from "../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../utils/industryExpertiseConstants";

export const professionalProfileStep = ({ handleChange, values, errors }) => {
  return (
    <form style={{ alignSelf: "start" }}>
      <Box
        maxWidth={"496px"}
        h="100%"
        w="xl"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
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
            isTruncated
          >
            <FormControl p={2} pb={0} id="current-company-title" isRequired>
              <FormLabel
                marginBottom={1}
                pos={"relative"}
                fontFamily={"PP Telegraf"}
                fontSize={"16px"}
                fontStyle={"normal"}
                fontWeight={"400"}
                lineHeight={"24p"}
                letterSpacing={"0.02em"}
                textAlign={"left"}
              >
                Current title
              </FormLabel>
              <Input
                px={2}
                fontSize="16px"
                borderColor={"n3"}
                height={"40px"}
                borderRadius={"4px"}
                marginBottom={"4px"}
                isInvalid={errors.currTitle}
                errorBorderColor="red.300"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "subtle" }}
                value={values?.currTitle || ""}
                required
                placeholder="Current title"
                name="currTitle"
                onChange={handleChange}
              />
              <Text
                fontSize="xs"
                height={"20.5px"}
                fontWeight="400"
                color="red.500"
                visibility={errors.currTitle ? "visible" : "hidden"}
              >
                {errors.currTitle}
              </Text>
            </FormControl>
            <FormControl p={2} pb={4} id="current-location">
              <FormLabel
                marginBottom={1}
                pos={"relative"}
                fontFamily={"PP Telegraf"}
                fontSize={"16px"}
                fontStyle={"normal"}
                fontWeight={"400"}
                lineHeight={"24p"}
                letterSpacing={"0.02em"}
                textAlign={"left"}
              >
                Current location
              </FormLabel>
              <Select
                fontFamily={"PP Telegraf Light"}
                placeholder="Select current location"
                _placeholder={{ color: "subtle !important" }}
                color={values?.currLocation ? "fresh" : "subtle"}
                name="currLocation"
                onChange={handleChange}
              >
                {listOfCountries()}
              </Select>
            </FormControl>
            <MultiSelect
              name={"functionalExpertise"}
              formLabel={"What's your superpower? (select max 3)"}
              handleChange={handleChange}
              defaultValues={[]}
              options={functionalExpertiseList}
              maxSelections={3}
              paddingY={4}
            />
            <MultiSelect
              name={"industryExpertise"}
              formLabel={"Industry expertise (select max 3)"}
              handleChange={handleChange}
              defaultValues={[]}
              options={industryExpertiseList}
              maxSelections={3}
            />
          </Box>
        </Box>
      </Box>
    </form>
  );
};
