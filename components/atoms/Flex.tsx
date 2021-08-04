import React from "react";

import { Flex as ThemeUiFlex, FlexProps as ThemeUiFlexProps } from "theme-ui"
import {Sx,useSx} from "tools/theme-ui"

export type FlexProps = ThemeUiFlexProps & {
  sx?: Sx
};

export const Flex = React.forwardRef<HTMLElement, FlexProps>((props, ref) => {
  const {
    sx,
    ...rest
  } = props;

  const realSx = useSx({
    height: "auto",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    ...sx,
  })

  return ( 
    <ThemeUiFlex {...rest} sx={realSx} />
  );
});