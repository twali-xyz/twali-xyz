import {
  Box,
  Button,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef, useState } from "react";
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
          <Text>{props.placeholder || name || "select"}</Text>

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
          background={"n6"}
        >
          {options?.map((option, idx) => {
            const buttonRef = useRef(null);
            return (
              <Button
                ref={buttonRef}
                variant={"dropdown"}
                value={option}
                name={name}
                width={"100%"}
                onClick={multiSelect ? handleMultiSelect : handleSelect}
                key={idx}
                justifyContent={"flex-start"}
                background={selected && selected[option] ? "#1F353580" : "n6"}
              >
                {selected && selected[option] ? (
                  <svg
                    onClick={() => {
                      buttonRef.current.click();
                    }}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 0C3.14172 0 0 3.1419 0 7C0 10.8581 3.1419 14 7 14C10.8581 14 14 10.8581 14 7C14 3.12573 10.8581 0 7 0ZM7 13.0233C3.67911 13.0233 0.976744 10.321 0.976744 7C0.976744 3.67911 3.67903 0.976744 7 0.976744C10.3209 0.976744 13.0233 3.67903 13.0233 7C13.0233 10.3372 10.3208 13.0233 7 13.0233ZM10.7929 5.03016L6.20203 9.65334C6.10438 9.73468 5.97408 9.78364 5.84391 9.78364C5.81141 9.78364 5.77876 9.78364 5.74626 9.76732C5.61596 9.73482 5.5183 9.66966 5.43697 9.57201L3.20677 7.34167C3.02764 7.14635 3.02764 6.83705 3.22309 6.65795C3.41841 6.47881 3.69519 6.47881 3.8905 6.65795L5.84406 8.61151L10.1093 4.34625C10.3046 4.16711 10.6139 4.16711 10.793 4.36257C10.972 4.55788 10.972 4.83452 10.7929 5.02997L10.7929 5.03016Z"
                      fill="#C7F83C"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={() => {
                      buttonRef.current.click();
                    }}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 0C3.14171 0 0 3.1419 0 7C0 10.8581 3.1419 14 7 14C10.8581 14 14 10.8581 14 7C14 3.12573 10.8581 0 7 0ZM7 13.0233C3.67911 13.0233 0.976744 10.321 0.976744 7C0.976744 3.67911 3.67903 0.976744 7 0.976744C10.3209 0.976744 13.0233 3.67903 13.0233 7C13.0233 10.3372 10.3208 13.0233 7 13.0233Z"
                      fill="#F9FFF2"
                    />
                  </svg>
                )}
                <Text
                  onClick={() => {
                    buttonRef.current.click();
                  }}
                  ml={"8px"}
                >
                  {option}
                </Text>
              </Button>
            );
          })}
        </Box>
      </Box>
    </>
  );
};
