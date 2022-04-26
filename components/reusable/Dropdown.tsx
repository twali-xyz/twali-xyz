import { Box, Button, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import { CheckCircleIcon, ChevronDownIcon, TimeIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
export const Dropdown = ({ options, onChange, name, ...props }) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [selected, setSelected] = useState({});

  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: onClose,
  });

  function handleClick(event) {
    if (selected[event.target.value]) {
      delete selected[event.target.value];
      setSelected({
        ...selected,
      });
      return;
    }
    setSelected({
      ...selected,
      [event.target.value]: event.target.value,
    });
    return;
  }

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <>
      <Box ref={ref} pos={"relative"} width={"292px"} {...props}>
        <Button
          variant={"dropdown"}
          height={"40px"}
          bg={"n7"}
          border="1px solid #587070"
          alignItems={"center"}
          fontFamily={"PP Telegraf Light"}
          fontSize={"16px !important"}
          color={"subtle"}
          onClick={onToggle}
          paddingX={1}
          width={"100%"}
          borderRadius={"4px"}
          justifyContent="space-between"
          padding="0 16px"
        >
          {name}

          <ChevronDownIcon
            marginLeft={4}
            transform={"auto"}
            rotate={isOpen ? "180" : "0"}
            transitionDuration={".16s"}
          />
        </Button>
        <Box
          pos={"absolute"}
          boxShadow="8px 16px 24px 0px #0421208F"
          zIndex={isOpen ? 10 : -1}
          display={"block"}
          transition={"ease-in-out"}
          transform={"auto"}
          translateY={isOpen ? "0" : "-8px"}
          transitionDuration={".16s"}
          maxH={isOpen ? "340px" : "0px"}
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
};
