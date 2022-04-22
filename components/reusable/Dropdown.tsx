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
  filterParams,
  setFilterParams,
  name,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({});

  function handleClick(event) {
    if (selected[event.target.name]) {
      delete selected[event.target.name];
      setSelected({
        ...selected,
      });
      setFilterParams({
        ...filterParams,
        [name]: { ...selected },
      });
      return;
    }
    setSelected({
      ...selected,
      [event.target.name]: event.target.value,
    });
    setFilterParams({
      ...filterParams,
      [name]: { ...selected, [event.target.value]: event.target.value },
    });
    return;
  }

  function handleOpenClose() {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    setSelected({
      ...filterParams[name],
    });
    console.log(selected, filterParams);

    return () => {};
  }, [filterParams]);

  return (
    <>
      <Box
        box-shadow="8px 16px 24px 0px #0421208F"
        pos={"relative"}
        width={"292px"}
      >
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
        <Box
          pos={"absolute"}
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
