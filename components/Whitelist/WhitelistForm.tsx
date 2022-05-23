import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
export const WhiteListForm = ({ questions, step, handleChange, value }) => {
  return (
    <FormControl>
      <FormLabel>{Object.values(questions)[step]}</FormLabel>
      <Input
        name={Object.keys(questions)[step]}
        defaultValue={`${Object.keys(questions)[step]}`}
        value={value}
        onChange={handleChange}
        width={"85%"}
        float={"right"}
        marginRight={"10.5%"}
        alignSelf={"flex-end"}
        borderColor={"zing"}
        borderRadius={0}
        borderTop={"white"}
        borderRight={"white"}
        borderLeft={"white"}
        _hover={{
          borderColor: "zing",
        }}
      ></Input>
    </FormControl>
  );
};
