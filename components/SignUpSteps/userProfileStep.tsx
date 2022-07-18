import {
  FormControl,
  Input,
  Box,
  FormLabel,
  HStack,
  Text,
} from "@chakra-ui/react";

export const userProfileStep = ({ handleChange, values, errors }) => {
  return (
    <form style={{ alignSelf: "start" }}>
      <Box
        maxWidth={"496px"}
        mx={0}
        my={2}
        border="1px solid n3"
        borderRadius="16px"
        overflow="hidden"
        cursor="pointer"
        backgroundColor={"n6"}
        opacity={"90%"}
        fontFamily={"PP Telegraf"}
        boxShadow={"8px 16px 24px 0px #062B2A8F"}
      >
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
          >
            <HStack height={"90px"} spacing={2}>
              <FormControl px={2} py={1} mx={1} id="first-name" isRequired>
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
                  borderColor={"n3"}
                  height={"40px"}
                  borderRadius={"4px"}
                  marginBottom={"4px"}
                  required
                  isInvalid={errors.firstName}
                  errorBorderColor="red.300"
                  placeholder="First name"
                  name="firstName"
                  fontFamily={"PP Telegraf light"}
                  _placeholder={{ color: "subtle" }}
                  value={values?.firstName || ""}
                  onChange={handleChange}
                />
                <Text
                  fontSize="xs"
                  height={"20.5px"}
                  fontWeight="400"
                  color="red.500"
                  visibility={errors.firstName ? "visible" : "hidden"}
                >
                  {errors.firstName}
                </Text>
              </FormControl>
              <FormControl px={2} py={1} mx={1} id="last-name" isRequired>
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
                  borderColor={"n3"}
                  height={"40px"}
                  borderRadius={"4px"}
                  marginBottom={"4px"}
                  required
                  isInvalid={errors.lastName}
                  errorBorderColor="red.300"
                  placeholder="Last name"
                  name="lastName"
                  fontFamily={"PP Telegraf light"}
                  _placeholder={{ color: "subtle" }}
                  value={values?.lastName || ""}
                  onChange={handleChange}
                />
                <Text
                  fontSize="xs"
                  height={"20.5px"}
                  fontWeight="400"
                  color="red.500"
                  visibility={errors.lastName ? "visible" : "hidden"}
                >
                  {errors.lastName}
                </Text>
              </FormControl>
            </HStack>
            <FormControl px={2} py={1} mx={1} id="display-name" isRequired>
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
                borderColor={"n3"}
                height={"40px"}
                borderRadius={"4px"}
                marginBottom={"4px"}
                required
                isInvalid={errors.userName}
                errorBorderColor="red.300"
                placeholder="choose your unique name"
                name="userName"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "subtle" }}
                value={values?.userName || ""}
                onChange={handleChange}
              />
              <Text
                fontSize="xs"
                height={"20.5px"}
                fontWeight="400"
                color="red.500"
                visibility={errors.userName ? "visible" : "hidden"}
              >
                {errors.userName}
              </Text>
            </FormControl>
            <FormControl px={2} py={1} mx={1} id="email" isRequired>
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
                  color={"subtle"}
                  requiredIndicator={null}
                >
                  your email won&apos;t be shared with others
                </FormLabel>
              </HStack>
              <Input
                px={2}
                fontSize="16px"
                borderColor={"n3"}
                height={"40px"}
                borderRadius={"4px"}
                marginBottom={"4px"}
                required
                isInvalid={errors.email}
                errorBorderColor="red.300"
                placeholder="Email"
                name="email"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "subtle" }}
                value={values?.email || ""}
                onChange={handleChange}
              />
              <Text
                fontSize="xs"
                height={"20.5px"}
                fontWeight="400"
                color="red.500"
                visibility={errors.email ? "visible" : "hidden"}
              >
                {errors.email}
              </Text>
            </FormControl>
            <HStack spacing={2}>
              <FormControl px={2} py={1} mx={1} id="twitter">
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
                  borderColor={"n3"}
                  height={"40px"}
                  borderRadius={"4px"}
                  marginBottom={"4px"}
                  placeholder="Twitter"
                  _placeholder={{ color: "subtle" }}
                  fontFamily={"PP Telegraf Light"}
                  name="twitter"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl px={2} py={1} mx={1} id="linkedin">
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
                  borderColor={"n3"}
                  height={"40px"}
                  borderRadius={"4px"}
                  marginBottom={"4px"}
                  placeholder="LinkedIn"
                  _placeholder={{ color: "subtle" }}
                  fontFamily={"PP Telegraf Light"}
                  name="linkedIn"
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>
            <FormControl py={4} px={2} id="website">
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
                    color={"subtle"}
                    requiredIndicator={null}
                  >
                    Add a personal or business website here
                  </FormLabel>
                </HStack>
              </Box>
              <Input
                px={2}
                fontSize="16px"
                borderColor={"n3"}
                height={"40px"}
                borderRadius={"4px"}
                placeholder="Website URL"
                _placeholder={{ color: "subtle" }}
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
