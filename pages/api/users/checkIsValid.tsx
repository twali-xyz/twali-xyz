import data from "../../../data";
import { NextApiHandler } from "next";

const checkIsValidHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    if (req.query.isValid == "userName") {
      try {
        const userName = JSON.parse(req.body);
        let valid = await data.userNameIsValid(userName);
        // res.setHeader("Content-Type", "application/json");
        res.status(200).json(JSON.stringify(valid));
        // res.end(JSON.stringify(valid));
      } catch (error) {
        console.log(error);
      }
    } 
  } else {
    console.log("error");
  }
};

export default checkIsValidHandler;
