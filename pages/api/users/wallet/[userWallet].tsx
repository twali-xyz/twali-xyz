import data from "../../../../data";
import { NextApiHandler } from "next";

const getUserByWalletHandler: NextApiHandler = async (req, res) => {
  try {
    const getUserByWalletInfo = await data.getUserByWallet(
      req.query.userWallet
    );
    console.info(getUserByWalletInfo);

    res.status(200).json(getUserByWalletInfo);
  } catch {
    res.status(404).json("User not found");
  }
};

export default getUserByWalletHandler;
