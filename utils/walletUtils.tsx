/**
 *  walletUtils.tsx contains util methods for wallet connection
 */

// Get user's eth address
export async function connect() {
  const { ethereum } = window;
  let account;

  if (!ethereum) {
    console.log("Connect your ethereum wallet!");
    return;
  }

  await ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
    if (accounts.length !== 0) {
      account = accounts[0];
      console.log("Found an authorized account: ", account);
    } else {
      console.log("No authorized account found!");
    }
  });
  return account;
}
