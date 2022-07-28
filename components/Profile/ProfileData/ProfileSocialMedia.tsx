import { HStack, Link, Image } from "@chakra-ui/react";
import React from "react";

export function ProfileSocialMedia({ userData, ...props }) {
  const splitTwitter = userData.twitter?.toLowerCase().split(/(twitter\.com)/);
  const splitLinkedIn = userData.linkedIn
    ?.toLowerCase()
    .split(/(linkedin\.com)/);
  const twitterUserName = userData.twitter.replace('@', '')
  
  return (
    <HStack width={"6rem"} {...props}>
      {userData.linkedIn && userData.linkedIn !== "undefined" && (
        <Link
          href={
            splitLinkedIn.length > 1
              ? `https://www.linkedin.com/${
                  splitLinkedIn[splitLinkedIn.indexOf("linkedin.com") + 1]
                }`
              : `https://www.linkedin.com/in/${userData.linkedIn}`
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
            splitTwitter.length > 1
              ? `https://www.twitter.com${
                  splitTwitter[splitTwitter.indexOf("twitter.com") + 1]
                }`
              : `https://www.twitter.com/${twitterUserName}`
          }
          target="_blank"
          rel="noopener noreferrer"
          marginLeft={userData.twitter ? "16px !important" : "initial"}
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
