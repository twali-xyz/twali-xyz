import { BountyList } from "./../components/Marketplace/BountyList";
import { SortBounty } from "./../components/Marketplace/SortBounty";
import { FilterInputs } from "./../components/Marketplace/FilterInputs";
import { Flex, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import useUser from "../context/TwaliContext";
import useSWR from "swr";
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function marketplace() {
  const { ...userState } = useUser();
  const [filterParams, setFilterParams] = useState({});
  const [sortParams, setSortParams] = useState();
  const [query, setQuery] = useState("");

  let paramsObj = { params: "" };
  let searchParams = new URLSearchParams(paramsObj);

  // Create a stable key for SWR
  searchParams.sort();
  const qs = searchParams.toString();
  console.log(searchParams.get("function"));

  const { data, error } = useSWR(qs, fetcher);
  function createURL(filterParams) {
    searchParams = new URLSearchParams({});
    let urlQuery = "";
    Object.entries(filterParams).forEach((element) => {
      if (!element[1]) return;
      // https://en.wikipedia.org/wiki/Query_string
      //  ?field1=value1&field1=value2&field2=value3
      urlQuery += `${urlQuery.length === 0 ? "?" : "&"}${
        element[0]
      }=${Object.values(element[1]).join(`&${element[0]}=`)}`.replace(
        / /g,
        "_"
      );

      searchParams.append(element[0], String(element[1]));
    });
    setQuery(urlQuery);
  }

  useEffect(() => {
    createURL(filterParams);
    console.log(filterParams);
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
          <SortBounty contracts={data} setSortParams={setSortParams} />
          <BountyList contracts={data} sortParams={sortParams} />
        </VStack>
      </Flex>
    </>
  );
}
