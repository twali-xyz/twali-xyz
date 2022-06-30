import { Flex, VStack, Text } from "@chakra-ui/react";

import { useRouter } from "next/router";
import  useUser from "../../context/TwaliContext";
// Components
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import ContractDetails from "../../components/AdminDash/ContractDetails";
import ContractInterfaceForm from "../../components/AdminDash/ContractInterfaceForm";

const ContractPage = () => {
    const router = useRouter();
    const { contract } = router.query;
    const { ...userState } = useUser();

    return (
      <>
        <title>Twali.xyz - contracts </title>
        <HeaderNav
        userPage={userState}
        whichPage="contracts"
        userWallet={userState.userWallet}
        isConnectWalletBtn={!userState.userWallet}
        />
        <Flex flexDir={"row"} pos={"absolute"} top={0} width="100%" zIndex={-1}>
          <ContractInterfaceForm />
          <VStack
            paddingTop={"90px"}
            height={"100vh"}
            width={"100%"}
            background="n4"
          >
          <Text 
            width={"90%"}
            fontFamily={"GrandSlang"}
            fontSize={"48px"}
            lineHeight={"64px"}
            letterSpacing={"wide"}>Project Updates</Text>
            <ContractDetails contract={contract} />
          </VStack>
        </Flex>
      </>
    );
};


export default ContractPage;