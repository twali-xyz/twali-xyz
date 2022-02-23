import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

export default function ScrollingHeader(props) {
  return (
    <Box
      width={"100%"}
      height={"80px"}
      opacity={"0.6"}
      borderTop={props.borderTop}
      borderBottom={props.borderBottom}
    >
      <HStack
        height={"100%"}
        display={"flex"}
        flexWrap={"nowrap"}
        overflowX={"hidden"}
        alignItems={"center"}
      >
        <Text
          fontSize={"16px"}
          color={"#FFFFFF"}
          lineHeight={"32px"}
          whiteSpace={"nowrap"}
          textTransform={"uppercase"}
          textDecorationLine={"line-through"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          height={"100%"}
          display={"flex"}
          fontSize={"16px"}
          lineHeight={"32px"}
          whiteSpace={"nowrap"}
          alignItems={"center"}
          textTransform={"uppercase"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          fontSize={"16px"}
          lineHeight={"32px"}
          whiteSpace={"nowrap"}
          textTransform={"uppercase"}
          textDecorationLine={"line-through"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          height={"100%"}
          display={"flex"}
          fontSize={"16px"}
          lineHeight={"32px"}
          whiteSpace={"nowrap"}
          alignItems={"center"}
          textTransform={"uppercase"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          fontSize={"16px"}
          lineHeight={"32px"}
          whiteSpace={"nowrap"}
          textTransform={"uppercase"}
          textDecorationLine={"line-through"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          height={"100%"}
          display={"flex"}
          fontSize={"16px"}
          lineHeight={"32px"}
          alignItems={"center"}
          whiteSpace={"nowrap"}
          textTransform={"uppercase"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          fontSize={"16px"}
          lineHeight={"32px"}
          whiteSpace={"nowrap"}
          textTransform={"uppercase"}
          textDecorationLine={"line-through"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          height={"100%"}
          display={"flex"}
          fontSize={"16px"}
          lineHeight={"32px"}
          alignItems={"center"}
          whiteSpace={"nowrap"}
          textTransform={"uppercase"}
        >
          the revolution will be quite boring
        </Text>
      </HStack>
    </Box>
  );
}
