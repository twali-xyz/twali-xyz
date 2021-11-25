import React, { useState } from 'react';
import { Flex, Box, Heading, HStack, Button, CircularProgress, Text } from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import WalletsModal from '../WalletsModal/WalletsModal';
import { useRouter } from 'next/router';

import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';

import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { DID } from 'dids';
import { IDX } from '@ceramicstudio/idx';

// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

const HamburgerItem = ({ children, isLast, to = '/' }) => {
  return (
    <Button 
    variant="ghost"
    mb={{ base: isLast ? 0 : 8, sm: 0 }}
    mr={{ base: 0, sm: isLast ? 0 : 8 }}
    display="block"><Link href={to}>{children}</Link></Button>
  );
};

const HeaderNav = (props) => {
  const whichPage = props.whichPage;
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [accType, setAccType] = useState('');
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();

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
        setIsSubmitted(true);
        try {
          // does not require signing to get user's public data
          const data = await idx.get(
            'basicProfile',
            `${address}@eip155:1`
          )
          console.log('data: ', data);
          
          if (data.name && data.email && data.accType) {
            setName(data.name);
            setEmail(data.email);
            setAccType(data.accType);
            setIsSubmitted(false);
            router.push('/profile');
          } else {
            console.log('No profile, pls create one...');
          }
          
        } catch(err) {
          console.log("error: ", err);
          router.push('/sign-up');
          setLoaded(true);
        }
      }

  if (whichPage === "index") {
      return (
        <Flex
        h={10}
        mb={8}
        p={10}
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        >
    <HStack spacing={10} alignItems="flex-start">
        <Heading w="300px">Twali 👁‍🗨</Heading>
    </HStack>
        <Box
        display={{ base: 'block', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Button
            mb={{ base: 8, sm: 0 }}
            mr={{ base: 0, sm: 8 }}
            display="block" 
            onClick={onOpen}
            colorScheme="teal">
                Connect Wallet {isSubmitted ? <CircularProgress size="22px" thickness="4px" isIndeterminate color="#3C2E26" /> : null}
        </Button>
        <WalletsModal isOpen={isOpen} onClose={onClose} selectMetamask={readProfile}/>
      </Box>
    </Flex>
      )
  } else if (whichPage === "sign-up" || whichPage === "steps") {
    return (
        <Flex
        h={10}
        mb={8}
        p={10}
        as="nav"
        align="left"
        justify="space-between"
        wrap="wrap"
        w="100%"
        >
    <HStack alignItems="flex-start">
        <Heading as="h4" size="md" w="300px">Twali 👁‍🗨</Heading>
    </HStack>
    <HStack alignItems="flex-end">
        <Box
            ml="2"
            mt="1"
            w="150px"
            backgroundColor="teal"
            borderRadius={16}
            >
        <Text pl={6} color="white" size="xs">0xP0...Z0p4</Text>
        </Box>
    </HStack>
    </Flex>
    )
  } else {
      return (
        <Flex
        h={10}
        mb={8}
        p={10}
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
      >
          <HStack spacing={10} alignItems="flex-start">
              <Heading w="300px">Twali 👁‍🗨</Heading>
          </HStack>
  
          <Box display={{ base: 'block', md: 'none'}} onClick={toggleMenu}>
              {show ? <CloseIcon /> : <HamburgerIcon />}
          </Box>
  
        <Box
          display={{ base: show ? 'block' : 'none', md: 'block' }}
          flexBasis={{ base: '100%', md: 'auto' }}
        >
          <Flex
            align="center"
            justify={['center', 'space-between', 'flex-end', 'flex-end']}
            direction={['column', 'row', 'row', 'row']}
            pt={[4, 4, 0, 0]}
          >
            <HamburgerItem isLast={false} to="/directory">Directory</HamburgerItem>
            <HamburgerItem isLast={false} to="/profile">Profile</HamburgerItem>
          </Flex>
        </Box>
      </Flex>
      )
  }
  
};

export default HeaderNav;