import React from "react";
import { Permission } from "../../utils/PermissionTypes";

type UserPermissionsContextType = {
  isAllowedTo: (permission: Permission) => Promise<boolean>;
};

// Default behaviour for the Permission Provider Context
// i.e. if for whatever reason the consumer is used outside of a provider
// The permission will not be granted if no provider says otherwise
const defaultBehaviour: UserPermissionsContextType = {
  isAllowedTo: () => Promise.resolve(false),
};

// Create the context
const UserPermissionsContext =
  React.createContext<UserPermissionsContextType>(defaultBehaviour);

export default UserPermissionsContext;
