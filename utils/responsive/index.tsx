import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";

import {throttle} from "lodash";
import {theme} from "theme"


export type ResponsiveRange = 
  "smOnly" | "mdOnly" |  "lgOnly" | "xlOnly" |   
  "smAndUp" | "mdAndUp" |  "lgAndUp" | "xlAndUp" |  
  "smAndDown" | "mdAndDown" |  "lgAndDown" | "xlAndDown" |
  "sm-md" | "lg-xl" 

export type ResponsiveRangeCondition = Partial<Record<ResponsiveRange, boolean>>

export type ResponsiveContext = ResponsiveRangeCondition & {
  id?: number;

  width?: number;
  height?: number;

  breakpoints?: number[];
};

export const ResponsiveContext = createContext<ResponsiveContext>({});

export const useResponsive = () => {
  return useContext(ResponsiveContext);
};

export const ResponsiveProvider: FunctionComponent = (props) => {
  const [value, setValue] = useState<ResponsiveContext>({});

  const hasWindow = typeof window !== "undefined";

  useEffect(() => {
    if (hasWindow !== true) return;

    const breakpointNumbers = theme.breakpoints.map(item=>Number(item.replace(/px/, "")));

    const updateResponsiveContext = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const sm = width < breakpointNumbers[0];
      const md = width < breakpointNumbers[1] && !(sm);
      const lg = width < breakpointNumbers[2] && !(sm || md);
      const xl = width >= breakpointNumbers[2];

      setValue({
        id: Date.now(),

        width,
        height,
        breakpoints: breakpointNumbers,

        smOnly: sm,
        mdOnly: md,
        lgOnly: lg,
        xlOnly: xl,

        smAndUp: (sm || md || lg || xl),
        mdAndUp: !(sm) && (md || lg || xl),
        lgAndUp: !(sm || md) && (lg || xl),
        xlAndUp: !(sm || md || lg) && (xl),
        smAndDown: (sm) && !(md || lg || xl),
        mdAndDown: (sm || md) && !(lg || xl),
        lgAndDown: (sm || md || lg) && !(xl),
        xlAndDown: (sm || md || lg || xl),

        "sm-md": (sm || md) && !(lg || xl),
        "lg-xl": (lg || xl) && !(sm || md),
      });
    };

    const throttledOnResize = throttle(updateResponsiveContext, 500);

    updateResponsiveContext();

    window.addEventListener("resize", throttledOnResize);
    return () => window.removeEventListener("resize", throttledOnResize);
  }, [hasWindow]);

  return (
    <ResponsiveContext.Provider value={value}>
      {props.children}
    </ResponsiveContext.Provider>
  );
};
