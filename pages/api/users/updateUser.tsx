import data from "../../../data";
import { NextApiHandler } from "next";

const updateUserProfileHandler: NextApiHandler = async (req, res) => {
  if (req.method === "PUT") {
    if (req.query.updateUser == "expertise") {
      try {
        const attributes = JSON.parse(req.body).userData.attributes;
        const userWallet = JSON.parse(req.body).userData.userWallet;
        await data.updateUserExpertise(userWallet, attributes);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json("data posted");
      } catch (error) {
        console.log(error);
      }
    } else if (req.query.updateUser == "profile") {
      try {
        const attributes = JSON.parse(req.body).userData.attributes;
        const userWallet = JSON.parse(req.body).userData.userWallet;
        await data.updateUserProfile(userWallet, attributes);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json("data posted");
      } catch (error) {
        console.log(error);
      }
    } else if (req.query.updateUser == "company") {
      try {
        const attributes = JSON.parse(req.body).userData.attributes;
        const userWallet = JSON.parse(req.body).userData.userWallet;
        await data.updateUserCompanyData(userWallet, attributes);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json("data posted");
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    console.log("error");
  }
};

export default updateUserProfileHandler;
