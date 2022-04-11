import { Flex, Text, Button, Img, HStack, Box } from "@chakra-ui/react";
import React from "react";
import UserPermissionsRestricted from "../../UserPermissionsProvider/UserPermissionsRestricted";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
export function ProfileInfo({
  onExpModalOpen,
  isExpModalOpen,
  onExpModalClose,
  userState,
}) {
  return (
    <>
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
    </>
  );
}
