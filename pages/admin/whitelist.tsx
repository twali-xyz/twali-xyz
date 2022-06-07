import { filter, Flex, VStack } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import useSWR, { mutate } from "swr";

import { ApplicantList } from "../../components/Admin/ApplicantList";
import { FilterInputs } from "../../components/Admin/FilterInputs";
import { SortApplicants } from "../../components/Admin/SortApplicants";
import whitelistReducer, { initialState } from "../../context/WhitelistReducer";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
const whitelist = () => {
  const [filterParams, setFilterParams] = useState();
  const [sortParams, setSortParams] = useState();
  const [query, setQuery] = useState();
  const [loadingWallet, setLoadingWallet] = useState(null);
  const [loadingIDX, setLoadingIDX] = useState(null);
  const { data, error } = useSWR(`/api/admin/retrieveWhitelist`, fetcher);

  const [state, dispatch] = useReducer(whitelistReducer, initialState);

  function handleApprove(payload) {
    setLoadingWallet(payload.userWallet);
    setWhitelistApproved(payload);
  }
  function handleReject(payload) {
    setLoadingWallet(payload.userWallet);
    setWhitelistRejected(payload);
  }

  function setWhitelistApproved(payload) {
    dispatch({
      type: "APPROVE_USER",
      payload: { ...payload },
    });
  }
  function setWhitelistRejected(payload) {
    dispatch({
      type: "REJECT_USER",
      payload: { ...payload },
    });
  }

  function setWhitelistPending(payload) {
    dispatch({
      type: "PENDING",
      payload: { ...payload },
    });
  }

  // useEffect hook to sync dispatching with backend
  useEffect(() => {
    const updateUserWhitelistStatus = async (payload) => {
      setLoadingWallet(state.userWallet);
      await fetch(`/api/admin/updateUser`, {
        method: "PUT",
        body: JSON.stringify({ payload }),
      });
      console.log(payload);

      await mutate("/api/admin/retrieveWhitelist");
      setLoadingWallet(null);
    };
    updateUserWhitelistStatus(state);
  }, [state]);

  // set the filterParams based on the URL query params
  // needed to set filters when user goes to marketplace from a URL that contains a query

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

  useEffect(() => {
    async () => {
      const info = await fetch(``);
    };
  }, [query]);

  return (
    <Flex flexDir={"row"} pos={"absolute"} top={0} width="100%" zIndex={-1}>
      <FilterInputs
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        setQuery={setQuery}
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
          setLoadingIDX={setLoadingIDX}
          loadingWallet={loadingWallet}
          handleApprove={handleApprove}
          handleReject={handleReject}
        />
      </VStack>
    </Flex>
  );
};

export default whitelist;
