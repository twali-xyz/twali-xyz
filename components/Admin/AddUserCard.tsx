import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useReducer, useState } from "react";
import { mutate } from "swr";
import whitelistReducer, { initialState } from "../../context/WhitelistReducer";
import { WhitelistInfo } from "../../utils/interfaces";

export const AddUserCard = ({ onClose, ...props }) => {
  const [state, dispatch] = useReducer(whitelistReducer, initialState);
  const [values, setValues] = useState<WhitelistInfo>({
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
      border={"1px"}
      padding={"32px"}
      background={"n6"}
      borderColor={"n3"}
      borderRadius={"8px"}
      mb={"8px !important"}
      height={"fit-content"}
      boxShadow="8px 8px 24px 0px #00000026"
      _hover={{ boxShadow: "8px 8px 32px 8px #00000026" }}
    >
      <VStack
        height={"100%"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        <HStack width={"100%"} justifyContent={"space-between"}>
          <VStack alignItems={"baseline"} maxW={"475px"}>
            <FormControl>
              <HStack>
                <FormLabel width={"70px"} marginRight={"0 !important"}>
                  Name:
                </FormLabel>
                <Input
                  width={"39%"}
                  name="firstName"
                  _placeholder={{ color: "n3" }}
                  placeholder={"first"}
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  width={"39%"}
                  name="lastName"
                  _placeholder={{ color: "n3" }}
                  placeholder={"last"}
                  onChange={(e) => handleChange(e)}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel width={"70px"} marginRight={"0 !important"}>
                  Email:
                </FormLabel>
                <Input
                  width={"80%"}
                  name="email"
                  _placeholder={{ color: "n3" }}
                  placeholder={"example@twali.xyz"}
                  onChange={(e) => handleChange(e)}
                  type={"email"}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel width={"70px"} marginRight={"0 !important"}>
                  Discord:
                </FormLabel>
                <Input
                  width={"80%"}
                  name="discord"
                  _placeholder={{ color: "n3" }}
                  placeholder={"username"}
                  onChange={(e) => handleChange(e)}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel width={"70px"} marginRight={"0 !important"}>
                  linkedIn:
                </FormLabel>
                <Input
                  width={"80%"}
                  name="linkedIn"
                  isTruncated
                  _placeholder={{ color: "n3" }}
                  placeholder={
                    "https://www.linkedin.com/in/cokie-hasiotis-9b666363/"
                  }
                  onChange={(e) => handleChange(e)}
                />
              </HStack>
            </FormControl>
          </VStack>
          <VStack
            alignSelf={"flex-start"}
            alignItems={"flex-start"}
            minW={"475px"}
          >
            <FormControl>
              <HStack>
                <FormLabel width={"70px"} marginRight={"0 !important"}>
                  Status:
                </FormLabel>
                <Select
                  name="status"
                  width={"80%"}
                  color={values.status ? "fresh" : "n3"}
                  placeholder={"select one"}
                >
                  <option value={"completed"}>completed</option>
                  <option value={"approved"}>approved</option>
                  <option value={"rejected"}>rejected</option>
                </Select>
              </HStack>
            </FormControl>

            <FormControl>
              <HStack>
                <FormLabel width={"70px"} marginRight={"0 !important"}>
                  Wallet:
                </FormLabel>
                <Input
                  width={"80%"}
                  name="userWallet"
                  isTruncated
                  placeholder={"0x54eb82e4ec25eb173e1668dd5ab0943904d87331"}
                  _placeholder={{ color: "n3" }}
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
