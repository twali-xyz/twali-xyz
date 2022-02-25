import data from "../../../data";
import { NextApiHandler } from "next";

const getUserHandler: NextApiHandler = async(req, res)=> {
        // console.log(req.query.id);
    try{
        const getUserInfo = await data.getUser(req.query.id);
        res.status(200).json(getUserInfo);
        } catch{
        res.status(404).json("User not found");
    }
};

export default getUserHandler;