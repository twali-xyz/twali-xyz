import { NextApiHandler } from "next";
import data from "../../../../data";

const retrieveWhitelist: NextApiHandler = async (req, res) => {
  try {
    let info = await data.getWhitelist(req.query.userWallet);
    console.log(info);

    res.status(200).json(info);
  } catch {
    res.status(404).json("User Not Authorized");
  }
};

export default retrieveWhitelist;
