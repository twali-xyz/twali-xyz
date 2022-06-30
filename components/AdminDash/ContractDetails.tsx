import { Box, Button, HStack, Img, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Chip } from "../reusable/Chip";
import { setTwaliClone, getTwaliCloneStorage } from "../../utils/contractBaseInterface";


export default function ContractDetails({contract}) {
  console.log(contract)
  
useEffect(() => {
  getContractDetails();

}, []);

const getContractDetails = async () => {
  await getTwaliCloneStorage(contract);
  // Contract Details are single items

  // let metadata = await setTwaliClone(contract).methods.contract_sowMetaData().call();
  //   console.log('contract metadata:', metadata);
  //   let metadata2 = await setTwaliClone(contract).methods.contract_start_date().call();
  //   console.log('contract metadata:', metadata2);
  //   let metadata3 = await setTwaliClone(contract).methods.contract_end_date().call();
  //   console.log('contract metadata:', metadata3);
  // return metadata;
};




if(!contract) return <Text>Loading...</Text>
    return (

        <Box
        //   {...props}
          width={"90%"}
          height={"45%"}
          alignItems={"center"}
          background={"n6"}
          padding={"32px"}
          border={"1px"}
          borderRadius={"8px"}
          borderColor={"n3"}
          boxShadow="8px 8px 24px 0px #00000026"
          _hover={{ boxShadow: "8px 8px 32px 8px #00000026" }}>    
        <VStack alignItems={"flex-start"}>
        
          <Text color={"zing"}>Contract Address - {contract}</Text>
    
            <Text color={"zing"}>Client - {"cloneAddress"}</Text>
            <Text color={"zing"}>Expert - {"cloneAddress"}</Text>
            <Text color={"zing"}>SOW Metadata - {"sow url here"}</Text>
            <Text>Status</Text>
            <Button
            // pos={"relative"}
            // alignSelf="center"
            variant={"secondary"}
            size={"lg"}
            borderColor={"primary"}>
              <Text>Live</Text></Button>

            <HStack>
            <Button
            variant={"primary"}
            size={"md"}
            borderColor={"primary"}>
              <Text>Archive</Text></Button>
              <Button
            variant={"secondary"}
            size={"md"}>
              <Text>Edit</Text></Button>
              </HStack>
        </VStack>
        </Box> 
        )
};