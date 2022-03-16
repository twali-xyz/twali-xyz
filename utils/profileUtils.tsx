import { Permission } from "./PermissionTypes";
import AWS from "aws-sdk";

// Function that simulates fetching a permission from remote server
export const fetchPermission =
  (currentUserName, loggedInUserAddress) =>
  async (permission: Permission): Promise<boolean> => {
    let user = {
      userName: currentUserName,
      permissions: ["view"],
    };
    // permissions: ["view"] for restricted

    let userData;
    if(currentUserName !== 'undefined'){
      const data = await fetch(
        `/api/users/${currentUserName}`
      );
  
      const userData: any = await data.json();
      if (userData && userData.userWallet === loggedInUserAddress) {
        user = {
          userName: currentUserName,
          permissions: ["edit"],
        };
        return user.permissions.includes(permission);
      } else {
        return user.permissions.includes(permission);
      }
    }
    console.log("PERMISSION DATA:", userData);
  };

export const convertFromDB = (companyInfo) => {
  AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "us-east-1",
      // endpoint: "http://localhost:8000",
  });
  let converterOptions = {
    convertEmptyValues: true,
    wrapNumbers: true,
  }
  const formattedData =  AWS.DynamoDB.Converter.output(companyInfo, converterOptions);
  return formattedData;
}