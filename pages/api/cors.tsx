import Cors from "cors";

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  // Rest of the API logic
  try {
    const data = await getData(req, res);
    res.status(200).json({ message: data });
  } catch (error) {
    console.error(error);
  }
}

// Clearbit NameToDomain API request
const getData = (req, res) => {
  return new Promise((resolve, reject) => {
    var clearbit = require("clearbit")(process.env.CLEARBIT_APIKEY);
    var Autocomplete = clearbit.NameToDomain;
    console.log("USER SENT REQUEST", req.query.params);

    return resolve(Autocomplete.find({ name: req.query.params }));
  });
};
