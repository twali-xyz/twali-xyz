import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import React, { useState } from "react";
export function TwaliRangeSlider({ name, values, setValues, dropdown }) {
  console.log(values);
  const [isOpen, setIsOpen] = useState(false);
  function handleOpenClose() {
    setIsOpen(!isOpen);
  }
  return (
    <Box width={"100%"} pos={"relative"}>
      {dropdown && (
        <Button
          variant={"dropdown"}
          height={"40px"}
          bg={"n6"}
          border="1px solid #587070"
          justifyContent={"center"}
          alignItems={"center"}
          fontFamily={"PP Telegraf Light"}
          fontSize={"16px !important"}
          color={"subtle"}
          onClick={handleOpenClose}
          paddingX={1}
          width={"100%"}
        >
          {name}
          {isOpen ? (
            <ChevronUpIcon marginLeft={4} />
          ) : (
            <ChevronDownIcon marginLeft={4} />
          )}
        </Button>
      )}
      <RangeSlider
        pos={dropdown ? "absolute" : "relative"}
        display={dropdown ? (isOpen ? "inline-block" : "none") : "inline-block"}
        aria-label={["min", "max"]}
        onChangeEnd={(val) => setValues({ ...values, [name]: val })}
        name={name}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Box>
  );
}
