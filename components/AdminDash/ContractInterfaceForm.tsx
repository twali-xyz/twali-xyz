import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  // Select,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function ContractInterfaceForm() {
  return (
    <VStack
      width={"25vw"}
      minW={"400px"}
      maxW={"600px"}
      background={"inverse"}
      height={"calc(100vh)"}
      paddingTop={"90px"}
      paddingX={"54px"}
    >
      <HStack
        width={"100%"}
        alignItems={"baseline"}
        justifyContent={"space-between"}
        p={0}
      >
        <FormControl>
          <FormLabel>Twali Contract - Address</FormLabel>
          <Text fontSize="16px" marginBottom="8px !important">
            {""}
          </Text>
          <Input
            fontSize="16px"
            placeholder="expert address, duration, payment amount"
            name="activateContract"
            marginBottom={"8px !important"}
            value={""}
            // onChange={handleChange}
          />
          <Button
            pos={"relative"}
            alignSelf="center"
            variant={"primary"}
            size={"lg"}
            marginBottom={"24px"}
            // onClick={() => createContractPressed()}
          >
            <Text
              display={"flex"}
              width={"100%"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              Activate Contract
            </Text>
            {/* TODO: Add loading state on contract concreation */}
          </Button>
          {/* <p>{"status"}</p> */}

          <Text
          marginBottom={"8px"}
          >Depoist Expert Payment</Text>
          <Input
            fontSize="16px"
            placeholder="payable amount (Ether)"
            name="activateContract"
            marginBottom={"8px !important"}
            value={""}
          />
          <Button
            pos={"relative"}
            alignSelf="center"
            variant={"primary"}
            size={"md"}
            marginBottom={"24px"}
            // onClick={() => createContractPressed()}
          >
            <Text
              display={"flex"}
              width={"100%"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              Deposit
            </Text>
          </Button>
          <Text
          marginBottom={"8px"}
          >Kill Contract</Text>
          
          <Button
            pos={"relative"}
            alignSelf="center"
            variant={"primary"}
            size={"md"}
            // onClick={() => createContractPressed()}
          >
            <Text
              display={"flex"}
              width={"100%"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              Deposit
            </Text>
          </Button>
        </FormControl>
      </HStack>
    </VStack>
  );
}
