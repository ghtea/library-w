import React, {useMemo} from "react";
import {ReactSVG} from "react-svg"

import {ColorKey, Sx} from "theme";
import {Box as ThemeUiBox, BoxProps as ThemeUiBoxProps, ResponsiveStyleValue} from "theme-ui"

export type IconProps = ThemeUiBoxProps & {
  src: string;
  size?: ResponsiveStyleValue<IconSize>;
};

export enum IconSize {
  SM = "sm",
  MD = "md",
  LG = "lg"
}

const sizeLengthDict: Record<IconSize, string> = {
  [IconSize.SM]: "16px",
  [IconSize.MD]: "24px",
  [IconSize.LG]: "32px",
}

const getLength = (size: ResponsiveStyleValue<IconSize>) =>{
  if (size === undefined || size === null || size === false) return undefined;
  else if ( Array.isArray(size) ){
    return size.map(item => item ? (sizeLengthDict[item] || null) : null )
  }
  else if (Object.values(IconSize).includes(size)) return sizeLengthDict[size]
  else return undefined
}

export const Icon = React.forwardRef<HTMLDivElement, IconProps>((props, ref) => {

  const {
    src,
    size = IconSize.MD,
    sx,
    ...rest
  } = props;

  const length = useMemo(()=>getLength(size),[size])

  const _sx: Sx = useMemo(()=>({
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
      <ReactSVG src={src} style={{width: "100%", height: "100%"}} />  
    </ThemeUiBox>
  );
})

Icon.displayName = "Icon";