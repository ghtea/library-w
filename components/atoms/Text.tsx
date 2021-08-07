import React, { useMemo } from "react";

import { ResponsiveStyleValue, Text as ThemeUiText, TextProps as ThemeUiTextProps, ThemeUIStyleObject } from "theme-ui"

export type TextProps = ThemeUiTextProps & {

};

export const Text = React.forwardRef<HTMLDivElement, TextProps>((props, ref) => {

  const {
    sx,
    ...rest
  } = props;

  const _sx: ThemeUIStyleObject = useMemo(()=>{
    return ({
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