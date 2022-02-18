import data from "../../data";
import { NextApiHandler } from "next";


const apiHandler: NextApiHandler = async(req, res)=>{

    console.log("api/users", req.body);

    
    if(req.method === "POST") {
   try{ 
        const userDescription = JSON.parse(req.body).userDescription;
        await data.createUser(userDescription);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json("data posted");
    } catch (error) {
        console.log(error);
    }
    } else {
    console.log('error');
    }
}

export default apiHandler;