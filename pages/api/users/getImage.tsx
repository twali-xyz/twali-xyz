import data from "../../../data";
import { NextApiHandler } from "next";
import aws from 'aws-sdk';

aws.config.update({
    region: "us-east-1",
    // endpoint: "http://localhost:8000",
  });
function encode(data) {
    let buf = Buffer.from(data);
    let base64 = buf.toString('base64');
    return base64
}

const getAllUsersHandler: NextApiHandler = async (req, res) => {
  try {
  const s3 = new aws.S3({
    region: "us-east-1",
    // httpOptions: {timeout: 3000}
  });
            // Setting up S3 upload parameters
            const params = {
                Bucket: 'test-pfp-images',
                Key: `images/${req.query.uuid}/profileImage.jpg`, // File name you want to save as in S3
            };
            // s3.getSignedUrl('getObject', params, function(err, url){
            //     // res.render('test/test', {header: 'TEST', url: url});
            //     return res.status(200).json(JSON.stringify(url));
            // });
            const data = await s3.getObject(params).promise().then(res => {
                console.log('DATA', res.Body);
                console.log('DATA encode', encode(res.Body));
                console.log('DATA stringify', JSON.stringify(res.Body));
                let url = encode(res.Body)
                return url;
            });
            
            return res.status(200).json(JSON.stringify(data));
  } catch {
    res.status(404).json("Image not found");
  }
};

export default getAllUsersHandler;
