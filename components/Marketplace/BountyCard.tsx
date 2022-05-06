import { Box, HStack, Img, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Chip } from "../reusable/Chip";

interface BountyCard {
  title: string;
  body: string;
  img: string;
}

/**
 * Twali slider component for binary selection
 *
 *
 * @param {string} title main title
 * @param {string} body description/body
 * @param {string} img src for bounty image
 *
 * @returns JSX BountyCard element
 *
 */
export const BountyCard = ({ title, body, img, ...props }) => {
  return (
    <Box
      {...props}
      width={"100%"}
      height={"248px"}
      background={"n6"}
      padding={"32px"}
      border={"1px"}
      borderRadius={"8px"}
      borderColor={"n3"}
      boxShadow="8px 8px 24px 0px #00000026"
      _hover={{ boxShadow: "8px 8px 32px 8px #00000026" }}
    >
      <VStack alignItems={"flex-start"}>
        <HStack>
          <Img
            width={"75px"}
            height={"75px"}
            background={"n3"}
            borderRadius={"full"}
            src={img}
            alt={`bounty image`}
          ></Img>
          <Text>{title}</Text>
        </HStack>
        <Box mt={"32px !important"} width={"100%"}>
          <Text
            fontFamily={"PP Telegraf Light"}
            fontSize={"16px"}
            width={"100%"}
            noOfLines={2}
          >
            {body}
          </Text>
        </Box>
        <HStack>
          <Chip borderRadius={"4px"} height={"28px"} variant={"created"}>
            Listed 18d ago
          </Chip>
          <Chip borderRadius={"4px"} height={"28px"} variant={"status"}>
            Status
          </Chip>
          <Chip borderRadius={"4px"} height={"28px"} variant={"bounty"}>
            $20,000 USDC
          </Chip>
        </HStack>
      </VStack>
    </Box>
  );
};
