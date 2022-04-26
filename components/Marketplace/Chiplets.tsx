import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Chip } from "../reusable/Chip";
export const Chiplets = ({ handleRemove, filterParams, ...props }) => {
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
        console.log(filters);

        return (
          <Box key={idx}>
            <HStack>
              <Text>{filterType}</Text>
            </HStack>
            <Flex flexWrap={"wrap"}>
              {Object.values(filters)?.map((filter, idx) => {
                console.log(filter, idx);

                return (filterType === "budget" && idx === 0) ||
                  (filterType === "duration" && idx === 0) ||
                  (filterType !== "budget" && filterType !== "duration") ? (
                  <Chip
                    pos={"relative"}
                    zIndex={0}
                    my={2}
                    mr={2}
                    variant="button"
                    key={idx}
                    name={filterType}
                    onClick={handleRemove}
                  >
                    {filterType === "budget"
                      ? idx === 0 && `$${filters[0]}-$${filters[1]}`
                      : filterType === "duration"
                      ? `${filters[0]}-${filters[1]} days`
                      : filterType === "startDate"
                      ? new Date(filter).toLocaleDateString("en-US")
                      : filter}
                  </Chip>
                ) : null;
              })}
            </Flex>
          </Box>
        );
      })}
    </VStack>
  );
};
