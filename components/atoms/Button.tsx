import React, {useMemo} from "react";

import { Button as ThemeUiButton, ButtonProps as ThemeUiButtonProps, ThemeUIStyleObject } from "theme-ui"

export type ButtonProps = ThemeUiButtonProps & {
  
};


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    sx,
    ...rest
  } = props;

  const primitiveSx: ThemeUIStyleObject = useMemo(()=>({
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
  }),[sx])

  return ( 
    <ThemeUiButton ref={ref} sx={primitiveSx} {...rest} />
  );
});

Button.displayName = "Button";