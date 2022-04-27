import {
  FormControl,
  Input,
  Box,
  FormLabel,
  Textarea,
  Select,
  Text,
} from "@chakra-ui/react";

export const statementOfWerk = ({ values }) => {
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
            <FormControl p={2} pb={0} id="werk-title" isRequired>
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
                Title
              </FormLabel>
              <Input
                px={2}
                fontSize="16px"
                borderColor={"n3"}
                height={"40px"}
                borderRadius={"4px"}
                marginBottom={"4px"}
                // isInvalid={errors.currTitle}
                errorBorderColor="red.300"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "subtle" }}
                // value={values?.currTitle || ""}
                required
                placeholder="Project Title"
                name="currTitle"
                // onChange={handleChange}
              />
              {/* <Text
                fontSize="xs"
                height={"20.5px"}
                fontWeight="400"
                color="red.500"
                visibility={errors.currTitle ? "visible" : "hidden"}
              >
                {errors.currTitle}
              </Text> */}
            </FormControl>
            <FormControl p={2} pb={0} id="statement-of-werk" isRequired>
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
                Statement of Werk
              </FormLabel>
              <Textarea
                px={2}
                fontSize="16px"
                borderColor={"n3"}
                height={"150px"}
                borderRadius={"4px"}
                marginBottom={"4px"}
                // isInvalid={errors.currTitle}
                errorBorderColor="red.300"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "subtle" }}
                // value={values?.currTitle || ""}
                required
                placeholder="Max Word Limit"
                name="currTitle"
                // onChange={handleChange}
              />
              {/* <Text
                fontSize="xs"
                height={"20.5px"}
                fontWeight="400"
                color="red.500"
                visibility={errors.currTitle ? "visible" : "hidden"}
              >
                {errors.currTitle}
              </Text> */}
            </FormControl>
          </Box>
        </Box>
      </Box>
    </form>
  );
};
