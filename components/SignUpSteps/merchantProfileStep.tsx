import { useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        backgroundColor={"#041A19E5"}
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
                    color={"#0DD5D1"}
                  >
                    click to learn more
                  </Text>
                </Link>
              </HStack>
              <Select
                errorBorderColor="red.300"
                fontFamily={"PP Telegraf Light"}
                placeholder="Select business type"
                iconColor={"#F9FFF2"}
                name="businessType"
                onChange={handleChange}
                color={values.businessType ? "#F9FFF2" : "#98B2B2"}
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
            <FormControl p={2} id="business-name" isRequired>
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
                  backgroundColor={"#F9FFF2"}
                  color={"#0A1313"}
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
                      color={"#0DD5D1"}
                    >
                      What is my business type?
                    </Text>
                  </Box>
                </Tooltip>
              </HStack>
              <Input
                disabled={values.businessType === "I'm not incorporated!"}
                px={4}
                fontSize="16px"
                borderColor={"#587070"}
                height={"40px"}
                borderRadius={"4px"}
                marginBottom={"12px"}
                required
                isInvalid={errors.businessName}
                errorBorderColor="red.300"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "#98B2B2" }}
                value={values.businessName || ""}
                placeholder="Business name"
                name="businessName"
                onChange={handleChange}
              />
              {errors.businessName && (
                <Text fontSize="xs" fontWeight="400" color="red.500">
                  {errors.businessName}
                </Text>
              )}
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
                color={values.businessLocation ? "#F9FFF2" : "#98B2B2"}
                placeholder="Select business location"
                name="businessLocation"
                onChange={handleChange}
                disabled={values.businessType === "I'm not incorporated!"}
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
