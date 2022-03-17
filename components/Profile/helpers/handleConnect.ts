import CeramicClient from "@ceramicnetwork/http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { TileDocument } from "@ceramicnetwork/stream-tile";

import WalletConnectProvider from "@walletconnect/web3-provider";

import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { DID } from "dids";
import { IDX } from "@ceramicstudio/idx";

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
    functionalExpertise: any[];
    industryExpertise: any[];
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

// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

export function handleConnect(setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>, setName: React.Dispatch<React.SetStateAction<string>>, setEmail: React.Dispatch<React.SetStateAction<string>>, setAccType: React.Dispatch<React.SetStateAction<string>>, router, setLoaded: React.Dispatch<React.SetStateAction<boolean>>,  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>) {
    return async () => {
      const web3Modal = new Web3Modal({
        disableInjectedProvider: false,
        network: "rinkeby",
        cacheProvider: false,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: "https://eth-rinkeby.alchemyapi.io/v2/QtLM8rW9nB6DobDu8KQx-7fYMS2rBlky",
              },
            },
          },
        },
      });
      const provider = await web3Modal.connect();
      console.log(provider);
      const web3 = new Web3(provider);
      console.log(web3);
      const accounts = await web3.eth.getAccounts();
      const currAccount = accounts[0];
      console.log("CURRACOUNT: " , currAccount);
      
      const ceramic = new CeramicClient(endpoint);
      const idx = new IDX({ ceramic });
      setIsSubmitted(true);
      try {
        const threeIdConnect = new ThreeIdConnect();
        const ethProvider = new EthereumAuthProvider(
          window.ethereum,
          currAccount
        );
        await threeIdConnect.connect(ethProvider);
  
        const did = new DID({
          provider: threeIdConnect.getDidProvider(),
          resolver: {
            ...ThreeIdResolver.getResolver(ceramic),
          },
        });
  
        ceramic.setDID(did);
        await ceramic.did.authenticate();
  
        // does not require signing to get user's public data
        const data: BasicProfile = await idx.get(
          "basicProfile",
          `${currAccount}@eip155:1`
        );
        console.log("data: ", data);
  
        const profileData: ProfileData = await TileDocument.deterministic(
          ceramic,
          { family: "user-profile-data" },
          { anchor: false, publish: false }
        );
  
        console.log("profileData: ", profileData.content);
        let identity = profileData.content.identity;
        let profileAccType = profileData.content.accType;
  
        if (data.name && identity.email && profileAccType) {
          setName(data.name);
          setEmail(identity.email);
          setAccType(profileAccType);
          setIsSubmitted(false);
          router.push("/profile");
        } else {
          console.log("No profile, pls create one...");
          router.push("/steps");
        }
      } catch (err) {
        console.log("error: ", err);
        router.push("/steps");
        setLoaded(true);
      }
      try {
          const profile: ProfileData = await TileDocument.deterministic(
            ceramic,
            { family: "user-profile-data" },
            { anchor: false, publish: false }
          );
  
          if (profile) {
            setProfileData(profile);
          }
          setLoaded(true);
        } catch (err) {
          console.log("error: ", err);
          setLoaded(false);
        }
    };

  }
  
  