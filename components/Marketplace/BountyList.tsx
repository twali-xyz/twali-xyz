import { CircularProgress, Flex, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BountyCard } from "./BountyCard";

interface BountyList {
  contracts: JSON;
  error: string;
  sortParams: string;
  compare: Function;
}

/**
 * Bounty list component
 *
 *
 * @param {JSON} contracts contracts to display
 * @param {string} error error when fetching contracts
 * @param {string} sortParams name of the active sort parameter
 * @param {function} compare compare function for sorting bounty list
 *
 * @returns JSX BountyList element
 *
 */

export const BountyList = ({ contracts, error, sortParams, compare }) => {
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
          .map(
            (
              {
                title,
                description,
                type,
                created_on,
                status,
                token,
                amount,
                converted_amount,
                contract_id,
                due_date,
                start_date,
              },
              idx
            ) => {
              return (
                <Link
                  _hover={{
                    textDecor: "none",
                    cursor: "pointer",
                  }}
                  href={`contracts/${contract_id}`}
                  key={idx}
                  width={"100%"}
                >
                  <BountyCard
                    my={"8px"}
                    type={type}
                    title={title}
                    body={description}
                    img={`https://via.placeholder.com/290?text=${status}`}
                    amount={amount}
                    token={token}
                    status={status}
                    created_on={created_on}
                    due_date={due_date}
                    start_date={start_date}
                    converted_amount={converted_amount}
                  />
                </Link>
              );
            }
          )}
    </VStack>
  );
};
