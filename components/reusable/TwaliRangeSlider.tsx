import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import React from "react";
export function TwaliRangeSlider({ name, values, setValues }) {
  console.log(values);

  return (
    <RangeSlider
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
  );
}
