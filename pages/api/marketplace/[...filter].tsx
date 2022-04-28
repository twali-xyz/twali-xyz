import { NextApiHandler } from "next";
import jsonData from "../../../public/marketplaceTestJson.json";
const getAllBounties: NextApiHandler = async (req, res) => {
  console.log("NEW REQUEST.....");
  console.log("DATA: ", req.query);

  try {
    res.status(200).json(JSON.stringify(jsonData));
  } catch {
    res.status(404).json("Bounties not found");
  }
};

export default getAllBounties;
