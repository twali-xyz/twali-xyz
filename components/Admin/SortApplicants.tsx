import { FormControl, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Dropdown } from "../reusable/Dropdown";
export const SortApplicants = ({ contracts, onChange }) => {
  const options = ["Applied on - new to old", "Applied on - old to new"];
  return (
    <HStack width={"375px"} alignSelf={"flex-start"} marginLeft={"48px"}>
      <FormControl>
        <Dropdown
          className={"sort-dropdown"}
          multiSelect={false}
          values={""}
          name={"sort"}
          options={options}
          width={"270px"}
          height={"40px"}
          maxW={"297px"}
          borderRadius={"4px"} //styleName: Body/body16;
          fontFamily="PP Telegraf Light"
          borderColor={"n3"}
          _hover={{
            borderColor: "fresh",
          }}
          _active={{
            borderColor: "zing",
          }}
          fontSize="16px"
          fontWeight="300"
          lineHeight="24px"
          letterSpacing="0.02em"
          textAlign="left"
          placeholder="sort by"
          onChange={(e) => {
            e && onChange(Object.keys(e)[0]);
          }}
        />
      </FormControl>

      <Text
        textAlign={"end"}
        width={"100%"}
        height={"100%"}
        fontFamily={"PP Telegraf Light"}
        fontSize={"16px"}
        display={"flex"}
        marginBottom={"8px !important"}
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
      >
        {contracts?.length || 0} results
      </Text>
    </HStack>
  );
};
