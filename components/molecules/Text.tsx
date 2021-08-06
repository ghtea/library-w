import React, { useImperativeHandle, useMemo, useRef } from "react";

import { Box, BoxProps } from "components/atoms"
import { ResponsiveStyleValue,Text as ThemeUiText, TextProps as ThemeUiTextProps, ThemeUIStyleObject } from "theme-ui"

export type TextProps = ThemeUiTextProps & BoxProps & {

};

// TODO: hmm.... divide Text atom and molecule ? 
export const Text = React.forwardRef<HTMLDivElement, TextProps>((props, ref) => {

  const {
    sx,
    children,
    ...rest
  } = props;

  const boxRef = useRef<HTMLDivElement>(null);

  const textWidth = useMemo(()=>{
    console.log(boxRef.current?.offsetWidth)
    return boxRef.current?.offsetWidth || 0
  },[boxRef.current, ref?.current])

  const boxSx = useMemo(()=>({
    ...sx
  }), [sx]);

  const textPrimitiveSx: ThemeUIStyleObject = useMemo(()=>{
    const rawTextSx: ThemeUIStyleObject = {...sx};
    delete rawTextSx.width;
    delete rawTextSx.height;

    return ({
      flexShrink: 1,
      flexGrow: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      lineHeight: 1.6,
      wordBreak: "break-all",
      width: textWidth,
      display: "inline-block",
      ...rawTextSx,
    });
  },[sx, textWidth])


  return (
    <Box ref={boxRef} sx={boxSx}  {...rest} > 
      <ThemeUiText ref={ref} sx={textPrimitiveSx}>{children}</ThemeUiText>  
    </Box>
  );
})

Text.displayName = "Text";