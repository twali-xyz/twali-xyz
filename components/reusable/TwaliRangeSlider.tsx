import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import React from "react";
export function TwaliRangeSlider({ name, filterParams, setFilterParams }) {
  return (
    <RangeSlider
      aria-label={["min", "max"]}
      onChangeEnd={(val) => setFilterParams(val)}
      name={name}
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  );
}
