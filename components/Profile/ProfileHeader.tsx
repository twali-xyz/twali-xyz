import { Button, Img, Text, VStack } from "@chakra-ui/react";
import React from "react";
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
      backgroundImage={`url(${bannerImage.src})`}
    >
      <Button
        height={"160px"}
        width={"160px"}
        alignSelf="center"
        overflow="hidden"
        pos={"relative"}
        bottom={5}
        marginBottom={0}
        p={0}
      >
        <Img
          borderRadius="full"
          width="160px"
          height="160px"
          src="fox-pfp.png"
          alt="fox stock img"
        />
      </Button>
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
      >
        available to work
      </Text>
    </VStack>
  );
}
