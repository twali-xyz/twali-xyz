import data from "../../../data";
import { NextApiHandler } from "next";

const getAllUsersHandler: NextApiHandler = async (req, res) => {
  // console.log(req.query.id);
  try {
    const allUsers = await data.getUsers();
    console.log("ALL USERS", allUsers);
    res.status(200).json(allUsers);
  } catch {
    res.status(404).json("User not found");
  }
};

export default getAllUsersHandler;
