import { HStack, Link, Image } from "@chakra-ui/react";
import React from "react";

export function ProfileSocialMedia({ userData, ...props }) {
  return (
    <HStack width={"6rem"} {...props}>
      {userData.linkedIn && (
        <Link
          href={userData.linkedIn}
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
      {userData.twitter && (
        <Link
          href={userData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          marginLeft={userData.linkedIn ? "16px !important" : "initial"}
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
