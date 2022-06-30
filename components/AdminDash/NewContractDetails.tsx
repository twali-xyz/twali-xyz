import { 
    Box,
    Button,
    Container,
    FormControl, 
    FormLabel,
    Input,
    Link, 
    VStack,
    HStack, 
    useDisclosure,
    Text,} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { Chip } from "../reusable/Chip";
// import DatePicker from "react-date-picker/dist/entry.nostyle";
import { 
  // contractTranxStatus, 
  createContract } from "../../utils/contractCreateInterface";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
const contractABI = require("../../utils/twaliCloneContractAbi");

const contractAddress = "0xD31766Bba01E3cAA21D8eb2Db8830C78940Feb26";
const devKey = process.env.ALCHEMY_DEV_KEY;

const web3 = createAlchemyWeb3(`wss://eth-rinkeby.ws.alchemyapi.io/v2/${devKey}`);

export const twaliCloneFactory = new web3.eth.Contract(contractABI.ABI, contractAddress);

// Interface
import { SmartContractData } from "../../utils/interfaces";
// Form that submits and creates contract clones
export function NewContractDetails ({
    contract_id, 
    client, 
    sowURI, 
    contract_amount, 
    contract_start_date, 
    contract_end_date
  }: SmartContractData){
    const [status, setStatus] = useState<string | JSX.Element>();
    const [clone, setClone] = useState("");
    const { isOpen, onClose, onToggle } = useDisclosure();

    // Contract State Variables 
    // const [sowURI, setSowURI] = useState("");
    const [value, onChange] = useState([new Date(), new Date()]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    console.log("mockdata props", 
    contract_id, 
    client, 
    sowURI, 
    contract_amount, 
    contract_start_date, 
    contract_end_date);

    useEffect(() => {
        // contractTranxStatus();
        convertStartDateString(contract_start_date);
        convertEndDateString(contract_end_date);
    },[]);


    // const handleChange = (evt) => {
    //     evt.persist();
    //     setStatus("");
    //     const value = evt.target.value;
    //     setSowURI(value)
    // };

    const convertStartDateString = (unixdate) => {
      const unix = unixdate;
      const millisec = unix * 1000;
      const dateObject = new Date(millisec);
      const format = dateObject.toLocaleDateString();
      setStartDate(format);
      return startDate;
    };

    const convertEndDateString = (unixdate) => {
      const unix = unixdate;
      const millisec = unix * 1000;
      const dateObject = new Date(millisec);
      const format = dateObject.toLocaleDateString();
      setEndDate(format);
      return endDate;
    };


  const createContractPressed = async () => {
      const { status } = await createContract(client, sowURI, contract_amount, contract_start_date, contract_end_date);
      console.log("contractstatus", status);
      setStatus(status);
  };

    return (
 
            <Box
        //   {...props}
          width={"90%"}
          height={"90%"}
          background={"n6"}
          padding={"32px"}
          border={"1px"}
          borderRadius={"8px"}
          borderColor={"n3"}
          boxShadow="8px 8px 24px 0px #00000026"
          _hover={{ boxShadow: "8px 8px 32px 8px #00000026" }}
        >    
        <VStack alignItems={"flex-start"}>
        <HStack>
          <Text color={"zing"}>Contract Address - {contract_id}</Text>
        </HStack>
        {/* <Box mt={"32px !important"} width={"100%"}>
          <Text
            fontFamily={"PP Telegraf Light"}
            fontSize={"16px"}
            width={"100%"}
            noOfLines={2}
          >
            {body}
          </Text>*/}
          <HStack>
              <Chip borderRadius={"4px"} height={"28px"} variant={"status"}>
               {"2 Days Remain"}
              </Chip>
              <Chip borderRadius={"4px"} height={"28px"} variant={"status"}>
               {"Active"}
              </Chip>
              <Chip borderRadius={"4px"} height={"28px"} variant={"status"}>
               {contract_amount}{" "}{"ETH"}
              </Chip>
            </HStack>
            <Text color={"subtle"}>Client - {client}</Text>
            {/* <Text color={"subtle"}>Expert - {"cloneAddress"}</Text> */}
            <Link
              _hover={{
                textDecor: "none",
                cursor: "pointer",
              }}
              href={sowURI}>
                <Text color={"subtle"}>Project Details: {sowURI}</Text>
              </Link>
            <Text color={"subtle"}>Start Date: {startDate}</Text>
            <Text color={"subtle"}>End Date: {endDate}</Text>

        </VStack>
      
            <Button
              pos={"relative"}
              alignSelf="center"
              variant={"primary"}
              size={"lg"}
              onClick={() => createContractPressed()}
            >
              <Text
                display={"flex"}
                width={"100%"}
                height={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                Create Contract
              </Text>
              {/* TODO: Add loading state on contract concreation */}
            </Button>
            <p>{status}</p>
     
          </Box> 
    );
};

