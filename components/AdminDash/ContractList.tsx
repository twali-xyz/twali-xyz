import { 
  Container,
  CircularProgress, 
  Divider,
  Flex, 
  Link, 
  Text, 
  VStack } from "@chakra-ui/react";

import { ContractCard } from "./ContractCard";


export function ContractList({clones}){
  console.log(clones)

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
      <Container
        width="90%"
        maxW={"90%"}
        padding={0}>
        <Text
        fontSize={"24px"}
        mb={"24px !important"}
        >
          Contracts
        </Text>
      <VStack
        width={"100%"}
        padding={"5%"}
        height={"100%"}

        backgroundColor="#041A19"
        border={"1px solid rgba(88, 112, 112, 0.5)"}
        borderRadius={"16px"}>
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
              width={"100%"}>
              <ContractCard 
              cloneAddress={address} />
            </Link>
          );
        }).reverse()}
      </VStack>
      {/* <Divider orientation="vertical" /> */}
      </Container>
    );
};


