import { 
    Button,
    Menu, 
    MenuButton,
    MenuList,
    MenuItem,
    Input,
    Text,
    Box,
    Heading,
    CircularProgress,
    HStack
   } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { ChevronDownIcon } from '@chakra-ui/icons';

import React, { useState } from 'react';

import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';

import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { DID } from 'dids';
import { IDX } from '@ceramicstudio/idx';

// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

const SignUpMenu = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [accType, setAccType] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isAccTypeSelected, setIsAccTypeSelected] = useState(false);

    const router = useRouter();

    // Get user's eth address
    async function connect() {
        const addresses = await window.ethereum.request({
        method: 'eth_requestAccounts'
        })
        return addresses;
    }

      async function updateProfile() {
        const [address] = await connect(); // first address in the array
        const ceramic = new CeramicClient(endpoint);
        const threeIdConnect = new ThreeIdConnect();
        const provider = new EthereumAuthProvider(window.ethereum, address);

        setIsSubmitted(true);
    
        await threeIdConnect.connect(provider);
    
        const did = new DID({
          provider: threeIdConnect.getDidProvider(),
          resolver: {
            ...ThreeIdResolver.getResolver(ceramic)
          }
        })
        
        ceramic.setDID(did);
        await ceramic.did.authenticate();
    
        const idx = new IDX({ ceramic });
    
        await idx.set('basicProfile', {
          name,
          email,
          accType,
        })
    
        console.log("Profile updated!");
        if(name && email && accType) {
            setIsSubmitted(false);
            router.push('/profile');
        } else {
            console.log('No profile, pls create one...');
          }
      }

      const userProfileSignUp = () => {
        console.log("Next page: User Profile Form")
      }

      const selectUserAccType = (accType: string) => {
        setAccType(accType);
        setIsAccTypeSelected(true);
      }

       return (
           <>
           <Heading alignSelf="center">Sign Up</Heading>
           <Box
                    alignSelf="center"
                    color="gray.500"
                    fontWeight="semibold"
                    fontSize="sm"
                    p={0}
                    m={0}
                  >How would you like to use Twali?
            </Box>
            <Button size="sm" pl={40} onClick={() => router.push('/')} colorScheme="gray" variant="link">
                Back
            </Button>
            <HStack alignSelf="center" spacing={8}>
            <Box w="sm" h="200px" borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer" onClick={() => selectUserAccType('Expert')}>
              <Box p="4">
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  As an expert 🔑
                </Box>

                <Box>
                  <Box as="span" color="gray.500" fontSize="sm">
                    I want to provide my knowledge and expertise
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box w="sm" h="200px" borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer" onClick={() => selectUserAccType('Builder')}>
              <Box p="4">
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  As a builder 🛠
                </Box>

                <Box>
                  <Box as="span" color="gray.500" fontSize="sm">
                    I want to build a project
                  </Box>
                </Box>
              </Box>
            </Box>
            </HStack>
            <Button disabled={!isAccTypeSelected} alignSelf="center" w="xl" onClick={() => router.push('/steps')} colorScheme="teal">
                Continue
            </Button>
        </>
       )
   }

export default SignUpMenu;