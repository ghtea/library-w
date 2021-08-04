import React from "react";

import { Link as ThemeUiLink, LinkProps as ThemeUiLinkProps } from "theme-ui"
import {Sx,useSx} from "tools/theme-ui"


export type LinkProps = Omit<ThemeUiLinkProps, "sx"> & {
    sx?: Sx
};


export const Link = React.forwardRef<HTMLElement, LinkProps>((props, ref) => {
  const {
    sx,
    href,
    ...rest
  } = props;

  const realSx = useSx({
    "&:visited": {
      color: "unset",
    },
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    background: "none",
    cursor: "pointer",
    textDecoration: "none",
    ...sx,
  })

  return ( 
    <ThemeUiLink {...rest} href={href} sx={realSx} />
  );
})