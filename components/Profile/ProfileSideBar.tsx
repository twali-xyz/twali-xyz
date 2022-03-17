import { VStack, Box, Img, Text, Button, HStack, Flex } from "@chakra-ui/react";
import React from "react";
import UserPermissionsRestricted from "../UserPermissionsProvider/UserPermissionsRestricted";
import EditExperienceModal from "./EditExperienceModal/EditExperienceModal";
import { ProfileSocialMedia } from "./ProfileSocialMedia";
export function ProfileSideBar({
  onExpModalOpen,
  isExpModalOpen,
  onExpModalClose,
  profileData,
  setProfileData,
  handleUpdatedProfile,
}) {
  return (
    <VStack
      marginTop={0}
      padding={0}
      my={0}
      align="flex-start"
      spacing={6}
      borderRight={"1px solid #587070"}
      width={"73vw"}
      px={4}
      pr={0}
    >
      <UserPermissionsRestricted to="edit">
        <Button
          onClick={onExpModalOpen}
          alignSelf="flex-end"
          variant="ghost"
          aria-label="Update experience"
          margin={"14px"}
          mx={"8px"}
          mb={-8}
        >
          <Img
            width={"20px"}
            height={"20px"}
            src={"twali-assets/editicon.png"}
          />
        </Button>
        <EditExperienceModal
          isOpen={isExpModalOpen}
          onClose={onExpModalClose}
          profileData={profileData}
          setProfileData={setProfileData}
          handleUpdatedExperiences={handleUpdatedProfile}
        />
      </UserPermissionsRestricted>

      <Text
        fontSize="40px"
        color={"#C7F83C"}
        lineHeight={"56px"}
        letterSpacing={"wide"}
        fontFamily={"GrandSlang"}
        textTransform={"capitalize"}
      >
        {profileData.content.identity.currTitle}
      </Text>
      <HStack pos={"relative"} top={1}>
        <Text
          color={"#C7F83C"}
          fontSize={"18px"}
          fontWeight={"400"}
          lineHeight={"28px"}
          fontFamily={"PP Telegraf"}
        >
          Lives in
        </Text>
        <Text
          fontSize={"18px"}
          lineHeight={"28px"}
          fontWeight={"400"}
          letterSpacing={"wide"}
          fontFamily={"PP Telegraf Light"}
        >
          {profileData.content.identity.currLocation}
        </Text>
      </HStack>
      <Box marginTop={"12px !important"}>
        <Text
          color={"#C7F83C"}
          fontSize={"18px"}
          fontWeight={"400"}
          lineHeight={"28px"}
          mb={"16px"}
          fontFamily={"PP Telegraf"}
        >
          Bio
        </Text>
        <Text
          fontSize={"16px"}
          fontWeight={"400"}
          lineHeight={"24px"}
          maxW={"496px"}
          fontFamily={"PP Telegraf Light"}
        >
          {profileData.content.identity.bio}
        </Text>
      </Box>
      <ProfileSocialMedia profileData={profileData} />
      <Flex
        p={6}
        mx={"auto"}
        width={"100%"}
        minHeight={"248px"}
        flexDir={"column"}
        maxWidth={"486px"}
        textAlign={"start"}
        backgroundColor={"#0A2625"}
        marginTop={"52px !important"}
        justifyContent={"space-between"}
        marginBottom={"80px !important"}
        borderRadius={"16px 16px 16px 16px"}
      >
        <VStack
          color="#F9FFF2"
          overflow="hidden"
          fontSize={"18px"}
          fontWeight={"400"}
          lineHeight={"28px"}
          backgroundColor={"#0A2625"}
          fontFamily={"PP Telegraf Light"}
          borderRadius={"16px 16px 16px 16px"}
        >
          <Text alignSelf={"start"} fontFamily={"PP Telegraf"} pb={0}>
            Superpowers
          </Text>
          <Flex
            flexDir={"row"}
            width={"100%"}
            justifyContent={"flex-start"}
            m={0}
            flexFlow={"wrap"}
          >
            {profileData &&
              profileData.content.identity &&
              profileData.content.identity.functionalExpertise &&
              typeof profileData.content.identity?.functionalExpertise ===
                "object" &&
              profileData.content.identity?.functionalExpertise.map(
                (expertise, idx) => {
                  if (expertise)
                    return (
                      <Box
                        key={idx}
                        borderRadius={"32px"}
                        backgroundImage={
                          "linear-gradient(#0DD5D1 0%, #9350B3 100%)"
                        }
                        marginRight={4}
                        marginBottom={4}
                        p={"1px"}
                      >
                        <Text
                          fontSize="md"
                          alignSelf={"start"}
                          backgroundColor={"#0A2625"}
                          p={"4px 12px"}
                          borderRadius={"32px"}
                          whiteSpace={"nowrap"}
                        >
                          {expertise}
                        </Text>
                      </Box>
                    );
                }
              )}
          </Flex>
        </VStack>
        <VStack
          color="#F9FFF2"
          overflow="hidden"
          fontSize={"18px"}
          fontWeight={"400"}
          lineHeight={"28px"}
          backgroundColor={"#0A2625"}
          fontFamily={"PP Telegraf Light"}
          borderRadius={"16px 16px 16px 16px"}
        >
          <Text alignSelf={"start"} fontFamily={"PP Telegraf"} pb={0}>
            Industries
          </Text>
          <Flex
            m={0}
            px={0}
            width={"100%"}
            flexDir={"row"}
            justifyContent={"flex-start"}
          >
            {profileData &&
              profileData.content.identity &&
              profileData.content.identity.industryExpertise &&
              typeof profileData.content.identity?.industryExpertise ===
                "object" &&
              profileData.content.identity?.industryExpertise.map(
                (expertise, idx) => {
                  if (expertise)
                    return (
                      <Box
                        key={idx}
                        borderRadius={"32px"}
                        backgroundImage={
                          "linear-gradient(#0DD5D1 0%, #9350B3 100%)"
                        }
                        p={"1px"}
                        marginRight={4}
                        marginBottom={4}
                      >
                        <Text
                          fontSize="md"
                          alignSelf={"start"}
                          backgroundColor={"#0A2625"}
                          p={"4px 12px"}
                          borderRadius={"32px"}
                        >
                          {expertise}
                        </Text>
                      </Box>
                    );
                }
              )}
          </Flex>
        </VStack>
      </Flex>
    </VStack>
  );
}
