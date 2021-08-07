import React, {useMemo} from "react";

import { Button as ThemeUiButton, ButtonProps as ThemeUiButtonProps, ThemeUIStyleObject } from "theme-ui"

export type ButtonProps = ThemeUiButtonProps & {
  
};


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    sx,
    ...rest
  } = props;

  const _sx: ThemeUIStyleObject = useMemo(()=>({
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    background: "none",
    cursor: "pointer",
    color: "unset",
    px: 3,
    py: 3,
    ...sx,
  }),[sx])

  return ( 
    <ThemeUiButton ref={ref} sx={_sx} {...rest} />
  );
});

Button.displayName = "Button";