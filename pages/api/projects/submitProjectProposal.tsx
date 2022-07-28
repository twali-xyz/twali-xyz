import data from "../../../data";
import { NextApiHandler } from "next";

const submitProjectProposalHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const proposal = JSON.parse(req.body).proposalObj.proposal;
      const bounty = JSON.parse(req.body).proposalObj.bountyState;
      await data.submitProjectProposal(proposal, bounty);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json("proj proposal posted");
    } catch (error) {
      console.log('submitProjectProposal related error: ', error);
    }
  } else {
    console.log('submitProjectProposal related error');
  }
};

export default submitProjectProposalHandler;
