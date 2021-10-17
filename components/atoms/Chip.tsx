import React, {useMemo} from "react";

import {ColorKey, Sx} from "theme";
import {Box as ThemeUiBox, BoxProps as ThemeUiBoxProps, ResponsiveStyleValue} from "theme-ui"

export type ChipProps = ThemeUiBoxProps & {
  size?: ResponsiveStyleValue<ChipSize>;
  appearance?: "default" | "flat"
};

export enum ChipSize {
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg"
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const {
    sx,
    size = ChipSize.MD,
    appearance = "default",
    children,
    ...rest
  } = props;

  const isChildrenText = useMemo(()=>{
    return typeof children !== "object"
  },[children])

  const sizeSx = useMemo(()=>{
    const xsSx: Sx = {
      height: "24px",
      borderRadius: "12px",
      paddingX: isChildrenText ? "8px" : "unset",
      paddingBottom: isChildrenText ? "1px" : "unset",
      fontSize: "xs",
    }
    const smSx: Sx = {
      height: "30px",
      borderRadius: "15px",
      paddingX: isChildrenText ? "10px" : "unset",
      fontSize: "sm",
    }
    const mdSx: Sx = {
      height: "36px",
      borderRadius: "18px",
      paddingX: isChildrenText ? "12px" : "unset",
      fontSize: "body",
    }
    const lgSx: Sx = {
      height: "42px",
      borderRadius: "21px",
      paddingX: isChildrenText ? "14px" : "unset",
      fontSize: "lg",
    }
    if (size === ChipSize.XS){
      return xsSx
    }
    else if (size === ChipSize.SM){
      return smSx
    }
    else if (size === ChipSize.MD){
      return mdSx
    }
    else if (size === ChipSize.LG){
      return lgSx
    }
    else {
      return smSx
    }
  },[isChildrenText, size])

  const appearanceSx = useMemo(()=>{
    const defaultSx: Sx = {
      boxSizing: "border-box",
      backgroundColor: ColorKey["chip.default.bg"],
      borderColor: ColorKey["chip.default.border"],
      borderWidth: 1,
      borderStyle: "solid",
    }
    const flatSx: Sx = {
      ...defaultSx,
      border: "none",
      color: ColorKey["text.alternative"],
    };
    if (appearance === "default"){
      return defaultSx
    }
    else {
      return flatSx
    }
  },[appearance])

  const _sx: Sx = useMemo(()=>{
    const defaultSx: Sx = {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
      flexGrow: 0,
      flexBasis: "auto",
      color: "unset",
    }

    return ({
      ...defaultSx,
      ...appearanceSx,
      ...sizeSx,
      ...sx,
    })
  },[sizeSx, sx, appearanceSx])

  return ( 
    <ThemeUiBox 
      ref={ref} 
      {...rest} 
      sx={_sx} 
    >
      {children}
    </ThemeUiBox>
  );
});

Chip.displayName = "Chip";