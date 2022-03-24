import { HStack, Link, Image } from "@chakra-ui/react";
import React from "react";

export function ProfileSocialMedia({ userData, ...props }) {
  const splitTwitter = userData.twitter?.split(/(twitter\.com\/)/);
  const splitLinkedIn = userData.linkedIn?.split(/(linkedin\.com\/)/);

  return (
    <HStack width={"6rem"} {...props}>
      {userData.linkedIn && (
        <Link
          href={
            splitLinkedIn[2]
              ? `https://${splitLinkedIn[1] + splitLinkedIn[2]}`
              : splitLinkedIn[1]
              ? `https://${splitLinkedIn[0] + splitLinkedIn[1]}`
              : `${splitLinkedIn[0]}`
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
            splitTwitter[2]
              ? `https://${splitTwitter[1] + splitTwitter[2]}`
              : splitTwitter[1]
              ? `https://${splitTwitter[0] + splitTwitter[1]}`
              : `${splitTwitter[0]}`
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
