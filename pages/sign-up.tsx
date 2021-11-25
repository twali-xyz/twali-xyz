import { 
    Container, 
    Flex, 
    VStack
   } from '@chakra-ui/react';

import SignUpMenu from '../components/SignUpMenu/SignUpMenu';
import HeaderNav from '../components/HeaderNav/HeaderNav';

const SignUp = () => {
    return (
        <Container maxW="container.xl">
            <HeaderNav whichPage="sign-up"/>
            <Flex h="full">
            <VStack w="full" h="full" spacing={10} alignItems="flex-start">
            <SignUpMenu/>
            </VStack>
            </Flex>
        </Container>
    )
}

export default SignUp;