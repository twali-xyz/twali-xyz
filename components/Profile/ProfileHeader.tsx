import { Button, Img, Text, VStack } from "@chakra-ui/react";
import React from "react";
import ProfileImageUpload from "./ProfileImageUpload";
import bannerImage from "/public/twali-assets/bannerimage.png";

export function ProfileHeader({ userName }) {
  return (
    <VStack
      w="100%"
      display={"flex"}
      height={"440px"}
      bgSize={"cover"}
      justifyContent={"center"}
      overflow="hidden"
      bgRepeat={"no-repeat"}
      backgroundImage={"twali-assets/bannerimage.png"}
    >
      <ProfileImageUpload userName={userName} />

      {userName && (
        <Text
          fontFamily={"GrandSlang"}
          fontSize="64px"
          lineHeight={"80px"}
          letterSpacing={"wide"}
          pos={"relative"}
          top={"5px"}
        >
          {userName}
        </Text>
      )}
      <Text
        fontFamily={"PP Telegraf"}
        fontSize="16px"
        lineHeight={"24px"}
        fontWeight={"400"}
        letterSpacing={"wide"}
        textTransform={"uppercase"}
        pos={"relative"}
        top={"16px"}
        visibility={"hidden"}
      >
        available to work
      </Text>
    </VStack>
  );
}
