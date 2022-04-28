import {
  Box,
  Button,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderProps,
  RangeSliderThumb,
  RangeSliderTrack,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface IMultiContainerProps extends RangeSliderProps {
  variant?: undefined;
  colorScheme?: string;
  size?: "prose" | "1/4" | "2/4" | "3/4" | "full";
  name?: string;
  values?: Object[];
  onChange?: React.Dispatch<React.SetStateAction<Object[]>>;
  dropdown?: boolean;
  min?: number;
  max?: number;
  step?: number;
  symbol?: string;
  props?;
}

export const TwaliRangeSlider = ({
  variant = undefined,
  colorScheme = undefined,
  size = undefined,
  defaultValue = undefined,
  onChange,
  name,
  values,
  dropdown,
  symbol,
  min = 0,
  max = 100,
  step = 1,
  ...props
}: IMultiContainerProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [sliderValue, setSliderValue] = useState([min, max]);
  const [finalValue, setFinalValue] = useState(null);
  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: onClose,
  });

  function handleChange(val) {
    setFinalValue(val);
  }
  function handleSliderMarkers(val) {
    setSliderValue(val);
  }
  function handleReset() {
    delete values[name];
    setSliderValue([min, max]);
    setFinalValue(null);
  }

  useEffect(() => {
    onChange(finalValue);
  }, [finalValue]);

  return (
    <Box
      width={"84px"}
      height={"40px"}
      alignSelf={"flex-start"}
      pos={"relative"}
      ref={ref}
    >
      {dropdown && (
        <Button
          variant={"dropdown"}
          height={"40px"}
          bg={"n7"}
          border="1px solid"
          borderColor={props.borderColor}
          justifyContent={"center"}
          alignItems={"center"}
          fontFamily={"PP Telegraf Light"}
          fontSize={"16px !important"}
          color={"subtle"}
          onClick={onToggle}
          paddingX={1}
          width={"100%"}
          borderRadius={"4px"}
          my={"8px"}
        >
          {name}
        </Button>
      )}
      <Flex
        pos={"relative"}
        zIndex={10}
        width={isOpen ? "280px" : "40px"}
        height={isOpen ? "124px" : "40px"}
        background="#041A19E5"
        boxShadow={"8px 16px 24px 0px #062B2A8F"}
        border={"1px solid"}
        borderColor={"zing"}
        borderRadius={"8px"}
        display={"flex"}
        visibility={isOpen ? "visible" : "hidden"}
        transition={"ease-in-out"}
        transform={"auto"}
        translateY={isOpen ? "0" : "-8px"}
        translateX={isOpen ? "0" : "18px"}
        transitionDuration={".2s"}
        padding={"8px 24px 24px 8px"}
        paddingLeft={"16px"}
        flexDir={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button
          display={isOpen ? "block" : "none"}
          alignSelf={"flex-end"}
          variant={"unstyled"}
          onClick={handleReset}
          fontSize={"14px"}
          width="fit-content"
          height={"auto"}
          borderRadius={"none"}
          fontFamily={"PP Telegraf Light"}
          fontWeight={"400"}
          textTransform={"capitalize"}
        >
          reset
        </Button>
        <RangeSlider
          step={step}
          display={isOpen ? "block" : "none"}
          alignSelf={"flex-start"}
          pos={dropdown ? "absolute" : "relative"}
          aria-label={["min", "max"]}
          onChangeEnd={(val) => handleChange(val)}
          onChange={(val) => handleSliderMarkers(val)}
          name={name}
          max={max}
          min={min}
          width={"80%"}
          marginX={"auto"}
          ml={5}
          value={sliderValue}
        >
          <RangeSliderMark
            value={min}
            textAlign="center"
            fontSize={"14px"}
            whiteSpace={"nowrap"}
            color="fresh"
            mt="-10"
            ml="-6"
            w="12"
          >
            {symbol && symbol === "$"
              ? sliderValue[0] > 999
                ? (sliderValue[0] / 1000) % 2
                  ? `$${(sliderValue[0] / 1000).toFixed(1)}k`
                  : `$${(sliderValue[0] / 1000).toFixed(0)}k`
                : `$${sliderValue[0]}`
              : symbol
              ? `${sliderValue[0]} ${symbol}`
              : `${sliderValue[0]}`}
          </RangeSliderMark>
          <RangeSliderMark
            value={max}
            fontSize={"14px"}
            textAlign="center"
            color="fresh"
            mt="-10"
            ml="-6"
            w="12"
            whiteSpace={"nowrap"}
          >
            {symbol && symbol === "$"
              ? sliderValue[1] > 999
                ? (sliderValue[1] / 1000) % 2
                  ? `$${(sliderValue[1] / 1000).toFixed(2)}k`
                  : `$${(sliderValue[1] / 1000).toFixed(0)}k`
                : `$${sliderValue[1]}`
              : symbol
              ? `${sliderValue[1]} ${symbol}`
              : `${sliderValue[1]}`}
          </RangeSliderMark>
          <RangeSliderTrack height={"4px"} background={"n3"}>
            <RangeSliderFilledTrack background={"n1"} />
          </RangeSliderTrack>
          <RangeSliderThumb
            index={0}
            background={"aqua"}
            width={"24px"}
            height={"24px"}
            ml={-2}
          />
          <RangeSliderThumb
            index={1}
            background={"aqua"}
            width={"24px"}
            height={"24px"}
            ml={-2}
          />
        </RangeSlider>
      </Flex>
    </Box>
  );
};
