import { NavLink as ThemeUiNavLink, NavLinkProps as ThemeUiNavLinkProps } from "theme-ui"

export type NavLinkProps = ThemeUiNavLinkProps & {
};

export const NavLink: React.FunctionComponent<NavLinkProps> = (props) => (<ThemeUiNavLink {...props}/>);