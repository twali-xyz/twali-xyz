import {
  Box,
  Img,
  VStack,
  HStack,
  Stack,
  Text,
  CircularProgress,
  useDisclosure,
  IconButton,
  Link,
  Image,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "../../utils/walletUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import EditExperienceModal from "./EditExperienceModal/EditExperienceModal";
import { request, gql } from "graphql-request";
import SnapshotModal from "./SnapshotModal/SnapshotModal";
import CompanyModal from "./CompanyModal/CompanyModal";
import useSWR from "swr";
import UserPermissionsProvider from "../UserPermissionsProvider/UserPermissionsProvider";
import UserPermissionsRestricted from "../UserPermissionsProvider/UserPermissionsRestricted";
import { fetchPermission, 
  // convertFromDB 
} from "../../utils/profileUtils";


export interface UserData {
  userName: string;
  userWallet: string;
  accType: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
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

export interface CompanyInfo {
  companyName: string;
  companyTitle: string;
  companyImg: any;
  companyStart: Date;
  companyEnd: Date;
  companyFunc: string;
  companyIndustry: string;
}

const ProfileDetails = ({ user }) => {
  // Fallback for getStaticPaths, when fallback: true
  // Useful for an app that has a large number of static pages, and this prevents the build time from slowing down
  // More info in Nextjs docs here: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-true
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading data</div>;
  }

  const [profileData, setProfileData] = useState<UserData>();
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
  const [loggedInUserAddress, setLoggedInUserAddress] = useState("");
  const [currCompany, setCurrCompany] = useState(0);
  console.log(user);

  async function readProfile() {
    const address = await connect(); // first address in the array
    console.log('outside useEffect', address);

    try {
      // does not require signing to get user's public data
      if (user) {
        setProfileData(user);
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
      console.log('useEffect', address);

      try {
        // does not require signing to get user's public data
        if (user && user.userWallet) {
          // Unmarshalling company data from dynamodb and saving it to the current user state
          // const formattedData = await convertFromDB(user.companyInfo);
          user.companyInfo = user.companyInfo;
          console.log('user set', user);

          setProfileData(user);
          setLoaded(true);
          setupSnapshotQueries(user.userWallet);
        }

        if (address) {
          setLoggedInUserAddress(address);
        }

        } catch (err) {
        console.log("error: ", err);
        setLoaded(false);
      }
    }

    function setupSnapshotQueries(address) {
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

  function createWorkElements(number) {
    var elements = [];
    let totalLen = profileData.companyInfo
      ? profileData.companyInfo.length
      : 0;
    for (let i = 0; i < number; i++) {
      if (
        profileData.companyInfo &&
        i < totalLen && profileData.companyInfo[i] &&
        profileData.companyInfo[i].companyName
      ) {
        elements.push(
          <GetCompany
            key={`${profileData.companyInfo[i].companyName}-${i}--company`}
            companyName={
              profileData.companyInfo[i].companyName
            }
            currCompany={i}
            setCurrCompany={setCurrCompany}
            onCompanyModalOpen={onCompanyModalOpen}
          />
        );
      } else {
        elements.push(
          <UserPermissionsRestricted to="edit" key={`${i}--empty-company-usr-permission`}>
            <Img
              key={`${i}--empty-company-exp`}
              borderRadius="full"
              style={{ cursor: "pointer" }}
              backgroundColor="lightgray"
              width="100px"
              src="add.svg"
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
      userPermission="view"
      handleUpdatedCompanyInfo={setProfileData}
    />
  );

  return (
    <>
      {!loaded ? (
        <VStack alignSelf="center" spacing={8} pt={8}>
          <CircularProgress
            size="50px"
            thickness="8px"
            isIndeterminate
            color="#3C2E26"
          />
          <Text fontSize="2xl">Loading</Text>
        </VStack>
      ) : (
        profileData &&
        profileData.userName && profileData.userWallet && (
          <>
            <UserPermissionsProvider
              fetchPermission={fetchPermission(
                profileData.userName,
                loggedInUserAddress ? loggedInUserAddress : null
              )}
            >
              <Box
                w="full"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Img
                  objectFit="cover"
                  width="100%"
                  height="200px"
                  overflow="hidden"
                  src="https://i.pinimg.com/originals/92/4e/c3/924ec3d75761aa0e5b84e4031f718de6.jpg"
                  alt="aesthetic brown"
                />
              </Box>
              <HStack w="full" spacing={24}>
                <VStack
                  marginTop={0}
                  paddingTop={0}
                  align="flex-start"
                  spacing={6}
                >
                  <Box alignSelf="flex-start" overflow="hidden">
                    <Img
                      borderRadius="full"
                      width="500px"
                      src="fox-pfp.png"
                      alt="fox stock img"
                    />
                  </Box>
                  <UserPermissionsRestricted to="edit">
                    <IconButton
                      onClick={onExpModalOpen}
                      alignSelf="flex-end"
                      variant="ghost"
                      aria-label="Update experience"
                      icon={
                        <FontAwesomeIcon size="sm" icon={["fas", "edit"]} />
                      }
                    />
                    <EditExperienceModal
                      isOpen={isExpModalOpen}
                      onClose={onExpModalClose}
                      profileData={profileData}
                      handleUpdatedExperiences={setProfileData}
                    />
                  </UserPermissionsRestricted>
                  {profileData.userName && (
                    <Text fontSize="xl">
                      @{profileData.userName}
                    </Text>
                  )}
                  {profileData.email && (
                    <Text fontSize="md">
                      {profileData.email}
                    </Text>
                  )}
                  <Box
                    p={4}
                    ml={8}
                    borderWidth="1px"
                    color="rgb(0, 0, 0)"
                    borderRadius="lg"
                    overflow="hidden"
                    backgroundColor="rgb(222, 222, 222)"
                  >
                    {profileData &&
                      profileData.funcExpertise && (
                        <Text fontSize="md">
                          {profileData.funcExpertise}
                        </Text>
                      )}
                  </Box>
                  <Box
                    p={4}
                    ml={8}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    color="rgb(0, 0, 0)"
                    backgroundColor="rgb(222, 222, 222)"
                  >
                    {profileData &&
                      profileData.industryExpertise && (
                        <Text fontSize="md">
                          {profileData.industryExpertise}
                        </Text>
                      )}
                  </Box>
                </VStack>
                <Box
                  alignSelf="flex-start"
                  w="full"
                  pt={16}
                  pl={4}
                  overflow="hidden"
                >
                  <Stack spacing={6}>
                    <HStack>
                      <Text fontSize="xl">
                        {profileData.firstName + ' ' + profileData.lastName + ", " + profileData.accType}
                      </Text>
                      <FontAwesomeIcon size="lg" icon={["fas", "map-pin"]} />
                      {profileData.businessLocation && (
                        <Text fontSize="md">
                          {profileData.businessLocation}
                        </Text>
                      )}
                    </HStack>
                    <Text fontSize="md">
                      {profileData.currTitle}
                    </Text>
                    {profileData.bio && (
                      <Text fontSize="md">
                        {profileData.bio}
                      </Text>
                    )}
                    ){/* social media URLs */}
                    <HStack width={"6rem"} justifyContent={"space-between"}>
                      {profileData.linkedIn && (
                        <Link
                          href={profileData.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          width={"fit-content"}
                        >
                          <Image
                            src="LI-In-Bug.png"
                            height={"2rem"}
                            width={"auto"}
                          />
                        </Link>
                      )}
                      {profileData.twitter && (
                        <Link
                          href={profileData.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src="2021_Twitter_logo - blue.png"
                            height={"2rem"}
                            width={"auto"}
                          />
                        </Link>
                      )}
                    </HStack>
                    <VStack>
                      <Box alignSelf="flex-start" w="full" overflow="hidden">
                        <Text pb={8} fontSize="xl">
                          Work Experience
                        </Text>
                        <HStack spacing={4}>{createWorkElements(5)}</HStack>
                        <UserPermissionsRestricted
                          to="edit"
                          fallback={viewCompany}
                        >
                          <CompanyModal
                            isOpen={isCompanyModalOpen}
                            onClose={onCompanyModalClose}
                            currCompany={currCompany}
                            profileData={profileData}
                            handleUpdatedCompanyInfo={setProfileData}
                          />
                        </UserPermissionsRestricted>
                      </Box>
                      <Box alignSelf="flex-start" w="full" overflow="hidden">
                        <Text pt={8} pb={4} fontSize="xl">
                          Web3 Credentials
                        </Text>
                        {snapshotData ? (
                          <>
                            <HStack spacing={4}>
                              {snapshotData.map((vote) => (
                                <Img
                                  style={{ cursor: "pointer" }}
                                  key={vote.spaceID}
                                  borderRadius="full"
                                  width="100px"
                                  src={vote.avatar}
                                  alt="fox stock img"
                                  onClick={() => {
                                    setCurrentSnapshot(vote);
                                    onSnapshotModalOpen();
                                  }}
                                />
                              ))}
                            </HStack>
                            <SnapshotModal
                              isOpen={isSnapshotModalOpen}
                              onClose={onSnapshotModalClose}
                              snapshotData={currentSnapshot}
                            />
                          </>
                        ) : null}
                      </Box>
                      {/* <Box alignSelf="flex-start" w="full" overflow='hidden'>
                            <Text pt={8} pb={4} fontSize='xl'>Book a session with {profileData.content.identity.firstName}</Text>
                            <Button size='md' colorScheme='teal'>Book</Button>
                        </Box> */}
                    </VStack>
                  </Stack>
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
                      handleUpdatedProfile={setProfileData}
                    />
                  </UserPermissionsRestricted>
                </Box>
              </HStack>
            </UserPermissionsProvider>
          </>
        )
      )}
    </>
  );
};

// Client-side data fetching for Clearbit's NameToDomain API (on page load)
const GetCompany = (companyName) => {
  const fetcher = (companyDomain: string, ...args: Parameters<typeof fetch>) =>
    fetch(companyDomain).then((response) => response.json());
  let paramsObj = { params: companyName.companyName };
  let searchParams = new URLSearchParams(paramsObj);

  // Create a stable key for SWR
  searchParams.sort();
  const qs = searchParams.toString();

  const { data, error } = useSWR(`/api/cors?${qs}`, fetcher);
  console.log("DATA: ", data);

  return (
    <>
      {data && data.message && data.message.logo ? (
        <Box
          w="100px"
          height="100px"
          borderRadius="full"
          backgroundColor="rgb(222, 222, 222)"
          overflow="hidden"
          p={4}
          key={`${data.message.name}--${companyName.currCompany}--box`}
        >
          <UserPermissionsRestricted to="view">
            <Img
              backgroundColor="rgb(222, 222, 222)"
              style={{ cursor: "pointer" }}
              key={`${data.message.name}--${companyName.currCompany}`}
              alignSelf="center"
              src={data.message.logo}
              alt="fox stock img"
              onClick={() => {
                companyName.setCurrCompany(companyName.currCompany);
                companyName.onCompanyModalOpen();
              }}
            />
          </UserPermissionsRestricted>
          <UserPermissionsRestricted to="edit">
            <Img
              backgroundColor="rgb(222, 222, 222)"
              style={{ cursor: "pointer" }}
              key={`${data.message.name}--${companyName.currCompany}`}
              alignSelf="center"
              src={data.message.logo}
              alt="fox stock img"
              onMouseEnter={(e) => (e.currentTarget.src = "edit.svg")}
              onMouseLeave={(e) => (e.currentTarget.src = data.message.logo)}
              onClick={() => {
                companyName.setCurrCompany(companyName.currCompany);
                companyName.onCompanyModalOpen();
              }}
            />
          </UserPermissionsRestricted>
        </Box>
      ) : (
        <Img
          key={`${companyName.currCompany}--empty-company-exp`}
          borderRadius="full"
          style={{ cursor: "pointer" }}
          backgroundColor="lightgray"
          width="100px"
          src="add.svg"
          alt="add img"
          onClick={() => {
            companyName.setCurrCompany(companyName.currCompany);
            companyName.onCompanyModalOpen();
          }}
        />
      )}
    </>
  );
};

export default ProfileDetails;
