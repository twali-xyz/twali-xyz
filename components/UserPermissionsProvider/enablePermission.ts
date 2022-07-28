import { useContext, useEffect, useState } from "react";
import PermissionContext from "./UserPermissionsContext";
import { Permission } from "../../utils/PermissionTypes";

const enablePermission = (permission: Permission) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState<boolean>();

  const { isAllowedTo } = useContext(PermissionContext);

  useEffect(() => {
    isAllowedTo(permission).then((allowed) => {
      setLoading(false);
      setAllowed(allowed);
    });
  }, [isAllowedTo])
  return [loading, allowed];
};

export default enablePermission;
