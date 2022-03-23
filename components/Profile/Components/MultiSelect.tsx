import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Img,
  Select,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export function MultiSelect({
  formLabel,
  name,
  handleChange,
  options,
  defaultValues,
  maxSelections,
  ...props
}) {
  // maxDisplayIndex tracks the index of the last element in the array that contains data
  const [maxDisplayIndex, setMaxDisplayIndex] = useState(0);
  const [count, setCount] = useState(
    maxDisplayIndex + 1 > 1 ? maxDisplayIndex + 1 : 1
  );

  useEffect(() => {
    let defaults = [];
    for (let i = 0; i < defaultValues?.length; i++) {
      const element = defaultValues[i];

      if (element !== "" && element !== null && element !== undefined) {
        defaults.push(element);
        if (i >= maxDisplayIndex) {
          setMaxDisplayIndex(i + 1);
          setCount(i + 1);
        }
      }
    }
  }, [count]);

  const splitLabel = name.split(/(?=[A-Z])/);

  function createSelectors() {
    let selectors = [];
    for (let i = 1; i <= count; i++) {
      const element = (
        <>
          {defaultValues && (defaultValues[i - 1] || i === 1 || count >= i) && (
            <Selector
              key={`${i}--selector`}
              splitLabel={splitLabel}
              handleChange={handleChange}
              options={options}
              idx={i}
              defaultValue={defaultValues?.length ? defaultValues[i - 1] : null}
            />
          )}
        </>
      );
      selectors.push(element);
    }
    return selectors;
  }
  function handleAddSelector() {
    if (count < maxSelections) {
      setCount(count + 1);
      setMaxDisplayIndex(maxDisplayIndex + 1);
    }
  }

  return (
    <>
      <FormControl p={2} id={`${splitLabel[0]}-${splitLabel[1]}`} isRequired>
        <FormLabel
          pos={"relative"}
          left={"1px"}
          fontFamily={"PP Telegraf"}
          fontSize={"16px"}
          fontStyle={"normal"}
          fontWeight={"400"}
          lineHeight={"24p"}
          letterSpacing={"0.02em"}
          textAlign={"left"}
        >
          {formLabel}
        </FormLabel>
        {createSelectors()}
        {count !== maxSelections ? (
          <Button
            backgroundColor={"transparent"}
            marginTop={"16px"}
            onClick={handleAddSelector}
            paddingLeft={"0"}
          >
            <HStack>
              <Img
                borderRadius="full"
                backgroundColor="transparent"
                width="32px"
                src="twali-assets/plusicon.png"
                alt="add img"
              />
              <Text
                fontFamily={"PP Telegraf Light"}
                fontWeight={"400"}
                color={"#C7F83C"}
                fontSize={"16px"}
                lineHeight={"24px"}
              >
                Add expertise
              </Text>
            </HStack>
          </Button>
        ) : null}
      </FormControl>
    </>
  );
}

function Selector({ splitLabel, handleChange, options, idx, defaultValue }) {
  const [color, setColor] = useState("#98B2B2");
  return (
    <Select
      key={`${splitLabel[0]}-${idx}`}
      marginTop={"8px"}
      placeholder={`Select ${splitLabel[0]} ${splitLabel[1]}`}
      name={`${splitLabel[0]}${splitLabel[1] + idx}`}
      onChange={(e) => {
        handleChange(e);
        if (e.target.value) {
          setColor("#F9FFF2");
        } else {
          setColor("#98B2B2");
        }
      }}
      defaultValue={defaultValue}
      errorBorderColor="red.300"
      fontFamily={"PP Telegraf light"}
      color={defaultValue ? "#F9FFF2" : "#98B2B2"}
      _placeholder={{ color: "#98B2B2" }}
    >
      {options?.map((option, idx) => {
        return <option key={`${option}--option-${idx}`}>{option}</option>;
      })}
    </Select>
  );
}
