import { NextApiHandler } from "next";
import data from "../../../data";

const addUserToWhitelistHandler: NextApiHandler = async (req, res) => {
  try {
    let info = JSON.parse(req.body).payload;
    console.log(info);

    await data.addWhitelistUser(info);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json("data posted");
  } catch {
    res.status(404).json("ERROR ADDING USER TO WHITELIST");
  }
};

export default addUserToWhitelistHandler;
