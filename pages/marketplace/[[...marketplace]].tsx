import Router, { useRouter } from "next/router";
import { Flex, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import useUser from "../../context/TwaliContext";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { FilterInputs } from "../../components/Marketplace/FilterInputs";
import { SortBounty } from "../../components/Marketplace/SortBounty";
import { BountyList } from "../../components/Marketplace/BountyList";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
export default function filter() {
  const router = useRouter();

  const { ...userState } = useUser();
  const [filterParams, setFilterParams] = useState({});
  const [sortParams, setSortParams] = useState();
  const [query, setQuery] = useState("");
  // Create a stable key for SWR
  useEffect(() => {
    if (!router.query) return;

    let tempFilter = {};
    Object.entries(router.query).forEach((filterData) => {
      let filterObjectArray = {};
      let [filterType, filterValues] = filterData;
      if (typeof filterValues === "string") {
        filterValues = [filterValues];
      }
      filterValues.forEach((value) => {
        filterObjectArray[value] = value;
      });
      tempFilter[filterType] = filterObjectArray;
    });

    if (Object.entries(tempFilter).length > 0) {
      setFilterParams(tempFilter);
    }
    return () => {};
  }, [router]);

  const { data, error } = useSWR(
    `api/marketplace/filter${query || router.asPath}`,
    fetcher
  );

  function createURL(filterParams) {
    let urlQuery = "";
    Object.entries(filterParams).forEach((element) => {
      if (!element[1]) return;
      // https://en.wikipedia.org/wiki/Query_string
      //  ?field1=value1&field1=value2&field2=value3
      urlQuery += `${urlQuery.length === 0 ? "?" : "&"}${
        element[0]
      }=${Object.values(element[1]).join(`&${element[0]}=`)}`.replace(
        / /g,
        "+"
      );
    });
    setQuery(urlQuery);
  }

  useEffect(() => {
    createURL(filterParams);
  }, [filterParams]);

  useEffect(() => {
    if (!query) return;
    let urlQuery = {};
    Object.entries(filterParams).forEach((filter) => {
      const [filterName, filterValues] = filter;

      if (filterName === "startDate") {
        urlQuery[filterName] = [String(Object.values(filterValues)[0])];
      } else {
        urlQuery[filterName] =
          typeof filterValues === "string"
            ? [filterValues]
            : Object.values(filterValues);
      }
    });

    Router.push({
      pathname: "/marketplace",
      query: urlQuery,
    });

    return () => {};
  }, [query]);

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
          <SortBounty contracts={data} onChange={(val) => setSortParams(val)} />
          <BountyList contracts={data} error={error} sortParams={sortParams} />
        </VStack>
      </Flex>
    </>
  );
}
