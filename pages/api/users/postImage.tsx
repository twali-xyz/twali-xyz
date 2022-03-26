import { NextApiRequest, NextApiResponse } from "next";
import middleware from '../../../infrastructure/middleware'
import aws from 'aws-sdk';
import nc from 'next-connect'
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
}

aws.config.update({
  region: "us-east-1",
});

const uploadImageHandler = nc<NextApiRequest, NextApiResponse>(); 
uploadImageHandler.use(middleware);
uploadImageHandler.post(async (req: any, res) => {

  const s3 = new aws.S3({
    region: "us-east-1",
  });

  let file = req.files.file[0];
  let uuid = req.body.uuid[0];

  const fileStream = fs.createReadStream(file.path);

  // Setting up S3 upload parameters
  const params = {
    Bucket: 'test-pfp-images',
    Key: `images/${uuid}/profileImage.jpg`, // File name you want to save as in S3
    Body: fileStream
  };
        
  let uploaded = s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });

  if (uploaded) {
    res.status(200).json('UPLOADED');
  }
})

export default uploadImageHandler;