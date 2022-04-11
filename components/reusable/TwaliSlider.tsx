import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  setCurrentStatus: React.Dispatch<React.SetStateAction<number>>;
  currentStatus: number;
  defaultValue?: number;
  marks: [string, string];
}

/**
 * Twali slider component for binary selection
 *
 *
 * @param {React.Dispatch<React.SetStateAction<number>>} setCurrentStatus
 * @param {number} currentStatus tracks current status of slider 0 || 1
 * @param {string[]} marks string array of length 2 containing the desired slider marks
 * @param {number} defaultValue optional 0 || 1. defaults to 0 if no value is provided
 *
 * @returns JSX slider element
 *
 */
export function TwaliSlider({
  setCurrentStatus,
  currentStatus,
  marks,
  defaultValue,
}: Props) {
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
        {marks[0]}
      </SliderMark>
      <SliderMark value={1.25} m="16px" ml="-2.5" fontSize="sm">
        {marks[1]}
      </SliderMark>
      <SliderTrack bg="n2" height={"24px"} width={"24px"} borderRadius={"full"}>
        <Box position="relative" right={200} />
        <SliderFilledTrack bg="zing" />
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
