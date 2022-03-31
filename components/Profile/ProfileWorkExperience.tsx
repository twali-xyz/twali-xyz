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
  let workElements = createWorkElements(6);
  let viewElements = [];

  // Selecting only the elements that should be visible in 'view' mode
  workElements.forEach((element) => {
    if (element.props.to != "edit") {
      viewElements.push(element); // work elements that will be displayed in view mode
    }
  });

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
      <UserPermissionsRestricted
        to="edit"
        fallback={viewWorkElements(viewElements)}
      >
        <HStack
          maxW={"640px"}
          display={"grid"}
          gridTemplateColumns={"repeat(auto-fill, 100px);"}
          gridTemplateRows={"108px"}
        >
          {workElements}
        </HStack>
      </UserPermissionsRestricted>
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

const viewWorkElements = (viewElements) => {
  return (
    <HStack
      spacing={4}
      maxW={"640px"}
      display={"grid"}
      gridTemplateColumns={"repeat(auto-fill, 100px);"}
      gridTemplateRows={"108px"}
    >
      {viewElements}
    </HStack>
  );
};
