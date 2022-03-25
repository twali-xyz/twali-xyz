import { HStack, Link, Image } from "@chakra-ui/react";
import React from "react";

export function ProfileSocialMedia({ userData, ...props }) {
  const splitTwitter = userData.twitter?.toLowerCase().split(/(twitter\.com)/);
  const splitLinkedIn = userData.linkedIn
    ?.toLowerCase()
    .split(/(linkedin\.com)/);

  return (
    <HStack width={"6rem"} {...props}>
      {userData.linkedIn && (
        <Link
          href={
            `https://linkedin.com${splitLinkedIn[2]}` ||
            `https://linkedin.com${splitLinkedIn[1]}` ||
            `${splitLinkedIn[0]}`
          }
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
          href={
            `https://twitter.com${splitTwitter[2]}` ||
            `https://twitter.com${splitTwitter[1]}` ||
            `${splitTwitter[0]}`
          }
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
