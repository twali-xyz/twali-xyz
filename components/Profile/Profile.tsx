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

import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';

import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { DID } from 'dids';
import { IDX } from '@ceramicstudio/idx';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditProfileModal from './EditProfileModal/EditProfileModal';
import EditExperienceModal from './EditExperienceModal/EditExperienceModal';

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
    currCompanyTitle: string;
    currLocation?: string;
    funcExpertise: string;
    industryExpertise: string;
  }
  
  export interface BasicProfile {
    name: string;
  }
  export interface Profile {
      identity: Identity;
      name: string;
      accType: string;
  }

const ProfilePage = () => {
    const [profileData, setProfileData]  = useState<ProfileData>();
    const [name, setName] = useState('');
    const { isOpen: isProfileModalOpen , onOpen: onProfileModalOpen, onClose: onProfileModalClose } = useDisclosure()
    const { isOpen: isExpModalOpen , onOpen: onExpModalOpen, onClose: onExpModalClose } = useDisclosure()
    const [loaded, setLoaded] = useState(false);

    // Get user's eth address
    async function connect() {
        const { ethereum } = window;
        let account;

        if (!ethereum) {
          console.log("Connect your ethereum wallet!");
          return
        }
    
        await ethereum.request({ method: 'eth_requestAccounts' })
          .then(accounts => {
            if (accounts.length !== 0) {
              account = accounts[0];
              console.log("Found an authorized account: ", account);
              console.log("all accounts: ", accounts);
              // setCurrAccount(account);
              // getAllSpellsCast();
              // setIsFormVisible(true);
              // if (account) {
              //   web3.eth.getBalance(account).then(e => setCurrBalance(e/10**18));
              // }
            } else {
              // setIsFormVisible(false);
              console.log("No authorized account found!");
            }
          })

        // const addresses = await window.ethereum.request({
        // method: 'eth_requestAccounts'
        // })
        // return addresses;
        return account;
    }
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
          console.log('hello');
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
                console.log('hello');
                setProfileData(profile);
              }
              console.log('profileData: ', profileData);
              setLoaded(true);
              
            } catch(err) {
              console.log("error: ", err);
              setLoaded(false);
            }
          }
          readProfile();
        }, []);

        const handleUpdatedProfile = (profileData) => {
          console.log(profileData);
          setProfileData({...profileData});
          readProfile();
        }

        const handleUpdatedExperiences = (profileData) => {
          console.log(profileData);
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
        ) : (
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
        <HStack w="full" spacing={12}>
        <Img
                borderRadius='full'
                width="300px"
                src='fox-pfp.png'
                alt='fox stock img'
            />
                <Box alignSelf="flex-start" w="full" pt={16} pl={10} overflow='hidden'>
                    { !profileData && !profileData.content && !profileData.content.accType && !name && loaded && <h4>Profile needs to be created. </h4>}
                    <Stack spacing={6}>
                    { profileData && name && profileData.content.accType && (
                      <>
                        <HStack>
                        <Text fontSize='xl'>{name + ', ' + profileData.content.accType}</Text>
                        <FontAwesomeIcon size="lg" icon={['fas', 'map-pin']} />{ profileData.content.identity.businessLocation && <Text fontSize='md'>{profileData.content.identity.businessLocation}</Text>}
                        </HStack>
                        <Text fontSize='md'>{profileData.content.identity.currCompanyTitle}</Text>
                        { profileData.content.identity.bio && <Text fontSize='md'>{profileData.content.identity.bio}</Text>}
                      </>
                    )}
                    
                    <VStack>
                        <Box alignSelf="flex-start" w="full" overflow='hidden'>
                            <Text pb={8} fontSize='xl'>Company Experience</Text>
                            <HStack spacing={4}>
                                <Img
                                    borderRadius='full'
                                    width="100px"
                                    src='https://miro.medium.com/fit/c/160/160/1*pF_x_Qm-EGxym_Ag7mBJ4w.png'
                                    alt='fox stock img'
                                />
                                <Img
                                    borderRadius='full'
                                    width="100px"
                                    src='https://s2.coinmarketcap.com/static/img/coins/200x200/10052.png'
                                    alt='fox stock img'
                                />
                                <Img
                                    borderRadius='full'
                                    width="100px"
                                    src='https://s2.coinmarketcap.com/static/img/coins/200x200/5632.png'
                                    alt='fox stock img'
                                />
                                <Img
                                    borderRadius='full'
                                    width="100px"
                                    src='https://c.gitcoin.co/grants/84461dbb55ae43f2edc28f375cb74059/ethereum_logo_-_6250754.png'
                                    alt='fox stock img'
                                />
                                <Img
                                    borderRadius='full'
                                    width="100px"
                                    src='fox-pfp.png'
                                    alt='fox stock img'
                                />
                            </HStack>
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
        <VStack
            marginTop={0}
            align='flex-start'
            pl={8}
            pt={0}
            >
            <IconButton onClick={onExpModalOpen} alignSelf='flex-end' variant='ghost' aria-label='Update experience' icon={<FontAwesomeIcon size="sm" icon={['fas', 'edit']} />} />
            <EditExperienceModal isOpen={isExpModalOpen} onClose={onExpModalClose} profileData={profileData} handleUpdatedExperiences={handleUpdatedExperiences}/>
            { profileData.content.identity.displayName && <Text fontSize='xl'>@{profileData.content.identity.displayName}</Text>}
            { profileData.content.identity.email && <Text fontSize='md'>{profileData.content.identity.email}</Text>}
            <Box p={4} ml={8} borderWidth='1px' borderRadius='lg' overflow='hidden' backgroundColor='gray.200'>
            { profileData && profileData.content.identity && profileData.content.identity.funcExpertise && <Text fontSize='md'>{profileData.content.identity.funcExpertise}</Text>}
            </Box>
            <Box p={4} ml={8} borderWidth='1px' borderRadius='lg' overflow='hidden' backgroundColor='gray.200'>
            { profileData && profileData.content.identity && profileData.content.identity.industryExpertise && <Text fontSize='md'>{profileData.content.identity.industryExpertise}</Text>}
            </Box>
        </VStack>
        </>)}
        </>
    )
}

export default ProfilePage;