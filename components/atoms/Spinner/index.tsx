import React, {useMemo} from "react";

import {ColorKey, Sx} from "theme";
import {Box as ThemeUiBox, BoxProps as ThemeUiBoxProps, ResponsiveStyleValue} from "theme-ui"

import styles from "./index.module.scss"

export type SpinnerProps = ThemeUiBoxProps & {
  size?: ResponsiveStyleValue<SpinnerSize>;
};

export enum SpinnerSize {
  SM = "sm",
  MD = "md",
  LG = "lg"
}

const sizeWidthDict: Record<SpinnerSize, string> = {
  [SpinnerSize.SM]: "30px",
  [SpinnerSize.MD]: "60px",
  [SpinnerSize.LG]: "120px",
}

const sizeHeightDict: Record<SpinnerSize, string> = {
  [SpinnerSize.SM]: "10px",
  [SpinnerSize.MD]: "20px",
  [SpinnerSize.LG]: "40px",
}

const getWidth = (size: ResponsiveStyleValue<SpinnerSize>) =>{
  if (size === undefined || size === null || size === false) return undefined;
  else if ( Array.isArray(size) ){
    return size.map(item => item ? (sizeWidthDict[item] || null) : null )
  }
  else if (Object.values(SpinnerSize).includes(size)) return sizeWidthDict[size]
  else return undefined
}

const getHeight = (size: ResponsiveStyleValue<SpinnerSize>) =>{
  if (size === undefined || size === null || size === false) return undefined;
  else if ( Array.isArray(size) ){
    return size.map(item => item ? (sizeHeightDict[item] || null) : null )
  }
  else if (Object.values(SpinnerSize).includes(size)) return sizeHeightDict[size]
  else return undefined
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>((props, ref) => {

  const {
    sx,
    size,
    ...rest
  } = props;

  const width = useMemo(()=>getWidth(size),[size])
  const height = useMemo(()=>getHeight(size),[size])

  const _sx: Sx = useMemo(()=>({
    width: width ? width : "unset",
    height: height ? height : "unset",
    position: "relative",
    ...sx,
  }),[height, sx, width])

  return (
    <ThemeUiBox className={styles["spinner"]} ref={ref} sx={_sx} {...rest}>
      <ThemeUiBox className={styles["bounce1"]} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
      <ThemeUiBox className={styles["bounce2"]} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
      <ThemeUiBox className={styles["bounce3"]} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
    </ThemeUiBox>
  );
});

Spinner.displayName = "Spinner";