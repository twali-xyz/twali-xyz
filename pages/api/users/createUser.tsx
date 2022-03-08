import data from "../../../data";
import { NextApiHandler } from "next";

const newUserHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req)
    try {
      const userData = JSON.parse(req.body).userData;
      await data.createUser(userData);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json("data posted");
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("error");
  }
};

export default newUserHandler;
