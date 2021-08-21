import React, {useMemo} from "react";

import {Link as ThemeUiLink, LinkProps as ThemeUiLinkProps, ThemeUIStyleObject} from "theme-ui"


export type LinkProps = ThemeUiLinkProps & {
  
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {
    sx,
    href,
    ...rest
  } = props;

  const primitiveSx: ThemeUIStyleObject = useMemo(()=>({
    "&:link":{
      color: "unset",
    },
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
  }),[sx])

  return ( 
    <ThemeUiLink ref={ref} sx={primitiveSx} href={href} {...rest} />
  );
})

Link.displayName = "Link";