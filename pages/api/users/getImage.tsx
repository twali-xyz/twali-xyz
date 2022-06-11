import { NextApiHandler } from "next";
import aws from "aws-sdk";

aws.config.update({
  region: "us-east-1",
});

function encode(data) {
  let buf = Buffer.from(data);
  let base64 = buf.toString("base64");
  return base64;
}

const getImageHandler: NextApiHandler = async (req, res) => {
  try {
    const s3 = new aws.S3({
      region: "us-east-1",
    });

    // Setting up S3 upload parameters
    const params = {
      Bucket: "test-pfp-images",
      Key: `images/${req.query.uuid}/profileImage.jpg`, // File name you want to retrieve from S3
    };

    const data = await s3
      .getObject(params)
      .promise()
      .then((res) => {
        let url = encode(res.Body);
        return url;
      });

    return res.status(200).json(JSON.stringify(data));
  } catch {
    res.status(404).json("Image not found");
  }
};

export default getImageHandler;
