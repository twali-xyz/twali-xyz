import { createAlchemyWeb3 } from "@alch/alchemy-web3";
const alchemyDevKey = process.env.ALCHEMY_KEY;

const web3 = createAlchemyWeb3(`wss://eth-rinkeby.ws.alchemyapi.io/v2/${alchemyDevKey}`);

const contractABI = require("./twaliCloneAbi");
const contractAddress = "0xB2ba74534dEb6e71170751322132167B1Faee0DD";

export const twaliCloneFactory = new web3.eth.Contract(contractABI.ABI, contractAddress);


export const loadCloneContracts = async (address) => {
    const clones = await twaliCloneFactory.methods.returnContractClones(address).call();
    return clones;
};


export const loadLatestContract = async (address) => {
  let options = {
    fromBlock: 0,
    toBlock: 'latest'
  };
  const latest = await twaliCloneFactory.getPastEvents("TwaliCloneCreated",options, function(error, events){console.log(events)});
  console.log(latest);
  return latest;
};


export const createContract = async (address, sowMetaData) => {

    if (!window.ethereum || address === null) {
        return {
          status:
            "💡 Connect your Metamask wallet to create a new contract.",
        };
      }
    // Error if there is not SOW added to contract creation form.
    if (sowMetaData.trim() === "") {
        return {
            status: "❌ You need to provide an SOW URL",
        };
    }

    const trxParams = {
        to: contractAddress,
        from: address,
        data: twaliCloneFactory.methods.createTwaliClone(address, sowMetaData).encodeABI(),
    };

    // Sign transaction for creating contract
    try {
       const trxHash = await window.ethereum.request({
           method: "eth_sendTransaction",
           params: [trxParams],
       });

       return {
        status: (
          <span>
            ✅{" "}
            <a target="_blank" href={`https://rinkeby.etherscan.io/tx/${trxHash}`}>
              View the status of your transaction on Etherscan!
            </a>
            <br />
            ℹ️ Once the transaction is verified by the network, the message will
            be updated automatically.
          </span>
        ), 
      };
    } catch (error){
      return {
        status: "😥 " + error.message,
      };
    }
};
