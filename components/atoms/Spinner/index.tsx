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
  LG = "lg",
  XL = "xl",
}

const sizeWidthDict: Record<SpinnerSize, string> = {
  [SpinnerSize.SM]: "30px",
  [SpinnerSize.MD]: "48px",
  [SpinnerSize.LG]: "60px",
  [SpinnerSize.XL]: "75px",
}

const sizeHeightDict: Record<SpinnerSize, string> = {
  [SpinnerSize.SM]: "10px",
  [SpinnerSize.MD]: "16px",
  [SpinnerSize.LG]: "60px",
  [SpinnerSize.XL]: "75px",
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

  // const bigSx: Sx = useMemo(()=>({
  //   width: width ? width : "unset",
  //   height: height ? height : "unset",
  //   position: "relative",
  //   ...sx,
  // }),[height, sx, width])

  const isBig = useMemo(()=>{
    if (size === SpinnerSize.LG || size === SpinnerSize.XL) return "big"
    else return "small"
  },[size])

  return (<>
    {!isBig 
      ? (
        <ThemeUiBox className={styles["small"]} ref={ref} sx={_sx} {...rest}>
          <ThemeUiBox className={`${styles["cube"]} ${styles["cube1"]}`} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
          <ThemeUiBox className={`${styles["cube"]} ${styles["cube2"]}`} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
          <ThemeUiBox className={`${styles["cube"]} ${styles["cube3"]}`} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
        </ThemeUiBox>
      ) 
      : (
        <ThemeUiBox className={styles["big"]} ref={ref} sx={_sx} {...rest}>
          <ThemeUiBox className={`${styles["cube"]} ${styles["cube1"]}`} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
          <ThemeUiBox className={`${styles["cube"]} ${styles["cube2"]}`} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
          <ThemeUiBox className={`${styles["cube"]} ${styles["cube3"]}`} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
          <ThemeUiBox className={`${styles["cube"]} ${styles["cube4"]}`} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
          <ThemeUiBox className={`${styles["cube"]} ${styles["cube5"]}`} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
          <ThemeUiBox className={`${styles["cube"]} ${styles["cube6"]}`} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
          <ThemeUiBox className={`${styles["cube"]} ${styles["cube7"]}`} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
          <ThemeUiBox className={`${styles["cube"]} ${styles["cube8"]}`} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
          <ThemeUiBox className={`${styles["cube"]} ${styles["cube9"]}`} sx={{backgroundColor: ColorKey.primary}}></ThemeUiBox>
        </ThemeUiBox>
      )}
  </>);
});

Spinner.displayName = "Spinner";