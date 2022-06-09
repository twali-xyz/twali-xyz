import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useReducer, useState } from "react";
import { mutate } from "swr";
import whitelistReducer, { initialState } from "../../context/WhitelistReducer";

export const AddUserCard = ({ onClose, ...props }) => {
  const [state, dispatch] = useReducer(whitelistReducer, initialState);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    discord: "",
    linkedIn: "",
    referredBy: "",
    applied_on: null,
    userWallet: "",
    status: "",
  });

  // reject/approve based on userWallet
  function handleCancel() {
    onClose();
  }
  function handleSave() {
    submitApplication();
  }

  function addUser(newState) {
    dispatch({
      type: "ADD_USER",
      payload: { ...newState },
    });
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setValues({
      ...values,
      [evt.target.name]: value,
    });
  }

  async function submitApplication() {
    // validate inputs
    // if inputs are missing, return user to step of first missing input
    await addUser({
      userWallet: values.userWallet.toLocaleLowerCase(),
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      linkedIn: values.linkedIn,
      discord: values.discord,
      referred_by: "",
      whitelistStatus: values.status,
      applied_on: Date.now(),
    });
    onClose();
  }

  useEffect(() => {
    if (!state.userWallet) return;

    const addUserToWhitelist = async (payload) => {
      await fetch(`/api/admin/addUser`, {
        method: "PUT",
        body: JSON.stringify({ payload }),
      });

      console.log("USER ADDED UP TO WHITELIST");
      mutate("/api/admin/retrieveWhitelist");
    };
    addUserToWhitelist(state);
  }, [state]);
  return (
    <Box
      {...props}
      width={"100%"}
      height={"fit-content"}
      background={"n6"}
      padding={"32px"}
      border={"1px"}
      borderRadius={"8px"}
      borderColor={"n3"}
      boxShadow="8px 8px 24px 0px #00000026"
      _hover={{ boxShadow: "8px 8px 32px 8px #00000026" }}
    >
      <VStack
        height={"100%"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        <HStack width={"100%"} justifyContent={"space-between"}>
          <VStack alignItems={"baseline"}>
            <FormControl>
              <HStack>
                <FormLabel width={"100px"}>Name:</FormLabel>
                <Input
                  width={"80%"}
                  name="firstName"
                  onChange={(e) => handleChange(e)}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel width={"100px"}>Email:</FormLabel>
                <Input
                  width={"80%"}
                  name="email"
                  onChange={(e) => handleChange(e)}
                  type={"email"}
                />
              </HStack>
            </FormControl>
            <HStack>
              <FormLabel width={"100px"}>Discord:</FormLabel>
              <Input
                width={"80%"}
                name="discord"
                onChange={(e) => handleChange(e)}
              />
            </HStack>
            <FormControl>
              <HStack>
                <FormLabel width={"100px"}>linkedIn:</FormLabel>
                <Input
                  width={"80%"}
                  name="linkedIn"
                  onChange={(e) => handleChange(e)}
                />
              </HStack>
            </FormControl>
          </VStack>
          <VStack alignSelf={"flex-start"} alignItems={"flex-start"}>
            <FormControl>
              <HStack>
                <FormLabel width={"100px"}>Status:</FormLabel>
                <Input
                  width={"80%"}
                  name="status"
                  onChange={(e) => handleChange(e)}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel width={"100px"}>Applied on:</FormLabel>
                <Input
                  width={"80%"}
                  name="applied_on"
                  onChange={(e) => handleChange(e)}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel width={"100px"}>Wallet:</FormLabel>
                <Input
                  width={"80%"}
                  name="userWallet"
                  onChange={(e) => handleChange(e)}
                />
              </HStack>
            </FormControl>
          </VStack>
        </HStack>

        <HStack alignSelf={"flex-end"}>
          <Button
            onClick={() => {
              handleCancel();
            }}
            variant={"secondary"}
          >
            cancel
          </Button>
          <Button
            onClick={() => {
              handleSave();
            }}
            variant={"primary"}
          >
            save
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
