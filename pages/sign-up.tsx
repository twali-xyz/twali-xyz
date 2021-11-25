import { 
    Container, 
    Flex, 
    VStack
   } from '@chakra-ui/react';

import SignUpMenu from '../components/sign-up-menu/sign-up-menu';
import HeaderNav from '../components/header-nav/header-nav';

const SignUp = () => {
    return (
        <Container maxW="container.xl" p={12}>
            <HeaderNav isHome={true}/>
            <Flex h="full">
            <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
            <SignUpMenu/>
            </VStack>
            </Flex>
        </Container>
    )
}

export default SignUp;