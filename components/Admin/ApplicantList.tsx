import { CircularProgress, Flex, Text, VStack } from "@chakra-ui/react";
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
  setLoadingIDX,
  loadingWallet,
  handleApprove,
  handleReject,
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
    <VStack>
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
                <ApplicantCard
                  key={idx}
                  setLoadingIDX={setLoadingIDX}
                  my={"8px"}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  linkedIn={linkedIn}
                  discord={discord}
                  applied_on={applied_on}
                  userWallet={userWallet}
                  whitelistStatus={whitelistStatus}
                  handleApprove={handleApprove}
                  handleReject={handleReject}
                  loading={loadingWallet === userWallet}
                />
              );
            }
          )}
    </VStack>
  );
};
