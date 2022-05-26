import { Flex, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { 
    loadCloneContracts,
    loadLatestContract } from "../utils/contractCreateInterface";
import { NewContractForm } from "../components/AdminDash/NewContractForm";
import { ContractList } from "../components/AdminDash/ContractList";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import useUser from "../context/TwaliContext";

const AdminDashBoard = () => {
    const { ...userState } = useUser();
    const [ clones, setClones ] = useState();
    const [ latest, setLatest ] = useState([]);

    const adminAddress = userState.userWallet;
    console.log(adminAddress);

    useEffect(()=> {
        latestClone();
        allClonedContracts();
    },[]);

    /**
     * @dev - retrieves all contract clones that have been created
     */
    const allClonedContracts = async()=> {
        let allClones = await loadCloneContracts(adminAddress);
        console.log("all clones loading....", allClones);
        console.log(clones);
        setClones(allClones);
    }

    const latestClone = async()=> {
        let newClone = await loadLatestContract(adminAddress);
        setLatest(newClone);
    }

    return (
      <>
        <title>twali.xyz - admin dashboard</title>
        <HeaderNav
          userPage={userState}
          whichPage="admindash"
          userWallet={userState.userWallet}
          isConnectWalletBtn={!userState.userWallet}
        />
        <Flex flexDir={"row"} pos={"absolute"} top={0} width="100%" zIndex={-1}>
          <NewContractForm userWallet={userState.userWallet} />
          <VStack
            paddingTop={"90px"}
            height={"100vh"}
            width={"100%"}
            background="n4"
          >
            <ContractList clones={clones} />
          </VStack>
        </Flex>
      </>
    );
};


export default AdminDashBoard;