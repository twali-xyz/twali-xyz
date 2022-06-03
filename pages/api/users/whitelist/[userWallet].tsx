import data from "../../../../data";
import { NextApiHandler } from "next";

const getUserWhitelistStatusByWallet: NextApiHandler = async (req, res) => {
  console.log("DATA: ", req.query.userWallet);

  try {
    const whitelistStatus = await data.getWhitelistStatus(req.query.userWallet);
    console.log("STATUS: ", await whitelistStatus);

    res.status(200).json(whitelistStatus);
  } catch {
    res.status(404).json("User not found");
  }
};

export default getUserWhitelistStatusByWallet;
