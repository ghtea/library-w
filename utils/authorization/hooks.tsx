import {useCallback, useMemo} from "react";

import {useAuthentication} from "utils/authentication";

import {AccessPermission, accessPermissionRegExpMap, Permission, Role, rolePermissionMap} from "./maps";


export const useAuthorization = () => {

  const {user} = useAuthentication();

  const role: Role = useMemo(() => {
    if (!user) return Role.UNKNOWN;
    if (user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL){
      return Role.OWNER
    }
    else {
      return Role.GUEST
    }
  }, [user]);

  const hasPermission = useCallback((permission: Permission): boolean => {
    return rolePermissionMap?.get(role)?.includes(permission) || false;
  }, [role]);

  const hasAccess = useCallback((url: string): boolean => {
    const matchingAccessPermissionList: AccessPermission[] = [];
    
    accessPermissionRegExpMap.forEach((value, key) => {
      if (url.match(value) !== null) {
        matchingAccessPermissionList.push(key)
      }
    });

    return matchingAccessPermissionList.every(item => {
      return rolePermissionMap?.get(role)?.includes(item) || false
    });
  }, [role]);

  return {
    role,
    hasPermission,
    hasAccess,
  };
};