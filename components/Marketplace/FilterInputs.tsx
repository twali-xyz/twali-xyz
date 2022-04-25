import { Chiplets } from "./Chiplets";
import { FormControl, VStack } from "@chakra-ui/react";
import React from "react";
import { functionalExpertiseList } from "../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../utils/industryExpertiseConstants";
import Dropdown from "../reusable/Dropdown";
import { TwaliRangeSlider } from "../reusable/TwaliRangeSlider";
export function FilterInputs({ filterParams, setFilterParams }) {
  function handleRemove(e) {
    // when the target field is budget the whole field can be removed instead of trying to remove one value
    if (e.target.name === "budget") {
      delete filterParams[e.target.name];
    } else {
      delete filterParams[e.target.name][e.target.value];
    }
    setFilterParams({ ...filterParams });
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
      <FormControl>
        <Dropdown
          my={"8px"}
          name={"industry"}
          options={industryExpertiseList}
          values={filterParams}
          setValues={setFilterParams}
        />
      </FormControl>
      <FormControl>
        <Dropdown
          my={"8px"}
          name={"function"}
          options={functionalExpertiseList}
          values={filterParams}
          setValues={setFilterParams}
        />
      </FormControl>
      <FormControl>
        <Dropdown
          my={"8px"}
          name={"type"}
          options={industryExpertiseList}
          values={filterParams}
          setValues={setFilterParams}
        />
      </FormControl>
      <TwaliRangeSlider
        name={"budget"}
        values={filterParams}
        setValues={setFilterParams}
        width={"50%"}
        dropdown={true}
        min={0}
        max={50000}
        alignSelf={"flex-start"}
      />
      <Chiplets
        pos={"relative"}
        zIndex={0}
        handleRemove={handleRemove}
        filterParams={filterParams}
      />
    </VStack>
  );
}
