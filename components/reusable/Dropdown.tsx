import { Box, Button, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import { CheckCircleIcon, ChevronDownIcon, TimeIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
export const Dropdown = ({
  options,
  onChange,
  name,
  multiSelect = false,
  ...props
}) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [selected, setSelected] = useState({});
  const router = useRouter();

  useEffect(() => {
    // set selected based on URL query
    if (!router.query || name === "sort") return;
    let tempFilter = {};

    Object.entries(router.query).forEach((filterData) => {
      let filterObjectArray = {};
      let [filterType, filterValues] = filterData;

      if (typeof filterValues === "string") {
        filterValues = [filterValues];
      }

      if (
        filterType === "duration" ||
        filterType === "budget" ||
        filterType === "startDate"
      ) {
        tempFilter[filterType] = filterValues;
      } else {
        filterValues.forEach((value) => {
          filterObjectArray[value] = value;
        });
        tempFilter[filterType] = filterObjectArray;
      }
    });

    setSelected(tempFilter[name]);
  }, [router.query]);

  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: onClose,
  });

  function handleSelect(event) {
    if (selected && Object.values(selected).includes(event.target.value)) {
      delete selected[event.target.value];
      setSelected({
        ...selected,
      });
      return;
    }
    setSelected({
      [event.target.value]: event.target.value,
    });
  }
  function handleMultiSelect(event) {
    if (selected && Object.values(selected).includes(event.target.value)) {
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
          alignItems={"center"}
          fontFamily={"PP Telegraf Light"}
          fontSize={"16px !important"}
          borderColor={props.borderColor || null}
          borderRadius={"4px"}
          color={"subtle"}
          onClick={onToggle}
          paddingX={1}
          width={"100%"}
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
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
              background: "zing",
              color: "zing",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
              background: "zing",
              color: "zing",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "zing",
              borderRadius: "24px",
            },
          }}
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
                onClick={multiSelect ? handleMultiSelect : handleSelect}
                key={idx}
                justifyContent={"space-between"}
              >
                {option}
                {selected && selected[option] ? (
                  <CheckCircleIcon />
                ) : (
                  <TimeIcon />
                )}
              </Button>
            );
          })}
        </Box>
      </Box>
    </>
  );
};
