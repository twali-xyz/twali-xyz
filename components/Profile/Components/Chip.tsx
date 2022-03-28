import { Box, Text } from "@chakra-ui/react";
import React from "react";
export function Chip({ text, ...props }) {
  return (
    <Box
      borderRadius={"32px"}
      backgroundImage={"linear-gradient(#0DD5D1 0%, #9350B3 100%)"}
      p={"1px"}
      {...props}
    >
      <Text
        fontSize={"14px"}
        lineHeight={"24px"}
        fontFamily={"PP Telegraf"}
        alignSelf={"start"}
        backgroundColor={"#0A2625"}
        p={"4px 12px"}
        borderRadius={"32px"}
        whiteSpace={"nowrap"}
        {...props.fontProps}
      >
        {text}
      </Text>
    </Box>
  );
}
