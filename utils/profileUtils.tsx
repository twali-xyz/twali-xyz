import { Permission } from "./PermissionTypes";
import { countriesConstants } from "./countriesConstants";

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

// Function that retrieves a list of countries options for a dropdown
export const listOfCountries = () => {
  let list = [];
  for (let i = 0; i < countriesConstants.length; i++) {
    list.push(
      <option key={`${i}--countryOption`}>{countriesConstants[i]}</option>
    );
  }
  return list;
};
