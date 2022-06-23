import { NextApiHandler } from "next";
import data from "../../../data";

const retrieveWhitelist: NextApiHandler = async (req, res) => {
  try {
    let info = await data.getWhitelist();

    res.status(200).json(JSON.stringify(info));
  } catch {
    res.status(404).json("Whitelist not found");
  }
};

export default retrieveWhitelist;
