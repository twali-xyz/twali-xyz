import { NextApiHandler } from "next";
import data from "../../../../data";

const filterWhitelistHandler: NextApiHandler = async (req, res) => {
  if (!Object.keys(req.query).includes("params")) {
    res.status(404).json("No filter");
    return;
  }
  try {
    let info = await data.fitlerWhitelist(req.query.params[0]);

    res.status(200).json(info);
  } catch {
    res.status(404).json("Whitelist Filter broke");
  }
};

export default filterWhitelistHandler;
