import React from "react";

import { Button as ThemeUiButton, ButtonProps as ThemeUiButtonProps } from "theme-ui"
import {Sx,useSx} from "tools/theme-ui"

export type ButtonProps = Omit<ThemeUiButtonProps, "sx"> & {
    sx?: Sx
};


export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const {
    sx,
    ...rest
  } = props;

  const realSx = useSx({
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    background: "none",
    cursor: "pointer",
    px: 1,
    py: 1,
    ...sx,
  })

  return ( 
    <ThemeUiButton {...rest} sx={realSx} />
  );
});