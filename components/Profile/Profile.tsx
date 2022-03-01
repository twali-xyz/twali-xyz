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

import { useState, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import EditExperienceModal from "./EditExperienceModal/EditExperienceModal";
import SnapshotModal from "./SnapshotModal/SnapshotModal";
import CompanyModal from "./CompanyModal/CompanyModal";
import useSWR from "swr";
import UserPermissionsProvider from "../UserPermissionsProvider/UserPermissionsProvider";
import UserPermissionsRestricted from "../UserPermissionsProvider/UserPermissionsRestricted";
import { fetchPermission } from "../../utils/profileUtils";
import { TwaliContext } from "../TwaliProvider/TwaliProvider";

// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

const ProfilePage = () => {
  const {
    name,
    setName,
    loaded,
    identity,
    setIdentity,
    readProfile,
    setLoaded,
    snapshotData,
    profileData,
    setProfileData,
    setSnapshotData,
  } = useContext(TwaliContext);

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
            companyName={identity.companyInfo[i].companyName}
            currCompany={i}
            setCurrCompany={setCurrCompany}
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
                      {identity.businessLocation && (
                        <Text fontSize="md">{identity.businessLocation}</Text>
                      )}
                    </HStack>
                    <Text fontSize="md">{identity.currTitle}</Text>
                    {identity.bio && <Text fontSize="md">{identity.bio}</Text>})
                    {/* social media URLs */}
                    <HStack width={"6rem"} justifyContent={"space-between"}>
                      {identity.linkedIn && (
                        <Link
                          href={identity.linkedIn}
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
                      {identity.twitter && (
                        <Link
                          href={identity.twitter}
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

export default ProfilePage;
