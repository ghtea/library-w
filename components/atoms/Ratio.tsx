import React, {RefObject, useCallback, useEffect, useMemo, useRef, useState} from "react";

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
  
  const [container, setContainer] = useState<HTMLDivElement | null>(null) 

  const {width, height} = useMemo(()=>{
    return ({
      width: Math.round(container?.getBoundingClientRect().width || 0) || "unset",
      height: Math.round((container?.getBoundingClientRect().width || 0) / ratio) || "unset",
    })
  
  // because of responsiveId
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  },[container, responsiveId, ratio])

  const _sx: Sx = useMemo(()=>({
    ...DEFAULT_SX,
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    height,
    width,
    ...sx,
  }),[height, sx, width])

  const containerRef = useCallback((element)=>{
    if (element){
      setContainer(element)
    }
  },[])

  return (
    <ThemeUiBox ref={containerRef} sx={{width: "100%"}}>
      <ThemeUiBox ref={ref} sx={_sx} {...rest} />
    </ThemeUiBox>
  );
});

Ratio.displayName = "Ratio";