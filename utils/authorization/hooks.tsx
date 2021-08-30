// WIP: work!!
export const useAuthorization = () => {

  const {} = useAuthentication();

  const userRole: RoleMapKey | null = useMemo(() => {
    if (isInvitationPending) {
      return "PENDING";
    } else if (userType === SportsUserType.ORG) {
      return "ORG";
    } else {
      return store.navigation.teamAuthority;
    }
  }, [isInvitationPending, store.navigation.teamAuthority, userType]);

  const hasRole = useCallback((role: RoleMapKey): boolean => {
    if (!userRole) return false;

    return userRole === role;
  }, [userRole]);

  const hasPermission = useCallback((permission: PermissionMapKey): boolean => {
    if (!userRole || !roleMap.has(userRole)) return false;

    return roleMap?.get(userRole)?.includes(permission) || false;
  }, [userRole]);

  const hasSomePermissions = useCallback((permissions: PermissionMapKey[]): boolean => {
    if (!userRole || !roleMap.has(userRole)) return false;

    return permissions.some(permission => roleMap?.get(userRole)?.includes(permission));
  }, [userRole]);

  const hasEveryPermissions = useCallback((permissions: PermissionMapKey[]): boolean => {
    if (!userRole || !roleMap.has(userRole)) return false;

    return permissions.every(permission => roleMap?.get(userRole)?.includes(permission));
  }, [userRole]);

  const hasAccess = useCallback((url: string): boolean => {
    if (!userRole || !roleMap.has(userRole)) return false;

    // find url's matching permission by comparaing to route regex
    let permission;
    accessMap.forEach((value, key) => {
      if (url.match(value) !== null) {
        permission = key;
      }
    });

    return permission
      ? roleMap?.get(userRole)?.includes(permission) || false
      : false;
  }, [userRole]);

  return {
    hasRole,
    hasPermission,
    hasSomePermissions,
    hasEveryPermissions,
    hasAccess,
  };
};