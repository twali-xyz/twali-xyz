import { Chiplets } from "./Chiplets";
import {
  Box,
  FormControl,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { functionalExpertiseList } from "../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../utils/industryExpertiseConstants";
import { Dropdown } from "../reusable/Dropdown";
import { TwaliRangeSlider } from "../reusable/TwaliRangeSlider";
import DatePicker from "react-date-picker/dist/entry.nostyle";

export const FilterInputs = ({ filterParams, setFilterParams }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [dateSelected, setDateSelected] = useState(null);

  useEffect(() => {
    document
      .querySelector(".react-date-picker__wrapper")
      .classList.add("market-cal");

    document
      .querySelector(".react-calendar")
      .classList.add("market-date-picker__calendar");

    return () => {};
  }, [isOpen]);

  // name: "exampleName", options: [exampleOptions]
  const dropdowns = [
    { name: "industry", options: industryExpertiseList },
    { name: "functional", options: functionalExpertiseList },
    // { name: "type", options: industryExpertiseList },
  ];
  function handleRemove(e) {
    // without this an error is thrown when the svg within the chip button is clicked
    if (!e.target.name) return;
    // when the target field is budget the whole field can be removed instead of trying to remove one value
    if (e.target.name === "budget" || e.target.name === "startDate") {
      delete filterParams[e.target.name];
      if (e.target.name === "startDate") {
        setDateSelected(null);
      }
    } else {
      delete filterParams[e.target.name][e.target.value];
    }
    setFilterParams({ ...filterParams });
  }

  function handleSelectDate(value) {
    // needed to prevent invalid date chiplet appearing
    if (!value) {
      setDateSelected(null);
      delete filterParams["startDate"];
      setFilterParams({ ...filterParams });
      return;
    }
    setDateSelected(value);
    setFilterParams({ ...filterParams, ["startDate"]: { startDate: value } });
  }

  return (
    <VStack
      width={"25vw"}
      minW={"400px"}
      maxW={"600px"}
      background={"inverse"}
      height={"calc(100vh)"}
      paddingTop={"90px"}
      paddingX={"54px"}
    >
      {Object.entries(dropdowns).map((dropdownObj, idx) => {
        const { name, options } = dropdownObj[1];
        return (
          <FormControl key={idx}>
            <Dropdown
              my={"8px"}
              name={name}
              options={options}
              values={filterParams}
              setValues={setFilterParams}
            />
          </FormControl>
        );
      })}

      <HStack
        width={"100%"}
        alignItems={"baseline"}
        justifyContent={"space-between"}
        p={0}
      >
        <FormControl>
          <TwaliRangeSlider
            name={"budget"}
            values={filterParams}
            setValues={setFilterParams}
            width={"100%"}
            dropdown={true}
            symbol={"$"}
            min={0}
            max={50000}
            alignSelf={"flex-start"}
          />
        </FormControl>
        <FormControl>
          <TwaliRangeSlider
            name={"duration"}
            values={filterParams}
            setValues={setFilterParams}
            width={"100%"}
            dropdown={true}
            symbol={"days"}
            min={1}
            max={30}
            alignSelf={"flex-start"}
          />
        </FormControl>
        <FormControl>
          <Box onClick={onToggle}>
            <Box
              pos={"relative"}
              zIndex={1}
              _hover={{ borderColor: "zing", cursor: "pointer" }}
              width={"100px"}
              p={0}
              border={"1px solid"}
              borderColor={"n3"}
              borderRadius={"4px"}
              background={"n7"}
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
                {dateSelected
                  ? new Date(dateSelected).toLocaleDateString("en-US")
                  : "Start Date"}
              </Text>
            </Box>
            <DatePicker
              name="startDate"
              isOpen={isOpen}
              onChange={(val) => handleSelectDate(val)}
              value={dateSelected}
            />
          </Box>
        </FormControl>
      </HStack>
      <Chiplets
        pos={"relative"}
        zIndex={0}
        handleRemove={handleRemove}
        filterParams={filterParams}
      />
    </VStack>
  );
};
