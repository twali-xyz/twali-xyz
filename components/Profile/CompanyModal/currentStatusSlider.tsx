import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react";
import React from "react";

export function Current({ setCurrentStatus, currentStatus, defaultValue }) {
  return (
    <Slider
      ml={2}
      mb={4}
      defaultValue={defaultValue || 0}
      min={0}
      max={1}
      step={1}
      width={"48px"}
      onChange={(v) => setCurrentStatus(v)}
    >
      <SliderMark value={0} m="16px" ml="-2.5" fontSize="sm">
        No
      </SliderMark>
      <SliderMark value={1.25} m="16px" ml="-2.5" fontSize="sm">
        Yes
      </SliderMark>
      <SliderTrack
        bg="gray.300"
        height={"24px"}
        width={"24px"}
        borderRadius={"full"}
      >
        <Box position="relative" right={200} />
        <SliderFilledTrack bg="#C7F83C" />
      </SliderTrack>
      <SliderThumb
        boxSize={"20px"}
        pos={"relative"}
        left={
          currentStatus === 1
            ? "calc(100% - 22px) !important"
            : "2px !important"
        }
      />
    </Slider>
  );
}
