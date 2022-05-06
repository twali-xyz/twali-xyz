import { useState } from "react";
import {
    FormControl,
    Input,
    Box,
    FormLabel,
    HStack,
    Img,
    Menu,
    MenuButton,
    Button,
    MenuItem,
    MenuList,
    Select,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import { ChevronDownIcon} from '@chakra-ui/icons'

  import DatePicker from "react-date-picker/dist/entry.nostyle";
  import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
  import { functionalExpertiseList } from "../../utils/functionalExpertiseConstants";
  import { industryExpertiseList } from "../../utils/industryExpertiseConstants";
  import { setEventArray } from "../../utils/setEventArray";
  import { MultiSelect } from "../reusable/MultiSelect";
  import IconOption from "./IconOption";
  
  export const datesAndPricing = ({ values }) => {
    const [dueDate, setDueDate] = useState(new Date());
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [tokenName, setTokenName] = useState('Token');
    const [imgSrc, setImgSrc] = useState('');
    // const [values, setValues] = useState<UserData>();

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
        <form 
        style={{ alignSelf: "start" }}
        >
    <HStack spacing={24}>
        <Box
          maxWidth={"496px"}
        //   h="100%"
          height="450px"
          w="xl"
          borderWidth="1px"
          borderRadius="lg"
        //   overflow="hidden"
          cursor="pointer"
          backgroundColor={"n6"}
          opacity={"90%"}
          boxShadow={"8px 16px 24px 0px #062B2A8F"}
        >
          <Box p="4">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
            //   isTruncated
            >
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
                            onChange={setDueDate}
                            value={dueDate ? new Date(dueDate): undefined}
                        />
                    </FormControl>
                    <FormControl p={2} id="werk-amount">
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
                                src="https://assets.trustwalletapp.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                                alt="add img"
                                />
                                <span className="werk-token-name">USDC</span>
                                </MenuItem>
                            </MenuList>
                            </Menu>
                            {/* </HStack> */}
                    </FormControl>
            </Box>
          </Box>
        </Box>
      {/* </form>
      <form 
      style={{ alignSelf: "start" }}
      > */}
        <Box
          maxWidth={"496px"}
          h="450px"
          w="xl"
          borderWidth="1px"
          borderRadius="lg"
        //   overflow="hidden"
          cursor="pointer"
          backgroundColor={"n6"}
          opacity={"90%"}
          boxShadow={"8px 16px 24px 0px #062B2A8F"}
        >
          <Box p="4">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
            //   isTruncated
            >
              <MultiSelect
                name={"functionalExpertise"}
                formLabel={"Superpowers"}
                handleChange={handleChange}
                options={functionalExpertiseList}
                maxSelections={3}
                defaultValues={values?.functionalExpertise || []}
              />

              <MultiSelect
                name={"industryExpertise"}
                formLabel={"Industry expertise"}
                handleChange={handleChange}
                defaultValues={values?.industryExpertise || []}
                options={industryExpertiseList}
                maxSelections={3}
              />
            </Box>
          </Box>
        </Box>
        </HStack>
      </form>
    );
  };
  