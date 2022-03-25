import { Permission } from "./PermissionTypes";
import { countriesConstants } from "./countriesConstants";

const cache = {};

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
    if (!cache[permission]) {
      const data = await fetch(`/api/users/${currentUserName}`);
      userData = await data.json();
      cache[permission] = userData;
    } else {
      userData = cache[permission];
    }

    if (userData && userData.userWallet === loggedInUserAddress) {
      user = {
        userName: currentUserName,
        permissions: ["edit"],
      };
      cache[currentUserName] = userData;
      return user.permissions.includes(permission);
    } else {
      cache[currentUserName] = userData;
      return user.permissions.includes(permission);
    }
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
