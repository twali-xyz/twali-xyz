import data from "../../../data";
import { NextApiHandler } from "next";

const checkUserNameHandler: NextApiHandler = async (req, res) => {
    if (req.method === "POST") {
        console.log(req.body);
        try {
            const userName = JSON.parse(req.body);
            await data.userNameIsValid(userName);
            res.setHeader("Content-Type", "application/json");
            res.status(200).json("data posted");
        } catch (error){
            console.log(error);
        }
}  else {
    console.log("error");
}
};

export default checkUserNameHandler;