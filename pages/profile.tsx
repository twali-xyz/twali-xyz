import { 
    Button,
    Container, 
    Flex, 
    VStack
   } from '@chakra-ui/react';

import { useState } from 'react';

import HeaderNav from '../components/HeaderNav/HeaderNav';
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
  

const Profile = () => {
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
          if (identity.firstName) setFirstName(identity.firstName)
          if (identity.lastName) setLastName(identity.lastName)
          if (identity.email) setEmail(identity.email)
          if (profileAccType) setAccType(profileAccType)
        } catch(err) {
          console.log("error: ", err);
          setLoaded(true);
        }
      }

    return (
        <Container maxW="container.xl" p={12}>
            <HeaderNav whichPage="profile"/>
            <Flex h="full">
                <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
                    <Button onClick={readProfile} colorScheme="teal" variant="outline">
                        Connect Wallet
                    </Button>
                        { name && <h3>{name}</h3>}
                        { firstName && <h3>{firstName}</h3>}
                        { lastName && <h3>{lastName}</h3>}
                        { email && <h3>{email}</h3>}
                        { accType && <h3>{accType}</h3>}
                        {/* { !email && !name && !accType && loaded && <h4>No profile, pls create one...</h4>} */}
                </VStack>
            </Flex>
        </Container>
    )
}

export default Profile;