import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res)=> res.json());


const userProfile =()=> {
    const { query } = useRouter();
    console.log(query.id);
    const { data, error } = useSWR(`/api/users/${query.id}`, fetcher);
    
    if (error) return <div>>An error has occurred</div>;
    if (!data) return <div>Loading...'</div>;
   


return(
    <div>
        <div>
            <p>User: {data.user_name}</p>
            <p>Wallet:{data.user_wallet}</p>
        </div>
    </div>
    )
}

export default userProfile;