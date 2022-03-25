// import { uploadFile, getFileStream } from '../../../infrastructure/s3';
import fs from 'fs';
// import util from 'util';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import aws from 'aws-sdk';
import middleware from '../../../infrastructure/middleware'
import nc from 'next-connect'

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: "us-east-1",
  // endpoint: "http://localhost:8000",
});

export const config = {
  api: {
    bodyParser: false
  }
}


const uploadImageHandler = nc<NextApiRequest, NextApiResponse>(); 
uploadImageHandler.use(middleware);
uploadImageHandler.post(async (req: any, res) => {
  console.log(req.body)
  console.log(req.files.file[0])
  let file = req.files.file[0];
            // Setting up S3 upload parameters
            const params = {
                Bucket: 'test-pfp-images',
                Key: file.originalFilename, // File name you want to save as in S3
                Body: file
            };

          s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        });
})

export default uploadImageHandler;

// const uploadImgHandler: NextApiHandler = async (req, res) => {
//   if (req.method === "POST") {
//     try { 
//         console.log(req);
        // aws.config.update({
        //     // accessKeyId: "AKIAXRF2N5UWK3H4WEXK",
        //     // secretAccessKey: "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",
        //     region: "us-east-1",
        //     // signatureVersion: 'v4',
        //   });
        // const fileContent = fs.readFileSync(file);

        // const fileContent = fs.readFileSync(file);

          // Setting up S3 upload parameters
            // const params = {
            //     Bucket: 'test-pfp-images',
            //     Key: file.filename, // File name you want to save as in S3
            //     Body: fileContent
            // };
        
        // s3.upload(params, function(err, data) {
        //     if (err) {
        //         throw err;
        //     }
        //     console.log(`File uploaded successfully. ${data.Location}`);
        // }).promise();
    //   res.status(200).json(post);
    //   res.status(200).json("image uploaded");
      // res.end();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else {
  //   console.log("error");
  // }
// };

// export default uploadImgHandler;
