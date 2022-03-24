import { Box, Text, HStack } from "@chakra-ui/react";
import React from "react";
import UserPermissionsRestricted from "../UserPermissionsProvider/UserPermissionsRestricted";
import CompanyModal from "./CompanyModal/CompanyModal";

export function ProfileExperience({
  createWorkElements,
  viewCompany,
  isCompanyModalOpen,
  onCompanyModalClose,
  currCompany,
  userData,
  setUserData,
  handleUpdatedCompanyInfo,
}) {
  return (
    <Box w="full" overflow="hidden">
      <Text
        pb={4}
        pt={5}
        fontSize="32px"
        lineHeight={"48px"}
        letterSpacing={"wide"}
        fontFamily={"GrandSlang"}
      >
        Work Experience
      </Text>
      <HStack maxW={"640px"}>{createWorkElements(6)}</HStack>
      <UserPermissionsRestricted to="edit" fallback={viewCompany}>
        <CompanyModal
          isOpen={isCompanyModalOpen}
          onClose={onCompanyModalClose}
          currCompany={currCompany}
          userData={userData}
          setUserData={setUserData}
          handleUpdatedCompanyInfo={handleUpdatedCompanyInfo}
        />
      </UserPermissionsRestricted>
    </Box>
  );
}
