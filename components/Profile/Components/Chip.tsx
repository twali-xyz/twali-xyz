import { Box, Text } from "@chakra-ui/react";
import React from "react";
export function Chip({ ...props }) {
  return (
    <Box borderRadius={"32px"} background={"gradient5"} p={"1px"} {...props}>
      <Text
        fontSize={"14px"}
        lineHeight={"24px"}
        fontFamily={"PP Telegraf"}
        alignSelf={"start"}
        backgroundColor={"n6"}
        p={"4px 12px"}
        borderRadius={"32px"}
        whiteSpace={"nowrap"}
        {...props.fontProps}
      >
        {props.children}
      </Text>
    </Box>
  );
}
