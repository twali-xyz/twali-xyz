import { 
    Container, 
    Flex, 
    VStack
   } from '@chakra-ui/react';

import HeaderNav from '../components/HeaderNav/HeaderNav';
import SignUpSteps from '../components/Steps/Steps';

const Steps = () => {
    return (
        <Container maxW="container.xl" pb={6}>
            <HeaderNav whichPage="steps"/>
            <Flex h="full">
            <VStack w="full" h="full" spacing={8} alignItems="flex-start">
            <SignUpSteps/>
            </VStack>
            </Flex>
        </Container>
    )
}

export default Steps;