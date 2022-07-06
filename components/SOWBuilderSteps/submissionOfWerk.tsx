import {
  FormControl,
  Input,
  Box,
  FormLabel,
  Textarea,
  HStack,
  Select,
  Text,
} from "@chakra-ui/react";

import { useBounty } from "../../context/BountyContext";

export const submissionOfWerk = ({ handleChange, txIsLoading }) => {
  const { setBounty, ...bountyState } = useBounty();
  return (
    <form style={{ alignSelf: "center" }}>
      <HStack spacing={24}>
        <Box
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
              overflow="scroll"
            >
              <FormControl p={2} pb={0} id="statement-of-werk" isRequired>
                <FormLabel
                  marginBottom={4}
                  pos={"relative"}
                  fontFamily={"PP Telegraf"}
                  fontSize={"16px"}
                  fontStyle={"normal"}
                  fontWeight={"400"}
                  lineHeight={"24p"}
                  letterSpacing={"0.02em"}
                  textAlign={"left"}
                >
                  DSA
                </FormLabel>
                <Box
                  height="320px"
                  color="subtle"
                  fontSize="sm"
                  fontWeight="light"
                  borderWidth={1}
                  padding={4}
                  whiteSpace="pre-wrap"
                  overflowY="scroll"
                >
                  {txIsLoading ? (
                    <>
                      <Text>Tx is processing....</Text>
                    </>
                  ) : (
                    <>
                      <Text padding={2}>
                        Terms and Conditions General Site Usage Last Revised:
                        December 16, 2013 Welcome to www.lorem-ipsum.info. This
                        site is provided as a service to our visitors and may be
                        used for informational purposes only. Because the Terms
                        and Conditions contain legal obligations, please read
                        them carefully.
                      </Text>
                      <Text padding={2}>
                        1. YOUR AGREEMENT By using this Site, you agree to be
                        bound by, and to comply with, these Terms and
                        Conditions. If you do not agree to these Terms and
                        Conditions, please do not use this site.
                      </Text>
                      <Text padding={2}>conditions.</Text>
                      <Text padding={2}>
                        Terms and Conditions General Site Usage Last Revised:
                        December 16, 2013 Welcome to www.lorem-ipsum.info.
                      </Text>

                      <Text padding={2}>
                        Terms and Conditions General Site Usage Last Revised:
                        December 16, 2013 Welcome to www.lorem-ipsum.info. This
                        site is provided as a service to our visitors and may be
                        used for informational purposes only. Because the Terms
                        and Conditions contain legal obligations, please read
                        them carefully.
                      </Text>
                      <Text padding={2}>
                        1. YOUR AGREEMENT By using this Site, you agree to be
                        bound by, and to comply with, these Terms and
                        Conditions. If you do not agree to these Terms and
                        Conditions, please do not use this site.
                      </Text>
                      <Text padding={2}>conditions.</Text>
                      <Text padding={2}>
                        Terms and Conditions General Site Usage Last Revised:
                        December 16, 2013 Welcome to www.lorem-ipsum.info.
                      </Text>

                      <Text padding={2}>
                        Terms and Conditions General Site Usage Last Revised:
                        December 16, 2013 Welcome to www.lorem-ipsum.info. This
                        site is provided as a service to our visitors and may be
                        used for informational purposes only. Because the Terms
                        and Conditions contain legal obligations, please read
                        them carefully.
                      </Text>
                      <Text padding={2}>
                        1. YOUR AGREEMENT By using this Site, you agree to be
                        bound by, and to comply with, these Terms and
                        Conditions. If you do not agree to these Terms and
                        Conditions, please do not use this site.
                      </Text>
                      <Text padding={2}>conditions.</Text>
                      <Text padding={2}>
                        Terms and Conditions General Site Usage Last Revised:
                        December 16, 2013 Welcome to www.lorem-ipsum.info.
                      </Text>

                      <Text padding={2}>
                        Terms and Conditions General Site Usage Last Revised:
                        December 16, 2013 Welcome to www.lorem-ipsum.info. This
                        site is provided as a service to our visitors and may be
                        used for informational purposes only. Because the Terms
                        and Conditions contain legal obligations, please read
                        them carefully.
                      </Text>
                      <Text padding={2}>
                        1. YOUR AGREEMENT By using this Site, you agree to be
                        bound by, and to comply with, these Terms and
                        Conditions. If you do not agree to these Terms and
                        Conditions, please do not use this site.
                      </Text>
                      <Text padding={2}>conditions.</Text>
                      <Text padding={2}>
                        Terms and Conditions General Site Usage Last Revised:
                        December 16, 2013 Welcome to www.lorem-ipsum.info.
                      </Text>
                    </>
                  )}
                </Box>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </HStack>
    </form>
  );
};
