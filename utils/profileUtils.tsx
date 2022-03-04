import { Permission } from "./PermissionTypes";
import useSWR from "swr";
import db from "../data"
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((response) => response.json());

// Function that simulates fetching a permission from remote server
export const fetchPermission =
  (currentUserName, loggedInUserAddress) =>
  async (permission: Permission): Promise<boolean> => {
    let user = {
      userName: currentUserName,
      permissions: ["view"],
    };
    // permissions: ["view"] for restricted
    // Simulate a delay from a request
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // const { data, error } = await useSWR(`http://localhost:8000/api/users/${currentUserName}`, fetcher);
    // const data: any = await fetch(`/api/users/${currentUserName}`)
    // .then((res) => res.json())
    // .catch((error)=> console.log(error));
    const data: any = await db.getUser(currentUserName);
    console.log("PERMISSION DATA:", data);
    // console.log(data);
    if (data && data.userWallet === loggedInUserAddress) {
      user = {
        userName: currentUserName,
        permissions: ["edit"],
      };
      return user.permissions.includes(permission);
    }

    return user.permissions.includes(permission);
  };
