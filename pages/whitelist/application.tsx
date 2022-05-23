import { Box, HStack, Img, Text, VStack } from "@chakra-ui/react";
import React from "react";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { WhiteListForm } from "../../components/Whitelist/WhitelistForm";
import background from "../../public/twali-assets/step1_background.png";

export default function whitelist() {
  return (
    <>
      <HeaderNav whichPage="steps" step={0} />

      <Box>
        <HStack>
          <Box
            width={"50%"}
            height={"100vh"}
            m={"0 !important"}
            bgImg={`url(${background.src})`}
            justifyContent={"center"}
            backgroundSize={"cover"}
            backgroundPosition={"100% "}
          >
            <VStack height={"100%"} justify={"center"} alignItems={"center"}>
              <Text
                w={"full"}
                fontSize="40px"
                fontWeight="400"
                display={"flex"}
                color={"fresh"}
                justifyContent={"center"}
                alignItems={"center"}
                fontFamily={"GrandSlang"}
              >
                welcome to
              </Text>
              <Img
                width={"334.14px"}
                height={"72px"}
                alt="twali-logo"
                src="/twali-logo.svg"
              />
            </VStack>
          </Box>
          <Box
            height={"100vh"}
            width={"50%"}
            m={"0 !important"}
            background={"inverse"}
          >
            <WhiteListForm />
          </Box>
        </HStack>
      </Box>
    </>
  );
}
