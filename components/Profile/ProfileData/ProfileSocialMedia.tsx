import { HStack, Link, Image } from "@chakra-ui/react";
import React from "react";

export function ProfileSocialMedia({ userData, ...props }) {
  console.log(userData.twitter, userData.linkedIn);

  const splitTwitter = userData.twitter?.toLowerCase().split(/(twitter\.com)/);
  const splitLinkedIn = userData.linkedIn
    ?.toLowerCase()
    .split(/(linkedin\.com)/);

  return (
    <HStack width={"6rem"} {...props}>
      {userData.linkedIn && userData.linkedIn !== "undefined" && (
        <Link
          href={
            splitLinkedIn.length > 1
              ? `https://www.linkedIn.com/${splitLinkedIn[1]}`
              : `https://www.linkedin.com/${userData.linkedIn}`
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
