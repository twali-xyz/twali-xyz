import data from "../../../../data";
import { NextApiHandler } from "next";

const getUserWhitelistStatusByWallet: NextApiHandler = async (req, res) => {
  try {
    const whitelistStatus = await data.getWhitelistStatus(req.query.userWallet);
    console.log("STATUS: ", whitelistStatus);

    res.status(200).json(whitelistStatus);
  } catch {
    res.status(404).json("User not found");
  }
};

export default getUserWhitelistStatusByWallet;
