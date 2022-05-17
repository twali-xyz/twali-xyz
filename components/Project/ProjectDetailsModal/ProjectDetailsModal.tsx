import { useRef, useState } from "react";
import {
  Button,
  CircularProgress,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  FormLabel,
  FormControl,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
  Img,
  Input,
  Textarea,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { UserData } from "../../../utils/interfaces";
import useUser from "../../../context/TwaliContext";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";

const ProjectDetailsModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setData, ...userState } = useUser();
  const [userData, setUserData] = useState<UserData>({
    ...userState,
    userName: "",
    userWallet: "",
    uuid: "",
    setData,
  });
  const [dueDate, setDueDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [tokenName, setTokenName] = useState('Token');
  const [imgSrc, setImgSrc] = useState('');

  const handleChange = (evt) => {
    evt.persist();

    // the stripped event name should be the same as the name of the state variable that should be changed for setEventArray to function properly
    // setEventArray({ evt, setValues, values });
  };

const setMenuSelection = (tokenName, imgSrc) => {
    setTokenName(tokenName);
    setImgSrc(imgSrc);
}
  
  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent
          backgroundColor={"n6"}
          boxShadow={"8px 16px 24px 0px #062B2A8F"}
          border={"1px solid rgba(88, 112, 112, 1)"}
          fontFamily={"PP Telegraf Light"}
        >
        <ModalHeader mt={"20px"}>Statement of Werk</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                <FormControl p={2} id="werk-date-range">
                <VStack alignItems="start" m={0} p={0}>
                        <FormLabel
                        fontSize={"16px"}
                        lineHeight={"24px"}
                        fontWeight={"400"}
                        fontFamily={"PP Telegraf"}
                        >
                        <HStack spacing={8} paddingLeft={0}>
                        <Text>Dates</Text>
                        {/* <Text>End Date</Text> */}
                        </HStack>
                        </FormLabel>                    
                    <DateRangePicker
                    //   onChange={setStartDate}
                    //   className={ dateRange[0] && dateRange[1] ? 'date-range' : ''}
                      calendarIcon={<Img
                        // borderRadius="full"
                        // backgroundColor="transparent"
                        // width="16px"
                        src="/twali-assets/calendar.svg"
                        alt="calendar"
                        />}
                      onChange={setDateRange}
                      selectRange={true}
                      value={dateRange ? [new Date(dateRange[0]), new Date(dateRange[1])]: undefined}
                    />
                </VStack>
                    {/* {errors.companyStart && !companyData.companyStart && (
                      <Text fontSize="xs" fontWeight="400" color="red.500">
                        {errors.companyStart}
                      </Text>
                    )} */}
                    </FormControl>

                    <FormControl p={2} id="werk-due-date">
                    <FormLabel
                        fontSize={"16px"}
                        lineHeight={"24px"}
                        fontWeight={"400"}
                        fontFamily={"PP Telegraf"}
                        >
                        Due Date
                        </FormLabel>
                        <DatePicker
                            calendarIcon={<Img
                              // borderRadius="full"
                              // backgroundColor="transparent"
                              // width="16px"
                              src="/twali-assets/calendar.svg"
                              alt="calendar"
                              />}
                            onChange={setDueDate}
                            value={dueDate ? new Date(dueDate): undefined}
                        />
                    </FormControl>
                    <FormControl p={2} id="werk-amount">
                            {/* <Text
                            fontSize="xs"
                            height={"20.5px"}
                            fontWeight="400"
                            color="red.500"
                            visibility={errors.firstName ? "visible" : "hidden"}
                            >
                            {errors.firstName}
                            </Text> */}
                            <Menu 
                            placement="bottom" 
                            direction="rtl"
                            >
                            <MenuButton 
                                paddingInlineEnd="2rem"
                                maxWidth="100%"
                                outline="2px solid transparent"
                                outlineOffset="2px"
                                objectPosition="relative"
                                appearance="none"
                                background="inherit"
                                paddingBottom="1px"
                                fontSize="16px"
                                paddingInlineStart={4}
                                border="1px solid"
                                borderRadius="var(--twali-radii-md)"
                                height="var(--twali-sizes-10)"
                                borderColor="inherit"
                                fontFamily="PP Telegraf light"
                                textTransform="capitalize"
                                textAlign="start"
                                as={Button} rightIcon={ tokenName === 'Token' ? <ChevronDownIcon 
                                width="1.3rem" height="100%" 
                                color={tokenName === 'Token' ? "subtle !important" : 'fresh !important'}
                                right="0.5rem"
                                position="absolute"
                                fontSize="1.25rem"
                                display="inline-flex"
                                alignItems="center"
                                justifyContent="center"
                                pointerEvents="none"
                                top="50%"
                                transform="translateY(-50%)"
                                />: <Img
                                borderRadius="full"
                                backgroundColor="transparent"
                                width="16px"
                                src={imgSrc}
                                alt="add img"
                                />}>
                                {tokenName}
                            </MenuButton>
                            <MenuList
                                minWidth="9rem"
                                marginTop="-0.2rem"
                                background="rgb(4, 26, 25)"
                            >
                             <MenuItem minH='48px'
                                onClick={() => setMenuSelection("Token", '')}
                                >
                                <span className="werk-token-name">Token</span>
                                </MenuItem>
                                <MenuItem minH='48px'
                                onClick={() => setMenuSelection("ETH", "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png")}
                                >
                                <Img
                                borderRadius="full"
                                backgroundColor="transparent"
                                width="16px"
                                src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png"
                                alt="add img"
                                />
                                <span className="werk-token-name">ETH</span>
                                </MenuItem>
                                <MenuItem minH='40px'
                                onClick={() => setMenuSelection("USDC", "https://assets.trustwalletapp.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png")}
                                >
                                <Img
                                borderRadius="full"
                                backgroundColor="transparent"
                                width="16px"
                                src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                                alt="add img"
                                />
                                <span className="werk-token-name">USDC</span>
                                </MenuItem>
                            </MenuList>
                            </Menu>
                            {/* </HStack> */}
                            <FormLabel
                        fontSize={"16px"}
                        lineHeight={"24px"}
                        fontWeight={"400"}
                        fontFamily={"PP Telegraf"}
                        >
                        Amount
                        </FormLabel>
                        {/* <HStack> */}
                        <Input
                            px={2}
                            fontSize="16px"
                            borderColor={"n3"}
                            height={"40px"}
                            borderRadius={"4px"}
                            marginBottom={"4px"}
                            marginRight="14px"
                            required
                            width="100px"
                            // width="100%"
                            // isInvalid={errors.firstName}
                            errorBorderColor="red.300"
                            placeholder="1.0"
                            name="firstName"
                            fontFamily={"PP Telegraf light"}
                            _placeholder={{ color: "subtle" }}
                            // value={values?.firstName || ""}
                            onChange={handleChange}
                            />
                    </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="primary" size={"sm"} onClick={() => console.log('project sow modal save')}>
              Save{" "}
              {isSubmitted ? (
                <CircularProgress
                  size="22px"
                  thickness="4px"
                  isIndeterminate
                  color="#3C2E26"
                />
              ) : null}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectDetailsModal;
