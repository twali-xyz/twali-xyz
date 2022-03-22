import {
  FormControl,
  Input,
  Box,
  FormLabel,
  HStack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const userProfileStep = ({ handleChange, values, errors }) => {
  return (
    <form style={{ alignSelf: "start" }}>
      <Box
        maxWidth={"496px"}
        mx={0}
        my={2}
        h={"532px"}
        border="1px solid #587070"
        borderRadius="16px"
        overflow="hidden"
        cursor="pointer"
        backgroundColor={"#041A19E5"}
        fontFamily={"PP Telegraf"}
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
            <HStack spacing={2}>
              <FormControl p={2} mx={1} id="first-name" isRequired>
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
                  First name
                </FormLabel>
                <Input
                  px={2}
                  fontSize="16px"
                  borderColor={"#587070"}
                  height={"40px"}
                  borderRadius={"4px"}
                  marginBottom={"12px"}
                  required
                  isInvalid={errors.firstName}
                  errorBorderColor="red.300"
                  placeholder="First name"
                  name="firstName"
                  fontFamily={"PP Telegraf light"}
                  _placeholder={{ color: "#98B2B2" }}
                  value={values.firstName || ""}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <Text fontSize="xs" fontWeight="400" color="red.500">
                    {errors.firstName}
                  </Text>
                )}
              </FormControl>
              <FormControl p={2} mx={1} id="last-name" isRequired>
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
                  Last name
                </FormLabel>
                <Input
                  px={2}
                  fontSize="16px"
                  borderColor={"#587070"}
                  height={"40px"}
                  borderRadius={"4px"}
                  marginBottom={"12px"}
                  required
                  isInvalid={errors.lastName}
                  errorBorderColor="red.300"
                  placeholder="Last name"
                  name="lastName"
                  fontFamily={"PP Telegraf light"}
                  _placeholder={{ color: "#98B2B2" }}
                  value={values.lastName || ""}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <Text fontSize="xs" fontWeight="400" color="red.500">
                    {errors.lastName}
                  </Text>
                )}
              </FormControl>
            </HStack>
            <FormControl p={2} mx={1} id="display-name" isRequired>
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
                Display name
              </FormLabel>
              <Input
                px={2}
                fontSize="16px"
                borderColor={"#587070"}
                height={"40px"}
                borderRadius={"4px"}
                marginBottom={"12px"}
                required
                isInvalid={errors.userName}
                errorBorderColor="red.300"
                placeholder="choose your unique name"
                name="userName"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "#98B2B2" }}
                value={values.userName || ""}
                onChange={handleChange}
              />
              {errors.userName && (
                <Text fontSize="xs" fontWeight="400" color="red.500">
                  {errors.userName}
                </Text>
              )}
            </FormControl>
            <FormControl p={2} mx={1} id="email" isRequired>
              <HStack
                alignItems={"baseline"}
                justifyContent={"space-between"}
                marginBottom={0}
              >
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
                  Email
                </FormLabel>

                <FormLabel
                  marginBottom={1} //styleName: Body/body12;
                  fontFamily={"PP Telegraf Light"}
                  fontSize={"12px"}
                  fontStyle={"normal"}
                  fontWeight={"300"}
                  lineHeight={"16px"}
                  letterSpacing={"0em"}
                  textAlign={"left"}
                  color={"#98B2B2"}
                  requiredIndicator={null}
                >
                  your email won&apos;t be shared with others
                </FormLabel>
              </HStack>
              <Input
                px={2}
                fontSize="16px"
                borderColor={"#587070"}
                height={"40px"}
                borderRadius={"4px"}
                marginBottom={"12px"}
                required
                isInvalid={errors.email}
                errorBorderColor="red.300"
                placeholder="Email"
                name="email"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "#98B2B2" }}
                value={values.email || ""}
                onChange={handleChange}
              />
              {errors.email && (
                <Text fontSize="xs" fontWeight="400" color="red.500">
                  {errors.email}
                </Text>
              )}
            </FormControl>
            <HStack spacing={2}>
              <FormControl p={2} mx={1} id="twitter">
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
                  Twitter URL
                </FormLabel>
                <Input
                  px={2}
                  fontSize="16px"
                  borderColor={"#587070"}
                  height={"40px"}
                  borderRadius={"4px"}
                  marginBottom={"12px"}
                  placeholder="Twitter"
                  _placeholder={{ color: "#98B2B2" }}
                  fontFamily={"PP Telegraf Light"}
                  name="twitter"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl p={2} mx={1} id="linkedin">
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
                  LinkedIn URL
                </FormLabel>
                <Input
                  px={2}
                  fontSize="16px"
                  borderColor={"#587070"}
                  height={"40px"}
                  borderRadius={"4px"}
                  marginBottom={"12px"}
                  placeholder="LinkedIn"
                  _placeholder={{ color: "#98B2B2" }}
                  fontFamily={"PP Telegraf Light"}
                  name="linkedIn"
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>
            <FormControl pt={2} pb={3} px={2} id="website">
              <Box display="flex" justifyContent="space-between" width={"100%"}>
                <HStack
                  alignItems={"baseline"}
                  justifyContent={"space-between"}
                  marginBottom={0}
                  width={"100%"}
                >
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
                    Website URL
                  </FormLabel>

                  <FormLabel
                    marginBottom={1} //styleName: Body/body12;
                    fontFamily={"PP Telegraf Light"}
                    fontSize={"12px"}
                    fontStyle={"normal"}
                    fontWeight={"300"}
                    lineHeight={"16px"}
                    letterSpacing={"0em"}
                    textAlign={"left"}
                    color={"#98B2B2"}
                    requiredIndicator={null}
                  >
                    Add a personal or business website here
                  </FormLabel>
                </HStack>
              </Box>
              <Input
                px={2}
                fontSize="16px"
                borderColor={"#587070"}
                height={"40px"}
                borderRadius={"4px"}
                placeholder="Website URL"
                _placeholder={{ color: "#98B2B2" }}
                fontFamily={"PP Telegraf Light"}
                name="website"
                onChange={handleChange}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
    </form>
  );
};
