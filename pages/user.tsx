import { useState } from "react";
import { useRouter } from "next/router";


interface UserData {
    user_name: string,
    user_wallet: string,
    prevState: null
}


const NewUser = ()=> {
    const router = useRouter();
    const [userDescription, setUserDescription] = useState<UserData>();

    const handleUserInput = (e) =>{
        e.persist();
        setUserDescription({
            ...UserData,
            // [e.target.user_name]:value;
        })

    }


    return(
        <form>
            <label>Create username and enter wallet info</label>
            <br />
            <input 
            name="user-name"
            value={userDescription}
            placeholder="@Memeboii.eth"
            onChange={(e) => setUserDescription(e.target.value)} 
            />
        </form>
    )
}