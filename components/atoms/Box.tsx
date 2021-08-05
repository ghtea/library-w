import React, { useImperativeHandle,useMemo, useRef } from "react";

import { Box as ThemeUiBox, BoxProps as ThemeUiBoxProps, ThemeUIStyleObject } from "theme-ui"

export type BoxProps = ThemeUiBoxProps & {
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

export const Box = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {

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
  
  const primitiveSx: ThemeUIStyleObject = useMemo(()=>({
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    height: "auto",
    width: "auto",
    ...sx,
    display,
  }),[display, sx])

  return (
    <ThemeUiBox ref={ref} sx={primitiveSx} {...rest} />
  );
});

Box.displayName = "Box";