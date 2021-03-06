import React, {useMemo} from "react";

import {DEFAULT_SX} from "components/atoms";
import {Sx} from "theme";
import {Flex as ThemeUiFlex, FlexProps as ThemeUiFlexProps, ThemeUIStyleObject} from "theme-ui"

export type FlexProps = ThemeUiFlexProps & {
  
};

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  
  const {
    sx,
    ...rest
  } = props;

  const _sx: Sx = useMemo(()=>({
    ...DEFAULT_SX,
    height: "auto",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    boxSizing: "border-box",
    ...sx,
  }),[sx])

  return ( 
    <ThemeUiFlex ref={ref} sx={_sx} {...rest} />
  );
});

Flex.displayName = "Flex";