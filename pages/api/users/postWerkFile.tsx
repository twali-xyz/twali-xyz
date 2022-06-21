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

const uploadWerkFileHandler = nc<NextApiRequest, NextApiResponse>();
uploadWerkFileHandler.use(middleware);
uploadWerkFileHandler.post(async (req: any, res) => {
  const s3 = new aws.S3({
    region: "us-east-1",
  });

  let file = req.files.file[0];
  let userWallet = req.body.userWallet[0];
  let contractID = req.body.contractID[0];
  console.log('Inside postWerkFile');

  // Setting up S3 upload parameters
  const fileStream = fs.createReadStream(file.path);

  const params = {
    Bucket: "sow-builder-files",
    Key: `${userWallet}/${contractID}/${file.originalFilename}`, // File name you want to save as in S3
    Body: fileStream,
  };
          
  let uploaded = s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
      
  if (uploaded) {
    res.status(200).json("UPLOADED");
  }
});

export default uploadWerkFileHandler;
