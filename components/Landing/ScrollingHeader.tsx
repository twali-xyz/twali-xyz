import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

export default function ScrollingHeader(props) {
  return (
    <Box
      height={"80px"}
      width={"100%"}
      borderTop={props.borderTop}
      borderBottom={props.borderBottom}
      opacity={"0.6"}
    >
      <HStack
        display={"flex"}
        alignItems={"center"}
        height={"100%"}
        overflowX={"hidden"}
        flexWrap={"nowrap"}
      >
        <Text
          fontSize={"16px"}
          whiteSpace={"nowrap"}
          lineHeight={"32px"}
          textTransform={"uppercase"}
          textDecorationLine={"line-through"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          display={"flex"}
          alignItems={"center"}
          height={"100%"}
          fontSize={"16px"}
          whiteSpace={"nowrap"}
          lineHeight={"32px"}
          textTransform={"uppercase"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          fontSize={"16px"}
          whiteSpace={"nowrap"}
          lineHeight={"32px"}
          textTransform={"uppercase"}
          textDecorationLine={"line-through"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          display={"flex"}
          alignItems={"center"}
          height={"100%"}
          fontSize={"16px"}
          whiteSpace={"nowrap"}
          lineHeight={"32px"}
          textTransform={"uppercase"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          fontSize={"16px"}
          whiteSpace={"nowrap"}
          lineHeight={"32px"}
          textTransform={"uppercase"}
          textDecorationLine={"line-through"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          display={"flex"}
          alignItems={"center"}
          height={"100%"}
          fontSize={"16px"}
          whiteSpace={"nowrap"}
          lineHeight={"32px"}
          textTransform={"uppercase"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          fontSize={"16px"}
          whiteSpace={"nowrap"}
          lineHeight={"32px"}
          textTransform={"uppercase"}
          textDecorationLine={"line-through"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          display={"flex"}
          alignItems={"center"}
          height={"100%"}
          fontSize={"16px"}
          whiteSpace={"nowrap"}
          lineHeight={"32px"}
          textTransform={"uppercase"}
        >
          the revolution will be quite boring
        </Text>
      </HStack>
    </Box>
  );
}
