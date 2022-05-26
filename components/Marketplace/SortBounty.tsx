import { FormControl, HStack, Button, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Dropdown } from "../reusable/Dropdown";
import SelectWerkModal from './SelectWerkModal/SelectWerkModal'

export const SortBounty = ({ contracts, onChange }) => {

  const {
    isOpen: isSelectWerkModalOpen,
    onOpen: onSelectWerkModalOpen,
    onClose: onSelectWerkModalClose,
  } = useDisclosure();

  
  const options = ["title", "date created", "amount"];
  return (
    <HStack width={"100%"} alignSelf={"flex-start"} marginLeft={"48px"}>
      <FormControl width="unset">
        <Dropdown
          className={"sort-dropdown"}
          multiSelect={false}
          values={""}
          name={"sort"}
          options={options}
          width={"200px"}
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
          placeholder={"sort by"}
          fontSize="16px"
          fontWeight="300"
          lineHeight="24px"
          letterSpacing="0.02em"
          textAlign="left"
          onChange={(e) => {
            e && onChange(Object.keys(e)[0]);
          }}
        />
      </FormControl>

      <Text
        width={"100%"}
        height={"100%"}
        fontFamily={"PP Telegraf Light"}
        fontSize={"16px"}
        display={"flex"}
        marginBottom={"-12px !important"}
      >
        {contracts?.length || 0} results
      </Text>

      <Button
              alignSelf="flex-end" 
              marginRight="84px !important"
                variant={"primary"}
                size={"lg"}
                width={"309px"}
                onClick={onSelectWerkModalOpen}
              >
                <Text>Post a job</Text>
              </Button>
              <SelectWerkModal isOpen={isSelectWerkModalOpen} onClose={onSelectWerkModalClose}/>
    </HStack>
  );
};
