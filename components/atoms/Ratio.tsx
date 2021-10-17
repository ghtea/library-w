import React, {RefObject, useEffect, useMemo, useRef} from "react";

import {DEFAULT_SX} from "components/atoms";
import {Sx} from "theme";
import {Box as ThemeUiBox, BoxProps as ThemeUiBoxProps} from "theme-ui"
import {useResponsive} from "utils/responsive"

export type RatioProps = ThemeUiBoxProps & {
  ratio?: number
};

export const Ratio = React.forwardRef<HTMLDivElement, RatioProps>((props, ref) => {

  const {
    ratio = 1,
    sx,
    ...rest
  } = props;

  const {id: responsiveId} = useResponsive()
  
  const containerRef = useRef<HTMLDivElement>(null)

  const {width, height} = useMemo(()=>{
    return ({
      width: Math.round(containerRef.current?.getBoundingClientRect().width || 0) || "unset",
      height: Math.round((containerRef.current?.getBoundingClientRect().width || 0) / ratio) || "unset",
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[containerRef, responsiveId, ratio])

  const _sx: Sx = useMemo(()=>({
    ...DEFAULT_SX,
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    height,
    width,
    ...sx,
  }),[height, sx, width])

  return (
    <ThemeUiBox ref={containerRef} sx={{width: "100%"}}>
      <ThemeUiBox ref={ref} sx={_sx} {...rest} />
    </ThemeUiBox>
  );
});

Ratio.displayName = "Ratio";