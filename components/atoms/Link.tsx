import { Link as ThemeUiLink, LinkProps as ThemeUiLinkProps } from "theme-ui"
import {Sx,useSx} from "tools/theme-ui"


export type LinkProps = Omit<ThemeUiLinkProps, "sx"> & {
    sx?: Sx
};

export const Link: React.FunctionComponent<LinkProps> = ({
  sx,
  href,
  ...rest
}) => {

  const realSx = useSx({
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    background: "none",
    cursor: "pointer",
    px: 1,
    py: 1,
    ...sx,
  })

  return ( 
    <ThemeUiLink {...rest} href={href} sx={realSx} />
  );
}