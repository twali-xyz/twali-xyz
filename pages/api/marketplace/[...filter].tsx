import { NextApiHandler } from "next";

const getAllBounties: NextApiHandler = async (req, res) => {
  console.log("NEW REQUEST.....");
  console.log("DATA: ", req.query);

  try {
    await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        res.status(200).json(JSON.stringify(json));
      });
  } catch {
    res.status(404).json("Bounties not found");
  }
};

export default getAllBounties;
