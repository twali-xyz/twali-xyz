import React from "react";
import { Permission } from "../../utils/PermissionTypes";
import enablePermission from "./enablePermission";

type Props = {
  to: Permission;
  fallback?: JSX.Element | string;
  loadingComponent?: JSX.Element | string;
};

// This component is meant to be used everywhere a restriction based on user permission is needed
const UserPermissionsRestricted: React.FunctionComponent<Props> = ({
  to,
  fallback,
  loadingComponent,
  children,
}) => {
  // We "connect" to the provider thanks to the PermissionContext
  const [loading, allowed] = enablePermission(to);

  if (loading) {
    return <>{loadingComponent}</>;
  }

  // If the user has that permission, render the children
  if (allowed) {
    return <>{children}</>;
  }

  // Otherwise, render the fallback
  return <>{fallback}</>;
};

export default UserPermissionsRestricted;
