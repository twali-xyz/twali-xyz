import { Box, Button, HStack, Img, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import useUser from "../../context/TwaliContext";
import { Chip } from "../reusable/Chip";
import { Referral } from "../reusable/Referral";

interface BountyCard {
  title: string;
  body: string;
  img: string;
  amount: string;
  status: string;
  created_on: string;
  application_deadline: string;
  start_date: string;
  token: string;
  contract_id: string;
}

/**
 * Individual bounty card component
 *
 *
 * @param {string} title main title
 * @param {string} body description/body
 * @param {string} img src for bounty image
 * @param {string} amount bounty payment amount
 * @param {string} status current bounty status
 * @param {string} create_on date bounty was created as a string
 * @param {string} application_deadline deadline to apply for the bounty
 * @param {string} start_date bounty start date
 * @param {string} token token being used for payment in bounty
 * @param {string} contract_id ID of the current bounty
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
  contract_id,
  ...props
}) => {
  const { userWallet } = useUser();
  return (
    <Box
      {...props}
      width={"100%"}
      background={"n6"}
      padding={"24px"}
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
        <HStack width={"100%"} justify={"space-between"}>
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
          <HStack>
            <Referral userWallet={userWallet} contractID={contract_id}>
              <Button
                pos={"relative"}
                zIndex={"1000"}
                variant={"secondary"}
                marginInlineStart={"auto"}
              >
                share job
              </Button>
            </Referral>
            <Link
              _hover={{
                textDecor: "none",
                cursor: "pointer",
              }}
              href={`/contracts/${contract_id}`}
              width={"100%"}
            >
              <Button minW={"160px"} variant={"primary"}>
                View Job
              </Button>
            </Link>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};
