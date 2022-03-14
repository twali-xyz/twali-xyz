import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export function MultiSelect({
  formLabel,
  name,
  handleChange,
  options,
  defaultValues,
  maxSelections,
}) {
  // maxDisplayIndex tracks the index of the last element in the array that contains data
  const [maxDisplayIndex, setMaxDisplayIndex] = useState(0);
  const [count, setCount] = useState(maxDisplayIndex + 1 || 1);

  useEffect(() => {
    let defaults = [];
    for (let i = 0; i < defaultValues.length; i++) {
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
    for (let i = 1; i <= maxSelections; i++) {
      const element = (
        <>
          {(defaultValues[i - 1] || i === 1 || count >= i) && (
            <Selector
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
    }
  }

  return (
    <>
      <FormControl p={4} id={`${splitLabel[0]}-${splitLabel[1]}`} isRequired>
        <FormLabel>{formLabel}</FormLabel>
        {createSelectors()}
        <Button marginTop={"10px"} onClick={handleAddSelector}>
          <FontAwesomeIcon icon={"plus-circle"}></FontAwesomeIcon>
        </Button>
      </FormControl>
    </>
  );
}

function Selector({ splitLabel, handleChange, options, idx, defaultValue }) {
  return (
    <Select
      key={`${splitLabel[0]}-${idx}`}
      marginTop={"8px"}
      placeholder={`Select ${splitLabel[0]} ${splitLabel[1]}`}
      name={`${splitLabel[0]}${splitLabel[1] + idx}`}
      onChange={handleChange}
      defaultValue={defaultValue}
    >
      {options?.map((option, idx) => {
        return <option key={`${option}--option-${idx}`}>{option}</option>;
      })}
    </Select>
  );
}
