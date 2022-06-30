import { NextApiHandler } from "next";
import aws from "aws-sdk";

aws.config.update({
  region: "us-east-1",
});

const uploadSOWHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const s3 = new aws.S3({
        // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: "us-east-1",
        endpoint: "twali-contracts-bucket.s3.localhost.localstack.cloud:4566",
        s3ForcePathStyle: true,
      });
      const params = {
        Bucket: "twali-contracts-bucket",
        Key: `${JSON.parse(req.body)["bounty"]["userWallet"]}/${
          JSON.parse(req.body)["bounty"]["contractID"]
        }.json`, // File name you want to save as in S3
        Body: JSON.stringify(JSON.parse(req.body)["bounty"]),
        ContentType: "application/json", // need this set as json. Had to manual change this in S3 console.
        // ACL: 'public-read', // Will need to configure what is the read access for these objects by editing bucket policy permissions
        s3ForcePathStyle: true,
      };

      let uploaded = s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }
        console.log(`SOW uploaded successfully. ${data.Location}`);
      });

      if (uploaded) {
        let result = uploaded.promise().then((res) => res.Location);
        res.status(200).json(JSON.stringify(await result));
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("error");
  }
};

// Setting up S3 upload parameters

export default uploadSOWHandler;
