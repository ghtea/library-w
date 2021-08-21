import React, {useMemo} from "react";

import {ColorKey,Sx} from "theme";
import {Box as ThemeUiBox, BoxProps as ThemeUiBoxProps, ThemeUIStyleObject} from "theme-ui"

export type DividerProps = ThemeUiBoxProps & {

};

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>((props, ref) => {

  const {
    sx,
    ...rest
  } = props;

  const _sx: Sx = useMemo(()=>({
    width: "100%",
    height: "2px",
    my: 4,
    backgroundColor: ColorKey["bg.weak"],
    ...sx,
  }),[sx])

  return (
    <ThemeUiBox ref={ref} sx={_sx} {...rest} />
  );
});

Divider.displayName = "Divider";