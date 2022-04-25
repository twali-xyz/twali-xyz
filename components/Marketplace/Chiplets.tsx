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
        const [filterHeader, filters] = filterObj;

        if (!filters) return;
        if (Object.values(filters).length <= 0) return;
        console.log(filters);

        return (
          <Box key={idx}>
            <HStack>
              <Text>{filterHeader}</Text>
            </HStack>
            <Flex flexWrap={"wrap"}>
              {/* For the budget we get two values that must be placed in a single chip otherwise
               otherwise each filter selection gets it's own chips  */}
              {filterHeader === "budget" ? (
                <Chip
                  pos={"relative"}
                  zIndex={0}
                  my={2}
                  mx={2}
                  variant="button"
                  key={idx}
                  name={filterHeader}
                  onClick={handleRemove}
                >
                  {`$${filters[0]} - $${filters[1]}`}
                </Chip>
              ) : (
                Object.values(filters)?.map((filters, idx) => {
                  return (
                    <Chip
                      pos={"relative"}
                      zIndex={0}
                      my={2}
                      mx={2}
                      variant="button"
                      key={idx}
                      name={filterHeader}
                      onClick={handleRemove}
                    >
                      {filterHeader === "startDate"
                        ? new Date(filters).toLocaleDateString("en-US")
                        : filters}
                    </Chip>
                  );
                })
              )}
            </Flex>
          </Box>
        );
      })}
    </VStack>
  );
}
