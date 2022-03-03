// import Web3 from "web3";

// export const authRequest = async(address) => {
//     const response = await fetch(`/api/users/auth?=${address}`);
//     const data = await response.json();
//     console.log('nonce', data);
//     //get provider
//     const web3 = new Web3(window.ethereum);
//     // create user signing event save to userDescription
//     const signer = await web3.eth.personal.sign('Twali-xyz', address, `${data.nonce}`);
//     console.log({address, signer, nonce: data.nonce});
//     verifyFunc(address, signer, data.nonce)
// }

// const verifyFunc = async(address, signature, nonce) => {
//     const response = await fetch(`/api/users/verifyUser?=${address}&signature=${signature}&nonce=${nonce}`);
//     const data = await response.json()
// }