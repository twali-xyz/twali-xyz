import { Chiplets } from "./Chiplets";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Dropdown } from "../reusable/Dropdown";
import { mutate } from "swr";
import useUser from "../../context/TwaliContext";

export const FilterInputs = ({ filterParams, setFilterParams, setQuery }) => {
  // name: "exampleName", options: [exampleOptions]
  const { userWallet } = useUser();
  const dropdowns = [
    {
      name: "filter options",
      options: [
        "new applicants",
        "missing profile",
        "profile complete",
        "rejected",
      ],
    },
  ];

  function handleRemove(e) {
    // without this an error is thrown when the svg within the chip button is clicked
    if (!e.target.name) return;
    // when the target field is budget the whole field can be removed instead of trying to remove one value

    delete filterParams[e.target.name][e.target.value];

    setFilterParams({ ...filterParams });
    setQuery("");
    mutate("/api/admin/retrieveWhitelist/" + userWallet);
  }

  function handleChange(val, name) {
    if (val) {
      setFilterParams({
        ...filterParams,
        [name]: val,
      });
      switch (Object.values(val)[0]) {
        case "new applicants":
          setQuery("pending");
          break;
        case "missing profile":
          setQuery("approved");
          break;
        case "profile complete":
          setQuery("completed");
          break;
        case "rejected":
          setQuery("rejected");
          break;

        default:
          break;
      }

      return;
    } else if (!val) {
      delete filterParams[name];
      setFilterParams({ ...filterParams });
      setQuery("");
    }
  }

  async function resetFilter() {
    setFilterParams({});
    setQuery("");
  }

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
                multiSelect={false}
                onChange={(val) => {
                  handleChange(val, name);
                }}
              />
            </FormControl>
          );
        })}
      </VStack>

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
      {filterParams && Object.entries(filterParams).length ? (
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
