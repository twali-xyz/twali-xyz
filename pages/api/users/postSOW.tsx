import { NextApiHandler } from "next";
import aws from "aws-sdk";

aws.config.update({
  region: "us-east-1",
});

const uploadSOWHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    let result;
    try {
      const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: "us-east-1",
      });
      const params = {
        Bucket: "twali-contracts-bucket",
        Key: `${JSON.parse(req.body)["bounty"]["userWallet"]}/${
          JSON.parse(req.body)["bounty"]["contractID"]
        }.json`, // File name you want to save as in S3
        Body: JSON.stringify(JSON.parse(req.body)["bounty"]),
        s3ForcePathStyle: true,
      };

      let uploaded = s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }
        console.log(`SOW uploaded successfully. ${data.Location}`);
        result = data.Location;
      });

      if (uploaded) {
        res.status(200).json(result);
      }
      console.log(
        "THE BODY: ",
        JSON.parse(req.body)["bounty"],
        `${JSON.parse(req.body)["bounty"]["userWallet"]}/${
          JSON.parse(req.body)["bounty"]["contractID"]
        }.json`
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("error");
  }
};

// Setting up S3 upload parameters

export default uploadSOWHandler;
