import { NextApiHandler } from "next";
import data from "../../../data";

const referralHandler: NextApiHandler = async (req, res) => {
  console.log(JSON.parse(req.body));
  try {
    let info = await data.addReferralData(
      JSON.parse(req.body)["payload"]["userWallet"],

      JSON.parse(req.body)["payload"]["referredBy"]
    );

    res.status(200).json(JSON.stringify(info));
  } catch {
    res.status(404).json("ERROR UPDATING REFERRAL DATA");
  }
};

export default referralHandler;
