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
    <Box w="full" overflow="hidden" mb={"16px !important"}>
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
          maxW={"685px"}
          display={"grid"}
          gridTemplateColumns={[
            "repeat(auto-fill, 92px)",
            "repeat(auto-fill, 112px);",
          ]}
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
      gridTemplateColumns={[
        "repeat(auto-fill, 92px)",
        "repeat(auto-fill, 110px);",
      ]}
      gridTemplateRows={"108px"}
    >
      {viewElements}
    </HStack>
  );
};
