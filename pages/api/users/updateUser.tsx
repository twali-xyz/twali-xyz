import data from "../../../data";
import { NextApiHandler } from "next";

const updateUserProfileHandler: NextApiHandler = async (req, res) => {
    console.log('UPDATE USER API', req.method);
    console.log('BODYYYYY', req.body);
    console.log(req.query);
    if (req.method === "PUT") {
      if (req.query.updateUser == 'experience') {
        try {
          const attributes = JSON.parse(req.body).userData.attributes;
          const userWallet = JSON.parse(req.body).userData.userWallet;
          await data.updateUserExperience(userWallet, attributes);
          res.setHeader("Content-Type", "application/json");
          res.status(200).json("data posted");
        } catch (error) {
          console.log(error);
        } 
      } else if (req.query.updateUser == 'profile') {
          try {
            const attributes = JSON.parse(req.body).userData.attributes;
            const userWallet = JSON.parse(req.body).userData.userWallet;
            await data.updateUserProfile(userWallet, attributes);
            res.setHeader("Content-Type", "application/json");
            res.status(200).json("data posted");
          } catch (error) {
            console.log(error);
          }
        } else if (req.query.updateUser == 'company') {
          try {
            console.log(JSON.parse(req.body).userData);
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
