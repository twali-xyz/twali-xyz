import { 
    Box,
    Button,
    Img,
    VStack,
    HStack,
    Stack,
    Text,
    CircularProgress
   } from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';

import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { DID } from 'dids';
import { IDX } from '@ceramicstudio/idx';
import { TileDocument } from '@ceramicnetwork/stream-tile';

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
  

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [businessLocation, setBusinessLocation] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [currCompanyTitle, setCurrCompanyTitle] = useState('');
    const [funcExpertise, setFuncExpertise] = useState('');
    const [industryExpertise, setIndustryExpertise] = useState('');

    const [email, setEmail] = useState('');
    const [accType, setAccType] = useState('');
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
    
              const profileData: ProfileData = await TileDocument.deterministic(
                ceramic,
                { family: 'user-profile-data' },
                { anchor: false, publish: false }
              );
    
              console.log('profileData: ', profileData.content.identity);
              let identity = profileData.content.identity;
              let profileAccType = profileData.content.accType;
    
              if (data.name) setName(data.name)
              if (profileAccType) setAccType(profileAccType)
              if (identity.displayName) setDisplayName(identity.displayName)
              if (identity.firstName) setFirstName(identity.firstName)
              if (identity.lastName) setLastName(identity.lastName)
              if (identity.email) setEmail(identity.email)
              if (identity.businessName) setBusinessName(identity.businessName)
              if (identity.businessType) setBusinessType(identity.businessType)
              if (identity.businessLocation) setBusinessLocation(identity.businessLocation)
              if (identity.currCompanyTitle) setCurrCompanyTitle(identity.currCompanyTitle)
              if (identity.funcExpertise) setFuncExpertise(identity.funcExpertise)
              if (identity.industryExpertise) setIndustryExpertise(identity.industryExpertise)
              setLoaded(true);
            } catch(err) {
              console.log("error: ", err);
              setLoaded(true);
            }
          }
          readProfile();
        }, []);

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
        <VStack
            spacing={4}
            align='stretch'
            w="full"
            pl={12}
            mt={0}
            pt={0}
            >
                <Box w="full" overflow='hidden'>
                    { !accType && !firstName && !lastName && name && loaded && <h4>Profile needs to be created. </h4>}
                    <Stack spacing={3}>
                    { accType && name && <Text fontSize='xl'>{name + ', ' + accType}</Text>}
                        { email && <Text fontSize='md'>{email}</Text>}
                        { businessLocation && <Text fontSize='md'>{businessLocation}</Text>}
                    </Stack>
                </Box>
            </VStack>
            </HStack>
        <HStack w="full" spacing={32}>
        <VStack
            spacing={4}
            align='flex-start'
            // w="full"
            ml={8}
            >
            { displayName && <Text fontSize='xl'>@{displayName}</Text>}
            <Box p={4} ml={8} borderWidth='1px' borderRadius='lg' overflow='hidden' backgroundColor='gray.200'>
            { funcExpertise && <Text fontSize='md'>{funcExpertise}</Text>}
            </Box>
            <Box p={4} ml={8} borderWidth='1px' borderRadius='lg' overflow='hidden' backgroundColor='gray.200'>
            { industryExpertise && <Text fontSize='md'>{industryExpertise}</Text>}
            </Box>
        </VStack>
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
            <Text pt={8} pb={4} fontSize='xl'>Book a session with {firstName}</Text>
            <Button size='md' colorScheme='teal'>Book</Button>
        </Box>
        </VStack>
        </HStack>
        </>)}
        </>
    )
}

export default ProfilePage;