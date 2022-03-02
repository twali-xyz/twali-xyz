import data from "../../../../data";
import { NextApiHandler } from "next";

const getUserHandler: NextApiHandler = async (req, res) => {
  try {
    const getUserInfo = await data.getUser(req.query.userName);
    res.status(200).json(getUserInfo);
  } catch {
    res.status(404).json("User not found");
  }
};

export default getUserHandler;
