import { NextApiHandler } from "next";
import Router from "next/router";
import data from "../../../../data";

const retrieveWhitelist: NextApiHandler = async (req, res) => {
  try {
    let info = await data.getWhitelist(req.query.userWallet);

    res.status(200).json(JSON.stringify(info));
  } catch {
    res.status(404).json("User Not Authorized");
  }
};

export default retrieveWhitelist;
