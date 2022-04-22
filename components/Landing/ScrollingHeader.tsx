import React from "react";
import { motion } from "framer-motion";
import { Box, HStack, Text } from "@chakra-ui/layout";

export const MotionBox = motion(Box);

function MotionDiv(props) {
  return (
    <MotionBox
      height={"100%"}
      overflowX={"hidden"}
      width={"max-content"}
      animate={{
        translateX: ["0%", "-100%"],
        transition: {
          duration: 2500,
          repeat: Infinity,
          repeatDelay: 0,
          ease: "linear",
        },
      }}
    >
      {props.children}
    </MotionBox>
  );
}
let textElements = [];

for (let i = 0; i <= 100; i++) {
  textElements.push(
    <Box flexDir={"row"} height={"100%"} display={"flex"} alignItems={"center"}>
      <Text
        width={"351px"}
        marginX={"25px"}
        paddingX={"12px"}
        fontSize={"16px"}
        color={"fresh"}
        lineHeight={"32px"}
        whiteSpace={"nowrap"}
        fontFamily={"Scope Medium"}
        textTransform={"uppercase"}
        textDecorationLine={"line-through"}
      >
        the revolution will be quite boring
      </Text>
      <Text
        width={"351px"}
        height={"100%"}
        marginX={"25px"}
        display={"flex"}
        color={"fresh"}
        paddingX={"12px"}
        fontSize={"16px"}
        lineHeight={"32px"}
        whiteSpace={"nowrap"}
        alignItems={"center"}
        fontFamily={"Scope Medium"}
        textTransform={"uppercase"}
      >
        the revolution will be quite boring
      </Text>
    </Box>
  );
}
export default function ScrollingHeader(props) {
  return (
    <Box
      max-width={"240px"}
      width={"100%"}
      height={"80px"}
      overflowX={"hidden"}
      borderTop={props.borderTop}
      borderBottom={props.borderBottom}
    >
      <MotionDiv>
        <HStack
          height={"100%"}
          display={"flex"}
          flexWrap={"nowrap"}
          overflowX={"hidden"}
          alignItems={"center"}
        >
          {textElements.map((element, idx) => {
            return (
              <Box key={idx} width={"100%"}>
                {element}
              </Box>
            );
          })}
        </HStack>
      </MotionDiv>
    </Box>
  );
}
