import { ResponsiveStyleValue, ThemeUIStyleObject } from 'theme-ui';
import { useMemo } from "react";

export type Sx = ThemeUIStyleObject & {
    width?: ResponsiveStyleValue<string | number>;
    height?: ResponsiveStyleValue<string | number>;
    size?: ResponsiveStyleValue<string | number>; // apply to width & height with width/height is unset
}


export const useSx = (sx?: Sx): ThemeUIStyleObject | undefined => {
    return useMemo(() => {

        if (!sx) return;

        const width = sx.width ? sx.width : sx.size ? sx.size : "unset";
        const height = sx.height ? sx.height : sx.size ? sx.size : "unset";
    
        return ({
            ...sx, 
            width: width, 
            height: height
        });
    }, [sx]);
  };