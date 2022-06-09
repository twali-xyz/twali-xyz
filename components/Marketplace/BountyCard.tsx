import { Box, HStack, Img, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Chip } from "../reusable/Chip";

interface BountyCard {
  title: string;
  body: string;
  img: string;
}

/**
 * Individual bounty card component
 *
 *
 * @param {string} title main title
 * @param {string} body description/body
 * @param {string} img src for bounty image
 *
 * @returns JSX BountyCard element
 *
 */
export const BountyCard = ({
  title,
  body,
  img,
  amount,
  status,
  created_on,
  application_deadline,
  start_date,
  token,
  ...props
}) => {

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
        <Box mt={"32px !important"} mb={"8px !important"} width={"100%"}>
          <Text
            fontFamily={"PP Telegraf Light"}
            fontSize={"14px"}
            fontWeight={"300"}
            color={"subtle"}
            width={"100%"}
            noOfLines={2}
          >
            {body}
          </Text>
        </Box>
        <HStack mt={2}>
          <Chip borderRadius={"4px"} height={"28px"} variant={"created"}>
            Listed{" "}
            {Math.ceil(
              (new Date(Date.now()).getTime() -
                new Date(Number(created_on) * 1000).getTime()) /
                (1000 * 3600 * 24)
            )}
            d ago
          </Chip>
          <Chip borderRadius={"4px"} height={"28px"} variant={"status"}>
            {status}
          </Chip>
          <Chip
            borderRadius={"4px"}
            height={"28px"}
            variant={"bounty"}
            background={"#2e165069"}
            borderColor={"plum"}
          >
            {new Date(start_date * 1000).toLocaleDateString("us-en")}
          </Chip>
          <Chip borderRadius={"4px"} height={"28px"} variant={"bounty"}>
            {amount} {token}
          </Chip>
        </HStack>
      </VStack>
    </Box>
  );
};
