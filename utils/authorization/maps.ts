import {pathToRegexp} from "path-to-regexp";

// access 
export const accessPermissionList = [
  "ACCESS_HOME",
  "ACCESS_MUSIC",
  "ACCESS_MOVIE",
  "ACCESS_THOUGHT",
  "ACCESS_KNOWLEDGE",
  "ACCESS_AUTHENTICATION",

  "ACCESS_SETTING",
] as const;
export type AccessPermission = typeof accessPermissionList[number];

export const accessPermissionRegExpMap = new Map<AccessPermission, RegExp>([
  ["ACCESS_HOME", pathToRegexp("/"),],
  ["ACCESS_MUSIC",pathToRegexp("/music"),],
  ["ACCESS_MOVIE",pathToRegexp("/movie"),],
  ["ACCESS_THOUGHT",pathToRegexp("/thought"),],
  ["ACCESS_KNOWLEDGE",pathToRegexp("/knowledge"),],
  ["ACCESS_AUTHENTICATION",pathToRegexp("/auth"),],

  ["ACCESS_SETTING",pathToRegexp("/setting"),],
]);

// permissions
export const PermissionList = [
  // access pages
  ...accessPermissionList,
  
  // music, movie
  "EDIT_REVIEW",
  
] as const;
export type Permission = typeof PermissionList[number];
//export type PermissionValue = PermissionKey;

// roles
export enum Role {
  "OWNER" = "owner",
  "GUEST" = "guest",
  "UNKNOWN" = "unknown",
} 

export const rolePermissionMap = new Map<Role, Permission[]>([
  [
    Role.OWNER,
    [
      // access pages
      "ACCESS_HOME",
      "ACCESS_MUSIC",
      "ACCESS_MOVIE",
      "ACCESS_THOUGHT",
      "ACCESS_KNOWLEDGE",
      "ACCESS_AUTHENTICATION",
      // 
      "ACCESS_SETTING",

      // music, movie
      "EDIT_REVIEW",
    ],
  ],
  [
    Role.GUEST,
    [
      // access pages
      "ACCESS_SETTING",
      "ACCESS_HOME",
      "ACCESS_MUSIC",
      "ACCESS_MOVIE",
      "ACCESS_KNOWLEDGE",
      "ACCESS_AUTHENTICATION",

      // music, movie
    ],
  ],
  [
    Role.UNKNOWN,
    [
      // access pages
      "ACCESS_SETTING",
      "ACCESS_HOME",
      "ACCESS_MUSIC",
      "ACCESS_MOVIE",
      "ACCESS_KNOWLEDGE",
      "ACCESS_AUTHENTICATION",

      // music, movie
    ],
  ],
]);