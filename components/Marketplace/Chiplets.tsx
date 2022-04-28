import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Chip } from "../reusable/Chip";
export const Chiplets = ({ handleRemove, filterParams, ...props }) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

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
        console.log(Object.entries(filterParams));
        const [filterType, filters] = filterObj;
        if (!filters) return;
        if (Object.values(filters).length <= 0) return;
        return (
          <Box key={idx}>
            <HStack>
              <Text
                textTransform={"capitalize"}
                marginBottom={2}
                color={"fresh"}
                fontFamily={"PP Telegraf"}
                fontSize={"16px"}
              >
                {filterType === "startDate" ? "start date" : filterType}
              </Text>
            </HStack>
            <Flex flexWrap={"wrap"}>
              {Object.values(filters)?.map((filter, idx) => {
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
                      ? idx === 0 &&
                        `${formatter.format(filters[0])}-${formatter.format(
                          filters[1]
                        )}`
                      : filterType === "duration"
                      ? `${filters[0]}-${filters[1]} days`
                      : filterType === "startDate"
                      ? `Starts on ${new Date(filter).toLocaleDateString(
                          "en-US"
                        )}`
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
