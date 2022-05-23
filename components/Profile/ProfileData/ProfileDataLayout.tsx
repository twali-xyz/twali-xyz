import { ProfileInfo } from "./ProfileInfo";
import { VStack, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { ProfileSocialMedia } from "./ProfileSocialMedia";
import useUser from "../../../context/TwaliContext";
import ProfileExpertise from "./ProfileExpertise";
export function ProfileDataLayout({
  onExpModalOpen,
  isExpModalOpen,
  onExpModalClose,
}) {
  const {
    isOpen: isProfileModalOpen,
    onToggle: onProfileModalOpen,
    onClose: onProfileModalClose,
  } = useDisclosure();
  const { ...userState } = useUser();
  return (
    <VStack
      marginTop={0}
      padding={0}
      my={0}
      p={["0 1%", "0 2%", "0 2% 0 1.5% "]}
      align="flex-start"
      justifyContent={"center"}
      borderRight={["unset", "unset", "1px solid #587070"]}
      width={["98vw", "95vw", "73vw"]}
      maxW={"565px"}
      mx={"auto"}
    >
      <ProfileInfo
        userState={userState}
        onExpModalOpen={onExpModalOpen}
        isExpModalOpen={isExpModalOpen}
        onExpModalClose={onExpModalClose}
      />

      <ProfileSocialMedia userData={userState} marginTop={"24px !important"} />

      <ProfileExpertise
        onProfileModalOpen={onProfileModalOpen}
        isProfileModalOpen={isProfileModalOpen}
        onProfileModalClose={onProfileModalClose}
        userState={userState}
      />
    </VStack>
  );
}
