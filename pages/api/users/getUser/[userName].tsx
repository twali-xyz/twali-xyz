import data from "../../../../data";
import { NextApiHandler } from "next";

const getUserHandler: NextApiHandler = async (req, res) => {
  console.log(req);
  try {
    const jsonData = await data.getUser(req.query.userName)
    console.log(jsonData);
    res.status(200).json(JSON.stringify(jsonData));
    } catch {
    res.status(404).json("User not found");
  }
};

export default getUserHandler;

// export async function getUser(userName) {
//   const getUserInfo = await data.getUser(userName);
//   return getUserInfo;
// }
