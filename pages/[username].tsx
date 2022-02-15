const testData = [
    {
      "id": 1,
      "name": "Luna Lovegood",
      "username": "lunalove",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
      "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
          "lat": "-68.6102",
          "lng": "-47.0653"
        }
      },
      "phone": "1-463-123-4447",
      "website": "ramiro.info",
      "company": {
        "name": "Romaguera-Jacobson",
        "catchPhrase": "Face to face bifurcated interface",
        "bs": "e-enable strategic applications"
      }
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "username": "Karianne",
      "email": "Julianne.OConner@kory.org",
      "address": {
        "street": "Hoeger Mall",
        "suite": "Apt. 692",
        "city": "South Elvis",
        "zipcode": "53919-4257",
        "geo": {
          "lat": "29.4572",
          "lng": "-164.2990"
        }
      },
      "phone": "493-170-9623 x156",
      "website": "kale.biz",
      "company": {
        "name": "Robel-Corkery",
        "catchPhrase": "Multi-tiered zero tolerance productivity",
        "bs": "transition cutting-edge web services"
      }
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "username": "Kamren",
      "email": "Lucio_Hettinger@annie.ca",
      "address": {
        "street": "Skiles Walks",
        "suite": "Suite 351",
        "city": "Roscoeview",
        "zipcode": "33263",
        "geo": {
          "lat": "-31.8129",
          "lng": "62.5342"
        }
      },
      "phone": "(254)954-1289",
      "website": "demarco.info",
      "company": {
        "name": "Keebler LLC",
        "catchPhrase": "User-centric fault-tolerant solution",
        "bs": "revolutionize end-to-end systems"
      }
    },
    {
      "id": 6,
      "name": "Mrs. Dennis Schulist",
      "username": "Leopoldo_Corkery",
      "email": "Karley_Dach@jasper.info",
      "address": {
        "street": "Norberto Crossing",
        "suite": "Apt. 950",
        "city": "South Christy",
        "zipcode": "23505-1337",
        "geo": {
          "lat": "-71.4197",
          "lng": "71.7478"
        }
      },
      "phone": "1-477-935-8478 x6430",
      "website": "ola.org",
      "company": {
        "name": "Considine-Lockman",
        "catchPhrase": "Synchronised bottom-line interface",
        "bs": "e-enable innovative applications"
      }
    },
    {
      "id": 7,
      "name": "Kurtis Weissnat",
      "username": "Elwyn.Skiles",
      "email": "Telly.Hoeger@billy.biz",
      "address": {
        "street": "Rex Trail",
        "suite": "Suite 280",
        "city": "Howemouth",
        "zipcode": "58804-1099",
        "geo": {
          "lat": "24.8918",
          "lng": "21.8984"
        }
      },
      "phone": "210.067.6132",
      "website": "elvis.io",
      "company": {
        "name": "Johns Group",
        "catchPhrase": "Configurable multimedia task-force",
        "bs": "generate enterprise e-tailers"
      }
    },
    {
      "id": 8,
      "name": "Nicholas Runolfsdottir V",
      "username": "Maxime_Nienow",
      "email": "Sherwood@rosamond.me",
      "address": {
        "street": "Ellsworth Summit",
        "suite": "Suite 729",
        "city": "Aliyaview",
        "zipcode": "45169",
        "geo": {
          "lat": "-14.3990",
          "lng": "-120.7677"
        }
      },
      "phone": "586.493.6943 x140",
      "website": "jacynthe.com",
      "company": {
        "name": "Abernathy Group",
        "catchPhrase": "Implemented secondary concept",
        "bs": "e-enable extensible e-tailers"
      }
    },
    {
      "id": 9,
      "name": "Glenna Reichert",
      "username": "Delphine",
      "email": "Chaim_McDermott@dana.io",
      "address": {
        "street": "Dayna Park",
        "suite": "Suite 449",
        "city": "Bartholomebury",
        "zipcode": "76495-3109",
        "geo": {
          "lat": "24.6463",
          "lng": "-168.8889"
        }
      },
      "phone": "(775)976-6794 x41206",
      "website": "conrad.com",
      "company": {
        "name": "Yost and Sons",
        "catchPhrase": "Switchable contextually-based project",
        "bs": "aggregate real-time technologies"
      }
    },
    {
      "id": 10,
      "name": "Clementina DuBuque",
      "username": "Moriah.Stanton",
      "email": "Rey.Padberg@karina.biz",
      "address": {
        "street": "Kattie Turnpike",
        "suite": "Suite 198",
        "city": "Lebsackbury",
        "zipcode": "31428-2261",
        "geo": {
          "lat": "-38.2386",
          "lng": "57.2232"
        }
      },
      "phone": "024-648-3804",
      "website": "ambrose.net",
      "company": {
        "name": "Hoeger LLC",
        "catchPhrase": "Centralized empowering task-force",
        "bs": "target end-to-end models"
      }
    }
  ];

  import { 
    Container, 
    Flex,
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

import HeaderNav from '../components/HeaderNav/HeaderNav';
import Profile from '../components/Profile/Profile';

import { useState, useEffect } from 'react';
import { connect } from './../utils/walletUtils';

import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';

import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { DID } from 'dids';
import { IDX } from '@ceramicstudio/idx';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditProfileModal from './../components/Profile/EditProfileModal/EditProfileModal';
import EditExperienceModal from './../components/Profile/EditExperienceModal/EditExperienceModal';
import { request, gql } from 'graphql-request';
import SnapshotModal from './../components/Profile/SnapshotModal/SnapshotModal';
import CompanyModal from './../components/Profile/CompanyModal/CompanyModal';
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
    uuid: string;
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

export const getStaticPaths = async () => {
    // const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = testData;

    // Should get a list of all users from the backend here

    const paths = data.map( (user: any) => {
        return {
            params: { username: user.username}
        }
    })

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.username;
    console.log(context);
    const data = testData[0];
    console.log(data);

    return {
        props: { user: data}
    }
}

// What each profile looks like
const ProfileDetails = ({user}) => {
  const [profileData, setProfileData]  = useState<ProfileData>();
  const [name, setName] = useState('');
  const { isOpen: isProfileModalOpen , onOpen: onProfileModalOpen, onClose: onProfileModalClose } = useDisclosure()
  const { isOpen: isExpModalOpen , onOpen: onExpModalOpen, onClose: onExpModalClose } = useDisclosure()
  const { isOpen: isSnapshotModalOpen , onOpen: onSnapshotModalOpen, onClose: onSnapshotModalClose } = useDisclosure()
  const { isOpen: isCompanyModalOpen , onOpen: onCompanyModalOpen, onClose: onCompanyModalClose } = useDisclosure()
  const [loaded, setLoaded] = useState(false);
  const [snapshotData, setSnapshotData] = useState<any>();
  const [currentSnapshot, setCurrentSnapshot] = useState();
  const [currCompany, setCurrCompany] = useState(0);
  console.log(user);

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
      
      if (data.name) setName(data.name)
      if (profile) {
        setProfileData(profile);
      }

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

            if (data.name) setName(data.name)
            if (profile) {
              setProfileData(profile);
            }
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
                finalObj.walletVotes = totals.votes.length;
                finalObj.voter = address;
              });
              finalObj.spaceID = snapshot.space.id;
              finalData.push(finalObj);
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
      }, []);

      const handleUpdatedProfile = (profileData) => {
        setProfileData({...profileData});
        readProfile();
      }

      const handleUpdatedCompanyInfo = (profileData) => {
        setProfileData({...profileData});
        readProfile();
      }

      function createWorkElements(number){
        var elements = [];
        let totalLen = profileData.content.identity.companyInfo ? profileData.content.identity.companyInfo.length: 0;
        for(let i = 0; i < number; i++){
          if (profileData.content.identity.companyInfo && i < totalLen && profileData.content.identity.companyInfo[i].companyName) {
            elements.push(<GetCompany companyName={profileData.content.identity.companyInfo[i].companyName} currCompany={i} setCurrCompany={setCurrCompany} onCompanyModalOpen={onCompanyModalOpen}/>);
          } else {
            elements.push(<Img
              key={`${i}--empty-company-exp`}
              borderRadius='full'
              style={{ cursor: 'pointer'}}
              backgroundColor='lightgray'
              width="100px"
              src='add.svg'
              alt='add img'
              onClick={() => {
                setCurrCompany(i);
                onCompanyModalOpen();
              }}
          />);
          }
        }
        return elements;
      }

  return (

    <Container maxW="container.xl" p={12}>
    <HeaderNav whichPage="profile"/>
    <Flex h="full">
    <VStack w="full" h="full" spacing={8} alignItems="flex-start">
      {!loaded ? (
      <VStack alignSelf="center" spacing={8} pt={8}>
      <CircularProgress size="50px" thickness="8px" isIndeterminate color="#3C2E26"/>
      <Text fontSize='2xl'>Loading</Text>
      </VStack>
      ) : profileData && name && profileData.content && profileData.content.accType && profileData.content.identity && (
      <>
      <Box w="full" borderWidth='1px' borderRadius='lg' overflow='hidden'>
              <Img
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
                          <Text pb={8} fontSize='xl'>Work Experience</Text>
                          <HStack spacing={4}>
                          {createWorkElements(5)}
                          </HStack>
                          <CompanyModal isOpen={isCompanyModalOpen} onClose={onCompanyModalClose} currCompany={currCompany} profileData={profileData} handleUpdatedCompanyInfo={handleUpdatedCompanyInfo}/>
                      </Box>
                      <Box alignSelf="flex-start" w="full" overflow='hidden'>
                          <Text pt={8} pb={4} fontSize='xl'>Web3 Credentials</Text>
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
                      {/* <Box alignSelf="flex-start" w="full" overflow='hidden'>
                          <Text pt={8} pb={4} fontSize='xl'>Book a session with {profileData.content.identity.firstName}</Text>
                          <Button size='md' colorScheme='teal'>Book</Button>
                      </Box> */}
                      </VStack>
                  </Stack>
              </Box>
              <Box marginTop={8} w="150px" alignSelf="flex-start" overflow='hidden'>
              <IconButton onClick={onProfileModalOpen} alignSelf='flex-end' variant='ghost' aria-label='Update experience' icon={<FontAwesomeIcon size="sm" icon={['fas', 'edit']} />} />
              <EditProfileModal isOpen={isProfileModalOpen} onClose={onProfileModalClose} profileData={profileData} handleUpdatedProfile={handleUpdatedProfile}/>
          </Box>
          </HStack>
      </>)}
      </VStack>
  </Flex>
  </Container>
  )
}

// Client-side data fetching for Clearbit's NameToDomain API (on page load)
const GetCompany = (companyName) => {
const fetcher = (companyDomain: string,...args: Parameters<typeof fetch>) => fetch(companyDomain).then(response => response.json());
let paramsObj = {params: companyName.companyName};
let searchParams = new URLSearchParams(paramsObj);

// Create a stable key for SWR
searchParams.sort();
const qs = searchParams.toString();

const { data, error } = useSWR(`/api/cors?${qs}`, fetcher);
console.log('DATA: ', data);

return (
  <>
    { data && data.message && data.message.logo ? (
      <Box w="100px" height="100px" borderRadius='full' backgroundColor='rgb(222, 222, 222)' overflow='hidden' p={4} key={`${data.message.name}--${companyName.currCompany}--box`}>
        <Img
          backgroundColor='rgb(222, 222, 222)'
          style={{ cursor: 'pointer'}}
          key={`${data.message.name}--${companyName.currCompany}`}
          alignSelf="center"
          src={data.message.logo}
          alt='fox stock img'
          onMouseEnter={(e) => e.currentTarget.src = 'edit.svg'}
          onMouseLeave={(e) => e.currentTarget.src = data.message.logo}
          onClick={ () => {
            companyName.setCurrCompany(companyName.currCompany);
            companyName.onCompanyModalOpen();
          }
          }
        />
    </Box>
    ) : (
      <Img
              key={`${companyName.currCompany}--empty-company-exp`}
              borderRadius='full'
              style={{ cursor: 'pointer'}}
              backgroundColor='lightgray'
              width="100px"
              src='add.svg'
              alt='add img'
              onClick={() => {
                companyName.setCurrCompany(companyName.currCompany);
                companyName.onCompanyModalOpen();
              }}
          />
    )}
</>
)
}

export default ProfileDetails;