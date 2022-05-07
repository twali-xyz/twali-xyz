import { NextApiHandler } from "next";
import data from "../../../data";

// import jsonData from "../../../public/marketplaceTestJson.json";

const getAllBounties: NextApiHandler = async (req, res) => {
  try {
    let info = await data.filterMarketplace(req.query);

    res.status(200).json(JSON.stringify(info["Items"]));
  } catch {
    res.status(404).json("Bounties not found");
  }
};

export default getAllBounties;
