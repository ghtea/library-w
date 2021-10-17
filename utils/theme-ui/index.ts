import {useMemo} from "react";

import {ColorKey} from "theme";
import {ResponsiveStyleValue, ThemeUIStyleObject} from "theme-ui";

// export type Sx = ThemeUIStyleObject & {
//     width?: ResponsiveStyleValue<string | number | null >;
//     height?: ResponsiveStyleValue<string | number | null >;
//     size?: ResponsiveStyleValue<string | number | null>; // apply to width & height when width/height is unset
    
//     color?: ResponsiveStyleValue<ColorKey | "inherit" | "unset" | null>;
//     backgroundColor?: ResponsiveStyleValue<ColorKey | "inherit" | "unset" | null>
//     borderColor?: ResponsiveStyleValue<ColorKey | "inherit" | "unset" | null>
// }

// export const usePrimitiveSx = (sx?: Sx): ThemeUIStyleObject | undefined => {
//   return useMemo(() => {

//     if (!sx) return;

//     const width = sx.width ? sx.width : sx.size ? sx.size : "unset";
//     const height = sx.height ? sx.height : sx.size ? sx.size : "unset";
    
//     return ({
//       ...sx, 
//       width: width, 
//       height: height
//     });
//   }, [sx]);
// };

// export const getPrimitiveSx = (sx?: Sx): ThemeUIStyleObject | undefined => {

//   if (!sx) return;

//   const width = sx.width ? sx.width : sx.size ? sx.size : "unset";
//   const height = sx.height ? sx.height : sx.size ? sx.size : "unset";
    
//   return ({
//     ...sx, 
//     width: width, 
//     height: height
//   });
// };