import data from "../../data";



export default async (req, res) => {
    console.log("api/users", req.body);
   try{ 
    const userDescription = JSON.parse(req.body).userDescription;
    await data.createUser(userDescription);
    res.status(200).end("OK");
    } catch (error) {
    console.log(error);
   }
}