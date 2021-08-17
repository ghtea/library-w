import React, { useMemo } from "react";

import { ColorKey } from "theme";
import { Box as ThemeUiBox, BoxProps as ThemeUiBoxProps, ResponsiveStyleValue, ThemeUIStyleObject } from "theme-ui"

export type ImageProps = ThemeUiBoxProps & {
  src: string;
  alt: string;
};

export const Image = React.forwardRef<HTMLDivElement, ImageProps>((props, ref) => {

  const {
    src,
    alt,
    sx,
    ...rest
  } = props;

  // const length = useMemo(()=>{
  //   if (!size) return size;
  //   if ( (typeof size !== "object") && (Object.values(Size).includes(size))) return sizeLengthMap[size]
  //   if ( Array.isArray(size) ){
  //     return size.map(item => item ? (sizeLengthMap[item] || null) : null )
  //   }
  // },[size])

  const _sx: ThemeUIStyleObject = useMemo(()=>({
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    width: length ? length : "unset",
    height: length ? length : "unset",
    color: ColorKey.text,
    lineHeight: 0,
    ...sx
  }),[sx, length])

  return (
    <ThemeUiBox 
      ref={ref}
      sx={_sx} 
      {...rest} 
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{width: "100%", height: "100%"}} />  
    </ThemeUiBox>
  );
})

Image.displayName = "Image";