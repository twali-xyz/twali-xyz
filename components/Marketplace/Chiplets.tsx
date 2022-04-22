import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Chip } from "../reusable/Chip";
export function Chiplets({ handleRemove, filterParams }) {
  return (
    <VStack
      flexWrap={"wrap"}
      alignSelf={"flex-start"}
      alignItems={"flex-start"}
      width={"100%"}
    >
      {/* map out the headers for each filter type */}
      {Object.entries(filterParams).map((entry, idx) => {
        if (Object.values(entry[1]).length <= 0) return;
        return (
          <Box key={idx}>
            <HStack>
              <Text>{entry[0]}</Text>
            </HStack>
            <Flex flexWrap={"wrap"}>
              {/* For the budget we get two values that must be placed in a single chip otherwise
               otherwise each filter selection gets it's own chips  */}
              {entry[0] === "budget" ? (
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
                  {`${entry[1][0]} - ${entry[1][1]}`}
                </Chip>
              ) : (
                Object.values(entry[1])?.map((filter, idx) => {
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
                })
              )}
            </Flex>
          </Box>
        );
      })}
    </VStack>
  );
}
