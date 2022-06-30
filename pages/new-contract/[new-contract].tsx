import { Flex, VStack, Box, Text, Container} from "@chakra-ui/react";
import { useRouter } from "next/router";

//State 
import useUser from "../../context/TwaliContext"
// Components
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { NewContractDetails } from "../../components/AdminDash/NewContractDetails";



const DraftContractPage = () => {
    const { ...userState } = useUser();

    const contractTestProps = {
        contract_id: "0001",
        client: "0xE88B8F6d7396b8935E3D73D3f0cd6E1D655eA4AE",
        sowURI: "https://contract-metadata.s3.amazonaws.com/v1/NickGonzalez4__.json",
        contract_amount: 1,
        contract_start_date: 1654193382,
        contract_end_date: 1654279782
    }


return(
    <>
    <title>Twali.xyz - Contracts </title>
    <Container
        width="100%"
        height="1024px"
        minH={"100vh"}
        maxW={"100%"}
        pos={"relative"}
        bgSize={"cover"}
        bgPosition={"center"}
        background={
          "linear-gradient(65.14deg, #0F2922 10.35%, #1A232A 76.62%);"
        }
      >
    <HeaderNav
     userPage={userState}
     whichPage="new-contract"
     userWallet={userState.userWallet}
     isConnectWalletBtn={!userState.userWallet} />
    <Box
            w="90%"
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
    <Text
              fontFamily={"GrandSlang"}
              fontSize={"48px"}
              lineHeight={"64px"}
              letterSpacing={"wide"}
            >Smart Contract Details</Text>
    <NewContractDetails {...contractTestProps}/>
    </Box>
    </Container>
    </>
    );
};


export default DraftContractPage;