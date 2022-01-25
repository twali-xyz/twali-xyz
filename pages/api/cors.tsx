import Cors from 'cors'

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function initMiddleware(middleware) {
    return (req, res) =>
      new Promise((resolve, reject) => {
        middleware(req, res, (result) => {
          if (result instanceof Error) {
            return reject(result)
          }
          return resolve(result)
        })
      })
  }
// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async function handler(req, res) {
  // Run cors
  await cors(req, res)

  // Rest of the API logic

  var clearbit = require('clearbit')(process.env.CLEARBIT_APIKEY);
  var Autocomplete = clearbit.NameToDomain;
  console.log('USER SENT REQUEST', req.query.params);

  Autocomplete.find({name: req.query.params})
  .then(function (company) {
    res.status(200).json({ message: company });
  })
  .catch(Autocomplete.QueuedError, function (err) {
    // Company lookup queued - try again later
  })
  .catch(Autocomplete.NotFoundError, function (err) {
    // Company could not be found
    console.log(err);
  })
  .catch(function (err) {
    console.error(err);
  });
}