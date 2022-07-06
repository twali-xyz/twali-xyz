import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../../../infrastructure/middleware";
import aws from "aws-sdk";
import nc from "next-connect";

export const config = {
  api: {
    bodyParser: false,
  },
};

aws.config.update({
  region: "us-east-1",
});

const removeWerkFileHandler = nc<NextApiRequest, NextApiResponse>();
removeWerkFileHandler.use(middleware);
removeWerkFileHandler.delete(async (req: any, res) => {
  console.log(req);
  let file = req.files.file[0];
  let userWallet = req.body.userWallet[0];
  let contractID = req.body.contractID[0];
  console.log("Inside removeWerkFile");
  const s3 = new aws.S3({
    region: "us-east-1",
  });
  // Setting up S3 upload parameters
  if (file && userWallet && contractID) {
    const params = {
      Bucket: "sow-builder-files",
      Key: `${userWallet}/${contractID}/${file.originalFilename}`, // File name you want to save as in S3
      s3ForcePathStyle: true,
    };

    try {
      await s3.headObject(params).promise();
      console.log("File Found in S3");
      try {
        await s3.deleteObject(params).promise();
        console.log("file deleted Successfully");
        res.send("deleted");
      } catch (err) {
        console.log("ERROR in file Deleting : " + JSON.stringify(err));
        res.send(err.stack);
      }
    } catch (err) {
      console.log("File not Found ERROR : " + err.code);
      res.send(err.stack);
    }
  }
});

export default removeWerkFileHandler;
