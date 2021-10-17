import React, {useCallback, useMemo} from "react";

import {DEFAULT_SX} from "components/atoms";
import {Sx} from "theme";
import {Link as ThemeUiLink, LinkProps as ThemeUiLinkProps} from "theme-ui"
import {useAdvancedRouter} from "utils/router";


export type LinkProps = Omit<ThemeUiLinkProps, "href"> & {
  href?: string;
  to?: string;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {
    sx,
    href,
    to,
    onClick,
    ...rest
  } = props;

  const {router} = useAdvancedRouter()

  const isInApp = useMemo(()=>!href,[href])

  const _onClick = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
    if (onClick){
      onClick(event);
    }
    if (to){
      router?.push(to)
    }
  },[onClick, router, to])

  const _sx: Sx = useMemo(()=>({
    ...DEFAULT_SX,
    "&:link":{
      color: "unset",
    },
    "&:visited": {
      color: "unset",
    },
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    background: "none",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "1rem",
    ...sx,
  }),[sx])


  return ( 
    <ThemeUiLink ref={ref} sx={_sx} href={href} onClick={_onClick} {...rest} />
  );
})

Link.displayName = "Link";