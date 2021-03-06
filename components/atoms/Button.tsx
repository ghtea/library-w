import React, {useMemo} from "react";

import {DEFAULT_SX} from "components/atoms";
import {Sx} from "theme";
import {Button as ThemeUiButton, ButtonProps as ThemeUiButtonProps} from "theme-ui"

export type ButtonProps = ThemeUiButtonProps & {
  active?: boolean
};


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    sx,
    disabled = false,
    active = false,
    ...rest
  } = props;

  const _sx: Sx = useMemo(()=>({
    ...DEFAULT_SX,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    boxSizing: "border-box",
    background: "none",
    cursor: "pointer",
    color: "unset",
    px: 4,
    py: 4,
    ...sx,
  }),[sx])

  return ( 
    <ThemeUiButton ref={ref} sx={_sx} {...rest} />
  );
});

Button.displayName = "Button";