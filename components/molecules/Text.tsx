import React, { useImperativeHandle, useMemo, useRef } from "react";

import { Box, BoxProps } from "components/atoms"
import { Text as ThemeUiText, TextProps as ThemeUiTextProps, ThemeUIStyleObject } from "theme-ui"

export type TextProps = ThemeUiTextProps & BoxProps & {
  
};


export const Text = React.forwardRef<HTMLDivElement, TextProps>((props, ref) => {

  const {
    sx,
    children,
    ...rest
  } = props;

  const boxRef = useRef<HTMLDivElement>(null);

  const textWidth = useMemo(()=>{
    return boxRef.current?.getBoundingClientRect().width || 0
  },[boxRef])

  const boxSx = useMemo(()=>sx, [sx]);

  const textPrimitiveSx = useMemo(()=>{
    const rawTextSx: ThemeUIStyleObject = {...sx};
    delete rawTextSx.width;
    delete rawTextSx.height;

    // const {wi} = rawTextSx;

    return getPrimitiveSx({
      flexShrink: 0,
      flexGrow: 0,
      flexBasis: "auto",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      lineHeight: 1.6,
      wordBreak: "break-all",
      width: textWidth,
      ...rawTextSx,
    });
  },[sx, textWidth])

  return (
    <Box ref={ref} sx={boxSx}  {...rest} > 
      <ThemeUiText sx={textPrimitiveSx}>{children}</ThemeUiText>  
    </Box>
  );
})

Text.displayName = "Text";