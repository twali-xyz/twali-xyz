import { useState } from "react";
import { useRouter } from "next/router";
// import { ethers } from "ethers";
import { Input , Button} from "@chakra-ui/react";


export interface UserData {
    user_name: string,
    user_wallet: string,
    // prevState: null
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const { user_name } = context.query;

//     const response = await fetch(`/api/users/${user_name}`);
//     const user = await response.json();
//     console.log(user);
//     return {
//         props: { user }
//     };
// };



const NewUser = ()=> {
    // const router = useRouter();
    const [userDescription, setUserDescription] = useState<UserData>({
        user_name: '',
        user_wallet: ''
    });


    const createNewUser = async (e) => {
        e.preventDefault();
        await fetch("/api/users/new", {
            method: "POST",
            body: JSON.stringify({userDescription})
        });
    };



    const connectWallet = async () => {
        try{
            const { ethereum } = window;

            if (ethereum.networkVersion != "4") {
                alert("Need to be on rinkeby to test this");
                return;
            }

            if (!ethereum){
                alert("WHERE TF YOUR METAMASK?");
            }

            const account = await ethereum.request({
                method: "eth_requestAccounts"
            });
            // console.log("Connected", account[0]);
            // console.log({userDescription});
            setUserDescription({...userDescription, user_wallet: account[0]});

            } catch (error) {
            console.log(error);
        }
    }


    return(
        <>
        <div>
            <label>Create username and enter wallet info</label>
            <br />
            <Input
            type="text"
            name="user-name"
            value={userDescription.user_name || '' }
            placeholder="E.g. @Memeboii.eth"
            onChange={(e)=> setUserDescription({...userDescription, user_name: e.target.value})} 
            />
            <br /> 
            <Input
            type="text"
            name="user-wallet"
            value={userDescription.user_wallet || '' }
            placeholder="Eth wallet address"
            onChange={(e)=> setUserDescription({...userDescription, user_wallet: e.target.value})} 
            />
            <Button onClick={createNewUser}>Create User</Button>
            {userDescription.user_wallet == '' ? (<Button onClick={connectWallet}>Connect Wallet</Button>) : '' }
            <br />
            
        </div>
        {/* <div>
            <label>{user.user_name}</label>
            <label>{user.user_wallet}</label>
        </div> */}
        </>
    )
}



export default NewUser;