import React, { useState, createContext } from "react";
import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import CeramicClient from "@ceramicnetwork/http-client";
import { connect } from "../../utils/walletUtils";
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
  const [name, setName] = useState<String>("");
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

  return (
    <TwaliContext.Provider
      value={{
        name,
        setName,
        identity,
        endpoint,
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
      }}
    >
      {props.children}
    </TwaliContext.Provider>
  );
}
