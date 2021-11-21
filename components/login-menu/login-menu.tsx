import { 
    Button,
    Menu, 
    MenuButton,
    MenuList,
    MenuItem,
    Input,
    Text,
   } from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';

import { useState } from 'react';

import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';

import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { DID } from 'dids';
import { IDX } from '@ceramicstudio/idx';

// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

const LoginMenu = () => {
    const [name, setName] = useState('');
    // const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [accType, setAccType] = useState('');
    const [loaded, setLoaded] = useState(false);

    // Get user's eth address
    async function connect() {
        const addresses = await window.ethereum.request({
        method: 'eth_requestAccounts'
        })
        return addresses;
    }

    async function readProfile() {
        const [address] = await connect(); // first address in the array
        const ceramic = new CeramicClient(endpoint);
        const idx = new IDX({ ceramic });
    
        try {
          // does not require signing to get user's public data
          const data = await idx.get(
            'basicProfile',
            `${address}@eip155:1`
          )
          console.log('data: ', data);
          if (data.name) setName(data.name)
          if (data.email) setEmail(data.email)
        } catch(err) {
          console.log("error: ", err);
          setLoaded(true);
        }
      }

      async function updateProfile() {
        const [address] = await connect(); // first address in the array
        const ceramic = new CeramicClient(endpoint);
        const threeIdConnect = new ThreeIdConnect();
        const provider = new EthereumAuthProvider(window.ethereum, address);
    
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
        })
    
        console.log("Profile updated!");
    
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
                Sign Up
            </Button>
            <p>Already have an account?</p>
            <Button onClick={readProfile} colorScheme="teal" variant="outline">
                Connect Wallet
            </Button>

            { name && <h3>{name}</h3>}
      { email && <h3>{email}</h3>} src={email}
      { accType && <h3>{accType}</h3>} src={accType}
      { !email && !name && !accType && loaded && <h4>No profile, pls create one...</h4>}
        </>
       )
   }

export default LoginMenu;