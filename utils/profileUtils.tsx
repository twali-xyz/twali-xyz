import { Permission } from "./PermissionTypes";

// Function that simulates fetching a permission from remote server
export const fetchPermission =
  (displayName) =>
  async (permission: Permission): Promise<boolean> => {
    let user = {
      userName: "nagmak",
      permissions: ["edit"],
    };
    // permissions: ["view"] for restricted
    // Simulate a delay from a request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return user.permissions.includes(permission);
  };
