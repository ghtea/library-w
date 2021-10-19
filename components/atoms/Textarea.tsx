import React, {useMemo} from "react";

import {DEFAULT_SX} from "components/atoms";
import {Sx} from "theme";
import {Textarea as ThemeUiTextarea, TextareaProps as ThemeUiTextareaProps} from "theme-ui"

export type TextareaProps = ThemeUiTextareaProps & {
  
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {

  const {
    sx,
    ...rest
  } = props;

  const _sx: Sx = useMemo(()=>{
    return ({
      ...DEFAULT_SX,
      flexShrink: 1,
      flexGrow: 1,
      overflow: "auto",
      whiteSpace: "pre-line",
      lineHeight: 1.6,
      wordBreak: "break-all",
      display: "inline-block",
      maxWidth: "100%",
      fontFamily: "unset",
      fontStyle: "unset",
      width: "100%",
      ...sx,
    });
  },[sx])

  return (
    <ThemeUiTextarea ref={ref} sx={_sx} {...rest} />
  );
})

Textarea.displayName = "Textarea";