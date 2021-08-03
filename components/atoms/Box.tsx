import { useMemo } from "react";

import { Box as ThemeUiBox, BoxProps as ThemeUiBoxProps } from "theme-ui"
import {Sx,useSx} from "tools/theme-ui"

export type BoxProps = Omit<ThemeUiBoxProps, "sx"> & {
    sx?: Sx
    responsive?: Responsive
};

export enum Responsive {
  SMALL = "small",
  BIG = "big",
}

export const Box: React.FunctionComponent<BoxProps> = ({
  sx,
  responsive,
  ...rest
}) => {

  const display = useMemo(()=>{
    // display: ["unset", null, "none", null]
    if (responsive === Responsive.SMALL){
      return ["unset", "unset", "none", "none"];
    }
    else if (responsive === Responsive.BIG){
      return ["none", "none", "unset", "unset"];
    }
  },[responsive])
  
  const realSx = useSx({
    ...sx,
    display
  })

  return (
    <ThemeUiBox {...rest} sx={realSx} />
  )
};