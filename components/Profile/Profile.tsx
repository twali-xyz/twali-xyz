import { 
    Box,
    Button,
    Img,
    VStack,
    HStack,
    Stack,
    Text,
    CircularProgress,
    useDisclosure,
    IconButton
   } from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import { connect } from '../../utils/walletUtils';

import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';

import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { DID } from 'dids';
import { IDX } from '@ceramicstudio/idx';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditProfileModal from './EditProfileModal/EditProfileModal';
import EditExperienceModal from './EditExperienceModal/EditExperienceModal';
import { request, gql } from 'graphql-request';
import SnapshotModal from './SnapshotModal/SnapshotModal';
import CompanyModal from './CompanyModal/CompanyModal';
import useSWR from 'swr'


// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

export interface ProfileData {
    content: {
      identity: Identity;
      accType: string;
    }
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

const ProfilePage = () => {
    const [profileData, setProfileData]  = useState<ProfileData>();
    const [name, setName] = useState('');
    const { isOpen: isProfileModalOpen , onOpen: onProfileModalOpen, onClose: onProfileModalClose } = useDisclosure()
    const { isOpen: isExpModalOpen , onOpen: onExpModalOpen, onClose: onExpModalClose } = useDisclosure()
    const { isOpen: isSnapshotModalOpen , onOpen: onSnapshotModalOpen, onClose: onSnapshotModalClose } = useDisclosure()
    const { isOpen: isCompanyModalOpen , onOpen: onCompanyModalOpen, onClose: onCompanyModalClose } = useDisclosure()
    const [loaded, setLoaded] = useState(false);
    const [snapshotData, setSnapshotData] = useState<any>();
    const [currentSnapshot, setCurrentSnapshot] = useState();
    const [isOnMouseOver, setOnMouseOver] = useState(false);
    const [companyData, setCompanyData] = useState<any>();
    // const [companyName, setCompanyName] = useState();

    // const fetcher = (companyDomain: string,...args: Parameters<typeof fetch>) => fetch(companyDomain).then(response => response.json());
    // const { data, error } = useSWR('/api/cors', fetcher);

    // const address = `https://company.clearbit.com/v2/companies/find?domain=segment.com`;

    // const fetcher = async (url) => await axios.get(url, {
    //   headers: { key: 'sk_6bcc4eeacc2e0695ccd95e414e0633a6' },
    // }).then((res) => res.data);

    

    // console.log(data);

  //   const fetcher = async(...args: Parameters<typeof fetch>) => { 
  //     fetch('https://company.clearbit.com/v2/companies/find?domain=segment.com', {
  //     headers: {
  //         'Authorization': 'Basic sk_6bcc4eeacc2e0695ccd95e414e0633a6'
  //     }
  //   }).then(response => response.json())
  // };

    // const { data, error } = useSWR('https://company.clearbit.com/v2/companies/find?domain=segment.com', fetcher)

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
              ...ThreeIdResolver.getResolver(ceramic)
            }
        });
      await ceramic.did.authenticate();

      console.log(address);
      try {
        // does not require signing to get user's public data
        const data: BasicProfile = await idx.get(
          'basicProfile',
          `${address}@eip155:1`
        )
        console.log('data: ', data);

        const profile: ProfileData = await TileDocument.deterministic(
          ceramic,
          { family: 'user-profile-data' },
          { anchor: false, publish: false }
        );

        console.log(profile);
        
        if (data.name) setName(data.name)
        if (profile) {
          setProfileData(profile);
        }
        console.log('profileData: ', profileData);
        setLoaded(true);
        
      } catch(err) {
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
                    ...ThreeIdResolver.getResolver(ceramic)
                  }
              });
            await ceramic.did.authenticate();
    
            console.log(address);
            try {
              // does not require signing to get user's public data
              const data: BasicProfile = await idx.get(
                'basicProfile',
                `${address}@eip155:1`
              )
              console.log('data: ', data);
    
              const profile: ProfileData = await TileDocument.deterministic(
                ceramic,
                { family: 'user-profile-data' },
                { anchor: false, publish: false }
              );

              console.log(profile);

              if (data.name) setName(data.name)
              if (profile) {
                setProfileData(profile);
              }
              console.log('profileData: ', profileData);
              setLoaded(true);
              
            } catch(err) {
              console.log("error: ", err);
              setLoaded(false);
            }

            const query = gql`
            query getSnapshotVotes($wallet: String!)
            {
              votes (where: { voter: $wallet }) {
                id
                space {
                  id
                  avatar
                }
              }
            }
              `
            const walletVar = {
              wallet: address,
            }

            // Run GraphQL queries
            request('https://hub.snapshot.org/graphql', query, walletVar).then((data) => {

              data.votes.find(v => { if (v.space.avatar) {
                v.space.avatar = v.space.avatar.replace('ipfs://','https://ipfs.io/ipfs/')
              }});

              console.log(data);
              getVoterSnapshotQueries(data, address);
            });
          }

          async function getVoterSnapshotQueries(data, address) {
            let finalData: any = [];
            if (data) {
              data.votes.forEach(snapshot => {
                let finalObj = {
                  spaceID: '',
                  totalVotes: 0,
                  walletVotes: 0,
                  voter: '',
                  avatar: snapshot.space.avatar
                };

                const variables = {
                  spaceID: snapshot.space.id,
                  wallet: address,
                }

                const query2 = gql`
                query getProposals($spaceID: String!) {
                  proposals (where: { space: $spaceID }) {
                    title
                    scores
                    scores_total
                    votes
                  }
                }`
                request('https://hub.snapshot.org/graphql', query2, variables).then((propData) => {
                    let totalVotes = 0;
                    propData.proposals.forEach(proposal => {
                        totalVotes += proposal.votes;
                    });

                    finalObj.totalVotes = totalVotes;
                });
        
                const query3 = gql`
                    query getVotes($spaceID: String!, $wallet: String!) {
                            votes (where: { voter: $wallet, space: $spaceID }) {
                            id
                        }
                    }`
                
                request('https://hub.snapshot.org/graphql', query3, variables).then((totals) => {
                  // setWalletVotes(totals.votes.length)
                  finalObj.walletVotes = totals.votes.length;
                  finalObj.voter = address;
                });
                finalObj.spaceID = snapshot.space.id;
                finalData.push(finalObj);
                console.log(finalObj);
              })

            }

            let resArr: any = [];

            finalData.forEach(function(item){
              var i = resArr.findIndex(x => x.spaceID == item.spaceID);
              if(i <= -1){
                resArr.push(item);
              }
            });
            setSnapshotData(resArr);
          }
          readProfile();
          console.log(snapshotData);
        }, []);

        const handleUpdatedProfile = (profileData) => {
          setProfileData({...profileData});
          readProfile();
        }

        const handleUpdatedCompanyInfo = (profileData) => {
          setProfileData({...profileData});
          readProfile();
        }

    return (
        
        <>
        {!loaded ? (
        <VStack alignSelf="center" spacing={8} pt={8}>
        <CircularProgress size="50px" thickness="8px" isIndeterminate color="#3C2E26"/>
        <Text fontSize='2xl'>Loading</Text>
        </VStack>
        ) : profileData && name && profileData.content && profileData.content.accType && profileData.content.identity && (
        <>
        <Box w="full" borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Img
                    // onClick={() => getCompany('')}
                    objectFit="cover"
                    width="100%"
                    height="200px"
                    overflow="hidden"
                    src="https://i.pinimg.com/originals/92/4e/c3/924ec3d75761aa0e5b84e4031f718de6.jpg"
                    alt='aesthetic brown'
                />
            </Box>
        <HStack w="full" spacing={24}>
        <VStack
            marginTop={0}
            paddingTop={0}
            align='flex-start'
            spacing={6}
            >
            <Box alignSelf="flex-start" overflow='hidden'>
              <Img
                  borderRadius='full'
                  width="500px"
                  src='fox-pfp.png'
                  alt='fox stock img'
              />
              </Box>
            <IconButton onClick={onExpModalOpen} alignSelf='flex-end' variant='ghost' aria-label='Update experience' icon={<FontAwesomeIcon size="sm" icon={['fas', 'edit']} />} />
            <EditExperienceModal isOpen={isExpModalOpen} onClose={onExpModalClose} profileData={profileData} handleUpdatedExperiences={handleUpdatedProfile}/>
            { profileData.content.identity.displayName && <Text fontSize='xl'>@{profileData.content.identity.displayName}</Text>}
            { profileData.content.identity.email && <Text fontSize='md'>{profileData.content.identity.email}</Text>}
            <Box p={4} ml={8} borderWidth='1px' color='rgb(0, 0, 0)' borderRadius='lg' overflow='hidden' backgroundColor='rgb(222, 222, 222)'>
            { profileData && profileData.content.identity && profileData.content.identity.funcExpertise && <Text fontSize='md'>{profileData.content.identity.funcExpertise}</Text>}
            </Box>
            <Box p={4} ml={8} borderWidth='1px' borderRadius='lg' overflow='hidden' color='rgb(0, 0, 0)' backgroundColor='rgb(222, 222, 222)'>
            { profileData && profileData.content.identity && profileData.content.identity.industryExpertise && <Text fontSize='md'>{profileData.content.identity.industryExpertise}</Text>}
            </Box>
        </VStack>
                <Box alignSelf="flex-start" w="full" pt={16} pl={4} overflow='hidden'>
                    <Stack spacing={6}>
                        <HStack>
                        <Text fontSize='xl'>{name + ', ' + profileData.content.accType}</Text>
                        <FontAwesomeIcon size="lg" icon={['fas', 'map-pin']} />{ profileData.content.identity.businessLocation && <Text fontSize='md'>{profileData.content.identity.businessLocation}</Text>}
                        </HStack>
                        <Text fontSize='md'>{profileData.content.identity.currTitle}</Text>
                        { profileData.content.identity.bio && <Text fontSize='md'>{profileData.content.identity.bio}</Text>}
                    )
                    <VStack>
                        <Box alignSelf="flex-start" w="full" overflow='hidden'>
                            <Text pb={8} fontSize='xl'>Company Experience</Text>
                            {/* <HStack spacing={4}> */}
                            {companyData ? (
                              <>
                            <HStack spacing={4}>
                              {companyData.map(company =>
                                company ? (
                                <Img
                                  style={{ cursor: 'pointer'}}
                                  key={company.companyName}
                                  borderRadius='full'
                                  width="100px"
                                  src={company.companyImg}
                                  alt='fox stock img'
                                  onClick={() => {
                                    onCompanyModalOpen();
                                  }}
                                />
                              ): (
                                <Img
                                      borderRadius='full'
                                      style={{ cursor: 'pointer'}}
                                      backgroundColor='lightgray'
                                      width="100px"
                                      src='add.svg'
                                      alt='add img'
                                  />
                              ))}
                            </HStack>
                            </>
                            ):
                              <>
                              <HStack spacing={4}>
                              {/* {new Array(5).fill(0).map((_, index) => (
                                  <Img
                                    key={index}
                                    borderRadius='full'
                                    style={{ cursor: 'pointer'}}
                                    backgroundColor='lightgray'
                                    width="100px"
                                    src='add.svg'
                                    alt='add img'
                                    onClick={() => {
                                      onCompanyModalOpen();
                                    }}
                                />
                              ))} */}
                              { profileData.content.identity.companyInfo[0].companyName && <GetCompany companyName={profileData.content.identity.companyInfo[0].companyName}/>}
                              </HStack>
                              </>}
                            <CompanyModal isOpen={isCompanyModalOpen} onClose={onCompanyModalClose} profileData={profileData} handleUpdatedCompanyInfo={handleUpdatedCompanyInfo}/>
                        </Box>
                        <Box alignSelf="flex-start" w="full" overflow='hidden'>
                            <Text pt={8} pb={4} fontSize='xl'>Snapshot</Text>
                            {snapshotData ? (
                              <>
                            <HStack spacing={4}>
                              {snapshotData.map(vote => 
                                <Img
                                  style={{ cursor: 'pointer'}}
                                  key={vote.spaceID}
                                  borderRadius='full'
                                  width="100px"
                                  src={vote.avatar}
                                  alt='fox stock img'
                                  onClick={() => {
                                    setCurrentSnapshot(vote);
                                    onSnapshotModalOpen();
                                  }}
                                />
                          )}
                          </HStack>
                          <SnapshotModal isOpen={isSnapshotModalOpen} onClose={onSnapshotModalClose} snapshotData={currentSnapshot}/>
                          </>
                          ): null}
                        </Box>
                        <Box alignSelf="flex-start" w="full" overflow='hidden'>
                            <Text pt={8} pb={4} fontSize='xl'>Book a session with {profileData.content.identity.firstName}</Text>
                            <Button size='md' colorScheme='teal'>Book</Button>
                        </Box>
                        </VStack>
                    </Stack>
                </Box>
                <Box marginTop={8} w="150px" alignSelf="flex-start" overflow='hidden'>
                <IconButton onClick={onProfileModalOpen} alignSelf='flex-end' variant='ghost' aria-label='Update experience' icon={<FontAwesomeIcon size="sm" icon={['fas', 'edit']} />} />
                <EditProfileModal isOpen={isProfileModalOpen} onClose={onProfileModalClose} profileData={profileData} handleUpdatedProfile={handleUpdatedProfile}/>
            </Box>
            </HStack>
        </>)}
        </>
    )
}

const GetCompany = (companyName) => {
  console.log(companyName);
  const fetcher = (companyDomain: string,...args: Parameters<typeof fetch>) => fetch(companyDomain).then(response => response.json());
  let paramsObj = {params: companyName.companyName};
  let searchParams = new URLSearchParams(paramsObj);
  console.log(searchParams);

  // Create a stable key for SWR
  searchParams.sort();
  const qs = searchParams.toString();

  console.log(qs);

  const { data, error } = useSWR(`/api/cors?${qs}`, fetcher);
  console.log('DATA: ', data);

  return (
    <>
      { data && data.message && data.message.logo ? (
        <Box w="100px" height="100px" borderRadius='50%' backgroundColor='lightgray' borderWidth='2px' overflow='hidden' p={4}>
         {/* <Img
              height="30px"
              src={data.message.logo}
              alt={data.message.domain}
          /> */}

          <Img
            paddingTop={4}
            backgroundColor='lightgray'
            style={{ cursor: 'pointer'}}
            key={data.message.name}
            // borderRadius='
            width="100px"
            alignSelf="center"
            src={data.message.logo}
            alt='fox stock img'
          />
      </Box>
      ) : null}
    </>
  )
}

export default ProfilePage;