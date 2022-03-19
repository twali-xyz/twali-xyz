import data from "../../../data";
import { NextApiHandler } from "next";

const getAllUsersHandler: NextApiHandler = async (req, res) => {
  try {
    const allUsers = await data.getUsers();
    res.status(200).json(JSON.stringify(allUsers));
  } catch {
    res.status(404).json("User not found");
  }
};

export default getAllUsersHandler;
