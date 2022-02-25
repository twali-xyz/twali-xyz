import React from "react";
import { Permission } from "../../utils/PermissionTypes";
import UserPermissionsContext from "./UserPermissionsContext";

type Props = {
  fetchPermission: (p: Permission) => Promise<boolean>;
};

type UserPermissionCache = {
  [key: string]: boolean;
};

// This provider is intended to be surrounding the whole application.
// It should receive the users permissions as parameter
const UserPermissionProvider: React.FunctionComponent<Props> = ({
  fetchPermission,
  children,
}) => {
  const cache: UserPermissionCache = {};

  // Creates a method that returns whether the requested permission is available in the list of permissions
  // passed as parameter
  const isAllowedTo = async (permission: Permission): Promise<boolean> => {
    if (Object.keys(cache).includes(permission)) {
      return cache[permission];
    }
    const isAllowed = await fetchPermission(permission);
    cache[permission] = isAllowed;
    return isAllowed;
  };

  // This component will render its children wrapped around a PermissionContext's provider whose
  // value is set to the method defined above
  return (
    <UserPermissionsContext.Provider value={{ isAllowedTo }}>
      {children}
    </UserPermissionsContext.Provider>
  );
};

export default UserPermissionProvider;
