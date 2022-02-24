import data from "../../../data";
import { NextApiHandler } from "next";

const getUserHandler: NextApiHandler = async(req, res)=> {
    try{
        const getUser = await data.getUser(req.query.user_name);
        res.status(200).json(getUser);
    } catch{
        res.status(404).json("User not found");
    }
};

export default getUserHandler;