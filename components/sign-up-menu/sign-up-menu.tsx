import { 
    Button,
    Menu, 
    MenuButton,
    MenuList,
    MenuItem,
    Input,
    Text,
    CircularProgress
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

       return (
           <>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {accType ? accType: 'Account type'}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => setAccType('Expert 🔑')}>Expert 🔑</MenuItem>
                    <MenuItem onClick={() => setAccType('Builder 🛠')}>Builder 🛠</MenuItem>
                </MenuList>
            </Menu>
            <Input placeholder="First Name Last Name" size="md" onChange={e => setName(e.target.value)}/>
            <Input placeholder="Email" size="md" onChange={e => setEmail(e.target.value)}/>
            <Text fontSize="xs">By signing up, I agree to the Privacy Policy and the Terms of Services.</Text>
            <Button onClick={updateProfile} colorScheme="teal" variant="outline">
                Sign Up {isSubmitted ? <CircularProgress size="22px" thickness="4px" isIndeterminate color="#3C2E26" /> : null}
            </Button>
        </>
       )
   }

export default SignUpMenu;