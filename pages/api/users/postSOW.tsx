import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../../../infrastructure/middleware";
import aws from "aws-sdk";
import nc from "next-connect";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

aws.config.update({
  region: "us-east-1",
});

const uploadSOWHandler = nc<NextApiRequest, NextApiResponse>();
uploadSOWHandler.use(middleware);
uploadSOWHandler.post(async (req: any, res) => {
  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
  });
  console.log("BODY: ", req.body);

  let content = req.body;

  console.log("Inside postWerkFile");

  // Setting up S3 upload parameters
  const fileStream = fs.createReadStream(content.path);

  const params = {
    Bucket: "twali-contracts-bucket",
    Key: `test.json`, // File name you want to save as in S3
    Body: "{}",
  };

  let uploaded = s3.putObject(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`SOW uploaded successfully. ${data.Location}`);
  });

  if (uploaded) {
    res.status(200).json("UPLOADED");
  }
});

export default uploadSOWHandler;
