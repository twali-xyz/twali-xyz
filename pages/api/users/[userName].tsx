import data from "../../../data";
import { NextApiHandler } from "next";

const getUserHandler: NextApiHandler = async (req, res) => {
  try {
    const jsonData = await data.getUser(req.query.userName);

    if (jsonData) {
      res.status(200).json(JSON.stringify(jsonData));
    }
  } catch {
    res.status(404).json("User not found");
  }
};

export default getUserHandler;
