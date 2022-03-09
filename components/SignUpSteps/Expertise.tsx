import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export function Expertise({ title, formLabel, handleChange, options }) {
  let [count, setCount] = useState(1);
  let splitLabel = formLabel.split(" ");

  function createSelectors() {
    let selectors = [];

    for (let i = 1; i <= count; i++) {
      const element = (
        <Selector
          splitLabel={splitLabel}
          handleChange={handleChange}
          options={options}
          idx={i}
        />
      );

      selectors.push(element);
    }
    return selectors;
  }

  function handleAddSelector() {
    if (count < 3) {
      setCount(count + 1);
    }
  }
  return (
    <>
      <FormControl p={4} id={`${splitLabel[0]}-${splitLabel[1]}`} isRequired>
        <FormLabel>{title}</FormLabel>
        {createSelectors()}
        <Button marginTop={"10px"} onClick={handleAddSelector}>
          <FontAwesomeIcon icon={"plus-circle"}></FontAwesomeIcon>
        </Button>
      </FormControl>
    </>
  );
}

function Selector({ splitLabel, handleChange, options, idx }) {
  return (
    <Select
      key={`${splitLabel[0]}-${idx}`}
      marginTop={"8px"}
      placeholder={`Select ${splitLabel[0]} ${splitLabel[1]}`}
      name={`${splitLabel[0]}${splitLabel[1].replace(/\b\w/g, (l) =>
        l.toUpperCase()
      )}${idx == 1 ? "" : idx}`}
      onChange={handleChange}
    >
      {options?.map((option, idx) => {
        return <option key={`${option}--option-${idx}`}>{option}</option>;
      })}
    </Select>
  );
}
