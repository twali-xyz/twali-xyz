import { 
    FormControl, 
    FormLabel,
    Input, 
    Button,
    VStack,
    HStack, 
    // Select, 
    Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { createContract } from "../../utils/contractCreateInterface";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
const contractABI = require("../../utils/twaliCloneContractAbi");

const contractAddress = "0xB2ba74534dEb6e71170751322132167B1Faee0DD";
const devKey = process.env.ALCHEMY_DEV_KEY;
console.log(devKey);
const web3 = createAlchemyWeb3(`wss://eth-rinkeby.ws.alchemyapi.io/v2/${devKey}`);

export const twaliCloneFactory = new web3.eth.Contract(contractABI.ABI, contractAddress);

// Form that submits and creates contract clones
export function NewContractForm ({ userWallet }){
    const [sowURI, setSowURI] = useState("");
    const [status, setStatus] = useState<string | JSX.Element>();
    const [clone, setClone] = useState("");

    useEffect(() => {
        cloneSmartContractListener();
    },[]);


    const handleChange = (evt) => {
        evt.persist();
        setStatus("");
        const value = evt.target.value;
        setSowURI(value)
    };


    const cloneSmartContractListener = () => {
        twaliCloneFactory.events.TwaliCloneCreated({}, (error, data) => {
            if (error) {
                setStatus("😥 " + error.message);
            } else {
                console.log(data);
                setClone(data.returnValues[0]);
                setStatus("🎉 New Contract created!")
            }
        })
    };


  const createContractPressed = async () => {
      const { status } = await createContract(userWallet, sowURI);
      setStatus(status);
  };

    return (
      <VStack
        width={"25vw"}
        minW={"400px"}
        maxW={"600px"}
        background={"inverse"}
        height={"calc(100vh)"}
        paddingTop={"90px"}
        paddingX={"54px"}
      >
        <HStack
          width={"100%"}
          alignItems={"baseline"}
          justifyContent={"space-between"}
          p={0}
        >
          <FormControl>
            <FormLabel>Create Contract</FormLabel>
            <Text fontSize="16px" marginBottom="8px !important">
              {userWallet}
            </Text>
            <Input
              fontSize="16px"
              placeholder="SOW Url"
              name="sowMetaData"
              marginBottom={"8px !important"}
              value={sowURI}
              onChange={handleChange}
            />
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
          </FormControl>
        </HStack>
      </VStack>
    );
};

