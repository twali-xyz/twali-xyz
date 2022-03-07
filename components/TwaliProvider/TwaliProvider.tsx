import React, { useState, createContext, useEffect } from "react";
import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import CeramicClient from "@ceramicnetwork/http-client";
import { connect } from "../../utils/walletUtils";
import { request, gql } from "graphql-request";
import { IDX } from "@ceramicstudio/idx";
import { DID } from "dids";

export interface BasicProfile {
  name: string;
}

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
  twitter?: string;
  linkedIn?: string;
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

export const TwaliContext = createContext(undefined);

export default function TwaliProvider(props) {
  const endpoint = "https://ceramic-clay.3boxlabs.com";

  const [name, setName] = useState<String>();
  const [tempLogo, setTempLogo] = useState<any>();
  const [loaded, setLoaded] = useState(false);
  const [identity, setIdentity] = useState<Identity>();
  const [snapshotData, setSnapshotData] = useState<any>();
  const [profileData, setProfileData] = useState<ProfileData>();

  async function readProfile() {
    const address = await connect(); // first address in the array
    const ceramic = new CeramicClient(endpoint);
    const idx = new IDX({ ceramic });
    const threeIdConnect = new ThreeIdConnect();
    const authProvider = new EthereumAuthProvider(window.ethereum, address);
    await threeIdConnect.connect(authProvider);
    const provider = await threeIdConnect.getDidProvider();

    ceramic.did = new DID({
      provider: provider,
      resolver: {
        ...ThreeIdResolver.getResolver(ceramic),
      },
    });
    await ceramic.did.authenticate();

    try {
      // does not require signing to get user's public data
      const data: BasicProfile = await idx.get(
        "basicProfile",
        `${address}@eip155:1`
      );

      const profile: ProfileData = await TileDocument.deterministic(
        ceramic,
        { family: "user-profile-data" },
        { anchor: false, publish: false }
      );

      if (data.name) setName(data.name);
      if (profile) {
        setProfileData(profile);
        setIdentity(profile.content.identity);
      }

      setLoaded(true);
    } catch (err) {
      console.log("error: ", err);
      setLoaded(false);
    }
  }

  useEffect(() => {
    async function readProfile() {
      const address = await connect(); // first address in the array
      const ceramic = new CeramicClient(endpoint);
      const idx = new IDX({ ceramic });
      const threeIdConnect = new ThreeIdConnect();
      const authProvider = new EthereumAuthProvider(window.ethereum, address);
      await threeIdConnect.connect(authProvider);
      const provider = await threeIdConnect.getDidProvider();

      ceramic.did = new DID({
        provider: provider,
        resolver: {
          ...ThreeIdResolver.getResolver(ceramic),
        },
      });
      await ceramic.did.authenticate();

      try {
        // does not require signing to get user's public data
        const data: BasicProfile = await idx.get(
          "basicProfile",
          `${address}@eip155:1`
        );

        const profile: ProfileData = await TileDocument.deterministic(
          ceramic,
          { family: "user-profile-data" },
          { anchor: false, publish: false }
        );

        if (data.name) setName(data.name);
        if (profile) {
          setProfileData(profile);
          setIdentity(profile.content.identity);
        }
        setLoaded(true);
      } catch (err) {
        console.log("error: ", err);
        setLoaded(false);
      }

      const query = gql`
        query getSnapshotVotes($wallet: String!) {
          votes(where: { voter: $wallet }) {
            id
            space {
              id
              avatar
            }
          }
        }
      `;
      const walletVar = {
        wallet: address,
      };

      // Run GraphQL queries
      request("https://hub.snapshot.org/graphql", query, walletVar).then(
        (data) => {
          data.votes.find((v) => {
            if (v.space.avatar) {
              v.space.avatar = v.space.avatar.replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
              );
            }
          });
          getVoterSnapshotQueries(data, address);
        }
      );
    }

    async function getVoterSnapshotQueries(data, address) {
      let finalData: any = [];
      if (data) {
        data.votes.forEach((snapshot) => {
          let finalObj = {
            spaceID: "",
            totalVotes: 0,
            walletVotes: 0,
            voter: "",
            avatar: snapshot.space.avatar,
          };

          const variables = {
            spaceID: snapshot.space.id,
            wallet: address,
          };

          const query2 = gql`
            query getProposals($spaceID: String!) {
              proposals(where: { space: $spaceID }) {
                title
                scores
                scores_total
                votes
              }
            }
          `;
          request("https://hub.snapshot.org/graphql", query2, variables).then(
            (propData) => {
              let totalVotes = 0;
              propData.proposals.forEach((proposal) => {
                totalVotes += proposal.votes;
              });
              finalObj.totalVotes = totalVotes;
            }
          );

          const query3 = gql`
            query getVotes($spaceID: String!, $wallet: String!) {
              votes(where: { voter: $wallet, space: $spaceID }) {
                id
              }
            }
          `;

          request("https://hub.snapshot.org/graphql", query3, variables).then(
            (totals) => {
              finalObj.walletVotes = totals.votes.length;
              finalObj.voter = address;
            }
          );
          finalObj.spaceID = snapshot.space.id;
          finalData.push(finalObj);
        });
      }

      let resArr: any = [];

      finalData.forEach(function (item) {
        var i = resArr.findIndex((x) => x.spaceID == item.spaceID);
        if (i <= -1) {
          resArr.push(item);
        }
      });
      setSnapshotData(resArr);
    }

    readProfile();
  }, []);

  const handleUpdatedProfile = (profileData) => {
    setProfileData({ ...profileData });
    readProfile();
  };

  const handleUpdatedCompanyInfo = (profileData) => {
    setProfileData({ ...profileData });
    readProfile();
  };

  return (
    <TwaliContext.Provider
      value={{
        name,
        setName,
        identity,
        setIdentity,
        tempLogo,
        setTempLogo,
        loaded,
        setLoaded,
        snapshotData,
        setSnapshotData,
        readProfile,
        profileData,
        setProfileData,
        handleUpdatedCompanyInfo,
        handleUpdatedProfile,
      }}
    >
      {props.children}
    </TwaliContext.Provider>
  );
}
