import React, { useMemo } from "react";

import { Box as ThemeUiBox, BoxProps as ThemeUiBoxProps } from "theme-ui"
import {Sx,useSx} from "tools/theme-ui"

export type BoxProps = Omit<ThemeUiBoxProps, "sx"> & {
    sx?: Sx
    responsive?: Responsive
};

export enum Responsive {
  SMALL = "small",
  BIG = "big",

  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
}

export const Box = React.forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const {
    sx,
    responsive,
    ...rest
  } = props;

  const display = useMemo(()=>{
    // display: ["unset", null, "none", null]
    if (responsive === Responsive.SMALL){
      return ["unset", "unset", "none", "none"];
    }
    else if (responsive === Responsive.BIG){
      return ["none", "none", "unset", "unset"];
    }

    else if (responsive === Responsive.SM){
      return ["unset", "none", "none", "none"];
    }
    else if (responsive === Responsive.MD){
      return ["none", "unset", "none", "none"];
    }
    else if (responsive === Responsive.LG){
      return ["none", "none", "unset", "none"];
    }
    else if (responsive === Responsive.XL){
      return ["none", "none", "none", "unset"];
    }
  },[responsive])
  
  const realSx = useSx({
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    height: "auto",
    width: "auto",
    ...sx,
    display
  })

  return (
    <ThemeUiBox {...rest} sx={realSx} />
  )
});