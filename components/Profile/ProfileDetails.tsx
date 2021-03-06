import { ProfileBadges } from "./Experience/ProfileBadges";
import { ProfileExperience } from "./Experience/ProfileWorkExperience";
import { ProfileDataLayout } from "./ProfileData/ProfileDataLayout";
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
import HeaderNav from "../HeaderNav/HeaderNav";
import { UserData } from "../../utils/interfaces";
import { GetCompany } from "./GetCompany";
import LoadingPage from "../../pages/loading";

const ProfileDetails = ({ user }) => {
  // Fallback for getStaticPaths, when fallback: true
  // Useful for an app that has a large number of static pages, and this prevents the build time from slowing down
  // More info in Nextjs docs here: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-true
  const router = useRouter();
  if (router.isFallback) {
    return <LoadingPage loaded={router.isFallback} />;
  }
  const [userData, setUserData] = useState<UserData>();

  const {
    isOpen: isExpModalOpen,
    onOpen: onExpModalOpen,
    onClose: onExpModalClose,
  } = useDisclosure();
  const {
    isOpen: isBadgesModalOpen,
    onOpen: onBadgesModalOpen,
    onClose: onBadgesModalClose,
  } = useDisclosure();
  const {
    isOpen: isCompanyModalOpen,
    onOpen: onCompanyModalOpen,
    onClose: onCompanyModalClose,
  } = useDisclosure();
  const [loaded, setLoaded] = useState(false);
  const [isConnectWalletBtn, setIsConnectWalletBtn] = useState(false);
  const [snapshotData, setSnapshotData] = useState<any>();
  const [poapsData, setPOAPsData] = useState<any>();
  const [currentBadge, setCurrentBadge] = useState();
  const [loggedInUserAddress, setLoggedInUserAddress] = useState("");
  const [currCompany, setCurrCompany] = useState(0);

  // Display or hide the connect wallet btn depending on a state change
  useEffect(() => {
    setIsConnectWalletBtn(isConnectWalletBtn);
  }, [isConnectWalletBtn]);

  useEffect(() => {
    async function readProfile() {
      try {
        if (router.query?.view != "public") {
          // does not require signing to get user's public data
          const address = await connect(); // first address in the array

          if (address) {
            setLoggedInUserAddress(address);
          }
        } else {
          setIsConnectWalletBtn(true);
        }
        // does not require signing to get user's public data
        if (user && user.userWallet) {
          setUserData(user);
          setLoaded(true);
          setupSnapshotQueries(user.userWallet);
          setupPOAPs(user.userWallet);
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

    function setupPOAPs(address) {
      fetch(`https://api.poap.xyz/actions/scan/${address}`)
        .then((res) => res.json())
        .then((data) => {
          setPOAPsData(data);
        });
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
    let totalLen = user.companyInfo ? user.companyInfo.length : 0;
    for (let i = 0; i < number; i++) {
      if (
        user.companyInfo &&
        i < totalLen &&
        user.companyInfo[i] &&
        user.companyInfo[i].companyName
      ) {
        elements.push(
          <GetCompany
            key={`${i}--company-info`}
            company={user.companyInfo[i]}
            companyName={user.companyInfo[i].companyName}
            currCompany={i}
            setCurrCompany={setCurrCompany}
            onCompanyModalOpen={onCompanyModalOpen}
          />
        );
      } else if (i === user.companyInfo.length) {
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
              marginLeft={"0px !important"}
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
    elements = elements.sort(function (date1, date2) {
      return (
        Number(new Date(date2.props.company?.companyStart)) -
        Number(new Date(date1.props.company?.companyStart))
      );
    });
    return elements;
  }
  const viewCompany = (
    <CompanyModal
      isOpen={isCompanyModalOpen}
      onClose={onCompanyModalClose}
      currCompany={currCompany}
      userPermission="view"
    />
  );

  return (
    <>
      {!loaded ? (
        <LoadingPage loaded={!loaded} />
      ) : (
        user &&
        user.userName &&
        user.userWallet && (
          <>
            <HeaderNav
              whichPage="profile"
              isConnectWalletBtn={isConnectWalletBtn}
              userPage={userData}
              userWallet={loggedInUserAddress}
              userName={userData.userName}
            />
            <Container
              maxW="100%"
              p={0}
              marginTop={"0 !important"}
              backgroundColor={"inverse"}
            >
              <UserPermissionsProvider
                fetchPermission={fetchPermission(
                  user.userName,
                  loggedInUserAddress ? loggedInUserAddress : null
                )}
              >
                <ProfileHeader userName={user.userName} uuid={user.uuid} />
                <Flex
                  w="full"
                  justifyContent={"space-around"}
                  flexDir={["column", "column", "row"]}
                  margin={"auto"}
                  maxW={"1350px"}
                >
                  <ProfileDataLayout
                    onExpModalOpen={onExpModalOpen}
                    isExpModalOpen={isExpModalOpen}
                    onExpModalClose={onExpModalClose}
                    userName={user.userName}
                  />
                  <Box alignSelf="flex-start" w="full" overflow="hidden">
                    {/* social media URLs */}
                    <VStack
                      p={["0px 1%", "0px 2%", "60px 0 0 12.5%"]}
                      mx={"auto"}
                      width={["98vw", "95vw", "unset"]}
                      maxW={["565px", "565px", "unset"]}
                    >
                      <ProfileBadges
                        poapsData={poapsData}
                        snapshotData={snapshotData}
                        setCurrentBadge={setCurrentBadge}
                        onBadgesModalOpen={onBadgesModalOpen}
                        isBadgesModalOpen={isBadgesModalOpen}
                        onBadgesModalClose={onBadgesModalClose}
                        currentBadge={currentBadge}
                      />

                      <ProfileExperience
                        createWorkElements={createWorkElements}
                        viewCompany={viewCompany}
                        isCompanyModalOpen={isCompanyModalOpen}
                        onCompanyModalClose={onCompanyModalClose}
                        currCompany={currCompany}
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
