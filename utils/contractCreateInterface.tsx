import { createAlchemyWeb3 } from "@alch/alchemy-web3";
const alchemyDevKey = process.env.ALCHEMY_DEV_KEY;

const web3 = createAlchemyWeb3(`wss://eth-rinkeby.ws.alchemyapi.io/v2/${alchemyDevKey}`);

const contractABI = require("./twaliCloneContractAbi");
const contractAddress = "0xD31766Bba01E3cAA21D8eb2Db8830C78940Feb26";

export const twaliCloneFactory = new web3.eth.Contract(contractABI.ABI, contractAddress);


export const loadCloneContracts = async (address) => {
    const clones = await twaliCloneFactory.methods.returnContractClones(address).call();
    console.log(clones);
    return clones;
};


// export const loadLatestContract = async (address) => {
//   let options = {
//     fromBlock: 0,
//     toBlock: 'latest'
//   };
//   const latest = await twaliCloneFactory.getPastEvents("TwaliCloneCreated",options, function(error, events){console.log(events)});
//   console.log(latest);
//   return latest;
// };    


// export const contractTranxStatus = () => {
//     web3.eth.subscribe('pendingTransactions', (error, result)=> {
//       if(!error){
//         console.log(result);
//       }
//     }).on('data', (transaction)=> {
//         console.log(transaction);
//     })

// }


export const createContract = async (address, sowMetaData, contractAmount, contractStartDate, contractEndDate) => {

    if (!window.ethereum || address === null) {
        return {
          status:
            "💡 Connect your Metamask wallet to create a new contract.",
        };
      }
    // // Error if there is not SOW added to contract creation form.
    // if (sowMetaData.trim() === "") {
    //     return {
    //         status: "❌ You need to provide an SOW URL",
    //     };
    // }

    const trxParams = {
        to: contractAddress,
        from: address,
        data: twaliCloneFactory.methods.createTwaliClone(sowMetaData, contractAmount, contractStartDate, contractEndDate).encodeABI(),
    };

    // Sign transaction for creating contract
    try {
       const trxHash = await web3.eth.sendTransaction(
        trxParams)
       .on('transactionHash', (hash)=> {
          console.log("trxHash", hash);
       })
       .on('receipt', (receipt)=>{
        console.log("receipt", receipt);
    });

    console.log(trxHash);
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
