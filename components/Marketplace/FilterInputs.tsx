import { Chiplets } from "./Chiplets";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Text,
  useDisclosure,
  useOutsideClick,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { functionalExpertiseList } from "../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../utils/industryExpertiseConstants";
import { Dropdown } from "../reusable/Dropdown";
import { TwaliRangeSlider } from "../reusable/TwaliRangeSlider";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import Router from "next/router";

export const FilterInputs = ({ filterParams, setFilterParams }) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [dateSelected, setDateSelected] = useState(null);

  // name: "exampleName", options: [exampleOptions]
  const dropdowns = [
    { name: "industry", options: industryExpertiseList },
    { name: "expertise", options: functionalExpertiseList },
    // { name: "type", options: industryExpertiseList },
  ];

  const rangeSliders = [
    { name: "duration", symbol: "days", min: 1, max: 90 },
    { name: "budget", symbol: "$", min: 0, max: 100000 },
  ];

  useEffect(() => {
    if (!document.querySelector(".react-date-picker__wrapper")) return;
    document
      .querySelector(".react-date-picker__wrapper")
      .classList.add("market-cal");

    if (!document.querySelector(".react-calendar")) return;
    document
      .querySelector(".react-calendar")
      .classList.add("market-date-picker__calendar");

    return () => {};
  }, [isOpen]);

  function handleRemove(e) {
    // without this an error is thrown when the svg within the chip button is clicked
    if (!e.target.name) return;
    // when the target field is budget the whole field can be removed instead of trying to remove one value
    if (
      e.target.name === "budget" ||
      e.target.name === "startDate" ||
      e.target.name === "duration" ||
      (Object.keys(filterParams).includes(e.target.name) &&
        Object.keys(filterParams[e.target.name]).length <= 0)
    ) {
      delete filterParams[e.target.name];
      // renders start date input with text upon clearing date
      if (e.target.name === "startDate") {
        setDateSelected(null);
      }
    } else {
      delete filterParams[e.target.name][e.target.value];
    }
    setFilterParams({ ...filterParams });
  }

  function handleSelectDate(value) {
    // value check needed to prevent invalid date chiplet appearing
    if (!value) {
      setDateSelected(null);
      delete filterParams["startDate"];
      setFilterParams({ ...filterParams });
      return;
    }
    setDateSelected(value);
    setFilterParams({ ...filterParams, ["startDate"]: { startDate: value } });
  }

  function handleChange(val, name) {
    if (val) {
      setFilterParams({
        ...filterParams,
        [name]: val,
      });
      return;
    } else if (!val) {
      delete filterParams[name];
      setFilterParams({ ...filterParams });
    }
  }

  function resetFilter() {
    setFilterParams({});
    Router.push({
      pathname: "/marketplace",
    });
  }

  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: onClose,
  });
  return (
    <VStack
      width={"25vw"}
      minW={"400px"}
      maxW={"400px"}
      background={"inverse"}
      height={"calc(100vh)"}
      paddingTop={"90px"}
    >
      <Text
        paddingX={"54px"}
        fontFamily={"PP Telegraf"}
        fontSize={"24px"}
        fontWeight={"500"}
        lineHeight={"40px"}
        letterSpacing={"0.02em"}
        textAlign={"left"}
        width={"100%"}
      >
        Filters
      </Text>
      <VStack marginTop={"34.5px !important"} paddingX={"54px"}>
        {Object.entries(dropdowns).map((dropdownObj, idx) => {
          const { name, options } = dropdownObj[1];
          return (
            <FormControl key={idx}>
              <Dropdown
                my={"8px"}
                name={name}
                options={options}
                borderColor={
                  Object.keys(filterParams).includes(name) &&
                  Object.keys(filterParams[name]).length
                    ? "fresh"
                    : "n3"
                }
                multiSelect={true}
                onChange={(val) => {
                  handleChange(val, name);
                }}
              />
            </FormControl>
          );
        })}
      </VStack>
      <HStack
        width={"100%"}
        alignItems={"baseline"}
        justifyContent={"space-between"}
        p={0}
        mt={0}
        paddingX={"54px"}
      >
        <FormControl>
          <Box ref={ref}>
            <Box
              onClick={onToggle}
              pos={"relative"}
              zIndex={1}
              _hover={{ borderColor: "zing", cursor: "pointer" }}
              width={"100px"}
              p={0}
              border={"1px solid"}
              borderRadius={"4px"}
              background={"n7"}
              borderColor={
                Object.keys(filterParams).includes("startDate") ? "fresh" : "n3"
              }
              height={"40px"}
              top={"15px"}
            >
              <Text
                pos={"absolute"}
                zIndex={1}
                m={0}
                background={"n7"}
                left={"12px"}
                top={"8px"}
                color={"subtle"}
                fontFamily={"PP Telegraf Light"}
                fontSize={"16px"}
                cursor={"pointer"}
                whiteSpace={"nowrap"}
              >
                Start Date
              </Text>
            </Box>
            <DatePicker
              name="startDate"
              isOpen={isOpen || null}
              onChange={(val) => {
                console.log(val);

                handleSelectDate(val);
                onClose();
              }}
              value={dateSelected}
            />
          </Box>
        </FormControl>
        {rangeSliders.map(({ name, symbol, min, max }, idx) => {
          return (
            <FormControl key={idx}>
              <TwaliRangeSlider
                name={name}
                values={filterParams}
                borderColor={
                  Object.keys(filterParams).includes(name) ? "fresh" : "n3"
                }
                onChange={(values) => {
                  handleChange(values, name);
                }}
                width={"87px"}
                dropdown={true}
                symbol={symbol}
                min={min}
                max={max}
                alignSelf={"flex-start"}
              />
            </FormControl>
          );
        })}
      </HStack>
      <Chiplets
        maxH={"70vh"}
        flexWrap={"noWrap"}
        overflowY={"scroll"}
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
        pos={"relative"}
        padding={"48px"}
        pb={2}
        pt={6}
        mt={"16px !important"}
        zIndex={0}
        handleRemove={handleRemove}
        filterParams={filterParams}
      />
      {Object.entries(filterParams).length ? (
        <Box width={"100%"} padding={"0 48px"}>
          <Button
            //styleName: Label/label14;
            fontFamily="PP Telegraf"
            fontSize="14px"
            fontWeight="500"
            lineHeight="24px"
            letterSpacing="0.02em"
            textAlign="left"
            color={"zing"}
            variant={"unstyled"}
            textTransform={"capitalize"}
            whiteSpace={"nowrap"}
            width={"fit-content"}
            height={"24px"}
            onClick={resetFilter}
          >
            <HStack>
              <Text>Reset</Text>{" "}
              <Text textTransform={"lowercase"} ml={"8px !important"}>
                filters
              </Text>
            </HStack>
          </Button>
        </Box>
      ) : null}
    </VStack>
  );
};
