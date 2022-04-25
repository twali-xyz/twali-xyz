import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Chip } from "../reusable/Chip";
export function Chiplets({ handleRemove, filterParams, ...props }) {
  return (
    <VStack
      flexWrap={"wrap"}
      alignSelf={"flex-start"}
      alignItems={"flex-start"}
      width={"100%"}
      {...props}
    >
      {/* map out the headers for each filter type */}
      {Object.entries(filterParams).map((filterObj, idx) => {
        const [filterType, filters] = filterObj;
        if (!filters) return;
        if (Object.values(filters).length <= 0) return;

        return (
          <Box key={idx}>
            <HStack>
              <Text>{filterType}</Text>
            </HStack>
            <Flex flexWrap={"wrap"}>
              {Object.values(filters)?.map((filter, idx) => {
                return (
                  <Chip
                    pos={"relative"}
                    zIndex={0}
                    my={2}
                    mx={2}
                    variant="button"
                    key={idx}
                    name={filterType}
                    onClick={handleRemove}
                  >
                    {filterType === "budget"
                      ? `$${filter[0]} - $${filter[1]}`
                      : filterType === "startDate"
                      ? new Date(filter).toLocaleDateString("en-US")
                      : filter}
                  </Chip>
                );
              })}
            </Flex>
          </Box>
        );
      })}
    </VStack>
  );
}
