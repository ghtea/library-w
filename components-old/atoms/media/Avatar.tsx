import { Avatar as ThemeUiAvatar, AvatarProps as ThemeUiAvatarProps } from "theme-ui"

export type AvatarProps = ThemeUiAvatarProps & {
};

export const Avatar: React.FunctionComponent<AvatarProps> = (props) => (<ThemeUiAvatar {...props}/>);