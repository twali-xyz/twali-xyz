import { Box, Button } from "@chakra-ui/react";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TimeIcon,
} from "@chakra-ui/icons";

import React, { useEffect, useState } from "react";
export default function Dropdown({
  options,
  values,
  setValues,
  name,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({});

  function handleClick(event) {
    if (selected[event.target.value]) {
      delete selected[event.target.value];
      setSelected({
        ...selected,
      });
      setValues({
        ...values,
        [name]: { ...selected },
      });
      return;
    }
    setSelected({
      ...selected,
      [event.target.name]: event.target.value,
    });
    setValues({
      ...values,
      [name]: { ...selected, [event.target.value]: event.target.value },
    });
    return;
  }

  function handleOpenClose() {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    setSelected({
      ...values[name],
    });
  }, [values]);

  return (
    <>
      <Box pos={"relative"} width={"292px"} {...props}>
        <Button
          variant={"dropdown"}
          height={"40px"}
          bg={"n7"}
          border="1px solid #587070"
          alignItems={"center"}
          fontFamily={"PP Telegraf Light"}
          fontSize={"16px !important"}
          color={"subtle"}
          onClick={handleOpenClose}
          paddingX={1}
          width={"100%"}
          borderRadius={"4px"}
          justifyContent="space-between"
          padding="0 16px"
        >
          {name}
          {isOpen ? (
            <ChevronUpIcon marginLeft={4} />
          ) : (
            <ChevronDownIcon marginLeft={4} />
          )}
        </Button>
        <Box
          pos={"absolute"}
          boxShadow="8px 16px 24px 0px #0421208F"
          zIndex={10}
          display={isOpen ? "block" : "none"}
          maxH={"246px"}
          overflow={"scroll"}
          width={"100%"}
        >
          {options?.map((option, idx) => {
            return (
              <Button
                variant={"dropdown"}
                value={option}
                name={name}
                width={"100%"}
                onClick={handleClick}
                key={idx}
              >
                {selected[option] ? <CheckCircleIcon /> : <TimeIcon />}
                {option}
              </Button>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
