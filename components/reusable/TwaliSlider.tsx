import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  SliderProps,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React from "react";

interface IMultiContainerProps extends SliderProps {
  setCurrentStatus: React.Dispatch<React.SetStateAction<number>>;
  currentStatus: number;
  marks: marks[];
  variant?: "binary" | "smooth" | "snap" | undefined;
  colorScheme?: string;
  size?: "prose" | "1/4" | "2/4" | "3/4" | "full";
  name?: string;
  defaultValue?: number;
  step?: number;
  props?;
}

interface marks {
  mark?: string;
  value?: number;
}

/**
 * Twali slider component for binary selection
 *
 *
 * @param {React.Dispatch<React.SetStateAction<number>>} setCurrentStatus
 * @param {number} currentStatus tracks current status of slider 0 || 1
 * @param {Object[{mark: string, value: number}]} marks Object array [{mark: string, value: number}]
 * @param {number} defaultValue optional 0 || 1. defaults to 0 if no value is provided
 *
 * @returns JSX slider element
 *
 */
export const TwaliSlider = ({
  variant = undefined,
  colorScheme = undefined,
  size = undefined,
  setCurrentStatus,
  currentStatus,
  marks,
  defaultValue,
  step,
  ...props
}: IMultiContainerProps) => {
  const styles = useMultiStyleConfig(`TwaliSlider`, {
    variant,
    colorScheme,
    size,
  });

  return (
    <Slider
      defaultValue={defaultValue || 0}
      step={variant === "smooth" ? null : step}
      min={Math.min.apply(
        null,
        marks.map(function (item) {
          return item.value;
        })
      )}
      max={Math.max.apply(
        null,
        marks.map(function (item) {
          return item.value;
        })
      )}
      onChange={(v) => setCurrentStatus(v)}
      sx={{ ...styles.Slider }}
      {...props}
    >
      {marks.map(({ mark, value }, idx) => {
        return (
          <SliderMark key={idx} value={value} sx={{ ...styles.SliderMark }}>
            {mark ? mark : null}
          </SliderMark>
        );
      })}

      <SliderTrack sx={{ ...styles.SliderTrack }}>
        <Box position="relative" right={200} sx={{ ...styles.Box }} />
        <SliderFilledTrack sx={{ ...styles.SliderFilledTrack }} />
      </SliderTrack>
      <SliderThumb
        pos={variant === "binary" ? "relative" : null}
        left={
          variant === "binary"
            ? currentStatus === 1
              ? "calc(100% - 22px) !important"
              : "2px !important"
            : null
        }
        sx={{ ...styles.SliderThumb }}
      />
    </Slider>
  );
};
