import { NextApiHandler } from "next";
import data from "../../../data";

const whitelistStatusHandler: NextApiHandler = async (req, res) => {
  console.log(JSON.parse(req.body));
  try {
    let info = await data.updateWhitelistStatus(
      JSON.parse(req.body)["payload"]["userWallet"],
      JSON.parse(req.body)["payload"]["whitelistStatus"]
    );
    console.log("INFO: ", info);

    res.status(200).json(JSON.stringify(info));
  } catch {
    res.status(404).json("ERROR UPDATING USER WHITELIST STATUS");
  }
};

export default whitelistStatusHandler;
