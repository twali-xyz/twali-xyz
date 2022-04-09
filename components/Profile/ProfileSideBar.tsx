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
import { Chip } from "../reusable/Chip";
import useUser from "../../context/TwaliContext";
export function ProfileSideBar({
  onExpModalOpen,
  isExpModalOpen,
  onExpModalClose,
}) {
  const {
    isOpen: isProfileModalOpen,
    onOpen: onProfileModalOpen,
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
          color={"zing"}
          lineHeight={"56px"}
          letterSpacing={"wide"}
          fontFamily={"GrandSlang"}
          textTransform={"capitalize"}
        >
          {userState.currTitle}
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
            width={"fit-content"}
            borderRadius={"md"}
          >
            <Img
              width={"20px"}
              height={"20px"}
              src={"twali-assets/editicon.png"}
            />
          </Button>
          <EditProfileModal isOpen={isExpModalOpen} onClose={onExpModalClose} />
        </UserPermissionsRestricted>
      </Flex>
      <HStack marginTop={10} marginBottom={0}>
        <Text
          color={"zing"}
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
          {userState.currLocation}
        </Text>
      </HStack>
      <Box marginTop={"8px !important"}>
        <Text
          color={"zing"}
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
          {userState.bio}
        </Text>
      </Box>
      <ProfileSocialMedia userData={userState} marginTop={"24px !important"} />

      <Flex
        p={6}
        mx={"auto"}
        width={"100%"}
        minHeight={"248px"}
        flexDir={"column"}
        maxWidth={"486px"}
        textAlign={"start"}
        backgroundColor={"n6"}
        marginTop={"52px !important"}
        justifyContent={"space-between"}
        marginBottom={["30px !important", "30px !important", "80px !important"]}
        borderRadius={"16px 16px 16px 16px"}
      >
        <VStack
          color="fresh"
          fontSize={"18px"}
          fontWeight={"400"}
          lineHeight={"28px"}
          backgroundColor={"n6"}
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
                borderRadius={"md"}
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
            {userState &&
              userState.functionalExpertise &&
              typeof userState?.functionalExpertise === "object" &&
              userState?.functionalExpertise.map &&
              userState?.functionalExpertise.map((expertise, idx) => {
                if (expertise)
                  return (
                    <Chip
                      key={`chip--${expertise}-${idx}`}
                      marginRight={idx === 2 ? 0 : 4}
                      marginBottom={4}
                    >
                      {expertise}
                    </Chip>
                  );
              })}
          </Flex>
        </VStack>
        <VStack
          color="fresh"
          fontSize={"18px"}
          fontWeight={"400"}
          lineHeight={"28px"}
          backgroundColor={"n6"}
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
            {userState &&
              userState.industryExpertise &&
              typeof userState?.industryExpertise === "object" &&
              userState?.industryExpertise.map((expertise, idx) => {
                if (expertise)
                  return (
                    <Chip
                      key={`chip--${expertise}-${idx}`}
                      marginRight={idx === 2 ? 0 : 4}
                      marginBottom={4}
                    >
                      {expertise}
                    </Chip>
                  );
              })}
          </Flex>
        </VStack>
      </Flex>
    </VStack>
  );
}
