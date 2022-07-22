import {
  FormControl,
  HStack,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Dropdown } from "../reusable/Dropdown";
import SelectWerkModal from "./SelectWerkModal/SelectWerkModal";

export const SortBounty = ({ contracts, onChange }) => {
  const {
    isOpen: isSelectWerkModalOpen,
    onOpen: onSelectWerkModalOpen,
    onClose: onSelectWerkModalClose,
  } = useDisclosure();

  const options = [
    "Freshness - new to old",
    "Freshness - old to new",
    "Amount - low to high",
    "Amount - high to low",
    "Duration - long to short",
    "Duration - short to long",
  ];
  return (
    <HStack width={"100%"} alignSelf={"flex-start"} marginLeft={"48px"}>
      {/* <FormControl> */}
      <Dropdown
        alignSelf={"flex-start"}
        className={"bounty-sort-dropdown"}
        multiSelect={false}
        values={""}
        name={"sort"}
        options={options}
        width={"545px"}
        height={"40px"}
        marginRight={"12px"}
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
      {/* </FormControl> */}

      <Text
        alignSelf={"flex-start"}
        width={"100%"}
        height={"100%"}
        fontFamily={"PP Telegraf Light"}
        fontSize={"16px"}
        display={"flex"}
        marginTop={"10px !important"}
      >
        {contracts?.length || 0} results
      </Text>

      <Button
        className="marketplace-post-job-btn"
        alignSelf="flex-end"
        marginRight="84px !important"
        variant={"primary"}
        size={"lg"}
        width={"309px"}
        onClick={onSelectWerkModalOpen}
      >
        <Text>Post a job</Text>
      </Button>
      <SelectWerkModal
        isOpen={isSelectWerkModalOpen}
        onClose={onSelectWerkModalClose}
      />
    </HStack>
  );
};
