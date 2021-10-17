import React, {useMemo} from "react";

import {DEFAULT_SX} from "components/atoms";
import {ColorKey,Sx} from "theme";
import {Heading as ThemeUiHeading, HeadingProps as ThemeUiHeadingProps, ResponsiveStyleValue} from "theme-ui"

export type HeadingProps = Omit<ThemeUiHeadingProps, "as"> & {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
};

export const Heading = React.forwardRef<HTMLDivElement, HeadingProps>((props, ref) => {

  const {
    as,
    sx,
    ...rest
  } = props;

  const fontSize = useMemo(()=>{
    if (as === "h6") return "1rem";
    else if (as === "h5") return "1.2rem";
    else if (as === "h4") return "1.4rem";
    else if (as === "h3") return "1.6rem";
    else if (as === "h2") return "1.8rem";
    else if (as === "h1") return "2rem";
  },[as])
  
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
      fontWeight: "bold",
      fontFamily: "unset",
      fontSize,
      color: ColorKey["text.strong"],
      ...sx,
    });
  },[sx, fontSize])

  return (
    <ThemeUiHeading as={as} ref={ref} sx={_sx} {...rest} />
  );
})

Heading.displayName = "Heading";