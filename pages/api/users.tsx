import data from "../../data";



export default async (req, res) => {
    console.log("api/users/newUser");

    const userDescription = JSON.parse(req.body).userDescription;
    await data.createUser(userDescription);
    res.status(200).end("User Created");
}