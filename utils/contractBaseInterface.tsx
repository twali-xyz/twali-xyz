import { createAlchemyWeb3 } from "@alch/alchemy-web3";
const alchemyDevKey = process.env.ALCHEMY_DEV_KEY;

const web3 = createAlchemyWeb3(`wss://eth-rinkeby.ws.alchemyapi.io/v2/${alchemyDevKey}`);

const contractABI = require("./twaliContractAbi");


// Set the contract address to the Twali base contract abi to interact with contract function calls and read contract storage
export const setTwaliClone = (contractaddress) =>{
    let twaliClone = new web3.eth.Contract(contractABI.BASEABI, contractaddress);
    console.log(twaliClone);
    return twaliClone;
}


// Connects to contract by address and gathers the current state saved in storage.
export const getTwaliCloneStorage = async (contractaddress) => {
  let contract = await new web3.eth.Contract(
    contractABI.BASEABI,
    contractaddress
  );

  if (contract != undefined) {
    try {
      const status = contract.methods.getCurrentStatus().call();
      const sowMetaData = contract.methods.contract_sowMetaData().call();
      const startDate = contract.methods.contract_start_date().call();
      const endDate = contract.methods.contract_end_date().call();

      Promise.all([status, sowMetaData, startDate, endDate]).then((values) => {
        console.log(values);
      });
    } catch (error) {
      console.error();
    }
  }
};

// Functional call to activate the contract Draft => Live by adding Expert to contract, Duration, Payment Amount (to be paid to contract)
export const activateContract = async (expert, duration, payment_amt) => {

}