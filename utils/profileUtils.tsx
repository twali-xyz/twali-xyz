import { Permission } from "./PermissionTypes";
import useSWR from "swr";
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((response) => response.json());

// Function that simulates fetching a permission from remote server
export const fetchPermission =
  (currentUserName, loggedInUserAddress) =>
  async (permission: Permission): Promise<boolean> => {
    console.log(loggedInUserAddress);
    let user = {
      userName: currentUserName,
      permissions: ["view"],
    };
    // permissions: ["view"] for restricted
    // Simulate a delay from a request
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // const { data, error } = await useSWR(`/api/users/${currentUserName}`, fetcher);
    const res = await fetch(
      `http://localhost:3000/api/users/${currentUserName}`
    );
    const data: any = await res.json();
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
