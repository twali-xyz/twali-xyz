import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  Input,
  Select,
} from "@chakra-ui/react";

import { useState } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { connect } from "../../utils/walletUtils";
import router from "next/router";

import CeramicClient from "@ceramicnetwork/http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";

import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { DID } from "dids";
import { IDX } from "@ceramicstudio/idx";
import { TileDocument } from "@ceramicnetwork/stream-tile";

// 3box test nodes with read/write access on ceramic clay testnet
// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

export interface ProfileData {
  content: {
    identity: Identity;
    accType: string;
  };
}

export interface Identity {
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  bio: string;
  twitterUsrName?: string;
  linkedInUsrName?: string;
  website?: string;
  businessName: string;
  businessType: string;
  businessLocation: string;
  currTitle: string;
  currLocation?: string;
  funcExpertise: string;
  industryExpertise: string;
  companyInfo?: CompanyInfo[];
}

export interface BasicProfile {
  name: string;
}
export interface Profile {
  identity: Identity;
  name: string;
  accType: string;
}

export interface CompanyInfo {
  companyName: string;
  companyTitle: string;
  companyImg: any;
  companyStart: Date;
  companyEnd: Date;
  companyFunc: string;
  companyIndustry: string;
}
export default function merchantProfileStep({ handleChange, values, errors }) {
  return (
    <form style={{ alignSelf: "center" }}>
      <Box
        h="100%"
        w="xl"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
      >
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <FormControl p={4} id="business-name" isRequired>
              <FormLabel>Business legal name</FormLabel>
              <Input
                required
                isInvalid={errors.businessName}
                errorBorderColor="red.300"
                value={values.businessName || ""}
                placeholder="Business legal name"
                name="businessName"
                onChange={handleChange}
              />
              {errors.businessName && (
                <Text fontSize="xs" fontWeight="400" color="red.500">
                  {errors.businessName}
                </Text>
              )}
              <FormHelperText>
                If you don't have a business name, please use your legal name
              </FormHelperText>
            </FormControl>
            <FormControl p={4} id="business-type" isRequired>
              <FormLabel>Business type</FormLabel>
              <Select
                placeholder="Select business type"
                name="businessType"
                onChange={handleChange}
              >
                <option>Sole proprietorship</option>
                <option>Partnership</option>
                <option>Corporation</option>
              </Select>
              {/* {errors.businessType && (
                                <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.businessType}</Text>
                              )} */}
            </FormControl>
            <FormControl p={4} id="business-location" isRequired>
              <FormLabel>Business location</FormLabel>
              <Select
                placeholder="Select business location"
                name="businessLocation"
                onChange={handleChange}
              >
                <option>United States</option>
                <option>Canada</option>
                <option>India</option>
              </Select>
              {/* {errors.businessLocation && (
                                <Text fontSize='xs' fontWeight='400' color='red.500'>{errors.businessType}</Text>
                              )} */}
            </FormControl>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
