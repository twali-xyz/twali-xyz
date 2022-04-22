import { BountyList } from "./../components/Marketplace/BountyList";
import { SortBounty } from "./../components/Marketplace/SortBounty";
import { FilterInputs } from "./../components/Marketplace/FilterInputs";
import { Flex, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import useUser from "../context/TwaliContext";

export default function marketplace() {
  const { ...userState } = useUser();

  const [filterParams, setFilterParams] = useState({});
  const [sortParams, setSortParams] = useState();
  const [contracts, setContracts] = useState();

  useEffect(() => {
    // when fitlerParams change retrieve the contracts that match
    async function getContracts(filterParams: {}) {
      await fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          setContracts(json);
        });
    }

    if (filterParams) {
      getContracts(filterParams);
    }
    return () => {};
  }, [filterParams]);

  return (
    <>
      <title>twali.xyz - marketplace</title>

      <HeaderNav
        userPage={userState}
        whichPage="marketplace"
        userWallet={userState.userWallet}
        isConnectWalletBtn={!userState.userWallet}
      />
      <Flex flexDir={"row"} pos={"absolute"} top={0} width="100%" zIndex={-1}>
        <FilterInputs
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />

        <VStack
          paddingTop={"90px"}
          height={"100vh"}
          width={"100%"}
          background="n4"
        >
          <SortBounty contracts={contracts} setSortParams={setSortParams} />
          <BountyList contracts={contracts} sortParams={sortParams} />
        </VStack>
      </Flex>
    </>
  );
}
