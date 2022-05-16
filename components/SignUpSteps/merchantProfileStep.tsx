import { listOfCountries } from "../../utils/profileUtils";
import {
  FormControl,
  Input,
  Box,
  FormLabel,
  Select,
  HStack,
  Text,
  Tooltip,
  Link,
} from "@chakra-ui/react";

export const merchantProfileStep = ({ handleChange, values, errors }) => {
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
        opacity={"90%"}
        backgroundColor={"n6"}
        boxShadow={"8px 16px 24px 0px #062B2A8F"}
        marginBottom={"180px"}
      >
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <FormControl p={2} id="business-type" isRequired>
              <HStack justifyContent="space-between">
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
                  Business type
                </FormLabel>
                <Link
                  href="https://www.sba.gov/business-guide/launch-your-business/choose-business-structure"
                  target={"_blank"}
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: "none" }}
                >
                  <Text
                    marginBottom={1} //styleName: Body/body12;
                    fontFamily={"PP Telegraf Light"}
                    fontSize={"12px"}
                    fontStyle={"normal"}
                    fontWeight={"300"}
                    lineHeight={"16px"}
                    letterSpacing={"0em"}
                    textAlign={"left"}
                    color={"aqua"}
                  >
                    click to learn more
                  </Text>
                </Link>
              </HStack>
              <Select
                errorBorderColor="red.300"
                fontFamily={"PP Telegraf Light"}
                placeholder="Select business type"
                iconColor={"fresh"}
                name="businessType"
                defaultValue={values?.businessType}
                onChange={handleChange}
                color={values?.businessType ? "fresh" : "subtle"}
              >
                <option>I'm not incorporated!</option>
                <option>Sole proprietorship</option>
                <option>Partnership</option>
                <option>Corporation</option>
                <option>Single-member LLC</option>
                <option>LLC</option>
                <option>Non-profit</option>
              </Select>
              {/* {errors.businessType && (
                        <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.businessType}</Text>
                      )} */}
            </FormControl>
            <FormControl p={2} pb={0} pt={4} id="business-name" isRequired>
              <HStack display="flex" justifyContent="space-between">
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
                  Business name
                </FormLabel>
                <Tooltip
                  backgroundColor={"fresh"}
                  color={"inverse"}
                  placement="auto-start"
                  hasArrow
                  label="If you are a sole proprietor, partnership, or single-member LLC, your 'Business Name' may be registered as your personal name or your business’s DBA.
                  If you are an LLC, corporation, or non-profit, Twali requires that the 'Business Name' be in the company’s legal business name or DBA"
                >
                  <Box pos="relative">
                    <Text
                      marginBottom={1} //styleName: Body/body12;
                      fontFamily={"PP Telegraf Light"}
                      fontSize={"12px"}
                      fontStyle={"normal"}
                      fontWeight={"300"}
                      lineHeight={"16px"}
                      letterSpacing={"0em"}
                      textAlign={"left"}
                      color={"aqua"}
                    >
                      What is my business name?
                    </Text>
                  </Box>
                </Tooltip>
              </HStack>
              <Input
                disabled={values?.businessType === "I'm not incorporated!"}
                px={4}
                fontSize="16px"
                borderColor={"n3"}
                height={"40px"}
                borderRadius={"4px"}
                marginBottom={"4px"}
                required
                isInvalid={
                  errors.businessName &&
                  values?.businessType !== "I'm not incorporated!"
                }
                defaultValue={values?.businessName || ""}
                errorBorderColor="red.300"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "subtle" }}
                value={values?.businessName || ""}
                placeholder="Business name"
                name="businessName"
                onChange={handleChange}
              />
              <Text
                fontSize="xs"
                height={"20.5px"}
                fontWeight="400"
                color="red.500"
                visibility={
                  errors.businessName &&
                  values?.businessType !== "I'm not incorporated!"
                    ? "visible"
                    : "hidden"
                }
              >
                {errors.businessName}
              </Text>
            </FormControl>

            <FormControl p={2} id="business-location" isRequired>
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
                Business location
              </FormLabel>
              <Select
                fontFamily={"PP Telegraf Light"}
                color={values?.businessLocation ? "fresh" : "subtle"}
                defaultValue={values?.businessLocation || ""}
                placeholder="Select business location"
                name="businessLocation"
                onChange={handleChange}
                disabled={values?.businessType === "I'm not incorporated!"}
              >
                {listOfCountries()}
              </Select>
              {/* {errors.businessLocation && (
                        <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.businessType}</Text>
                      )} */}
            </FormControl>
          </Box>
        </Box>
      </Box>
    </form>
  );
};
