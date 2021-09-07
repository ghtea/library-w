import React, {useMemo} from "react";

import {ColorKey, Sx} from "theme";
import {Input as ThemeUiInput, InputProps as ThemeUiInputProps, ThemeUIStyleObject} from "theme-ui"

export type InputProps = ThemeUiInputProps & {

};

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {

  const {
    sx,
    ...rest
  } = props;

  const _sx: Sx = useMemo(()=>({
    // flexShrink: 0,
    // flexGrow: 0,
    // flexBasis: "auto",
    // height: "auto",
    // width: "auto",
    // position: "relative",
    fontFamily: "unset",
    backgroundColor: ColorKey.bg,
    borderWidth: "1px",
    borderColor: ColorKey["text.weak"],
    borderRadius: 0,
    ":focus": {
      borderWidth: "2px",
      borderColor: ColorKey.primary,
      borderRadius: 0,
      outline:"none",
    },
    ...sx,
  }),[sx])

  return (
    <ThemeUiInput ref={ref} sx={_sx} {...rest} />
  );
});

Input.displayName = "Input";