import { Box, HStack, Img, Text, VStack } from "@chakra-ui/react";
import {useState, useEffect }from "react";
import { Chip } from "../reusable/Chip";
import { setTwaliClone } from "../../utils/contractBaseInterface";


interface ContractCard {
    address: string;
}
/**
 *  Created Contract Cards to view after creation
 * 
 */
export const ContractCard = ({cloneAddress }) => {
    const [ constractStatus, setContractStatus] = useState("");



    useEffect(()=> {
        getContractStatus();
    },[]);

    const getContractStatus = async () => {
    let arrayStatus = ["Draft", "Active", "Complete", "Killed"];
    let status = await setTwaliClone(cloneAddress).methods.currentStatus().call();
    setContractStatus(arrayStatus.at(status));
    };

    return (
  
        <Box
    //   {...props}
      width={"100%"}
      height={"148px"}
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
      <Text >{cloneAddress}</Text>
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
           {constractStatus}
          </Chip>
        </HStack>
          </VStack>
    </Box> 

    )
};