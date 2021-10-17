import React, {useMemo} from "react";

import {DEFAULT_SX} from "components/atoms";
import {Sx} from "theme";
import {ResponsiveStyleValue, Text as ThemeUiText, TextProps as ThemeUiTextProps} from "theme-ui"

export type TextProps = ThemeUiTextProps & {
  
};

export const Text = React.forwardRef<HTMLDivElement, TextProps>((props, ref) => {

  const {
    sx,
    ...rest
  } = props;

  const _sx: Sx = useMemo(()=>{
    return ({
      ...DEFAULT_SX,
      flexShrink: 1,
      flexGrow: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      lineHeight: 1.6,
      wordBreak: "break-all",
      display: "inline-block",
      maxWidth: "100%",
      ...sx,
    });
  },[sx])

  return (
    <ThemeUiText ref={ref} sx={_sx} {...rest} />
  );
})

Text.displayName = "Text";