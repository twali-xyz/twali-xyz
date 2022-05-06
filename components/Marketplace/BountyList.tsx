import { CircularProgress, Flex, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BountyCard } from "./BountyCard";
export const BountyList = ({ contracts, error, sortParams }) => {
  function compare(a, b, type) {
    if (a[type] < b[type]) {
      return -1;
    }
    if (a[type] > b[type]) {
      return 1;
    }
    return 0;
  }

  if (error) return <Text>failed to load contracts</Text>;

  if (!contracts)
    return (
      <Flex height={"100%"} alignItems={"center"}>
        <CircularProgress
          justifySelf={"center"}
          thickness="4px"
          isIndeterminate
          color="#3C2E26"
        />
      </Flex>
    );

  return (
    <VStack
      width={"100%"}
      padding={"5%"}
      height={"100%"}
      overflowY={"scroll"}
      scrollBehavior={"smooth"}
    >
      {contracts?.length &&
        contracts
          .sort((a, b) => compare(a, b, sortParams || ""))
          .map(({ title, body, href, img }, idx) => {
            return (
              <Link
                _hover={{
                  textDecor: "none",
                  cursor: "pointer",
                }}
                href={href}
                key={idx}
                width={"100%"}
              >
                <BountyCard
                  title={title}
                  body={body}
                  img={`https://via.placeholder.com/290?text=${title[0]}`}
                />
              </Link>
            );
          })}
    </VStack>
  );
};
