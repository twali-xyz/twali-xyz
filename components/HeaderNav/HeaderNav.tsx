import React, { useState } from "react";
import { Flex, HStack, Text, Img } from "@chakra-ui/react";

const HeaderNav = (props) => {
  const whichPage = props.whichPage;
  const userWallet = props.userWallet;
  return (
    <Flex
      height={"80px"}
      p={4}
      px={8}
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      pos={props.step == 0 ? "absolute" : "relative"}
      backgroundColor={whichPage === "profile" ? "#0A1313" : "transparent"}
    >
      <Img
        width={"144px"}
        height={"auto"}
        src="/twali-assets/navbar_logo.png"
      />
      <HStack alignItems="center" w="130px" height={"32px"}>
        <Flex
          ml="2"
          mt="1"
          width={"100%"}
          height={"100%"}
          border={"1px solid #F9FFF2"}
          alignItems={"center"}
          justifyItems={"center"}
          borderRadius={32}
        >
          <Text
            color="white"
            fontSize={"14px"}
            margin={"auto"}
            alignSelf={"center"}
            fontWeight={"700"}
            letterSpacing={"0.06em"}
            textTransform={"uppercase"}
            isTruncated
          >
            {userWallet}
          </Text>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default HeaderNav;
