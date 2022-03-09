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
import CompanyModal from "./CompanyModal/CompanyModal";
import { useState, useEffect, useContext } from "react";
import SnapshotModal from "./SnapshotModal/SnapshotModal";
import { fetchPermission } from "../../utils/profileUtils";
import {
  BasicProfile,
  ProfileData,
  TwaliContext,
} from "../TwaliProvider/TwaliProvider";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import EditExperienceModal from "./EditExperienceModal/EditExperienceModal";
import UserPermissionsProvider from "../UserPermissionsProvider/UserPermissionsProvider";
import UserPermissionsRestricted from "../UserPermissionsProvider/UserPermissionsRestricted";
import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import CeramicClient from "@ceramicnetwork/http-client";
import { connect } from "../../utils/walletUtils";
import { request, gql } from "graphql-request";
import { IDX } from "@ceramicstudio/idx";
import { DID } from "dids";
const ProfilePage = () => {
  const {
    name,
    setName,
    loaded,
    endpoint,
    identity,
    setTempLogo,
    setIdentity,
    readProfile,
    setLoaded,
    snapshotData,
    profileData,
    setProfileData,
    setSnapshotData,
  } = useContext(TwaliContext);

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

  const [currentSnapshot, setCurrentSnapshot] = useState();
  const [currCompany, setCurrCompany] = useState(0);

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
    let totalLen = identity.companyInfo ? identity.companyInfo.length : 0;
    for (let i = 0; i < number; i++) {
      if (
        identity.companyInfo &&
        i < totalLen &&
        identity.companyInfo[i].companyName
      ) {
        elements.push(
          <GetCompany
            key={`${i}--company-info`}
            company={identity.companyInfo[i]}
            companyName={identity.companyInfo[i].companyName}
            currCompany={i}
            setCurrCompany={setCurrCompany}
            setTempLogo={setTempLogo}
            onCompanyModalOpen={onCompanyModalOpen}
          />
        );
      } else {
        elements.push(
          <UserPermissionsRestricted to="edit">
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
                setTempLogo(false);
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
      handleUpdatedCompanyInfo={handleUpdatedCompanyInfo}
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
        name &&
        profileData.content &&
        profileData.content.accType &&
        identity && (
          <>
            <UserPermissionsProvider
              fetchPermission={fetchPermission(identity.displayName)}
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
                      onClick={() => {
                        onExpModalOpen();
                        setTempLogo(false);
                      }}
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
                      handleUpdatedExperiences={handleUpdatedProfile}
                    />
                  </UserPermissionsRestricted>
                  {identity.displayName && (
                    <Text fontSize="xl">@{identity.displayName}</Text>
                  )}
                  {identity.email && (
                    <Text fontSize="md">{identity.email}</Text>
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
                    {profileData && identity && identity.funcExpertise && (
                      <Text fontSize="md">{identity.funcExpertise}</Text>
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
                    {profileData && identity && identity.industryExpertise && (
                      <Text fontSize="md">{identity.industryExpertise}</Text>
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
                        {name + ", " + profileData.content.accType}
                      </Text>
                      <FontAwesomeIcon size="lg" icon={["fas", "map-pin"]} />

                      {profileData.content.identity.currLocation && (
                        <Text fontSize="md">
                          {profileData.content.identity.currLocation}
                        </Text>
                      )}
                    </HStack>
                    <Text fontSize="md">
                      {profileData.content.identity.currTitle}
                    </Text>
                    {profileData.content.identity.bio && (
                      <Text fontSize="md">
                        {profileData.content.identity.bio}
                      </Text>
                    )}
                    ){/* social media URLs */}
                    <HStack width={"6rem"} justifyContent={"space-between"}>
                      {profileData.content.identity.linkedIn && (
                        <Link
                          href={profileData.content.identity.linkedIn}
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

                      {profileData.content.identity.twitter && (
                        <Link
                          href={profileData.content.identity.twitter}
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
                            handleUpdatedCompanyInfo={handleUpdatedCompanyInfo}
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
                            <Text pt={8} pb={4} fontSize='xl'>Book a session with {identity.firstName}</Text>
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
                      handleUpdatedProfile={handleUpdatedProfile}
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

const GetCompany = (props) => {
  return (
    <>
      {props.company?.logo?.message ? (
        <Box
          w="100px"
          height="100px"
          display="flex"
          borderRadius="full"
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgb(222, 222, 222)"
          overflow="hidden"
          p={4}
          key={`${props.companyName}--${props.currCompany}--box`}
        >
          <UserPermissionsRestricted to="view">
            <Img
              backgroundColor="rgb(222, 222, 222)"
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
              alt="fox stock img"
              onMouseEnter={(e) => (e.currentTarget.src = "edit.svg")}
              onMouseLeave={(e) =>
                (e.currentTarget.src = props.company.logo.message.logo)
              }
              onClick={() => {
                props.setCurrCompany(props.currCompany);
                props.onCompanyModalOpen();
                props.setTempLogo(false);
              }}
            />
          </UserPermissionsRestricted>
        </Box>
      ) : props ? (
        <Box
          w="100px"
          height="100px"
          borderRadius="full"
          backgroundColor="rgb(222, 222, 222)"
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
            props.setTempLogo(false);
          }}
        >
          <Img
            backgroundColor="rgb(222, 222, 222)"
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
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            fontSize="4xl"
            fontWeight="800"
            color="blue.700"
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
            backgroundColor="lightgray"
            width="100px"
            src="add.svg"
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
