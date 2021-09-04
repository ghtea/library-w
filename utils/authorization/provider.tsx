import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";

import {useAuthentication} from "utils/authentication";
import {useRouter} from "utils/router";

import {AccessPermission, accessPermissionRegExpMap, Permission, Role, rolePermissionMap} from "./maps";

export type AuthorizationContext = {
  role: Role;
  hasPermission: (permission: Permission) => boolean
  hasAccess: (url: string) => boolean
};

const initialAuthorizationContext: AuthorizationContext = {
  role: Role.UNKNOWN,
  hasPermission: (permission: Permission) => false,
  hasAccess: (url: string) => false,
};

export const AuthorizationContext = createContext<AuthorizationContext>(initialAuthorizationContext);

export const useAuthorization = () => {
  return useContext(AuthorizationContext);
};

export const AuthorizationProvider: FunctionComponent = (props) => {
  const {router} = useRouter();
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
  
  // redirect
  useEffect(() => {
    if (router){
      const isNotFoundPage = router.pathname.match("/404") !== null;
      if (!isNotFoundPage) {
        if (!hasAccess(router.asPath)){
          router.push("/401");
        }
      } 
    }
  }, [hasAccess, router]);

  const value = useMemo(()=>{
    return ({
      role,
      hasPermission,
      hasAccess,
    })
  },[hasAccess, hasPermission, role])
  
  return (
    <AuthorizationContext.Provider value={value}>
      {props.children}
    </AuthorizationContext.Provider>
  );
};
