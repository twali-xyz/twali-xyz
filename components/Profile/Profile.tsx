import { ProfileSnapshots } from "./ProfileSnapshots";
import { ProfileExperience } from "./ProfileExperience";
import { ProfileSideBar } from "./ProfileSideBar";
import { ProfileHeader } from "./ProfileHeader";
import {
  Box,
  Img,
  VStack,
  HStack,
  Stack,
  Text,
  useDisclosure,
  IconButton,
  Container,
  Flex,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { connect } from "../../utils/walletUtils";

import CeramicClient from "@ceramicnetwork/http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";

import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { DID } from "dids";
import { IDX } from "@ceramicstudio/idx";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import { request, gql } from "graphql-request";
import CompanyModal from "./CompanyModal/CompanyModal";
import useSWR from "swr";
import UserPermissionsProvider from "../UserPermissionsProvider/UserPermissionsProvider";
import UserPermissionsRestricted from "../UserPermissionsProvider/UserPermissionsRestricted";
import { fetchPermission } from "../../utils/profileUtils";
import LoginPage from "../../pages/login";
import HeaderNav from "../HeaderNav/HeaderNav";

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

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData>();
  const [name, setName] = useState("");
  const {
    isOpen: isProfileModalOpen,
    onOpen: onProfileModalOpen,
    onClose: onProfileModalClose,
  } = useDisclosure();
  const {
    isOpen: isExpModalOpen,
    onOpen: onExpModalOpen,
    onClose: onExpModalClose,
  } = useDisclosure();
  const {
    isOpen: isSnapshotModalOpen,
    onOpen: onSnapshotModalOpen,
    onClose: onSnapshotModalClose,
  } = useDisclosure();
  const {
    isOpen: isCompanyModalOpen,
    onOpen: onCompanyModalOpen,
    onClose: onCompanyModalClose,
  } = useDisclosure();
  const [loaded, setLoaded] = useState(false);
  const [snapshotData, setSnapshotData] = useState<any>();
  const [currentSnapshot, setCurrentSnapshot] = useState();
  const [currCompany, setCurrCompany] = useState(0);

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
  function createWorkElements(number) {
    var elements = [];
    let totalLen = profileData.content.identity.companyInfo
      ? profileData.content.identity.companyInfo.length
      : 0;
    for (let i = 0; i < number; i++) {
      if (
        profileData.content.identity.companyInfo &&
        i < totalLen &&
        profileData.content.identity.companyInfo[i].companyName
      ) {
        elements.push(
          <GetCompany
            key={`${i}--company-info`}
            company={profileData.content.identity.companyInfo[i]}
            companyName={
              profileData.content.identity.companyInfo[i].companyName
            }
            currCompany={i}
            setCurrCompany={setCurrCompany}
            onCompanyModalOpen={onCompanyModalOpen}
          />
        );
      } else {
        elements.push(
          <UserPermissionsRestricted to="edit" key={`${i}--empty-company-exp`}>
            <Img
              borderRadius="full"
              style={{ cursor: "pointer" }}
              backgroundColor="transparent"
              width="80px"
              src="twali-assets/plusicon.png"
              alt="add img"
              onClick={() => {
                setCurrCompany(i);
                onCompanyModalOpen();
              }}
            />
          </UserPermissionsRestricted>
        );
      }
    }
    return elements;
  }
  const viewCompany = (
    <CompanyModal
      isOpen={isCompanyModalOpen}
      onClose={onCompanyModalClose}
      currCompany={currCompany}
      profileData={profileData}
      setProfileData={setProfileData}
      userPermission="view"
      handleUpdatedCompanyInfo={handleUpdatedCompanyInfo}
    />
  );

  return (
    <>
      {!loaded ? (
        <LoginPage loaded={!loaded} />
      ) : (
        profileData &&
        profileData.content &&
        profileData.content.accType &&
        profileData.content.identity && (
          <>
            <HeaderNav whichPage="profile" />
            <Container
              maxW="100%"
              p={0}
              marginTop={"0 !important"}
              backgroundColor={"#0A1313"}
            >
              <UserPermissionsProvider
                fetchPermission={fetchPermission(
                  profileData.content.identity.displayName
                )}
              >
                <ProfileHeader
                  displayName={profileData.content.identity.displayName}
                />
                <Flex
                  w="full"
                  justifyContent={"space-around"}
                  px={["0", "0", "0", "2%", "3%"]}
                >
                  <ProfileSideBar
                    onExpModalOpen={onExpModalOpen}
                    isExpModalOpen={isExpModalOpen}
                    onExpModalClose={onExpModalClose}
                    profileData={profileData}
                    setProfileData={setProfileData}
                    handleUpdatedProfile={handleUpdatedProfile}
                  />
                  <Box alignSelf="flex-start" w="full" overflow="hidden">
                    {/* social media URLs */}
                    <VStack pt={"60px"} pl={"12.5%"}>
                      <ProfileSnapshots
                        snapshotData={snapshotData}
                        setCurrentSnapshot={setCurrentSnapshot}
                        onSnapshotModalOpen={onSnapshotModalOpen}
                        isSnapshotModalOpen={isSnapshotModalOpen}
                        onSnapshotModalClose={onSnapshotModalClose}
                        currentSnapshot={currentSnapshot}
                      />
                      <ProfileExperience
                        createWorkElements={createWorkElements}
                        viewCompany={viewCompany}
                        isCompanyModalOpen={isCompanyModalOpen}
                        onCompanyModalClose={onCompanyModalClose}
                        currCompany={currCompany}
                        profileData={profileData}
                        setProfileData={setProfileData}
                        handleUpdatedCompanyInfo={handleUpdatedCompanyInfo}
                      />
                      {/* <Box alignSelf="flex-start" w="full" overflow='hidden'>
                            <Text pt={8} pb={4} fontSize='xl'>Book a session with {profileData.content.identity.firstName}</Text>
                            <Button size='md' colorScheme='teal'>Book</Button>
                        </Box> */}
                    </VStack>
                  </Box>
                  <Box
                    marginTop={8}
                    w="150px"
                    alignSelf="flex-start"
                    overflow="hidden"
                  >
                    <UserPermissionsRestricted to="edit">
                      <IconButton
                        onClick={onProfileModalOpen}
                        alignSelf="flex-end"
                        variant="ghost"
                        aria-label="Update experience"
                        icon={
                          <FontAwesomeIcon size="sm" icon={["fas", "edit"]} />
                        }
                      />
                      <EditProfileModal
                        isOpen={isProfileModalOpen}
                        onClose={onProfileModalClose}
                        profileData={profileData}
                        setProfileData={setProfileData}
                        handleUpdatedProfile={handleUpdatedProfile}
                      />
                    </UserPermissionsRestricted>
                  </Box>
                </Flex>
              </UserPermissionsProvider>
              <Box height={"80px"} borderTop={"1px solid #587070"}></Box>
            </Container>
          </>
        )
      )}
    </>
  );
};
const GetCompany = (props) => {
  return (
    <>
      {props.company?.logo?.message?.logo ? (
        <Box
          w="80px"
          height="80px"
          display="flex"
          borderRadius="full"
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgb(222,222,222)"
          overflow="hidden"
          p={4}
          key={`${props.companyName}--${props.currCompany}--box`}
        >
          <UserPermissionsRestricted to="view">
            <Img
              backgroundColor="rgb(222, 222, 0)"
              backgroundImage={"twali-assets/bannerimage.png"}
              bgSize={"contain"}
              style={{ cursor: "pointer" }}
              key={`${props.companyName}--${props.currCompany}`}
              alignSelf="center"
              src={props.company.logo.message.logo}
              alt={props.companyName}
              onClick={() => {
                props.setCurrCompany(props.currCompany);
                props.onCompanyModalOpen();
              }}
            />
          </UserPermissionsRestricted>
          <UserPermissionsRestricted to="edit">
            <Img
              backgroundColor="rgb(222, 222, 222)"
              style={{ cursor: "pointer" }}
              key={`${props.companyName}--${props.currCompany}`}
              alignSelf="center"
              src={props.company.logo.message.logo}
              alt={props.companyName}
              onMouseEnter={(e) => (e.currentTarget.src = "edit.svg")}
              onMouseLeave={(e) =>
                (e.currentTarget.src = props.company.logo.message.logo)
              }
              onClick={() => {
                props.setCurrCompany(props.currCompany);
                props.onCompanyModalOpen();
              }}
            />
          </UserPermissionsRestricted>
        </Box>
      ) : props ? (
        <Box
          w="80px"
          height="80px"
          borderRadius="full"
          backgroundColor="rgb(222, 222, 222)"
          bgGradient={
            "linear-gradient(136.3deg, #0DD5D1 -3.88%, #9350B3 84.78%)"
          }
          overflow="hidden"
          p={4}
          key={`${props.companyName}--${props.currCompany}--box`}
          onMouseEnter={(e) => {
            let addImg = e.currentTarget.children[0] as HTMLElement;
            let compLogo = e.currentTarget.children[1] as HTMLElement;
            addImg.style.display = "flex";
            compLogo.style.display = "none";
          }}
          onMouseLeave={(e) => {
            let addImg = e.currentTarget.children[0] as HTMLElement;
            let compLogo = e.currentTarget.children[1] as HTMLElement;
            addImg.style.display = "none";
            compLogo.style.display = "flex";
          }}
          onClick={() => {
            props.setCurrCompany(props.currCompany);
            props.onCompanyModalOpen();
          }}
        >
          <Img
            backgroundColor="rgb(222, 222, 222)"
            bgGradient={
              "linear-gradient(136.3deg, #0DD5D1 -3.88%, #9350B3 84.78%)"
            }
            borderRadius="full"
            style={{ cursor: "pointer" }}
            key={`${props.companyName}--${props.currCompany}`}
            alignSelf="center"
            src="edit.svg"
            alt="edit stock img"
            display={"none"}
          />
          <Text
            w={"full"}
            h={"full"}
            fontSize="4xl"
            fontWeight="400"
            display={"flex"}
            color={"#F9FFF2"}
            justifyContent={"center"}
            alignItems={"center"}
            fontFamily={"GrandSlang"}
          >
            {props.companyName[0].toUpperCase()}
          </Text>
        </Box>
      ) : (
        <>
          <Img
            key={`${props.currCompany}--empty-company-exp`}
            borderRadius="full"
            style={{ cursor: "pointer" }}
            backgroundColor="transparent"
            width="80px"
            src="twali-assets/plusicon.png"
            alt="add img"
            onClick={() => {
              props.setCurrCompany(props.currCompany);
              props.onCompanyModalOpen();
            }}
          />
        </>
      )}
    </>
  );
};

export default ProfilePage;
