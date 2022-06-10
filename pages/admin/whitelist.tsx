import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useReducer, useState } from "react";
import { mutate } from "swr";
import { AddUserCard } from "../../components/Admin/AddUserCard";
import { ApplicantList } from "../../components/Admin/ApplicantList";
import { FilterInputs } from "../../components/Admin/FilterInputs";
import { SortApplicants } from "../../components/Admin/SortApplicants";
import whitelistReducer, { initialState } from "../../context/WhitelistReducer";
import { useWhitelist } from "../../hooks/useWhitelist";
import { useWhitelistFilter } from "../../hooks/useWhitelistFilter";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import HeaderNav from "../../components/HeaderNav/HeaderNav";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
const whitelist = () => {
  const [filterParams, setFilterParams] = useState();
  const [sortParams, setSortParams] = useState();
  const [query, setQuery] = useState();
  const [loadingWallet, setLoadingWallet] = useState(null);
  const [loadingIDX, setLoadingIDX] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: accountData } = useAccount();

  const { data, isError } = useWhitelist(accountData?.address);
  const {
    data: filteredData,
    isLoading,
    isError: err,
  } = useWhitelistFilter(query);
  const [state, dispatch] = useReducer(whitelistReducer, initialState);

  async function handleApprove(payload) {
    setLoadingWallet(payload.userWallet);
    setWhitelistApproved(payload);
  }
  async function handleReject(payload) {
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

      if (query) {
        await mutate("/api/admin/filterWhitelist/" + query);
      } else {
        await mutate("/api/admin/retrieveWhitelist");
      }
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

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (!accountData)
    return (
      <Flex
        width={"100%"}
        height={"100vh"}
        justify={"center"}
        alignItems={"center"}
      >
        {accountData && `Connected to ${accountData?.address}`}
        <Button size={"lg"} variant={"primary"} onClick={() => connect()}>
          Connect Wallet
        </Button>
        <br />
      </Flex>
    );

  if (!data) {
    return (
      <>
        <Flex
          width={"100%"}
          height={"100vh"}
          justify={"center"}
          alignItems={"center"}
        >
          <Text>USER NOT AUTHORIZED</Text>
        </Flex>
      </>
    );
  }
  return (
    <>
      <HeaderNav userWallet={accountData.address} />
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
          <HStack
            width={"100%"}
            justify={"space-between"}
            paddingRight={"48px"}
          >
            <SortApplicants
              contracts={filteredData || data}
              onChange={(val) => setSortParams(val)}
            />
            <Button variant={"primary"} onClick={onOpen}>
              Add User
            </Button>
          </HStack>
          <Box
            overflowY={"scroll"}
            scrollBehavior={"smooth"}
            height={"100%"}
            width={"100%"}
            padding={"0px 48px"}
            marginTop={"32px !important"}
          >
            {isOpen ? <AddUserCard onClose={onClose} /> : null}
            <ApplicantList
              whitelistApplicants={filteredData || data}
              error={isError}
              sortParams={sortParams}
              compare={compare}
              setLoadingIDX={setLoadingIDX}
              loadingWallet={loadingWallet}
              handleApprove={handleApprove}
              handleReject={handleReject}
            />
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export default whitelist;
