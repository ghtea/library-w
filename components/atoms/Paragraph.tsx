import React, { useMemo } from "react";

import { Paragraph as ThemeUiParagraph, ParagraphProps as ThemeUiParagraphProps, ResponsiveStyleValue, ThemeUIStyleObject } from "theme-ui"

export type ParagraphProps = ThemeUiParagraphProps & {
  
};

export const Paragraph = React.forwardRef<HTMLDivElement, ParagraphProps>((props, ref) => {

  const {
    sx,
    ...rest
  } = props;

  const _sx: ThemeUIStyleObject = useMemo(()=>{
    return ({
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
      ...sx,
    });
  },[sx])

  return (
    <ThemeUiParagraph ref={ref} sx={_sx} {...rest} />
  );
})

Paragraph.displayName = "Paragraph";