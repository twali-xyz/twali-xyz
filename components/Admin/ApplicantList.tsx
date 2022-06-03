import { CircularProgress, Flex, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { ApplicantCard } from "./ApplicantCard";

interface ApplicantList {
  contracts: JSON;
  error: string;
  sortParams: string;
  compart: Function;
}

/**
 * Bounty list component
 *
 *
 * @param {JSON} contracts contracts to display
 * @param {string} error error when fetching contracts
 * @param {string} sortParams name of the active sort parameter
 * @param {Function} compare function to compare and sort list
 *
 * @returns JSX ApplicantList element
 *
 */

export const ApplicantList = ({
  whitelistApplicants,
  error,
  sortParams,
  compare,
}) => {
  if (error) return <Text>failed to load whitelistApplicants</Text>;

  if (!whitelistApplicants)
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
      padding={"0px 48px"}
      marginTop={"32px !important"}
      height={"100%"}
      overflowY={"scroll"}
      scrollBehavior={"smooth"}
    >
      {whitelistApplicants?.length &&
        whitelistApplicants
          .sort((a, b) => compare(a, b, sortParams || ""))
          .map(
            (
              {
                firstName,
                lastName,
                email,
                linkedIn,
                discord,
                applied_on,
                userWallet,
                whitelistStatus,
              },
              idx
            ) => {
              return (
                <Link
                  _hover={{
                    textDecor: "none",
                    cursor: "pointer",
                  }}
                  href={`whitelist/${firstName}`}
                  key={idx}
                  width={"100%"}
                >
                  <ApplicantCard
                    my={"8px"}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    linkedIn={linkedIn}
                    discord={discord}
                    applied_on={applied_on}
                    userWallet={userWallet}
                    whitelistStatus={whitelistStatus}
                  />
                </Link>
              );
            }
          )}
    </VStack>
  );
};
