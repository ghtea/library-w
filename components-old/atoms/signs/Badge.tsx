import { Badge as ThemeUiBadge, BadgeProps as ThemeUiBadgeProps } from "theme-ui"

export type BadgeProps = ThemeUiBadgeProps & {
};

export const Badge: React.FunctionComponent<BadgeProps> = (props) => (<ThemeUiBadge {...props}/>);