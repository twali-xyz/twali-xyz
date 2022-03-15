import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  HStack,
  Button,
  Text,
  Img,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";

const HamburgerItem = ({ children, isLast, to = "/" }) => {
  return (
    <Button
      variant="ghost"
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
    >
      <Link href={to}>{children}</Link>
    </Button>
  );
};

const HeaderNav = (props) => {
  const whichPage = props.whichPage;
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);

  if (whichPage === "index") {
    return (
      <Flex
        h={10}
        mb={8}
        p={4}
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
      >
        <Img
          width={"144px"}
          height={"auto"}
          src="/twali-assets/navbar_logo.png"
        />
        <HStack alignItems="center" w="130px" height={"32px"}>
          <Flex
            ml="2"
            mt="1"
            width={"100%"}
            height={"100%"}
            backgroundColor="transparent"
            border={"1px solid #F9FFF2"}
            alignItems={"center"}
            justifyItems={"center"}
            borderRadius={32}
          >
            <Text
              color="white"
              fontSize={"14px"}
              margin={"auto"}
              alignSelf={"center"}
              fontWeight={"700"}
              letterSpacing={"0.06em"}
              textTransform={"uppercase"}
            >
              0xb794f...
            </Text>
          </Flex>
        </HStack>
      </Flex>
    );
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
          <Heading as="h4" size="md" w="300px">
            Twali 👁‍🗨
          </Heading>
        </HStack>
        <HStack alignItems="flex-end">
          <Box ml="2" mt="1" w="150px" backgroundColor="teal" borderRadius={16}>
            <Text pl={6} color="white" size="xs">
              0xP0...Z0p4
            </Text>
          </Box>
        </HStack>
      </Flex>
    );
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

        <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
          {show ? <CloseIcon /> : <HamburgerIcon />}
        </Box>

        <Box
          display={{ base: show ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Flex
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
            pt={[4, 4, 0, 0]}
          >
            <HamburgerItem isLast={false} to="/directory">
              Directory
            </HamburgerItem>
            <HamburgerItem isLast={false} to="/profile">
              Profile
            </HamburgerItem>
          </Flex>
        </Box>
      </Flex>
    );
  }
};

export default HeaderNav;
