import { Box, HStack, Img, Text, VStack } from "@chakra-ui/react";
import { Chip } from "../reusable/Chip";

export default function ContractDetails(
    contract
) {



    return (
        <Box
        //   {...props}
          width={"90%"}
          height={"90%"}
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
          {/* <Img
            width={"75px"}
            height={"75px"}
            background={"n3"}
            borderRadius={"full"}
            src={img}
            alt={`bounty image`}
          ></Img> */}
          <Text color={"zing"}>Contract Address - {"contract"}</Text>
        </HStack>
        {/* <Box mt={"32px !important"} width={"100%"}>
          <Text
            fontFamily={"PP Telegraf Light"}
            fontSize={"16px"}
            width={"100%"}
            noOfLines={2}
          >
            {body}
          </Text>*/}
          <HStack>
              <Chip borderRadius={"4px"} height={"28px"} variant={"status"}>
               {"2 Days Remain"}
              </Chip>
              <Chip borderRadius={"4px"} height={"28px"} variant={"status"}>
               {"Active"}
              </Chip>
              <Chip borderRadius={"4px"} height={"28px"} variant={"status"}>
               {"1 ETH"}
              </Chip>
            </HStack>
            <Text color={"subtle"}>Client - {"cloneAddress"}</Text>
            <Text color={"subtle"}>Expert - {"cloneAddress"}</Text>
            <Text color={"subtle"}>SOW Metadata - {"sow url here"}</Text>
            <Text color={"subtle"}>Werk Approved</Text>
            <Text color={"subtle"}>Werk Paid</Text>
            <Text color={"subtle"}>Werk Refunded</Text>
        </VStack>
        </Box> 
    
        )
};