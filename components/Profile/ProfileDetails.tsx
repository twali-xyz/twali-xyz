import { ProfileSnapshots } from "./ProfileSnapshots";
import { ProfileExperience } from "./ProfileWorkExperience";
import { ProfileSideBar } from "./ProfileSideBar";
import { ProfileHeader } from "./ProfileHeader";
import {
  Box,
  Img,
  VStack,
  useDisclosure,
  Flex,
  Container,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "../../utils/walletUtils";
import { request, gql } from "graphql-request";
import CompanyModal from "./CompanyModal/CompanyModal";
import UserPermissionsProvider from "../UserPermissionsProvider/UserPermissionsProvider";
import UserPermissionsRestricted from "../UserPermissionsProvider/UserPermissionsRestricted";
import { fetchPermission } from "../../utils/profileUtils";
import LoginPage from "../../pages/login";
import HeaderNav from "../HeaderNav/HeaderNav";
import { UserData } from "../../utils/interfaces";
import { GetCompany } from "./GetCompany";

const ProfileDetails = ({ user }) => {
  // Fallback for getStaticPaths, when fallback: true
  // Useful for an app that has a large number of static pages, and this prevents the build time from slowing down
  // More info in Nextjs docs here: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-true
  const router = useRouter();

  if (router.isFallback) {
    return <LoginPage loaded={router.isFallback} />;
  }

  const [userData, setUserData] = useState<UserData>();

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

  async function readProfile() {
    const address = await connect(); // first address in the array

    try {
      // does not require signing to get user's public data
      if (user) {
        setUserData(user);
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

      try {
        // does not require signing to get user's public data
        if (user && user.userWallet) {
          setUserData(user);
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

  const handleUpdatedProfile = (userData) => {
    setUserData({ ...userData });
    readProfile();
  };

  const handleUpdatedCompanyInfo = (userData) => {
    setUserData({ ...userData });
    readProfile();
  };
  function createWorkElements(number) {
    var elements = [];
    let totalLen = userData.companyInfo ? userData.companyInfo.length : 0;
    for (let i = 0; i < number; i++) {
      if (
        userData.companyInfo &&
        i < totalLen &&
        userData.companyInfo[i] &&
        userData.companyInfo[i].companyName
      ) {
        elements.push(
          <GetCompany
            key={`${i}--company-info`}
            company={userData.companyInfo[i]}
            companyName={userData.companyInfo[i].companyName}
            currCompany={i}
            setCurrCompany={setCurrCompany}
            onCompanyModalOpen={onCompanyModalOpen}
          />
        );
      } else {
        elements.push(
          <UserPermissionsRestricted
            to="edit"
            key={`${i}--empty-company-usr-permission`}
          >
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
      userData={userData}
      setUserData={setUserData}
      userPermission="view"
      handleUpdatedCompanyInfo={handleUpdatedCompanyInfo}
    />
  );

  return (
    <>
      {!loaded ? (
        <LoginPage loaded={!loaded} />
      ) : (
        userData &&
        userData.userName &&
        userData.userWallet && (
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
                  userData.userName,
                  loggedInUserAddress ? loggedInUserAddress : null
                )}
              >
                <ProfileHeader userName={userData.userName} />
                <Flex
                  w="full"
                  justifyContent={"space-around"}
                  margin={"auto"}
                  maxW={"1350px"}
                >
                  <ProfileSideBar
                    onExpModalOpen={onExpModalOpen}
                    isExpModalOpen={isExpModalOpen}
                    onExpModalClose={onExpModalClose}
                    userData={userData}
                    setUserData={setUserData}
                    handleUpdatedExperiences={handleUpdatedProfile}
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
                        userData={userData}
                        setUserData={setUserData}
                        handleUpdatedCompanyInfo={handleUpdatedCompanyInfo}
                      />
                    </VStack>
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
export default ProfileDetails;
