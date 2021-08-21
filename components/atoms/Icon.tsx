import React, {useMemo} from "react";
import {ReactSVG} from "react-svg"

import {ColorKey} from "theme";
import {Box as ThemeUiBox, BoxProps as ThemeUiBoxProps, ResponsiveStyleValue, ThemeUIStyleObject} from "theme-ui"

export type IconProps = ThemeUiBoxProps & {
  src: string;
  size?: ResponsiveStyleValue<IconSize>;
};

export enum IconSize {
  SM = "sm",
  MD = "md",
  LG = "lg"
}

const sizeLengthMap: Record<IconSize, string> = {
  [IconSize.SM]: "16px",
  [IconSize.MD]: "24px",
  [IconSize.LG]: "32px",
}

export const Icon = React.forwardRef<HTMLDivElement, IconProps>((props, ref) => {

  const {
    src,
    size = IconSize.MD,
    sx,
    ...rest
  } = props;

  const length = useMemo(()=>{
    if (!size) return size;
    if ( (typeof size !== "object") && (Object.values(IconSize).includes(size))) return sizeLengthMap[size]
    if ( Array.isArray(size) ){
      return size.map(item => item ? (sizeLengthMap[item] || null) : null )
    }
  },[size])

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
      <ReactSVG src={src} style={{width: "100%", height: "100%"}} />  
    </ThemeUiBox>
  );
})

Icon.displayName = "Icon";