import { useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  VStack,
  Link,
  Flex
} from "@chakra-ui/react";

import { UserData } from "../../../utils/interfaces";
import useUser from "../../../context/TwaliContext";
import { useRouter } from "next/router";

const SelectWerkModal = (props) => {
  const finalRef = useRef();
  const { setData, ...userState } = useUser();
  const [userData, setUserData] = useState<UserData>({
    ...userState,
    userName: "",
    userWallet: "",
    uuid: "",
    setData,
  });

  const [btnActive, setBtnActive] = useState(0);
  const router = useRouter();

  const handleChange = (evt) => {
    evt.persist();

    // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
    // setEventArray({ evt, setValues, values });
  };

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
        size="selectionXL"
      >
        <ModalOverlay />
        <ModalContent
          width="unset"
          backgroundColor={"n6"}
          boxShadow={"8px 16px 24px 0px #062B2A8F"}
          border={"1px solid rgba(88, 112, 112, 1)"}
          fontFamily={"PP Telegraf Light"}
        //   width="850px !important"
        //   height="420px !important"
        >
            <Flex
      m={0}
    //   maxW={"100%"}
    //   width={"100%"}
    //   height={"100%"}
      flexDir={["column", "column", "row"]}
      alignItems={"center"}
    //   minWidth={"100vw"}
    //   minHeight={"100vh"}
    >
      <VStack
        m={0}
        p={0}
        width="425px"
        height="420px"
        // width={["100%", "100%", "50%"]}
        // minH={["90vh", "75vh", "100vh"]}
        // height={"100%"}
        color={"inverse"}
        justifyContent={"center "}
        backgroundSize={"cover"}
        backgroundPosition={"100% "}
        cursor="pointer"
        onClick={() => {
            console.log('clci')
            router.push(`/create-werk`);
        //   setBtnActive(1);
        //   selectUserAccType("Expert");
        }}
        backgroundImage={
          btnActive == 1 || btnActive == 0
            ? "/twali-assets/step1_background.png"
            : null
        }
        backgroundColor={"inverse"}
      >
        <Text
          pos={"relative"}
        //   top={"100px"}
          fontSize={"32px"}
          fontStyle="normal"
          padding={"2px"}
          px={0}
          fontWeight={"400"}
          lineHeight={"126px"}
          width="279.35px"
          height="134.44px"
          textAlign="center"
          letterSpacing={"0.02em"}
          fontFamily={"GrandSlang"}
          color={btnActive == 1 || btnActive == 0 ? "inverse" : "zing"}
          backgroundColor={
            btnActive == 1 || btnActive == 0 ? "zing" : "inverse"
          }
        >
          SOLO WERK
        </Text>
      </VStack>
      <VStack
        m={0}
        p={0}
        width="425px"
        height="420px"
        // width={["100%", "100%", "50%"]}
        // minH={["90vh", "75vh", "100vh"]}
        // height={"100%"}
        justifyContent={"center "}
        backgroundSize={"cover"}
        backgroundPosition={"100% "}
        cursor="pointer"
        onClick={() => {
            console.log('clic')
        //   setBtnActive(2);
        //   selectUserAccType("Client");
        }}
        backgroundImage={
          btnActive == 2 ? "/twali-assets/step1_background.png" : null
        }
        backgroundColor={"inverse"}
      >
        <Text
          pos={"relative"}
        //   top={"100px"}
          fontFamily={"PP Telegraf"}
          fontStyle="normal"
          padding={"2px"}
          px={0}
          fontWeight={"300"}
          fontSize={"18px"}
          lineHeight={"88px"}
          letterSpacing={"0.02em"}
          color={btnActive == 2 ? "inverse" : "#FFFFFF"}
          backgroundColor={btnActive == 2 ? "#FFFFFF" : "inverse"}
        >
          Group Werk (coming soon)
        </Text>
      </VStack>
    </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectWerkModal;
