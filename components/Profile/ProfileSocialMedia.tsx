import { HStack, Link, Image } from "@chakra-ui/react";
import React from "react";

export function ProfileSocialMedia({ profileData }) {
  return (
    <HStack width={"6rem"}>
      {profileData.content.identity.linkedIn && (
        <Link
          href={profileData.content.identity.linkedIn}
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
      {profileData.content.identity.twitter && (
        <Link
          href={profileData.content.identity.twitter}
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
