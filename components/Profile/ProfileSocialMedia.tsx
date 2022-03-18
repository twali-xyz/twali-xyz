import { HStack, Link, Image } from "@chakra-ui/react";
import React from "react";

export function ProfileSocialMedia({ profileData, ...props }) {
  return (
    <HStack width={"6rem"} {...props}>
      {profileData.linkedIn && (
        <Link
          href={profileData.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          width={"fit-content"}
        >
          <Image
            src="twali-assets/linkedLogo.png"
            height={"32px"}
            width={"auto"}
          />
        </Link>
      )}
      {profileData.twitter && (
        <Link
          href={profileData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          marginLeft={"16px !important"}
        >
          <Image
            src="twali-assets/twitterLogo.png"
            height={"32px"}
            width={"auto"}
          />
        </Link>
      )}
    </HStack>
  );
}
