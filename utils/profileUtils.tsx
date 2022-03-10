import { Permission } from "./PermissionTypes";

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
