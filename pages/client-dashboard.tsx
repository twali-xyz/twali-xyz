import { 
  Container, 
  Box, 
  Button, 
  Text, 
  VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { 
    loadCloneContracts,
    // loadLatestContract 
  } from "../utils/contractCreateInterface";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import { ContractList } from "../components/AdminDash/ContractList";
import useUser from "../context/TwaliContext";

const ClientDashBoard = () => {
  const { ...userState } = useUser();
  const [clones, setClones] = useState();
  // const [status, setStatus ] = useState<string | JSX.Element>("💡 Connect your Metamask wallet to view yours contracts.");
  const [error, setError] = useState("");

  const adminAddress = userState.userWallet;
  console.log(adminAddress);

  useEffect(() => {
    allClonedContracts();
  }, []);

  /**
   * @dev - retrieves all contract clones that have been created
   */
  const allClonedContracts = async () => {
    if(adminAddress != undefined) {
    let allClones = await loadCloneContracts(adminAddress);
    setClones(allClones);
    }
  };

  if(!adminAddress) return <Text>Loading..</Text>
  return (
    <>
      <title>twali.xyz - client-dashboard</title>
      <Container
        width="100%"
        height="1024px"
        minH={"100vh"}
        maxW={"100%"}
        pos={"relative"}
        bgSize={"cover"}
        bgPosition={"center"}
        background={
          "linear-gradient(65.14deg, #0F2922 10.35%, #1A232A 76.62%);"}>
        <HeaderNav
          userPage={userState}
          whichPage="client-dashboard"
          userWallet={userState.userWallet}
          isConnectWalletBtn={!userState.userWallet}
        />
        <VStack
          paddingTop={"90px"}
          pos={"absolute"}
          height={"100vh"}
          width={"100%"}>
          <Box
            w="90%"
            mb={"48px !important"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}>
            <Text
              fontFamily={"GrandSlang"}
              fontSize={"48px"}
              lineHeight={"64px"}
              letterSpacing={"wide"}>
              Hello, {userState.userName}
            </Text>
            <Button variant={"primary"} size={"lg"}>
              Post a Job
            </Button>
          </Box>
          {/*
           * Todo: UI view if there are no created contracts
           *       Client (current client that is logged in)
           */}
          {clones ? <ContractList clones={clones} /> : <Text>💡 Connect your Metamask wallet to view yours contracts.</Text>}
        </VStack>
      </Container>
    </>
  );
};


export default ClientDashBoard;