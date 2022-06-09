import { Flex, VStack } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { ApplicantList } from "../../components/Admin/ApplicantList";
import { FilterInputs } from "../../components/Admin/FilterInputs";
import { SortApplicants } from "../../components/Admin/SortApplicants";
import useUser from "../../context/TwaliContext";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
const whitelist = () => {
  const router = useRouter();
  const { ...userState } = useUser();
  const [filterParams, setFilterParams] = useState({});
  const [sortParams, setSortParams] = useState();
  const [query, setQuery] = useState("");
  const [isConnectWalletBtn, setIsConnectWalletBtn] = useState(false);

  // set the filterParams based on the URL query params
  // needed to set filters when user goes to marketplace from a URL that contains a query
  useEffect(() => {
    if (!router.query) return;

    // the filter query can be a string or [] when sent through router.query
    // but we always want typeof filterValues === []
    let tempFilter = {};

    Object.entries(router.query).forEach((filterData) => {
      console.log(filterData);

      let filterObjectArray = {};
      let [filterType, filterValues] = filterData;

      if (typeof filterValues === "string") {
        filterValues = [filterValues];
      }

      filterValues.forEach((value) => {
        filterObjectArray[value] = value;
      });
      if (
        filterType === "duration" ||
        filterType === "budget" ||
        filterType === "startDate"
      ) {
        tempFilter[filterType] = filterValues;
      } else {
        tempFilter[filterType] = filterObjectArray;
      }
    });

    if (Object.entries(tempFilter).length > 0) {
      setFilterParams(tempFilter);
    }
    return () => {};
  }, [router.asPath]);

  const { data, error } = useSWR(`/api/admin/whitelist`, fetcher);

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

  // when the filter params change a new URL is created
  useEffect(() => {
    createURL(filterParams);
  }, [filterParams]);

  // push to the new URL with the new query included
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
      pathname: "/admin/whitelist",
      query: urlQuery,
    });

    return () => {};
  }, [query]);

  // sort function for the bounty list
  function compare(a, b, sortParams) {
    const options = {
      "Applied on - new to old": "descending",
      "Applied on - old to new": "ascending",
    };
    let sortName;
    if (sortParams.includes("Applied")) {
      sortName = "applied_on";
    }

    if (options[sortParams] === "ascending") {
      if (a[sortName] < b[sortName]) {
        return -1;
      }
      if (a[sortName] > b[sortName]) {
        return 1;
      }
      return 0;
    } else if (options[sortParams] === "descending") {
      if (a[sortName] > b[sortName]) {
        return -1;
      }
      if (a[sortName] < b[sortName]) {
        return 1;
      }
      return 0;
    }
  }
  return (
    <Flex flexDir={"row"} pos={"absolute"} top={0} width="100%" zIndex={-1}>
      <FilterInputs
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      />
      <VStack
        paddingTop={"90px"}
        height={"100vh"}
        width={"100%"}
        background={
          "linear-gradient(65.14deg, #0F2922 10.35%, #1A232A 76.62%);"
        }
      >
        <SortApplicants
          contracts={data}
          onChange={(val) => setSortParams(val)}
        />
        <ApplicantList
          whitelistApplicants={data}
          error={error}
          sortParams={sortParams}
          compare={compare}
        />
      </VStack>
    </Flex>
  );
};

export default whitelist;
