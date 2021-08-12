import React, { useMemo } from "react";

import { ColorKey } from "theme";
import { Box as ThemeUiBox, BoxProps as ThemeUiBoxProps, ThemeUIStyleObject } from "theme-ui"

export type DividerProps = ThemeUiBoxProps & {

};

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>((props, ref) => {

  const {
    sx,
    ...rest
  } = props;

  const _sx: ThemeUIStyleObject = useMemo(()=>({
    width: "100%",
    height: "2px",
    mt: 4,
    backgroundColor: ColorKey["background-weak"],
    ...sx,
  }),[sx])

  return (
    <ThemeUiBox ref={ref} sx={_sx} {...rest} />
  );
});

Divider.displayName = "Divider";