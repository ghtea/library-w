import React, {useMemo} from "react";

import {DEFAULT_SX} from "components/atoms";
import {Sx} from "theme";
import {
  Heading as ThemeUiHeading, HeadingProps as ThemeUiHeadingProps, 
  Text as ThemeUiText, TextProps as ThemeUiTextProps,
} from "theme-ui"


export type TextProps = ThemeUiTextProps & {
  tag?: "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
};

export const Text = React.forwardRef<HTMLDivElement, TextProps>((props, ref) => {

  const {
    sx,
    tag = "span",
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
      fontFamily: "unset",
      ...sx,
    });
  },[sx])

  return (
    tag === "span" 
      ? <ThemeUiText ref={ref} sx={_sx} {...rest} />
      :<ThemeUiHeading as={tag} ref={ref} sx={_sx} {...rest} />
  );
})

Text.displayName = "Text";