import { useState } from 'react';
import { Flex, Box, Heading, HStack, Button } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

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
  const isHome = props.isHome;
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);
  return isHome ? (
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
    </Flex>
    ):(
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
  );
};

export default HeaderNav;