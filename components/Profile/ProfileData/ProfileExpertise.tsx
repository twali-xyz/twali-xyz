import { Flex, VStack, HStack, Text, Button, Img } from "@chakra-ui/react";
import { Chip } from "../../reusable/Chip";
import UserPermissionsRestricted from "../../UserPermissionsProvider/UserPermissionsRestricted";
import React from "react";
import EditExpertiseModal from "../EditExpertiseModal/EditExpertiseModal";

export default function ProfileExpertise({
  onProfileModalOpen,
  isProfileModalOpen,
  onProfileModalClose,
  userState,
}) {
  return (
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
        <HStack width={"100%"} justifyContent={"space-between"} height={"40px"}>
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
  );
}
