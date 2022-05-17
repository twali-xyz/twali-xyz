import { CircularProgress, Flex, Link, Text, VStack } from "@chakra-ui/react";
import { ContractCard } from "./ContractCard";


export function ContractList({clones}){
    
    if (!clones)
    return (
      <Flex height={"100%"} alignItems={"center"}>
        <CircularProgress
          justifySelf={"center"}
          thickness="4px"
          isIndeterminate
          color="#3C2E26"
        />
      </Flex>
    );

    return (
      <VStack
        width={"100%"}
        padding={"5%"}
        height={"100%"}
        overflowY={"scroll"}
        scrollBehavior={"smooth"}
      >
        {" "}
        {clones?.length && clones.map((address, i) => {
          return (
            <Link
              _hover={{
                textDecor: "none",
                cursor: "pointer",
              }}
              href={`/contracts/${address}`}
              key={i}
              width={"100%"}
            >
              <ContractCard 
              cloneAddress={address} />
            </Link>
          );
        }).reverse()}
      </VStack>
    );
};


