import { Link as ThemeUiLink, LinkProps as ThemeUiLinkProps } from "theme-ui"

export type LinkProps = ThemeUiLinkProps & {
};

export const Link: React.FunctionComponent<LinkProps> = (props) => (<ThemeUiLink {...props}/>);