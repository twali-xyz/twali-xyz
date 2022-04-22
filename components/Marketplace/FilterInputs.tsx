import {
  Box,
  Flex,
  FormControl,
  HStack,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { functionalExpertiseList } from "../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../utils/industryExpertiseConstants";
import { Chip } from "../reusable/Chip";
import Dropdown from "../reusable/Dropdown";
export function FilterInputs({ filterParams, setFilterParams }) {
  function handleChange(e) {
    setFilterParams({ ...filterParams, [e.target.name]: e.target.value });
  }
  function handleRemove(e) {
    console.log("LOGGED", filterParams[e.target.name], e.target);

    delete filterParams[e.target.name][e.target.value];
    setFilterParams({ ...filterParams });
  }
  useEffect(() => {
    console.log(filterParams);

    return () => {};
  }, [filterParams]);

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
      <FormControl>
        <Dropdown
          name={"industry"}
          options={industryExpertiseList}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />
      </FormControl>
      <FormControl>
        <Dropdown
          name={"function"}
          options={functionalExpertiseList}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />
      </FormControl>
      <FormControl>
        <Dropdown
          name={"type"}
          options={industryExpertiseList}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />
      </FormControl>
      <FormControl>
        <RangeSlider
          aria-label={["min", "max"]}
          onChangeEnd={(val) => console.log(val)}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </FormControl>
      <VStack
        flexWrap={"wrap"}
        alignSelf={"flex-start"}
        alignItems={"flex-start"}
        width={"100%"}
      >
        {Object.entries(filterParams).map((entry, idx) => {
          if (Object.values(entry[1]).length <= 0) return;
          return (
            <Box key={idx}>
              <HStack>
                <Text>{entry[0]}</Text>
              </HStack>
              <Flex flexWrap={"wrap"}>
                {Object.values(entry[1])?.map((filter, idx) => {
                  return (
                    <Chip
                      pos={"relative"}
                      zIndex={0}
                      my={2}
                      mx={2}
                      variant="button"
                      key={idx}
                      name={entry[0]}
                      onClick={handleRemove}
                    >
                      {filter}
                    </Chip>
                  );
                })}
              </Flex>
            </Box>
          );
        })}
      </VStack>
    </VStack>
  );
}
