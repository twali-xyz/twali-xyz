import data from "../../../data";
import { NextApiHandler } from "next";

const submitBountyHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const bounty = JSON.parse(req.body).bounty;
      await data.submitBounty(bounty);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json("bounty posted");
    } catch (error) {
      console.log('submitBounty related error: ', error);
    }
  } else {
    console.log('submitBounty related error');
  }
};

export default submitBountyHandler;
