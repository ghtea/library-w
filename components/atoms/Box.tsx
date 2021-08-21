import React, {useMemo} from "react";

import {Sx} from "theme";
import {Box as ThemeUiBox, BoxProps as ThemeUiBoxProps, ThemeUIStyleObject} from "theme-ui"

export type BoxProps = ThemeUiBoxProps & {

};

export const Box = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {

  const {
    sx,
    ...rest
  } = props;

  const _sx: Sx = useMemo(()=>({
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    height: "auto",
    width: "auto",
    position: "relative",
    ...sx,
  }),[sx])

  return (
    <ThemeUiBox ref={ref} sx={_sx} {...rest} />
  );
});

Box.displayName = "Box";