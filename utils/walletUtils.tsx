import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { UserData } from "../utils/interfaces";

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

export const handleWalletConnect = async (
  userPage,
  setIsSubmitted,
  setLoaded,
  router
) => {
  try {
    const web3Modal = new Web3Modal({
      disableInjectedProvider: false,
      network: "rinkeby",
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              1: "https://eth-rinkeby.alchemyapi.io/v2/QtLM8rW9nB6DobDu8KQx-7fYMS2rBlky",
            },
          },
        },
      },
    });
    web3Modal.clearCachedProvider();
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const currAccount = accounts[0];

    setIsSubmitted(true);
    let userData: UserData = await getUserByWallet(currAccount);
    console.log(userData);
    if (userData && userData.userName && userData.userWallet) {
      if (router.query?.view == "public" && userPage && userPage.userName) {
        await router.push(`/${userPage.userName}`);
        router.reload(); // reloads the profile page after changing the shallow route
      } else if (
        router.query?.view == "public" &&
        userData &&
        userData.userName
      ) {
        await router.push(`/${userData.userName}`);
        router.reload(); // reloads the profile page after changing the shallow route
      } else {
        router.reload(); // reloads the profile page upon login
      }

      setIsSubmitted(false);
    } else {
      console.log("No profile, pls create one...");
      router.push("/steps");
    }
  } catch (err) {
    console.log("error: ", err);
    router.push("/steps");
    setLoaded(true);
  }
};

export const getUserByWallet = async (userWallet) => {
  let lowerCaseWallet = userWallet.toLowerCase();
  const res = await fetch(`/api/users/wallet/${lowerCaseWallet}`);

  const data: any = await res.json();

  console.log("RETRIEVE USER BY WALLET YO");
  return data;
};
