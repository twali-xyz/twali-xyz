import {
  Box,
  Button,
  CircularProgress,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface ApplicantCard {
  firstName: string;
  lastName: string;
  email: string;
  linkedIn: string;
  discord: string;
  applied_on: string;
  userWallet: string;
  whitelistStatus: string;
  loaded: boolean;
}

/**
 * Individual applicant card component
 *
 *
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} linkedIn
 * @param {string} discord
 * @param {string} applied_on
 * @param {string} userWallet
 * @param {string} whitelistStatus
 * @param {boolean} loaded
 *
 * @returns JSX ApplicantCard element
 *
 */
export const ApplicantCard = ({
  firstName,
  lastName,
  email,
  linkedIn,
  discord,
  applied_on,
  userWallet,
  whitelistStatus,
  handleReject,
  handleApprove,
  loading,
  ...props
}) => {
  // reject/approve based on userWallet
  const payload = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    linkedIn: linkedIn,
    discord: discord,
    applied_on: applied_on,
    userWallet: userWallet,
    whitelistStatus: whitelistStatus,
  };

  return (
    <Box
      {...props}
      width={"100%"}
      height={"248px"}
      background={"n6"}
      padding={"32px"}
      border={"1px"}
      borderRadius={"8px"}
      borderColor={"n3"}
      boxShadow="8px 8px 24px 0px #00000026"
      _hover={{ boxShadow: "8px 8px 32px 8px #00000026" }}
    >
      <VStack
        height={"100%"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        <HStack width={"100%"} justifyContent={"space-between"}>
          <VStack alignItems={"baseline"}>
            <HStack>
              <Text>Name:</Text>
              <Text>
                {firstName} {lastName}
              </Text>
            </HStack>
            <HStack>
              <Text>Email:</Text>
              <Text>{email}</Text>
            </HStack>
            <HStack>
              <Text>Discord:</Text>
              <Text>{discord}</Text>
            </HStack>
            <HStack>
              <Text>linkedIn:</Text>
              <Link href={linkedIn || ""}>
                {linkedIn ? (
                  <Text _hover={{ cursor: "pointer" }} color={"aqua"}>
                    profile
                  </Text>
                ) : (
                  "N/A"
                )}
              </Link>
            </HStack>
          </VStack>
          <VStack alignSelf={"flex-start"} alignItems={"flex-start"}>
            <HStack>
              <Text alignSelf={"flex-start"}>Status:</Text>

              {!loading ? (
                <Text alignSelf={"flex-start"}>{whitelistStatus}</Text>
              ) : (
                <CircularProgress
                  size={"24px"}
                  color={"zing"}
                  trackColor={"zing"}
                />
              )}
            </HStack>
            <HStack>
              <Text>Applied on:</Text>
              <Text>{new Date(applied_on).toLocaleDateString()}</Text>
            </HStack>
            <HStack>
              <Text alignSelf={"flex-start"}>Wallet:</Text>
              <Text alignSelf={"flex-start"}>{userWallet}</Text>
            </HStack>
          </VStack>
        </HStack>

        <HStack alignSelf={"flex-end"}>
          <Button
            disabled={whitelistStatus === "rejected"}
            onClick={() => {
              handleReject(payload);
            }}
            variant={"secondary"}
          >
            reject
          </Button>
          <Button
            disabled={whitelistStatus === "approved"}
            onClick={() => {
              handleApprove(payload);
            }}
            variant={"primary"}
          >
            approve
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
