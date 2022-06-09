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

const uploadWerkFilesHandler = nc<NextApiRequest, NextApiResponse>();
uploadWerkFilesHandler.use(middleware);
uploadWerkFilesHandler.post(async (req: any, res) => {
  const s3 = new aws.S3({
    region: "us-east-1",
  });

  let files = req.files;
  let userWallet = req.body.userWallet;
  console.log('Inside postWerkFiles');

  // Setting up S3 upload parameters
  for(let i = 0; i < files.length; i++) {
    const fileStream = fs.createReadStream(files[i].path);
    const params = {
      Bucket: "sow-builder-files",
      Key: `${userWallet}/${files[i].originalFilename}`, // File name you want to save as in S3
      Body: fileStream,
    };

    let uploaded = s3.upload(params, function (err, data) {
      console.log('uppppload the file time');
      if (err) {
        throw err;
      }
      console.log(`File ${files[i].originalFilename} uploaded successfully. ${data.Location}`);
    });

    if (uploaded) {
      res.status(200).json("UPLOADED");
    }
  }
});

export default uploadWerkFilesHandler;
