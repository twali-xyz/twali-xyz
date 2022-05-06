import { createAlchemyWeb3 } from "@alch/alchemy-web3";
const alchemyDevKey = process.env.ALCHEMY_KEY;

const web3 = createAlchemyWeb3(`wss://eth-rinkeby.ws.alchemyapi.io/v2/${alchemyDevKey}`);

const contractABI = require("./twaliBaseAbi");

export const setTwaliClone = (contractaddress) =>{
    let twaliClone = new web3.eth.Contract(contractABI.BASEABI, contractaddress);
    // console.log(twaliClone);
    return twaliClone;
}