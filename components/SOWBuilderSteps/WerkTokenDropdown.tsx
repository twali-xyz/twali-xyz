import {
    FormControl,
    Input,
    FormLabel,
    HStack,
    Img,
    Menu,
    MenuButton,
    Button,
    MenuItem,
    MenuList,
    Text,
  } from "@chakra-ui/react";
  import { ChevronDownIcon} from '@chakra-ui/icons'
  import React, { useState } from "react";
  import { tokenConstants } from "../../utils/tokenConstants";
  import { TokenPriceList } from '../../utils/coingeckoEndpoints';
  import { TokenState } from "../../context/TokenContext";
  import axios from 'axios'
  
  export const WerkTokenDropdown = () => {
    const { token, setToken, tokenIcon, tokenID, tokenAmount, setTokenAmount, calculatedUSD, setCalculatedUSD } = TokenState();

    const handleMenuSelection = (token) => {
        if (token !== 'Token') {
          setToken(token.symbol.toUpperCase())
        } else {
          setToken('Token');
        }
        console.log('token', token);
      }
  
  
      const handleAmountChange = (evt) => {
        axios.get(TokenPriceList(tokenID, 'usd')).then((response) => {
          console.log(evt.target.value);
          setTokenAmount(evt.target.value);
          console.log(tokenAmount);
          const value = +(Math.round(response.data[tokenID].usd*evt.target.value * 100) / 100).toFixed(2);
          console.log(value);
          setCalculatedUSD(value);
      }).catch((error) => {
          console.log(error)
      });
      }

    return (
        <>
        <FormControl p={2} id="werk-token">
        {/* <Text
        fontSize="xs"
        height={"20.5px"}
        fontWeight="400"
        color="red.500"
        visibility={errors.firstName ? "visible" : "hidden"}
        >
        {errors.firstName}
        </Text> */}
        <Menu 
        placement="bottom" 
        direction="rtl"
        >
        <MenuButton 
            paddingInlineEnd="2rem"
            maxWidth="100%"
            outline="2px solid transparent"
            outlineOffset="2px"
            objectPosition="relative"
            appearance="none"
            background="inherit"
            paddingBottom="1px"
            fontSize="16px"
            paddingInlineStart={4}
            border="1px solid"
            borderRadius="var(--twali-radii-md)"
            height="var(--twali-sizes-10)"
            borderColor="inherit"
            fontFamily="PP Telegraf light"
            textTransform="capitalize"
            textAlign="start"
            as={Button} rightIcon={ token === 'Token' ? <ChevronDownIcon 
            width="1.3rem" height="100%" 
            color={token === 'Token' ? "subtle !important" : 'fresh !important'}
            right="0.5rem"
            position="absolute"
            fontSize="1.25rem"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            pointerEvents="none"
            top="50%"
            transform="translateY(-50%)"
            />: <Img
            borderRadius="full"
            backgroundColor="transparent"
            width="16px"
            src={tokenIcon}
            alt="add img"
            />}>
            {token}
        </MenuButton>
        <MenuList
            minWidth="9rem"
            marginTop="-0.2rem"
            background="rgb(4, 26, 25)"
        >
         <MenuItem minH='48px'
            onClick={() => handleMenuSelection('Token')}
            >
            <span className="werk-token-name">Token</span>
            </MenuItem>
           {
             tokenConstants.map((token, idx) => {
              return (
                <MenuItem minH='48px'
                key={`token-menu-item--${idx}`}
                onClick={() => handleMenuSelection(token)}
                >
                { token.icon ? (
                  <Img
                borderRadius="full"
                backgroundColor="transparent"
                width="16px"
                src={token.icon}
                alt="add img"
                />
                ): null
                }
                <span className="werk-token-name">{token.symbol.toUpperCase()}</span>
                </MenuItem>
              );
             })                             
            }
        </MenuList>
        </Menu>
        </FormControl>
        {/* </HStack> */}
        <FormControl p={2} id="werk-amount">
        <FormLabel
        fontSize={"16px"}
        lineHeight={"24px"}
        fontWeight={"400"}
        fontFamily={"PP Telegraf"}
        >
        Amount
        </FormLabel>
        <HStack>
        <Input
            px={2}
            fontSize="16px"
            borderColor={"n3"}
            height={"40px"}
            borderRadius={"4px"}
            marginBottom={"4px"}
            marginRight="14px"
            required
            width="100px"
            // width="100%"
            // isInvalid={errors.firstName}
            errorBorderColor="red.300"
            placeholder="1.0"
            name="firstName"
            fontFamily={"PP Telegraf light"}
            _placeholder={{ color: "subtle" }}
            defaultValue={tokenAmount ? tokenAmount: ""}
            onChange={handleAmountChange}
            />
            <Text fontWeight="400" color="subtle" fontSize="3xl" fontFamily="GrandSlang">=</Text>
            <Text fontSize="sm" fontWeight="300" color="zing">${calculatedUSD}</Text>
            </HStack>
    </FormControl>
    </>
    );
  };
  