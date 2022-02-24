import React from "react";
import { Box, HStack, Text } from "@chakra-ui/layout";

export default function ScrollingHeader(props) {
  return (
    <Box
      width={"100%"}
      height={"80px"}
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
          width={"351px"}
          paddingX={"12px"}
          fontSize={"16px"}
          color={"#ffffff"}
          lineHeight={"32px"}
          whiteSpace={"nowrap"}
          textTransform={"uppercase"}
          textDecorationLine={"line-through"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          width={"351px"}
          paddingX={"12px"}
          height={"100%"}
          display={"flex"}
          color={"#ffffff"}
          fontSize={"16px"}
          lineHeight={"32px"}
          whiteSpace={"nowrap"}
          alignItems={"center"}
          textTransform={"uppercase"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          width={"351px"}
          paddingX={"12px"}
          color={"#ffffff"}
          fontSize={"16px"}
          lineHeight={"32px"}
          whiteSpace={"nowrap"}
          textTransform={"uppercase"}
          textDecorationLine={"line-through"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          width={"351px"}
          paddingX={"12px"}
          height={"100%"}
          display={"flex"}
          color={"#ffffff"}
          fontSize={"16px"}
          lineHeight={"32px"}
          whiteSpace={"nowrap"}
          alignItems={"center"}
          textTransform={"uppercase"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          width={"351px"}
          paddingX={"12px"}
          color={"#ffffff"}
          fontSize={"16px"}
          lineHeight={"32px"}
          whiteSpace={"nowrap"}
          textTransform={"uppercase"}
          textDecorationLine={"line-through"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          width={"351px"}
          paddingX={"12px"}
          height={"100%"}
          display={"flex"}
          color={"#ffffff"}
          fontSize={"16px"}
          lineHeight={"32px"}
          alignItems={"center"}
          whiteSpace={"nowrap"}
          textTransform={"uppercase"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          width={"351px"}
          paddingX={"12px"}
          color={"#ffffff"}
          fontSize={"16px"}
          lineHeight={"32px"}
          whiteSpace={"nowrap"}
          textTransform={"uppercase"}
          textDecorationLine={"line-through"}
        >
          the revolution will be quite boring
        </Text>
        <Text
          width={"351px"}
          paddingX={"12px"}
          height={"100%"}
          display={"flex"}
          color={"#ffffff"}
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
