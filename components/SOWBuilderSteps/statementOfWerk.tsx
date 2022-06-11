import {
  FormControl,
  Input,
  Box,
  FormLabel,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import { useBounty } from "../../context/BountyContext";
import WerkFileUpload from "./WerkFileUpload/WerkFileUpload";

export const statementOfWerk = ({ handleChange }) => {
  const { ...bountyState} = useBounty();

  return (
    <form style={{ alignSelf: "start" }}>
      <HStack spacing={24}>
      <Box
        maxWidth={"496px"}
        h="450px"
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
                // isInvalid={errors.contractTitle}
                errorBorderColor="red.300"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "subtle" }}
                value={bountyState?.contractTitle || ""}
                required
                placeholder="Project Title"
                name="contractTitle"
                onChange={handleChange}
              />
              {/* <Text
                fontSize="xs"
                height={"20.5px"}
                fontWeight="400"
                color="red.500"
                visibility={errors.contractTitle ? "visible" : "hidden"}
              >
                {errors.contractTitle}
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
                height={"249px"}
                borderRadius={"4px"}
                marginBottom={"4px"}
                // isInvalid={errors.contractDescription}
                errorBorderColor="red.300"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "subtle" }}
                value={bountyState?.contractDescription || ""}
                required
                placeholder="Max Word Limit"
                name="contractDescription"
                onChange={handleChange}
              />
              {/* <Text
                fontSize="xs"
                height={"20.5px"}
                fontWeight="400"
                color="red.500"
                visibility={errors.contractDescription ? "visible" : "hidden"}
              >
                {errors.contractDescription}
              </Text> */}
            </FormControl>
          </Box>
        </Box>
      </Box>
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
        alignSelf="baseline"
      >
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <WerkFileUpload/>
          </Box>
        </Box>
      </Box>
      </HStack>
    </form>
  );
};
