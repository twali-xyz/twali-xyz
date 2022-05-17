import { Flex, VStack, Text } from "@chakra-ui/react";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import ContractDetails from "../../components/AdminDash/ContractDetails";
import ContractInterfaceForm from "../../components/AdminDash/ContractInterfaceForm";
import { useRouter } from "next/router";


const ContractPage = () => {
    const router = useRouter();
    const { contract } = router.query
    console.log(contract);
    return (
        <>
        <title>Twali.xyz - Contracts </title>
        <HeaderNav />
        <Flex flexDir={"row"} pos={"absolute"} top={0} width="100%" zIndex={-1}>
          <ContractInterfaceForm  />
          <VStack
            paddingTop={"90px"}
            height={"100vh"}
            width={"100%"}
            background="n4"
          >
        <ContractDetails contract={contract}/>
        </VStack>
        </Flex>
        </>
    )

};


export default ContractPage;