import {
  VStack,
  Box,
  Img,
  Text,
  Button,
  HStack,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import EditExpertiseModal from "./EditExpertiseModal/EditExpertiseModal";
import UserPermissionsRestricted from "../UserPermissionsProvider/UserPermissionsRestricted";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import { ProfileSocialMedia } from "./ProfileSocialMedia";
export function ProfileSideBar({
  onExpModalOpen,
  isExpModalOpen,
  onExpModalClose,
  userData,
  setUserData,
  handleUpdatedExperiences,
  handleUpdatedProfile,
}) {
  const {
    isOpen: isProfileModalOpen,
    onOpen: onProfileModalOpen,
    onClose: onProfileModalClose,
  } = useDisclosure();

  return (
    <VStack
      marginTop={0}
      padding={0}
      my={0}
      p={["0", "0", "0", "0 2%", "0 2% 0 1.5% "]}
      align="flex-start"
      justifyContent={"center"}
      borderRight={"1px solid #587070"}
      width={"73vw"}
      maxW={"565px"}
      mx={"auto"}
    >
      <Flex
        width={"100%"}
        flexDir={"row"}
        marginBottom={"24px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text
          fontSize="40px"
          marginTop={"52px"}
          color={"#C7F83C"}
          lineHeight={"56px"}
          letterSpacing={"wide"}
          fontFamily={"GrandSlang"}
          textTransform={"capitalize"}
        >
          {userData.currTitle}
        </Text>
        <UserPermissionsRestricted to="edit">
          <Button
            onClick={onExpModalOpen}
            alignSelf="flex-end"
            variant="ghost"
            aria-label="Update experience"
            margin={"0px"}
            mx={"0px"}
            pos={"relative"}
            top={"-45px !important"}
            left={"16px"}
          >
            <Img
              width={"20px"}
              height={"20px"}
              src={"twali-assets/editicon.png"}
            />
          </Button>
          <EditProfileModal
            isOpen={isExpModalOpen}
            onClose={onExpModalClose}
            userData={userData}
            setUserData={setUserData}
            handleUpdatedExperiences={handleUpdatedProfile}
          />
        </UserPermissionsRestricted>
      </Flex>
      <HStack marginTop={10} marginBottom={0}>
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
          {userData.currLocation}
        </Text>
      </HStack>
      <Box marginTop={"8px !important"}>
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
          {userData.bio}
        </Text>
      </Box>
      <ProfileSocialMedia userData={userData} marginTop={"24px !important"} />
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
          fontSize={"18px"}
          fontWeight={"400"}
          lineHeight={"28px"}
          backgroundColor={"#0A2625"}
          fontFamily={"PP Telegraf Light"}
          borderRadius={"16px 16px 16px 16px"}
        >
          <HStack
            width={"100%"}
            justifyContent={"space-between"}
            height={"fit-content"}
          >
            <Text fontFamily={"PP Telegraf"}>Superpowers</Text>
            <UserPermissionsRestricted to="edit">
              <Button
                onClick={onProfileModalOpen}
                alignSelf="flex-end"
                variant="ghost"
                aria-label="Update experience"
                pos={"relative"}
                width={"fit-content"}
                p={0}
                top={-4}
                left={"16px"}
              >
                <Img
                  width={"20px"}
                  height={"20px"}
                  src={"twali-assets/editicon.png"}
                />
              </Button>

              <EditExpertiseModal
                isOpen={isProfileModalOpen}
                onClose={onProfileModalClose}
                userData={userData}
                setUserData={setUserData}
                handleUpdatedExperiences={handleUpdatedExperiences}
              />
            </UserPermissionsRestricted>
          </HStack>
          <Flex
            flexDir={"row"}
            width={"100%"}
            justifyContent={"flex-start"}
            m={0}
            flexFlow={"wrap"}
          >
            {userData &&
              userData &&
              userData.functionalExpertise &&
              typeof userData?.functionalExpertise === "object" &&
              userData?.functionalExpertise.map((expertise, idx) => {
                if (expertise)
                  return (
                    <Box
                      key={idx}
                      borderRadius={"32px"}
                      backgroundImage={
                        "linear-gradient(#0DD5D1 0%, #9350B3 100%)"
                      }
                      marginRight={idx === 2 ? 0 : 4}
                      marginBottom={4}
                      p={"1px"}
                    >
                      <Text
                        fontSize="14px"
                        lineHeight={"24px"}
                        fontFamily={"PP Telegraf"}
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
              })}
          </Flex>
        </VStack>
        <VStack
          color="#F9FFF2"
          fontSize={"18px"}
          fontWeight={"400"}
          lineHeight={"28px"}
          backgroundColor={"#0A2625"}
          fontFamily={"PP Telegraf Light"}
          borderRadius={"16px 16px 16px 16px"}
        >
          <HStack
            width={"100%"}
            justifyContent={"space-between"}
            height={"40px"}
          >
            <Text alignSelf={"start"} fontFamily={"PP Telegraf"} pb={0}>
              Industries
            </Text>
          </HStack>

          <Flex
            m={0}
            px={0}
            width={"100%"}
            flexDir={"row"}
            flexFlow={"wrap"}
            justifyContent={"flex-start"}
          >
            {userData &&
              userData &&
              userData.industryExpertise &&
              typeof userData?.industryExpertise === "object" &&
              userData?.industryExpertise.map((expertise, idx) => {
                if (expertise)
                  return (
                    <Box
                      key={idx}
                      borderRadius={"32px"}
                      backgroundImage={
                        "linear-gradient(#0DD5D1 0%, #9350B3 100%)"
                      }
                      p={"1px"}
                      marginRight={idx === 2 ? 0 : 4}
                      marginBottom={4}
                    >
                      <Text
                        fontSize="14px"
                        lineHeight={"24px"}
                        fontFamily={"PP Telegraf"}
                        alignSelf={"start"}
                        backgroundColor={"#0A2625"}
                        p={"4px 12px"}
                        whiteSpace={"nowrap"}
                        borderRadius={"32px"}
                      >
                        {expertise}
                      </Text>
                    </Box>
                  );
              })}
          </Flex>
        </VStack>
      </Flex>
    </VStack>
  );
}
